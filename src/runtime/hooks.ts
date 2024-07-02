import { createContext, useContext } from 'react';
import { PageData } from 'shared/types';

/**
 * 页面数据上下文
 */
export const DataContext = createContext({} as PageData);
/**
 * 使用页面数据上下文
 */
export const usePageData = () => {
  return useContext(DataContext);
};
