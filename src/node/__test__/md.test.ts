import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { describe, test, expect } from 'vitest';

// markdown语法编译测试
describe('Markdown complie cases', async () => {
  const processor = unified();

  processor.use(remarkParse).use(remarkRehype).use(rehypeStringify);
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
});
