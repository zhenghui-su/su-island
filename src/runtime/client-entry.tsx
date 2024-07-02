import { createRoot } from 'react-dom/client';
import { App, initPageData } from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './hooks';

async function renderInBrower() {
  // 根元素
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }
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
}

renderInBrower();
