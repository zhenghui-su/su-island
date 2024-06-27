import { resolve } from 'path';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { SiteConfig, UserConfig } from '../shared/types/index';

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>);

/**
 * 用于获取用户配置文件路径
 * @param root 根目录
 */
function getUserConfigPath(root: string) {
  try {
    // 支持的配置文件格式
    const supportConfigFiles = ['config.ts', 'config.js'];
    // 找到存在的配置文件路径并返回
    const configPath = supportConfigFiles
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync);
    return configPath;
  } catch (e) {
    console.log('Failed to load user config.');
    throw e;
  }
}

/**
 * 用于解析用户配置文件
 *
 * @param root 根目录
 * @param command 'serve' | 'build'
 * @param mode 'production' | 'development'
 */
export async function resolveUserConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'production' | 'development'
) {
  // 1. 获取配置文件路径, 支持 js、ts 格式
  const configPath = getUserConfigPath(root);
  // 2. 解析配置文件
  const result = await loadConfigFromFile(
    {
      command,
      mode
    },
    configPath,
    root
  );
  if (result) {
    const { config: rawConfig = {} as RawConfig } = result;
    // 三种形式
    // 1. object
    // 2. promise
    // 3. function 返回 object或promise
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
}
/**
 * 用于处理用户传入的配置
 *
 * @param userConfig 用户配置文件
 * @returns 返回用户配置或默认内容
 */
export function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'su-island',
    description: userConfig.description || 'SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
}
/**
 * 用于处理配置文件, 返回最终的配置
 *
 * @param root 根目录
 * @param command 'serve' | 'build'
 * @param mode 'production' | 'development'
 */
export async function resolveConfig(
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
): Promise<SiteConfig> {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode);
  const siteConfig: SiteConfig = {
    root,
    configPath: configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };
  return siteConfig;
}

export function defineConfig(config: UserConfig) {
  return config;
}
