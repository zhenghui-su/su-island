import { pluginMdxRollup } from './pluginMdxRollup';
/**
 * @description 创建mdx插件
 */
export function createMdxPlugins() {
  return [pluginMdxRollup()];
}
