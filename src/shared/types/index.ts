import { ComponentType } from 'react';
import { UserConfig as ViteConfiguration } from 'vite';
/**
 * - text: 文本
 * - link: 链接
 */
export type NavItemWithLink = {
  text: string;
  link: string;
};

export interface Sidebar {
  [path: string]: SidebarGroup[];
}
/**
 * 侧边栏
 * - text: 文本
 * - items: 子项
 */
export interface SidebarGroup {
  text?: string;
  items: SidebarItem[];
}
/**
 * 侧边栏子项
 * - text: 文本
 * - link: 链接
 * - items: 子项
 */
export type SidebarItem =
  | { text: string; link: string }
  | { text: string; link?: string; items: SidebarItem[] };
/**
 * - nav: 导航栏
 * - sidebar: 侧边栏
 * - footer: 页脚
 */
export interface ThemeConfig {
  nav?: NavItemWithLink[];
  sidebar?: Sidebar;
  footer?: Footer;
}
/**
 * - message: 页脚信息
 * - copyright: 版权信息
 */
export interface Footer {
  message?: string;
  copyright?: string;
}
/**
 * - title: 标题
 * - description: 描述
 * - themeConfig: 主题配置
 * - vite: vite配置
 */
export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration;
  base?: string;
}
// 增加配置类型
export interface SiteConfig {
  root: string;
  configPath: string;
  siteData: UserConfig;
  dependencies: string[];
  base?: string;
  outDir?: string;
}
/**
 * 页面类型
 */
export type PageType = 'home' | 'doc' | 'custom' | '404';

/**
 * 首页下方特定卡片展示
 */
export interface Feature {
  icon: string;
  title: string;
  details: string;
}
/**
 * 首页中间的部分
 */
export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string;
    alt: string;
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}
/**
 * 元数据类型
 */
export interface FrontMatter {
  title?: string;
  description?: string;
  pageType?: PageType;
  // 是否显示侧边栏
  sidebar?: boolean;
  // 是否显示右侧大纲栏
  outline?: boolean;
  // 首页卡片
  features?: Feature[];
  // 首页中间的图片和行为按钮
  hero?: Hero;
}
export interface Header {
  id: string;
  text: string;
  depth: number;
}
/**
 * 页面数据
 */
export interface PageData {
  // 站点配置数据
  siteData: UserConfig;
  // 当前页面路由信息
  pagePath: string;
  // 页面的元数据
  frontmatter: FrontMatter;
  pageType: PageType;
  toc?: Header[];
  title: string;
}

/**
 * 页面模块
 */
export interface PageModule {
  default: ComponentType;
  frontmatter?: FrontMatter;
  toc?: Header[];
  title: string;
  [key: string]: unknown;
}
/**
 * island组件标识
 */
export type PropsWithIsland = {
  __island?: boolean;
};
