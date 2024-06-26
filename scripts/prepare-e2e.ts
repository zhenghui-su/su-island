import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');

// 根目录
const ROOT = path.resolve(__dirname, '..');
const defaultOptions = {
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};
async function prepareE2E() {
  // 判断产物是否存在, 不存在就 build
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    // pnpm build
    execa.commandSync('pnpm build', {
      cwd: ROOT,
      ...defaultOptions
    });
  }
  // 下载无头浏览器
  execa.commandSync('npx playwright install', {
    cwd: ROOT,
    ...defaultOptions
  });

  // 启动
  execa.commandSync('pnpm dev', {
    cwd: exampleDir,
    ...defaultOptions
  });
}

prepareE2E();
