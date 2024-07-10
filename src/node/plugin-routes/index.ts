import { Plugin } from 'vite';
import { RouteService } from './RouteService';
import { PageModule } from 'shared/types';
// 本质: 把文件目录结构 -> 路由数据

export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
  preload: () => Promise<PageModule>;
}
interface PluginOptions {
  root: string;
  isSSR: boolean;
}

export const CONVENTIONAL_ROUTES_ID = 'island:routes';
/**
 * 用于约定式路由-自动生成路由routes
 *
 * @param options
 * @returns
 */
export function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root);
  return {
    name: 'island:routes',
    async configResolved() {
      await routeService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTES_ID) {
        return '\0' + id;
      }
    },
    load(id) {
      if (id === '\0' + CONVENTIONAL_ROUTES_ID) {
        return {
          code: routeService.generateRoutesCode(options?.isSSR),
          moduleSideEffects: false
        };
      }
    }
  };
}
