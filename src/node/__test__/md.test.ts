import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { describe, test, expect } from 'vitest';
import { rehypePluginPreWrapper } from '../../node/plugin-mdx/rehypePlugins/preWrapper';

// markdown语法编译测试
describe('Markdown complie cases', async () => {
  const processor = unified();

  processor
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypePluginPreWrapper);
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
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre><code class=\\"\\">console.log(123);
      </code></pre></div>"
    `);
  });
});
