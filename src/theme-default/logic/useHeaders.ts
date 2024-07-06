import { useState, useEffect } from 'react';
import { Header } from '../../shared/types/index';

/**
 * 用于监听mdx文件大纲改变时的hmr的hooks
 */
export function useHeaders(initHeaders: Header[]) {
  const [headers, setHeaders] = useState(initHeaders);

  useEffect(() => {
    if (import.meta.env.DEV) {
      if (import.meta.hot) {
        import.meta.hot.on(
          'mdx-changed',
          ({ filePath }: { filePath: string }) => {
            // console.log('更新的文件路径: ', filePath);
            const origin = window.location.origin;
            const path = `${origin}/${filePath.slice(-20)}`;
            const updatePath = `${path}?import&t=${Date.now()}`;
            import(/* @vite-ignore */ updatePath).then((module) => {
              setHeaders(module.toc);
            });
          }
        );
      }
    }
  });
  return headers;
}
