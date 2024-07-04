import { Content, usePageData } from '@runtime';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/index';
import styles from './index.module.scss';
import { DocFooter } from '../../components/DocFooter/index';

/**
 * 文档文章布局
 */
export function DocLayout() {
  const { siteData } = usePageData();
  const sidebarData = siteData.themeConfig?.sidebar || {};
  const { pathname } = useLocation();
  const matchedSidebarKey = Object.keys(sidebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });

  const matchedSidebar = sidebarData[matchedSidebarKey] || [];

  return (
    <div>
      {/* 侧边栏 */}
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
      {/* 正文内容 */}
      <div className={styles.content}>
        <div>
          {/* 内容 */}
          <div className="island-doc">
            <Content />
          </div>
          {/* 底部上一页下一页 */}
          <DocFooter />
        </div>
      </div>
    </div>
  );
}
