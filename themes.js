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
    selectText: '#333'
  },
  
  // 暗色主题 (Dark Mode)
  'dark': {
    name: 'dark',
    bg: 'linear-gradient(145deg, #2d3436, #222831)',
    displayBg: 'rgba(35, 40, 45, 0.9)',
    textColor: '#e0e0e0',
    titleColor: '#e0e0e0',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(255, 255, 255, 0.1), inset -1px -1px 1px rgba(0, 0, 0, 0.3)',
    innerShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.3)',
    // 按钮颜色
    numBtnBg: 'linear-gradient(145deg, #3a4149, #2a2e33)',
    numBtnText: '#e0e0e0',
    operationBtnBg: 'linear-gradient(145deg, #ff7b00, #e86a10)',
    operationBtnText: 'white',
    functionBtnBg: 'linear-gradient(145deg, #0984e3, #0670c4)',
    functionBtnText: 'white',
    equalsBtnBg: 'linear-gradient(145deg, #00b894, #00a382)',
    equalsBtnText: 'white',
    // 帮助相关
    helpBg: 'rgba(35, 40, 45, 0.97)',
    headerBg: 'rgba(35, 40, 45, 0.95)',
    sectionHeaderColor: '#0984e3',
    helpTextColor: '#e0e0e0',
    dividerColor: 'rgba(255, 255, 255, 0.1)',
    keyBg: 'linear-gradient(145deg, #3a4149, #2a2e33)',
    keyBorder: 'rgba(255, 255, 255, 0.1)',
    keyText: '#e0e0e0',
    // 语言选择器
    selectBg: '#2a2e33',
    selectBorder: 'rgba(255, 255, 255, 0.15)',
    selectText: '#e0e0e0'
  },
  
  // 蓝色主题 (Blue Ocean)
  'blue': {
    name: 'blue',
    bg: 'linear-gradient(145deg, #aee1f9, #89c5e2)',
    displayBg: 'rgba(255, 255, 255, 0.9)',
    textColor: '#194866',
    titleColor: '#194866',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), inset 1px 1px 1px rgba(255, 255, 255, 0.8), inset -1px -1px 1px rgba(0, 0, 0, 0.05)',
    innerShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    // 按钮颜色
    numBtnBg: 'linear-gradient(145deg, #e0f4ff, #c0dcf0)',
    numBtnText: '#194866',
    operationBtnBg: 'linear-gradient(145deg, #3498db, #2980b9)',
    operationBtnText: 'white',
    functionBtnBg: 'linear-gradient(145deg, #40739e, #2c5282)',
    functionBtnText: 'white',
    equalsBtnBg: 'linear-gradient(145deg, #0abde3, #0a98c2)',
    equalsBtnText: 'white',
    // 帮助相关
    helpBg: 'rgba(255, 255, 255, 0.97)',
    headerBg: 'rgba(222, 242, 255, 0.9)',
    sectionHeaderColor: '#2980b9',
    helpTextColor: '#194866',
    dividerColor: 'rgba(25, 72, 102, 0.1)',
    keyBg: 'linear-gradient(145deg, #e0f4ff, #c0dcf0)',
    keyBorder: 'rgba(25, 72, 102, 0.1)',
    keyText: '#194866',
    // 语言选择器
    selectBg: '#fff',
    selectBorder: 'rgba(25, 72, 102, 0.15)',
    selectText: '#194866'
  },
  
  // 粉色主题 (Pink Candy)
  'pink': {
    name: 'pink',
    bg: 'linear-gradient(145deg, #ffdee9, #fabfcd)',
    displayBg: 'rgba(255, 255, 255, 0.9)',
    textColor: '#86435a',
    titleColor: '#86435a',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), inset 1px 1px 1px rgba(255, 255, 255, 0.8), inset -1px -1px 1px rgba(0, 0, 0, 0.05)',
    innerShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    // 按钮颜色
    numBtnBg: 'linear-gradient(145deg, #fff0f5, #fde2eb)',
    numBtnText: '#86435a',
    operationBtnBg: 'linear-gradient(145deg, #fd79a8, #e84393)',
    operationBtnText: 'white',
    functionBtnBg: 'linear-gradient(145deg, #d980fa, #b23aee)',
    functionBtnText: 'white',
    equalsBtnBg: 'linear-gradient(145deg, #ff9ff3, #f368e0)',
    equalsBtnText: 'white',
    // 帮助相关
    helpBg: 'rgba(255, 255, 255, 0.97)',
    headerBg: 'rgba(255, 240, 245, 0.9)',
    sectionHeaderColor: '#e84393',
    helpTextColor: '#86435a',
    dividerColor: 'rgba(134, 67, 90, 0.1)',
    keyBg: 'linear-gradient(145deg, #fff0f5, #fde2eb)',
    keyBorder: 'rgba(134, 67, 90, 0.1)',
    keyText: '#86435a',
    // 语言选择器
    selectBg: '#fff',
    selectBorder: 'rgba(134, 67, 90, 0.15)',
    selectText: '#86435a'
  },
  
  // 绿色主题 (Forest Green)
  'green': {
    name: 'green',
    bg: 'linear-gradient(145deg, #c3e6cb, #a5d2b1)',
    displayBg: 'rgba(255, 255, 255, 0.9)',
    textColor: '#2c5c3c',
    titleColor: '#2c5c3c',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), inset 1px 1px 1px rgba(255, 255, 255, 0.8), inset -1px -1px 1px rgba(0, 0, 0, 0.05)',
    innerShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
    // 按钮颜色
    numBtnBg: 'linear-gradient(145deg, #e8f6ee, #d1e7da)',
    numBtnText: '#2c5c3c',
    operationBtnBg: 'linear-gradient(145deg, #6ab04c, #519e2d)',
    operationBtnText: 'white',
    functionBtnBg: 'linear-gradient(145deg, #78e08f, #55bd77)',
    functionBtnText: 'white',
    equalsBtnBg: 'linear-gradient(145deg, #38ada9, #2c8a87)',
    equalsBtnText: 'white',
    // 帮助相关
    helpBg: 'rgba(255, 255, 255, 0.97)',
    headerBg: 'rgba(232, 246, 238, 0.9)',
    sectionHeaderColor: '#519e2d',
    helpTextColor: '#2c5c3c',
    dividerColor: 'rgba(44, 92, 60, 0.1)',
    keyBg: 'linear-gradient(145deg, #e8f6ee, #d1e7da)',
    keyBorder: 'rgba(44, 92, 60, 0.1)',
    keyText: '#2c5c3c',
    // 语言选择器
    selectBg: '#fff',
    selectBorder: 'rgba(44, 92, 60, 0.15)',
    selectText: '#2c5c3c'
  },
  
  // 黑色火焰主题 (Black Flame)
  'blackFlame': {
    name: 'blackFlame',
    bg: 'linear-gradient(145deg, #121212, #000000)',
    displayBg: 'rgba(18, 18, 18, 0.9)',
    textColor: '#ff6b08',
    titleColor: '#ff6b08',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 1px 1px 1px rgba(255, 255, 255, 0.05), inset -1px -1px 1px rgba(0, 0, 0, 0.5)',
    innerShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.5)',
    // 按钮颜色
    numBtnBg: 'linear-gradient(145deg, #1e1e1e, #121212)',
    numBtnText: '#e0e0e0',
    operationBtnBg: 'linear-gradient(145deg, #ff6b08, #ff4500)',
    operationBtnText: 'white',
    functionBtnBg: 'linear-gradient(145deg, #404040, #2a2a2a)',
    functionBtnText: '#ff6b08',
    equalsBtnBg: 'linear-gradient(145deg, #ff4500, #ff0000)',
    equalsBtnText: 'white',
    // 帮助相关
    helpBg: 'rgba(18, 18, 18, 0.97)',
    headerBg: 'rgba(18, 18, 18, 0.95)',
    sectionHeaderColor: '#ff6b08',
    helpTextColor: '#e0e0e0',
    dividerColor: 'rgba(255, 255, 255, 0.1)',
    keyBg: 'linear-gradient(145deg, #1e1e1e, #121212)',
    keyBorder: 'rgba(255, 107, 8, 0.3)',
    keyText: '#e0e0e0',
    // 语言选择器
    selectBg: '#121212',
    selectBorder: 'rgba(255, 107, 8, 0.3)',
    selectText: '#e0e0e0'
  }
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
  
  // 触发主题变更事件
  const event = new CustomEvent('themeChanged', { detail: { theme: themeName } });
  document.dispatchEvent(event);
  
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

// 导出主题函数
window.themeManager = {
  initTheme,
  applyTheme,
  getCurrentTheme,
  getAvailableThemes
}; 