/// <reference types="vite/client" />

declare module 'su-island:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}
declare module 'island:routes' {
  import { RouteObject } from 'react-router-dom';
  export const routes: RouteObject[];
}
