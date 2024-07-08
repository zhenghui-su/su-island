import { App, initPageData } from './App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';

/**
 * 用于服务端渲染-拿到组件的html字符串
 * @param 路由传参
 */
export async function render(pagePath: string) {
  // 生产 pageData
  const pageData = await initPageData(pagePath);
  const { clearIslandData } = await import('./jsx-runtime');
  clearIslandData();
  return renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.Provider>
  );
}
/**
 * 导出路由数据
 */
export { routes } from 'su-island:routes';
