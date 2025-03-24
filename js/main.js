// main.js - 主入口文件
import { updateInterfaceTexts, initThemeSelector, showTool, goBackToHome } from './utils.js';
import { initCalculator, handleKeyPress, getCurrentValue } from './calculator/calculator.js';
import { initUnitConverter } from './unit-converter/unit-converter.js';

// 全局变量
window.currentTool = 'home'; // 默认视图是首页
window.currentLanguage = 'en'; // 默认语言为英语

// 当DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const helpBtn = document.getElementById('helpIcon');
  const keyboardHelp = document.getElementById('keyboardHelp');
  const closeHelp = document.getElementById('closeHelp');
  const localeSelect = document.getElementById('languageSelector');
  const backButton = document.getElementById('back-to-home');
  
  // 工具网格卡片
  const gridCards = document.querySelectorAll('.grid-card:not(.coming-soon)');
  
  // 卡片点击事件 - 点击显示对应工具
  gridCards.forEach(card => {
    card.addEventListener('click', function() {
      const targetTool = this.getAttribute('data-tool');
      showTool(targetTool);
    });
  });
  
  // 返回按钮点击事件
  backButton.addEventListener('click', goBackToHome);
  
  // 初始化国际化
  i18n.initLocale();
  window.currentLanguage = i18n.getCurrentLocale();
  
  // 初始化主题
  themeManager.initTheme();
  
  // 设置选择器的初始值
  localeSelect.value = window.currentLanguage;
  
  // 更新界面文本
  updateInterfaceTexts();
  
  // 初始化计算器模块
  initCalculator();
  
  // 初始化单位转换模块
  initUnitConverter();
  
  // 帮助按钮点击事件
  helpBtn.addEventListener('click', () => {
    keyboardHelp.classList.add('show');
  });
  
  // 关闭帮助按钮点击事件
  closeHelp.addEventListener('click', () => {
    keyboardHelp.classList.remove('show');
    // 关闭帮助后让输入框获得焦点（如果在工具页面）
    if (currentTool === 'calculator') {
      document.getElementById('result').focus();
    } else if (currentTool === 'unit-converter') {
      document.getElementById('unitInput').focus();
    }
  });
  
  // 语言选择器更改事件
  localeSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    i18n.setLocale(selectedLanguage);
    window.currentLanguage = selectedLanguage;
    // 直接调用更新界面文本，避免事件通知可能不及时的问题
    updateInterfaceTexts();
  });
  
  // 监听语言变化事件
  document.addEventListener('localeChanged', function(e) {
    updateInterfaceTexts();
  });
  
  // 初始化主题选择器
  initThemeSelector();
  
  // 添加键盘事件
  document.addEventListener('keydown', handleKeyboardEvents);
  
  // 初始化磁吸效果
  initMagneticEffect();
});

// 处理全局键盘事件
function handleKeyboardEvents(e) {
  const key = e.key;
  const isCommandOrCtrl = e.metaKey || e.ctrlKey; // macOS 用 Command，Windows 用 Ctrl
  
  // 工具切换快捷键 - 使用 Command/Ctrl + 数字
  if (isCommandOrCtrl) {
    if (key === '1') {
      showTool('calculator');
      e.preventDefault();
      return;
    } else if (key === '2') {
      showTool('unit-converter');
      e.preventDefault();
      return;
    } else if (key === 'h' || key === 'H') {
      // 添加返回首页的快捷键
      goBackToHome();
      e.preventDefault();
      return;
    }
  }
  
  // ESC 键可以返回首页
  if (key === 'Escape' && currentTool !== 'home') {
    goBackToHome();
    e.preventDefault();
    return;
  }
  
  // 其他键盘事件只在特定工具激活时传递
  if (currentTool === 'calculator') {
    handleKeyPress(e);
  }
}

// 初始化卡片磁吸效果
function initMagneticEffect() {
  const cards = document.querySelectorAll('.grid-card:not(.coming-soon)');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // 计算鼠标位置相对于卡片中心的偏移
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // 计算偏移量，限制倾斜角度
      const maxTilt = 10; // 最大倾斜角度
      const tiltX = ((y - centerY) / centerY) * maxTilt;
      const tiltY = ((centerX - x) / centerX) * maxTilt;
      
      // 应用变换效果
      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      // 鼠标离开时恢复原状
      this.style.transform = '';
    });
  });
}