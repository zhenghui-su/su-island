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
  ],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--island-c-divider-light)'
      })
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '24px',
        'background-color': 'var(--island-c-divider-light)',
        content: '" "'
      }
    ]
  ]
};

export default options;
