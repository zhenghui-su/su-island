import { Root } from 'mdast';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import Slugger from 'github-slugger';
import { parse } from 'acorn';
import { MdxjsEsm, Program } from 'mdast-util-mdxjs-esm/lib';

interface TocItem {
  id: string;
  // 文本
  text: string;
  // 节点深度
  depth: number;
}

interface ChildNode {
  type: 'link' | 'text' | 'inlineCode';
  value?: string;
  children?: ChildNode[];
}

/**
 * 用于mdx的remark阶段生成内容大纲, 即页面右侧的大纲
 */
export const remarkPluginToc: Plugin<[], Root> = () => {
  return (tree) => {
    const toc: TocItem[] = [];
    // 每次编译时都重新进行实例的初始化
    const slugger = new Slugger();
    let title = '';
    // 遍历所有标题
    visit(tree, 'heading', (node) => {
      if (!node.depth || !node.children?.length) {
        return;
      }
      if (node.depth === 1) {
        // 拿到h1, 将其设置为页面的title
        title = (node.children[0] as ChildNode).value;
      }
      // 摘取所有 h2 ~ h4 的标题节点
      if (node.depth > 1 && node.depth < 5) {
        // node.children 是一个数组，包含几种情况:
        // 1. 文本节点，如 '## title'
        // 结构如下:
        // {
        //   type: 'text',
        //   value: 'title'
        // }
        // 2. 链接节点，如 '## [title](/path)'
        // 结构如下:
        // {
        //   type: 'link',
        //     {
        //       type: 'text',
        //       value: 'title'
        //     }
        //   ]
        // }
        // 3. 内联代码节点，如 '## `title`'
        // 结构如下:
        // {
        //   type: 'inlineCode',
        //   value: 'title'
        // }
        const originalText = (node.children as ChildNode[])
          .map((child) => {
            switch (child.type) {
              case 'link':
                return child.children?.map((c) => c.value).join('');
              default:
                return child.value;
            }
          })
          .join('');
        // 对标题文本进行规范化
        const id = slugger.slug(originalText);
        toc.push({
          id,
          text: originalText,
          depth: node.depth
        });
      }
    });
    // 注入一行 export const toc = []
    const insertedCode = `export const toc = ${JSON.stringify(toc, null, 2)}`;

    // 插入到ast
    tree.children.push({
      type: 'mdxjsEsm',
      value: insertedCode,
      data: {
        estree: parse(insertedCode, {
          ecmaVersion: 2020,
          sourceType: 'module'
        }) as unknown as Program
      }
    } as MdxjsEsm);
    // 注入title
    if (title) {
      const insertedTitle = `export const title = '${title}';`;

      tree.children.push({
        type: 'mdxjsEsm',
        value: insertedTitle,
        data: {
          estree: parse(insertedTitle, {
            ecmaVersion: 2020,
            sourceType: 'module'
          }) as unknown as Program
        }
      } as MdxjsEsm);
    }
  };
};
