import { usePageData } from '@runtime';
import { HomeHero } from '../../components/HomeHero/index';
import { HomeFeature } from '../../components/HomeFeature/index';
/**
 * 主页Home布局
 */
export function HomeLayout() {
  // 拿到用户主页的元数据
  const { frontmatter } = usePageData();
  return (
    <div>
      <HomeHero hero={frontmatter.hero} />
      <HomeFeature features={frontmatter.features} />
    </div>
  );
}
