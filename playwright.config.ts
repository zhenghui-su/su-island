import type { PlaywrightTestConfig } from '@playwright/test';

// 1. 创建测试项目
// 2. 启动测试项目
// 3. 开启无头浏览器进行访问

const config: PlaywrightTestConfig = {
  testDir: './e2e', // 测试目录
  timeout: 50000, // 超时时间
  webServer: {
    url: 'http://localhost:5173', // 开启的服务地址
    command: 'pnpm prepare:e2e' // 脚本命令
  },
  use: {
    headless: true // 没有 ui 界面的无头浏览器
  }
};

export default config;
