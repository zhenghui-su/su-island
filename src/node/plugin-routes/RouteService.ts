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
  #routeMeta: RouteMeta[] = [];
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
        ignore: ['**/build/**', '**/.island/**', 'config.ts'] // 忽略的文件
      })
      .sort();
    files.forEach((file) => {
      // 拿到相对路径, 用 vite 的 normalizePath 来兼容Windows
      const fileRelativePath = normalizePath(
        path.relative(this.#scanDir, file)
      );
      // 路由路径
      const routePath = this.normalizeRoutePath(fileRelativePath);
      this.#routeMeta.push({
        routePath,
        absolutePath: file
      });
    });
  }
  // 生成模块最终的代码信息
  generateRoutesCode() {
    return `
import React from 'react';
import loadable from '@loadable/component';
${this.#routeMeta
  .map((route, index) => {
    // 使用loadable/component 实现按需加载
    return `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
  })
  .join('\n')}
export const routes = [
  ${this.#routeMeta.map((route, index) => {
    return `{ path: '${route.routePath}', element: React.createElement(Route${index}) }`;
  })}
];
`;
  }
  // 获取路由信息
  getRouteMeta() {
    return this.#routeMeta;
  }
  // 去除后缀和index, 保证路由路径以 / 开头
  normalizeRoutePath(raw: string) {
    // 将后缀去掉, index 也去掉
    const routePath = raw.replace(/\.(.*)?$/, '').replace(/index$/, '');
    // 保证路由路径以 / 开头
    return routePath.startsWith('/') ? routePath : `/${routePath}`;
  }
}
