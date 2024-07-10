import { RouteService } from './RouteService';
import { describe, expect, test } from 'vitest';
import path from 'path';
import { normalizePath } from 'vite';

describe('RouteService', async () => {
  const testDir = normalizePath(path.join(__dirname, 'fixtures'));
  const routeService = new RouteService(testDir);
  await routeService.init();
  // 测试扫描目录生成的路由信息
  test('conventional route by file structure', async () => {
    const routeMeta = routeService.getRouteMeta().map((item) => ({
      ...item,
      absolutePath: item.absolutePath.replace(testDir, 'TEST_DIR')
    }));
    expect(routeMeta).toMatchInlineSnapshot(`
      [
        {
          "absolutePath": "TEST_DIR/a.mdx",
          "routePath": "/a",
        },
        {
          "absolutePath": "TEST_DIR/guide/index.mdx",
          "routePath": "/guide/",
        },
      ]
    `);
  });
  // 测试生成的路由routes
  test('Generate routes code', async () => {
    expect(routeService.generateRoutesCode().replaceAll(testDir, 'TEST_DIR'))
      .toMatchInlineSnapshot(`
      "
      import React from 'react';
      import loadable from \\"@loadable/component\\";
      const Route0 = loadable(() => import('TEST_DIR/a.mdx'));
      const Route1 = loadable(() => import('TEST_DIR/guide/index.mdx'));
      export const routes = [
        { path: '/a', element: React.createElement(Route0), preload: () => import('TEST_DIR/a.mdx') },
      { path: '/guide/', element: React.createElement(Route1), preload: () => import('TEST_DIR/guide/index.mdx') }
      ];
      "
    `);
  });
});
