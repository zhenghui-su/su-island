import fastGlob from 'fast-glob';
import path from 'path';
import { normalizePath } from 'vite';

interface RouteMeta {
  // 路由路径
  routePath: string;
  // 文件绝对路径
  absolutePath: string;
}
/**
 * 路由服务层
 * - init 先初始化, 扫描指定目录下的指定文件并赋值路由信息
 * - getRouteMeta 获取路由信息(包括路由路径和文件绝对路径)
 * - generateRoutesCode 生成模块最终的代码信息
 */
export class RouteService {
  // 扫描的路径
  #scanDir: string;
  // 路由信息
  #routeData: RouteMeta[] = [];
  constructor(scanDir: string) {
    this.#scanDir = scanDir;
  }
  // 初始化, 扫描指定目录下的指定文件并赋值路由信息
  async init() {
    // 扫描指定目录下的指定文件
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir, // 工作目录
        absolute: true, // 返回文件绝对路径
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts'] // 忽略的文件
      })
      .sort();
    files.forEach((file) => {
      // 拿到相对路径, 用 vite 的 normalizePath 来兼容Windows
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      // 路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }
  // 获取路由信息
  getRouteMeta() {
    return this.#routeData;
  }
  // 去除后缀和index, 保证路由路径以 / 开头
  normalizeRoutePath(rawPath: string) {
    // 将后缀去掉, index 也去掉
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '');
    // 保证路由路径以 / 开头
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  }
  // 生成模块最终的代码信息
  generateRoutesCode(ssr = false) {
    return `
import React from 'react';
${ssr ? '' : 'import loadable from "@loadable/component";'}
${this.#routeData
  .map((route, index) => {
    // 使用loadable/component 实现按需加载
    // 在 SSR/SSG 阶段，所有的 JS 都通过本地磁盘进行读取，并没有网络 IO 开销相关的负担，因此我们可以通过静态 import 来导入组件。
    return ssr
      ? `import Route${index} from "${route.absolutePath}";`
      : `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
  })
  .join('\n')}
export const routes = [
  ${this.#routeData
    .map((route, index) => {
      return `{ path: '${route.routePath}', element: React.createElement(Route${index}), preload: () => import('${route.absolutePath}') }`;
    })
    .join(',\n')}
];
`;
  }
}
