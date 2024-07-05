import { throttle } from 'lodash-es';

let links: HTMLAnchorElement[] = [];

/**
 * 导航栏高度
 */
const NAV_HEIGHT = 56;

/**
 * 用于处理大纲页面的交互逻辑
 */
export function bindingAsideScroll() {
  const marker = document.getElementById('aside-marker');
  const aside = document.getElementById('aside-container');
  const headers = Array.from(aside?.getElementsByTagName('a') || []).map(
    (item) => decodeURIComponent(item.hash)
  );

  if (!aside) {
    return;
  }
  // 正在选中的大纲标签
  const activate = (links: HTMLAnchorElement[], index: number) => {
    if (links[index]) {
      const id = links[index].getAttribute('href');
      const tocIndex = headers.findIndex((item) => item === id);
      const currentLink = aside?.querySelector(`a[href="#${id.slice(1)}"]`);
      if (currentLink) {
        // 设置高亮样式
        marker.style.top = `${33 + tocIndex * 28}px`;
        marker.style.opacity = '1';
      }
    }
  };

  const setActiveLink = () => {
    links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.island-doc .header-anchor')
    ).filter((item) => item.parentElement?.tagName !== 'H1');

    const isBottom =
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight;
    // 1. 如果已经滑动到底部，我们将最后一个 link 高亮即可
    if (isBottom) {
      activate(links, links.length - 1);
      return;
    }

    // 2. 遍历 links，寻找对应锚点
    for (let i = 0; i < links.length; i++) {
      const currentAnchor = links[i];
      const nextAnchor = links[i + 1];
      const scrollTop = Math.ceil(window.scrollY);
      const currentAnchorTop =
        currentAnchor.parentElement.offsetTop - NAV_HEIGHT;
      // 高亮最后一个锚点
      if (!nextAnchor) {
        activate(links, i);
        break;
      }
      // 高亮第一个锚点的情况
      if ((i === 0 && scrollTop < currentAnchorTop) || scrollTop == 0) {
        activate(links, 0);
        break;
      }
      // 如果当前 scrollTop 在 i 和 i + 1 个锚点之间
      const nextAnchorTop = nextAnchor.parentElement.offsetTop - NAV_HEIGHT;
      if (scrollTop >= currentAnchorTop && scrollTop < nextAnchorTop) {
        activate(links, i);
        break;
      }
    }
  };
  // 使用loadsh节流
  const throttledSetActiveLink = throttle(setActiveLink, 100);
  window.addEventListener('scroll', throttledSetActiveLink);
  // 返回事件解绑逻辑，供 TOC 组件调用，避免内存泄露
  return () => {
    window.removeEventListener('scroll', throttledSetActiveLink);
  };
}
/**
 * 滚动到目标元素
 *
 * @param target 目标元素
 * @param isSmooth behavior 是否平滑滚动
 */
export function scrollToTarget(target: HTMLElement, isSmooth: boolean) {
  const targetPadding = parseInt(
    window.getComputedStyle(target).paddingTop,
    10
  );
  const targetTop =
    window.scrollY +
    target.getBoundingClientRect().top +
    targetPadding -
    NAV_HEIGHT;
  window.scrollTo({
    left: 0,
    top: targetTop,
    behavior: isSmooth ? 'smooth' : 'auto'
  });
}
