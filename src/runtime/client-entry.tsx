import { createRoot, hydrateRoot } from 'react-dom/client';
import { App, initPageData } from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './hooks';
import { ComponentType } from 'react';

declare global {
  interface Window {
    ISLANDS: Record<string, ComponentType<unknown>>;
    ISLAND_PROPS: unknown[];
  }
}

async function renderInBrower() {
  // 根元素
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  if (import.meta.env.DEV) {
    // 初始化页面数据
    const pageData = await initPageData(location.pathname);
    // 渲染页面
    createRoot(containerEl).render(
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    );
  } else {
    // 生产环境用islands架构
    const islands = document.querySelectorAll('[__island]');
    if (islands.length === 0) {
      return;
    }
    for (const island of islands) {
      // Aside:0
      const [id, index] = island.getAttribute('__island').split(':');
      const Element = window.ISLANDS[id] as ComponentType<unknown>;
      hydrateRoot(island, <Element {...window.ISLAND_PROPS[index]} />);
    }
  }
}

renderInBrower();
