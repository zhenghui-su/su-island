import { createServer as createViteDevServer } from "vite"
/**
 * 用于创建开发服务器
 *
 * @param root 当前工作目录
 * @returns 开发服务器
 */
export async function createDevServer(root: string) {
	return createViteDevServer({
		root,
	})
}
