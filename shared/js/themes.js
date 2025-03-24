// themes.js - 主题切换功能

// 定义主题
const themes = {
  // 默认浅色主题 (Neo Neumorphism)
  'light': {
    name: 'light',
    bg: 'linear-gradient(145deg, #f5f7fa, #e3e6ec)',
    displayBg: 'rgba(255, 255, 255, 0.9)',
    textColor: '#333',
    titleColor: '#444',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), inset 1px 1px 1px rgba(255, 255, 255, 0.8), inset -1px -1px 1px rgba(0, 0, 0, 0.05)',
    innerShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    // 按钮颜色
    numBtnBg: 'linear-gradient(145deg, #f8f9fa, #dee0e3)',
    numBtnText: '#333',
    operationBtnBg: 'linear-gradient(145deg, #ffbc5b, #f09c38)',
    operationBtnText: 'white',
    functionBtnBg: 'linear-gradient(145deg, #64c6e6, #4aa5c1)',
    functionBtnText: 'white',
    equalsBtnBg: 'linear-gradient(145deg, #6bd66c, #4bb04c)',
    equalsBtnText: 'white',
    // 帮助相关
    helpBg: 'rgba(255, 255, 255, 0.97)',
    headerBg: 'rgba(245, 247, 250, 0.8)',
    sectionHeaderColor: '#4aa5c1',
    helpTextColor: '#444',
    dividerColor: 'rgba(0, 0, 0, 0.1)',
    keyBg: 'linear-gradient(145deg, #f8f9fa, #dee0e3)',
    keyBorder: 'rgba(0, 0, 0, 0.1)',
    keyText: '#333',
    // 语言选择器
    selectBg: '#fff',
    selectBorder: 'rgba(0, 0, 0, 0.1)',
    selectText: '#333',
    // 工具导航相关
    navBtnBg: 'linear-gradient(145deg, #f8f9fa, #dee0e3)',
    navBtnText: '#333',
    navBtnActiveBg: 'linear-gradient(145deg, #64c6e6, #4aa5c1)',
    navBtnActiveText: 'white',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    cardHeaderColor: '#4aa5c1',
  },
  // 其他主题...
};

// 保存当前主题名称
let currentTheme = 'light';

// 获取保存的主题
function initTheme() {
  const savedTheme = localStorage.getItem('calculatorTheme');
  if (savedTheme && themes[savedTheme]) {
    currentTheme = savedTheme;
  }
  applyTheme(currentTheme);
  return currentTheme;
}

// 应用主题
function applyTheme(themeName) {
  if (!themes[themeName]) {
    console.error(`Theme "${themeName}" not found`);
    return false;
  }
  
  const theme = themes[themeName];
  currentTheme = themeName;
  
  // 保存主题选择
  localStorage.setItem('calculatorTheme', themeName);
  
  // 创建根样式变量
  const root = document.documentElement;
  
  // 设置主题变量
  root.style.setProperty('--bg', theme.bg);
  root.style.setProperty('--display-bg', theme.displayBg);
  root.style.setProperty('--text-color', theme.textColor);
  root.style.setProperty('--title-color', theme.titleColor);
  root.style.setProperty('--box-shadow', theme.boxShadow);
  root.style.setProperty('--inner-shadow', theme.innerShadow);
  
  // 按钮颜色
  root.style.setProperty('--num-btn-bg', theme.numBtnBg);
  root.style.setProperty('--num-btn-text', theme.numBtnText);
  root.style.setProperty('--operation-btn-bg', theme.operationBtnBg);
  root.style.setProperty('--operation-btn-text', theme.operationBtnText);
  root.style.setProperty('--function-btn-bg', theme.functionBtnBg);
  root.style.setProperty('--function-btn-text', theme.functionBtnText);
  root.style.setProperty('--equals-btn-bg', theme.equalsBtnBg);
  root.style.setProperty('--equals-btn-text', theme.equalsBtnText);
  
  // 帮助相关
  root.style.setProperty('--help-bg', theme.helpBg);
  root.style.setProperty('--header-bg', theme.headerBg);
  root.style.setProperty('--section-header-color', theme.sectionHeaderColor);
  root.style.setProperty('--help-text-color', theme.helpTextColor);
  root.style.setProperty('--divider-color', theme.dividerColor);
  root.style.setProperty('--key-bg', theme.keyBg);
  root.style.setProperty('--key-border', theme.keyBorder);
  root.style.setProperty('--key-text', theme.keyText);
  
  // 语言选择器
  root.style.setProperty('--select-bg', theme.selectBg);
  root.style.setProperty('--select-border', theme.selectBorder);
  root.style.setProperty('--select-text', theme.selectText);
  
  // 工具导航相关
  root.style.setProperty('--nav-btn-bg', theme.navBtnBg);
  root.style.setProperty('--nav-btn-text', theme.navBtnText);
  root.style.setProperty('--nav-btn-active-bg', theme.navBtnActiveBg);
  root.style.setProperty('--nav-btn-active-text', theme.navBtnActiveText);
  root.style.setProperty('--card-bg', theme.cardBg);
  root.style.setProperty('--card-header-color', theme.cardHeaderColor);
  
  return true;
}

// 获取当前主题
function getCurrentTheme() {
  return currentTheme;
}

// 获取所有可用主题
function getAvailableThemes() {
  return Object.keys(themes);
}

// 导出函数
window.themeManager = {
  initTheme,
  applyTheme,
  getCurrentTheme,
  getAvailableThemes
};