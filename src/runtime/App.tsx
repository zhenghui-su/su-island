import { matchRoutes } from 'react-router-dom';
import { Layout } from '../theme-default';
import { routes } from 'su-island:routes';
import { Route } from 'node/plugin-routes';
import { PageData } from 'shared/types';
import siteData from 'su-island:site-data';

/**
 * 初始化页面数据
 * @param routePath 当前path路径
 */
export async function initPageData(routePath: string): Promise<PageData> {
  // 匹配路由
  const matched = matchRoutes(routes, routePath);

  // 如果匹配到路由，则返回对应页面数据
  if (matched) {
    // 当前路由
    const route = matched[0].route as Route;
    // 获取路由组件编译后的模块内容
    const moduleInfo = await route.preload();
    return {
      pageType: moduleInfo.frontmatter?.pageType ?? 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath
    };
  }
  // 没有就返回404
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {}
  };
}

export function App() {
  return <Layout />;
}
