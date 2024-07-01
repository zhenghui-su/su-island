import { VitePluginConfig } from 'unocss/vite';
import { presetAttributify, presetWind, presetIcons } from 'unocss';
/**
 * unocss vite插件配置
 */
const options: VitePluginConfig = {
  presets: [
    // 属性化功能支持
    presetAttributify(),
    // 兼容 Tailwind 和 Windi CSS
    presetWind(),
    // 内置图标支持
    presetIcons()
  ]
};

export default options;
