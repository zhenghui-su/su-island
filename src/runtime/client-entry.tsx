import { createRoot } from 'react-dom/client';
import { App } from './App';

function renderInBrower() {
  // 根元素
  const containerEl = document.getElementById('root');
  if (!containerEl) {
    throw new Error('#root element not found');
  }

  createRoot(containerEl).render(<App />);
}

renderInBrower();
