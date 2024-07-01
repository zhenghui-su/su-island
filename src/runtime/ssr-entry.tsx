import { App } from './App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

/**
 * 用于服务端渲染-拿到组件的html字符串
 * @param 路由传参
 */
export function render(pagePath: string) {
  return renderToString(
    <StaticRouter location={pagePath}>
      <App />
    </StaticRouter>
  );
}
/**
 * 导出路由数据
 */
export { routes } from 'su-island:routes';
