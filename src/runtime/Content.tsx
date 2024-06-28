import A from '../../docs/guide/a';
import B from '../../docs/b';
import Index from '../../docs/guide/index';
import { useRoutes } from 'react-router-dom';

/**
 * 路由配置-手动版本
 */
const routes = [
  {
    path: '/guide',
    element: <Index />
  },
  {
    path: '/guide/a',
    element: <A />
  },
  {
    path: '/b',
    element: <B />
  }
];

export const Content = () => {
  const routeElement = useRoutes(routes);
  return routeElement;
};
