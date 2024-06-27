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
}
// 增加配置类型
export interface SiteConfig {
  root: string;
  configPath: string;
  siteData: UserConfig;
  dependencies: string[];
}
