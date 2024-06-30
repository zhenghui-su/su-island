import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

/**
 * 用于改变md中大代码块编译结果的插件
 */
export const rehypePluginPreWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // 使其符合如下形式
      // 默认编译结果<pre><code>...</code></pre>
      // <div class="language-js">
      //    <span class="lang"> js </span>
      //    <pre><code>...</code></pre>
      // </div>
      // 1. 找到 pre 元素
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'code' &&
        !node.data?.isVisited
      ) {
        // code 元素
        const codeNode = node.children[0];
        // code 类名 如 language-js
        const codeClassName = codeNode.properties?.className?.toString() || '';
        // 语法名称
        const lang = codeClassName.split('-')[1];

        codeNode.properties.className = '';

        const cloneNode: Element = {
          type: 'element',
          tagName: 'pre',
          children: node.children,
          data: {
            isVisited: true
          }
        };
        // 将最外层变为div
        node.tagName = 'div';
        node.properties = node.properties || {};
        node.properties.className = codeClassName;

        node.children = [
          // span元素插入
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang'
            },
            children: [
              {
                type: 'text',
                value: lang
              }
            ]
          },
          cloneNode
        ];
      }
    });
  };
};
