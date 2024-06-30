import { Plugin } from 'vite';
import { pluginMdxRollup } from './pluginMdxRollup';
import { pluginMdxHMR } from './pluginMdxHmr';

// Vite 热更新机制
// 1. 监听到文件变动
// 2. 定位到热更新边界模块
// 3. 执行更新逻辑

// import.meta.hot.accept()

// import.meta.hot.accept((mod) => {
//    console.log(mod);
// });

// import.meta.hot.accept(['./index.mdx'], (mod) => {
//    console.log(mod);
// });

/**
 * @description 创建mdx插件
 */
export async function pluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup(), pluginMdxHMR()];
}
