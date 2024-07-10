import { test, expect } from '@playwright/test';

const siteUrl = 'http://localhost:5173';

test('Verify that the page renders properly', async ({ page }) => {
  await page.goto(siteUrl);
  // 所有网络请求处理完成之后
  await page.waitForLoadState('networkidle');
  const res = await page.evaluate(async () => {
    const pageContent = document.body.innerText;
    return pageContent.includes('Hello');
  });
  expect(res).toBe(true);
});
