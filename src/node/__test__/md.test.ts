import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { describe, test, expect } from 'vitest';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';
import { rehypePluginShiki } from '../plugin-mdx/rehypePlugins/shiki';
import shiki from 'shiki';
import { remarkPluginToc } from '../plugin-mdx/remarkPlugins/toc';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';

// markdown语法编译测试
describe('Markdown complie cases', async () => {
  const processor = unified();

  processor
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'nord' })
    });
  // 测试编译标题
  test('Compile title', async () => {
    const mdTitle = '# 123';
    const result = processor.processSync(mdTitle);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });
  // 测试编译代码块
  test('Compile code', async () => {
    const mdCode = 'I am using `su-island.js`';
    const result = processor.processSync(mdCode);
    expect(result.value).toMatchInlineSnapshot(
      '"<p>I am using <code>su-island.js</code></p>"'
    );
  });
  // 测试编译大代码块
  test('Compile code block', async () => {
    const mdCodeBlock = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdCodeBlock);
    // 结构应该如下
    // <div class="language-js">
    //   <span class="lang">js</span>
    //   <pre><code>...</code></pre>
    // </div>
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre class=\\"shiki\\" style=\\"background-color: #2e3440ff\\"><code><span class=\\"line\\"><span style=\\"color: #D8DEE9\\">console</span><span style=\\"color: #ECEFF4\\">.</span><span style=\\"color: #88C0D0\\">log</span><span style=\\"color: #D8DEE9FF\\">(</span><span style=\\"color: #B48EAD\\">123</span><span style=\\"color: #D8DEE9FF\\">)</span><span style=\\"color: #81A1C1\\">;</span></span>
      <span class=\\"line\\"></span></code></pre></div>"
    `);
  });
  // 测试编译Toc 即大纲
  test('Compile Toc', async () => {
    const remarkProcessor = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkPluginToc)
      .use(remarkStringify);

    const mdTitle = '## title `xxx` [link](/path)';
    const result = remarkProcessor.processSync(mdTitle);
    expect(result.value.toString().replace(mdTitle, '')).toMatchInlineSnapshot(`
      "

      export const toc = [
        {
          \\"id\\": \\"title-xxx-link\\",
          \\"text\\": \\"title xxx link\\",
          \\"depth\\": 2
        }
      ]
      "
    `);
  });
});
