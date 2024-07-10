import { join } from 'path';
/**
 * 项目根目录
 */
export const PACKAGE_ROOT = join(__dirname, '..');
/**
 * 运行时根目录
 */
export const RUNTIME_PATH = join(PACKAGE_ROOT, 'src', 'runtime');
/**
 * 客户端入口文件路径
 */
export const CLIENT_ENTRY_PATH = join(RUNTIME_PATH, 'client-entry.tsx');
/**
 * 服务端入口文件路径
 */
export const SERVER_ENTRY_PATH = join(RUNTIME_PATH, 'ssr-entry.tsx');
/**
 * 默认模板HTML文件路径
 */
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, 'template.html');
/**
 * MDX文件正则表达式
 */
export const MD_REGEX = /\.mdx?$/;
/**
 * 分隔符
 */
export const MASK_SPLITTER = '!!ISLAND!!';
/**
 * importmap 依赖
 */
export const EXTERNALS = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime'
];
