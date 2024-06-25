import { join } from "path"
/**
 * 项目根目录
 */
export const PACKAGE_ROOT = join(__dirname, "..", "..", "..")
/**
 * 默认模板HTML文件路径
 */
export const DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html")
/**
 * 客户端入口文件路径
 */
export const CLIENT_ENTRY_PATH = join(
	PACKAGE_ROOT,
	"src",
	"runtime",
	"client-entry.tsx"
)
