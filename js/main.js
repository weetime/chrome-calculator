// main.js - 主入口文件
import { updateInterfaceTexts, initThemeSelector, switchTool } from './utils.js';
import { initCalculator, handleKeyPress, getCurrentValue } from './calculator/calculator.js';
import { initUnitConverter } from './unit-converter/unit-converter.js';

// 全局变量
window.currentTool = 'calculator'; // 默认工具是计算器
window.currentLanguage = 'en'; // 默认语言为英语

// 当DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const helpBtn = document.getElementById('helpIcon');
  const keyboardHelp = document.getElementById('keyboardHelp');
  const closeHelp = document.getElementById('closeHelp');
  const localeSelect = document.getElementById('languageSelector');
  
  // 工具导航相关元素
  const navBtns = document.querySelectorAll('.nav-btn');
  
  // 工具导航切换功能
  navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTool = this.getAttribute('data-tool');
      if (targetTool === 'unit-converter' && currentTool === 'calculator') {
        // 从计算器切换到单位转换器时，尝试传递值
        const calcValue = getCurrentValue();
        switchTool(targetTool, calcValue);
      } else {
        switchTool(targetTool);
      }
    });
  });
  
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
    // 关闭帮助后让输入框获得焦点
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
});

// 处理全局键盘事件
function handleKeyboardEvents(e) {
  const key = e.key;
  const isCommandOrCtrl = e.metaKey || e.ctrlKey; // macOS 用 Command，Windows 用 Ctrl
  
  // 工具切换快捷键 - 使用 Command/Ctrl + 数字
  if (isCommandOrCtrl) {
    if (key === '1') {
      switchTool('calculator');
      e.preventDefault();
      return;
    } else if (key === '2') {
      // 从计算器切换到单位转换器时，尝试传递值
      if (currentTool === 'calculator') {
        const calcValue = getCurrentValue();
        switchTool('unit-converter', calcValue);
      } else {
        switchTool('unit-converter');
      }
      e.preventDefault();
      return;
    }
  }
  
  // 将其他键盘事件传递给计算器模块
  handleKeyPress(e);
}