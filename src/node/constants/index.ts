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
