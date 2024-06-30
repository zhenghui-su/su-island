import { Plugin } from 'vite';
import pluginMdx from '@mdx-js/rollup';
import remarkGFM from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import remarkPluginFrontmatter from 'remark-frontmatter';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import { rehypePluginShiki } from './rehypePlugins/shiki';
import shiki from 'shiki';
import { remarkPluginToc } from './remarkPlugins/toc';

/**
 * @mdx-js/rollup 插件
 */
export async function pluginMdxRollup(): Promise<Plugin> {
  return pluginMdx({
    remarkPlugins: [
      remarkGFM,
      remarkPluginFrontmatter,
      // 在编译产物中根据元信息生成代码
      /**
       * ---
       * title = 'su-island'
       * ---
       * 会生成 export const title = 'su-island'
       * name 表示将所有字段收敛到 frontmatter 对象上
       */
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
      remarkPluginToc
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        // 自动生成头部a标签锚点
        rehypeAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        {
          highlighter: await shiki.getHighlighter({ theme: 'nord' })
        }
      ]
    ]
  });
}
