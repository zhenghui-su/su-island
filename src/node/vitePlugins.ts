import { SiteConfig } from 'shared/types';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import react from '@vitejs/plugin-react';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { pluginMdx } from './plugin-mdx';

/**
 * 用于整合所有 vite 插件
 */
export async function createVitePlugins(
  siteConfig: SiteConfig,
  restartServer?: () => Promise<void>
) {
  return [
    pluginIndexHtml(),
    react(),
    pluginConfig(siteConfig, restartServer),
    pluginRoutes({ root: siteConfig.root }),
    await pluginMdx()
  ];
}
