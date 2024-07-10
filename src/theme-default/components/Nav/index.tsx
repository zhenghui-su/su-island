import { usePageData } from '@runtime';
import { NavItemWithLink, PropsWithIsland } from 'shared/types';
import styles from './index.module.scss';
import { SwitchAppearance } from '../SwitchAppearance';

/**
 * 普通菜单组件
 *
 * @param item 普通菜单项
 */
export function MenuItem({ item }: { item: NavItemWithLink }) {
  return (
    <div className="text-sm font-medium mx-3">
      <a href={item.link} className={styles.link}>
        {item.text}
      </a>
    </div>
  );
}
/**
 * 头部导航栏组件
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Nav(props: PropsWithIsland) {
  // 拿到配置数据
  const { siteData } = usePageData();
  // 获取配置数据中的导航栏的配置
  const nav = siteData?.themeConfig.nav || [];
  return (
    <header relative="~" fixed="~" pos="t-0 l-0" w="full" z="10">
      <div
        flex="~"
        items="center"
        justify="between"
        className={`h-14 divider-bottom ${styles.nav}`}
      >
        {/* 左边标题部分 */}
        <div>
          <a
            href="/"
            className="w-full h-full text-1rem font-semibold flex items-center"
            hover="opacity-60"
          >
            su-island
          </a>
        </div>
        {/* 右边菜单部分 */}
        <div flex="~">
          {/* 菜单选项 */}
          <div flex="~">
            {nav.map((item) => (
              <MenuItem item={item} key={item.text} />
            ))}
          </div>
          {/* 主题切换 */}
          <div before="menu-item-before" flex="~">
            <SwitchAppearance __island />
          </div>
          {/* 相关链接 */}
          <div className={styles.socialLinkIcon} before="menu-item-before">
            <a
              href="https://github.com/zhenghui-su/su-island"
              target="_blank"
              rel="noreferrer"
            >
              <div className="i-carbon-logo-github w-5 h-5 fill-current"></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
