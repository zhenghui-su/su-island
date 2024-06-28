import { App } from './App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

/**
 * 用于服务端渲染-拿到组件的html字符串
 */
export function render() {
  return renderToString(
    <StaticRouter location={'/guide/a'}>
      <App />
    </StaticRouter>
  );
}
