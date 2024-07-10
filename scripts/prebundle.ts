import path from 'path';
import fs from 'fs-extra';
import { build } from 'esbuild';
import resolve from 'resolve';
import { normalizePath } from 'vite';

const PRE_BUNDLE_DIR = 'vendors';

/**
 * 预打包脚本
 */
async function preBundle(deps: string[]) {
  const flattenDepMap = {} as Record<string, string>;
  deps.map((item) => {
    const flattedName = item.replace(/\//g, '_');
    flattenDepMap[flattedName] = item;
  });
  const outputAbsolutePath = path.join(process.cwd(), 'PRE_BUNDLE_DIR');

  if (await fs.pathExists(outputAbsolutePath)) {
    await fs.remove(outputAbsolutePath);
  }
  await build({
    entryPoints: flattenDepMap,
    outdir: PRE_BUNDLE_DIR,
    bundle: true, // 打包模式
    minify: true, // 开启压缩
    splitting: true, // 开启代码分包
    format: 'esm', // 输出格式
    platform: 'browser', // 产物运行平台
    plugins: [
      {
        name: 'pre-bundle',
        setup(build) {
          // 捕获引入的import
          build.onResolve({ filter: /^[\w@][^:]/ }, async (args) => {
            // 捕获需要打包的依赖
            if (!deps.includes(args.path)) {
              return;
            }
            // 是否是入口模块
            const isEntry = !args.importer;
            // 解析出具体路径
            const resolved = resolve.sync(args.path, {
              basedir: args.importer || process.cwd()
            });
            return isEntry
              ? { path: resolved, namespace: 'dep' } // 给予命名空间
              : { path: resolved };
          });
          // 拦截命令空间的模块
          build.onLoad({ filter: /.*/, namespace: 'dep' }, async (args) => {
            const entryPath = normalizePath(args.path);
            const res = require(entryPath);
            // 导出的名称
            const specifiers = Object.keys(res);
            return {
              contents: `
                export { ${specifiers.join(',')} } from "${entryPath}";
                export default require("${entryPath}")`,
              loader: 'js',
              resolveDir: process.cwd()
            };
          });
        }
      }
    ]
  });
}

preBundle(['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime']);
