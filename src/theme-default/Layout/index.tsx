import { usePageData } from '@runtime';
import { Nav } from '../components/Nav';
import '../styles/base.css';
import '../styles/vars.css';
import 'uno.css';
/**
 * 默认主题布局
 *
 */
export function Layout() {
  // 获取页面数据
  const pageData = usePageData();
  const { pageType } = pageData;

  // 根据页面类型渲染不同的页面
  const getContent = () => {
    if (pageType === 'home') {
      return <div>主页内容</div>;
    } else if (pageType === 'doc') {
      return <div>正文内容</div>;
    } else {
      return <div>404 页面</div>;
    }
  };

  return (
    <div>
      <Nav />
    </div>
  );
}
