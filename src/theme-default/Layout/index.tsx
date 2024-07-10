import { usePageData } from '@runtime';
import { Nav } from '../components/Nav';
import '../styles/base.css';
import '../styles/vars.css';
import '../styles/doc.css';
import 'uno.css';
import { HomeLayout } from './HomeLayout/index';
import { DocLayout } from './DocLayout';
import { Helmet } from 'react-helmet-async';
import { NotFoundLayout } from './NotFoundLayout';

/**
 * 默认主题布局
 *
 */
export function Layout() {
  // 获取页面数据
  const pageData = usePageData();
  const { pageType, title } = pageData;

  // 根据页面类型渲染不同的页面
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />;
    } else if (pageType === 'doc') {
      return <DocLayout />;
    } else {
      return <NotFoundLayout />;
    }
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--island-nav-height)'
        }}
      >
        {getContent()}
      </section>
    </div>
  );
}
