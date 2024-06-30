import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Text, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import shiki from 'shiki';

interface Options {
  highlighter: shiki.Highlighter;
}
/**
 * rehype插件-用于代码高亮
 */
export const rehypePluginShiki: Plugin<[Options], Root> = ({ highlighter }) => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // 1. 找到 pre 元素
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0]?.tagName === 'code'
      ) {
        // 2. 获取语法名称和代码内容
        // 代码块节点
        const codeNode = node.children[0];
        // 获取代码内容
        const codeContent = (codeNode.children[0] as Text).value;
        const codeClassName = codeNode.properties?.className?.toString() || '';
        // 获取语法名称
        const lang = codeClassName?.split('-')[1];
        if (!lang) {
          return;
        }
        // 3. 使用shiki高亮代码
        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });
        // 4. 转为 ast
        const fragmentAst = fromHtml(highlightedCode, { fragment: true });
        // 5. 替换原来的代码块节点
        parent.children.splice(index, 1, ...fragmentAst.children);
      }
    });
  };
};
