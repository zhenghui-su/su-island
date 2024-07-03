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
  shortcuts: {
    'flex-center': 'flex items-center justify-center'
  },
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
  ],
  theme: {
    colors: {
      brandLight: 'var(--island-c-brand-light)',
      brandDark: 'var(--island-c-brand-dark)',
      brand: 'var(--island-c-brand)',
      text: {
        1: 'var(--island-c-text-1)',
        2: 'var(--island-c-text-2)',
        3: 'var(--island-c-text-3)',
        4: 'var(--island-c-text-4)'
      },
      divider: {
        default: 'var(--island-c-divider)',
        light: 'var(--island-c-divider-light)',
        dark: 'var(--island-c-divider-dark)'
      },
      gray: {
        light: {
          1: 'var(--island-c-gray-light-1)',
          2: 'var(--island-c-gray-light-2)',
          3: 'var(--island-c-gray-light-3)',
          4: 'var(--island-c-gray-light-4)'
        }
      },
      bg: {
        default: 'var(--island-c-bg)',
        soft: 'var(--island-c-bg-soft)',
        mute: 'var(--island-c-bg-mute)'
      }
    }
  }
};

export default options;
