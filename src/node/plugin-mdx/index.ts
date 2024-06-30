import { Plugin } from 'vite';
import { pluginMdxRollup } from './pluginMdxRollup';
/**
 * @description 创建mdx插件
 */
export async function pluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup()];
}
