import pluginMdx from '@mdx-js/rollup';
import remarkGFM from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import remarkPluginFrontmatter from 'remark-frontmatter';

/**
 * @mdx-js/rollup 插件
 */
export function pluginMdxRollup() {
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
      [remarkPluginMDXFrontMatter, { name: 'frontmatter' }]
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
      ]
    ]
  });
}
