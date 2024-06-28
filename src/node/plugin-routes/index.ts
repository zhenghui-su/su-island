import { Plugin } from 'vite';
import { RouteService } from './RouteService';

interface PluginOptions {
  root: string;
}

export const CONVENTIONAL_ROUTES_ID = 'su-island:routes';
/**
 * 用于约定式路由-自动生成路由routes
 *
 * @param options
 * @returns
 */
export function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root);
  return {
    name: 'su-island:routes',
    async configResolved() {
      await routeService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTES_ID) {
        return '\0' + CONVENTIONAL_ROUTES_ID;
      }
    },
    load(id) {
      if (id === '\0' + CONVENTIONAL_ROUTES_ID) {
        return routeService.generateRoutesCode();
      }
    }
  };
}
