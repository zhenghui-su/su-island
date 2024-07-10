import { SidebarGroup, SidebarItem, PropsWithIsland } from 'shared/types';
import styles from './index.module.scss';
import { Link } from '../Link/index';

interface SidebarProps {
  sidebarData: SidebarGroup[];
  pathname: string;
}

/**
 * 文档界面侧边栏组件
 * @param props 传入侧边栏数据和路径名称
 */
export function Sidebar(props: SidebarProps & PropsWithIsland) {
  const { sidebarData, pathname } = props;
  // 渲染侧边栏每一项item
  const renderGroupItem = (item: SidebarItem) => {
    const active = item.link === pathname;
    return (
      <div ml="5">
        <div
          p="1"
          block="~"
          text="sm"
          font-medium="~"
          className={`${active ? 'text-brand' : 'text-text-2'}`}
        >
          {/* 链接 */}
          <Link href={item.link}>{item.text}</Link>
        </div>
      </div>
    );
  };
  // 渲染侧边栏
  const renderGroup = (item: SidebarGroup) => {
    return (
      <section key={item.text} block="~" not-first="divider-top mt-4">
        <div flex="~" justify="between" items="center">
          <h2 m="t-3 b-2" text="1rem text-1" font="bold">
            {item.text}
          </h2>
        </div>
        <div mb="1">
          {item.items?.map((item) => (
            <div key={item.link}>{renderGroupItem(item)}</div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <nav>{sidebarData.map(renderGroup)}</nav>
    </aside>
  );
}
