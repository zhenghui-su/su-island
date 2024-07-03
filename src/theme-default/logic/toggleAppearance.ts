const classList = document.documentElement.classList;

const APPEARANCE_KEY = 'appearance';

const setClassList = (isDark = false) => {
  if (isDark) {
    classList.add('dark');
  } else {
    classList.remove('dark');
  }
};
const updateAppearance = () => {
  const userPreference = localStorage.getItem(APPEARANCE_KEY);
  setClassList(userPreference === 'dark');
};

// 通过取localStorage来跳过下面的toggle逻辑
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  updateAppearance();
  // 监听localStorage变化
  // 如果用户开了两个标签页, 处在暗黑, 然后有一个标签页切换到白天, 那么另一页也切换
  window.addEventListener('storage', updateAppearance);
}
/**
 * 切换主题逻辑
 */
export function toggle() {
  if (classList.contains('dark')) {
    setClassList(false);
    localStorage.setItem(APPEARANCE_KEY, 'light');
  } else {
    setClassList(true);
    localStorage.setItem(APPEARANCE_KEY, 'dark');
  }
}
