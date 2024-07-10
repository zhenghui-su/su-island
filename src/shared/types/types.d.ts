/// <reference types="vite/client" />

declare module 'su-island:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}
declare module 'virtual:routes' {
  import { RouteObject } from 'react-router-dom';
  const routes: RouteObject[];
  export { routes };
}
