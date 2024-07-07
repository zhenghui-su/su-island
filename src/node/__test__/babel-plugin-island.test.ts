import { expect, describe, test } from 'vitest';
import babelPluginIsland from '../babel-plugin-island';
import os from 'os';
import { transformAsync, TransformOptions } from '@babel/core';
import { MASK_SPLITTER } from '../../node/constants';

const isWindows = os.platform() === 'win32';

/**
 * 测试 babel 插件转换是否正确
 */
describe('babel-plugin-su-island', () => {
  // 导入类似: import Aside from '../Comp/index';
  const ISLAND_PATH = '../Comp/index';
  // 模拟 Windows 路径
  const prefix = isWindows ? 'C:' : '';
  const IMPORTER_PATH = prefix + '/User/project/test.tsx';
  // babel 配置
  const babelOptions: TransformOptions = {
    filename: IMPORTER_PATH,
    presets: ['@babel/preset-react'],
    plugins: [babelPluginIsland]
  };
  // 测试 <A __island/>
  test('Should compile jsx identifier', async () => {
    const code = `import Aside from '${ISLAND_PATH}'; export
    default function App() { return <Aside __island />; }`;

    const result = await transformAsync(code, babelOptions);

    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });
  // 测试 <A.B __island/>
  test('Should compile jsx identifier', async () => {
    const code = `import A from '${ISLAND_PATH}'; export
      default function App() { return <A.B __island />; }`;

    const result = await transformAsync(code, babelOptions);

    expect(result?.code).toContain(
      `__island: "${ISLAND_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`
    );
  });
});
