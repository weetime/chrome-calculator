// 全局变量
let isRadMode = true; // 默认使用弧度模式
let currentLanguage = 'en'; // 默认语言为英语

// DOM 元素
const display = document.getElementById('result');
const helpBtn = document.getElementById('helpIcon');
const keyboardHelp = document.getElementById('keyboardHelp');
const closeHelp = document.getElementById('closeHelp');
const localeSelect = document.getElementById('languageSelector');

// 当DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const display = document.getElementById('result');
  const helpBtn = document.getElementById('helpIcon');
  const keyboardHelp = document.getElementById('keyboardHelp');
  const closeHelp = document.getElementById('closeHelp');
  const localeSelect = document.getElementById('languageSelector');
  
  // 初始化国际化
  i18n.initLocale();
  currentLanguage = i18n.getCurrentLocale();
  
  // 初始化主题
  themeManager.initTheme();
  
  // 设置选择器的初始值
  localeSelect.value = currentLanguage;
  
  // 更新界面文本
  updateInterfaceTexts();
  
  // 从本地存储加载弧度/角度模式
  const savedMode = localStorage.getItem('calculatorMode');
  if (savedMode) {
    isRadMode = savedMode === 'rad';
    updateModeButtonText();
  }
  
  // 添加按钮点击事件
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      handleButtonClick(value);
    });
  });
  
  // 帮助按钮点击事件
  helpBtn.addEventListener('click', () => {
    keyboardHelp.classList.add('show');
  });
  
  // 关闭帮助按钮点击事件
  closeHelp.addEventListener('click', () => {
    keyboardHelp.classList.remove('show');
  });
  
  // 语言选择器更改事件
  localeSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    console.log('语言已切换到:', selectedLanguage);
    i18n.setLocale(selectedLanguage);
    currentLanguage = selectedLanguage;
    // 直接调用更新界面文本，避免事件通知可能不及时的问题
    updateInterfaceTexts();
  });
  
  // 监听语言变化事件
  document.addEventListener('localeChanged', function(e) {
    console.log('接收到语言变化事件:', e.detail.locale);
    updateInterfaceTexts();
  });
  
  // 初始化主题选择器
  initThemeSelector();
  
  // 添加键盘事件
  document.addEventListener('keydown', handleKeyPress);
});

// 更新界面所有文本
function updateInterfaceTexts() {
  // 更新文档标题
  document.title = i18n.getTranslation('title');
  
  // 更新所有带有data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18n.getTranslation(key);
  });
  
  // 特殊情况：模式按钮
  updateModeButtonText();
}

// 初始化主题选择器
function initThemeSelector() {
  // 获取所有主题选项
  const themeOptions = document.querySelectorAll('.theme-option');
  
  // 从主题管理器获取当前主题
  const currentTheme = themeManager.getCurrentTheme();
  
  // 标记当前活动主题
  themeOptions.forEach(option => {
    const theme = option.getAttribute('data-theme');
    if (theme === currentTheme) {
      option.classList.add('active');
    }
    
    // 添加点击事件
    option.addEventListener('click', () => {
      // 移除所有活动类
      themeOptions.forEach(opt => opt.classList.remove('active'));
      // 添加当前活动类
      option.classList.add('active');
      // 应用并保存主题
      const selectedTheme = option.getAttribute('data-theme');
      themeManager.applyTheme(selectedTheme);
    });
  });
}

// 处理按钮点击
function handleButtonClick(value) {
  switch(value) {
    case 'clear':
      clearDisplay();
      break;
    case 'equals':
      calculate();
      break;
    case 'rad_deg':
      toggleMode();
      break;
    default:
      appendToDisplay(value);
  }
}

// 处理键盘按键
function handleKeyPress(e) {
  const key = e.key;
  
  // 如果帮助面板打开，处理ESC关闭
  if (document.getElementById('keyboardHelp').classList.contains('show')) {
    if (key === 'Escape') {
      document.getElementById('keyboardHelp').classList.remove('show');
      e.preventDefault();
    }
    return;
  }
  
  // 数字和基本运算符
  if (/[\d+\-*/^.()]/.test(key)) {
    appendToDisplay(key);
    e.preventDefault();
  } 
  // 等于号和回车键
  else if (key === '=' || key === 'Enter') {
    calculate();
    e.preventDefault();
  } 
  // ESC 键清除
  else if (key === 'Escape') {
    clearDisplay();
    e.preventDefault();
  } 
  // 删除键
  else if (key === 'Backspace') {
    backspace();
    e.preventDefault();
  }
  // 三角函数和其他功能
  else if (key === 's') {
    appendToDisplay('sin');
    e.preventDefault();
  } 
  else if (key === 'c') {
    appendToDisplay('cos');
    e.preventDefault();
  } 
  else if (key === 't') {
    appendToDisplay('tan');
    e.preventDefault();
  } 
  else if (key === 'l') {
    appendToDisplay('log');
    e.preventDefault();
  } 
  else if (key === 'r') {
    appendToDisplay('sqrt');
    e.preventDefault();
  } 
  else if (key === 'd') {
    toggleMode();
    e.preventDefault();
  }
  else if (key === 'p') {
    appendToDisplay('π');
    e.preventDefault();
  }
  else if (key === 'e') {
    appendToDisplay('e');
    e.preventDefault();
  }
}

// 处理退格
function backspace() {
  const display = document.getElementById('result');
  if (display.value.length > 0) {
    display.value = display.value.slice(0, -1);
  }
}

// 向显示屏添加内容
function appendToDisplay(value) {
  const display = document.getElementById('result');
  
  // 特殊常量处理
  if (value === 'pi') {
    display.value += 'π';
  } 
  else if (value === 'e') {
    display.value += 'e';
  } 
  else {
    display.value += value;
  }
}

// 清除显示屏
function clearDisplay() {
  const display = document.getElementById('result');
  display.value = '';
}

// 计算结果
function calculate() {
  const display = document.getElementById('result');
  
  try {
    let expression = display.value;
    
    // 替换特殊字符
    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/e/g, 'Math.E');
    
    // 处理表达式
    const result = processExpression(expression);
    
    // 显示结果 (最多保留10位小数)
    display.value = Number(result.toFixed(10)).toString();
  } catch (error) {
    display.value = i18n.getTranslation('error');
  }
}

// 切换弧度/角度模式
function toggleMode() {
  isRadMode = !isRadMode;
  updateModeButtonText();
  localStorage.setItem('calculatorMode', isRadMode ? 'rad' : 'deg');
}

// 更新模式按钮文本
function updateModeButtonText() {
  const modeButton = document.querySelector('button[data-value="rad_deg"]');
  if (modeButton) {
    modeButton.textContent = isRadMode ? i18n.getTranslation('rad') : i18n.getTranslation('deg');
  }
}

// 表达式处理
function processExpression(expression) {
  // 处理隐式乘法 如 2(3) -> 2*(3)
  expression = expression.replace(/(\d+\.?\d*|\))(\()/g, '$1*$2');
  
  // 处理带括号的函数调用，如sin(90)
  expression = expression.replace(/(sin|cos|tan|log|sqrt)\(([^()]*)\)/g, (match, func, content) => {
    const innerResult = processExpression(content);
    return handleFunction(func, innerResult);
  });
  
  // 处理常规括号
  expression = expression.replace(/\(([^()]*)\)/g, (match, content) => {
    return processExpression(content);
  });
  
  // 处理剩余的函数（不带括号）
  expression = processFunctions(expression);
  
  // 处理幂运算
  expression = processExponents(expression);
  
  // 处理乘法和除法
  expression = processMultiplicationDivision(expression);
  
  // 处理加法和减法
  expression = processAdditionSubtraction(expression);
  
  return parseFloat(expression);
}

// 处理函数
function processFunctions(expression) {
  // 查找函数应用于数字，例如 sin90
  return expression.replace(/(sin|cos|tan|log|sqrt)(-?\d+\.?\d*)/g, (match, func, number) => {
    return handleFunction(func, number);
  });
}

// 处理函数应用
function handleFunction(func, value) {
  value = parseFloat(value);
  
  switch(func) {
    case 'sin':
      // 如果在角度模式下，转换为弧度
      if (!isRadMode) {
        value = value * Math.PI / 180;
      }
      return Math.sin(value);
    case 'cos':
      // 如果在角度模式下，转换为弧度
      if (!isRadMode) {
        value = value * Math.PI / 180;
      }
      return Math.cos(value);
    case 'tan':
      // 如果在角度模式下，转换为弧度
      if (!isRadMode) {
        value = value * Math.PI / 180;
      }
      return Math.tan(value);
    case 'log':
      return Math.log10(value);
    case 'sqrt':
      return Math.sqrt(value);
    default:
      return value;
  }
}

// 处理幂运算
function processExponents(expression) {
  // 匹配幂运算模式：数字^数字
  const regex = /(-?\d+\.?\d*)\^(-?\d+\.?\d*)/;
  let match = regex.exec(expression);
  
  while (match) {
    const base = parseFloat(match[1]);
    const exponent = parseFloat(match[2]);
    const power = Math.pow(base, exponent);
    
    // 替换表达式中的幂运算
    expression = expression.replace(match[0], power);
    match = regex.exec(expression);
  }
  
  return expression;
}

// 处理乘法和除法
function processMultiplicationDivision(expression) {
  // 匹配乘法和除法模式
  const regex = /(-?\d+\.?\d*)([\*\/])(-?\d+\.?\d*)/;
  let match = regex.exec(expression);
  
  while (match) {
    const num1 = parseFloat(match[1]);
    const operator = match[2];
    const num2 = parseFloat(match[3]);
    let result;
    
    if (operator === '*') {
      result = num1 * num2;
    } else if (operator === '/') {
      if (num2 === 0) throw new Error("Division by zero");
      result = num1 / num2;
    }
    
    // 替换表达式中的运算
    expression = expression.replace(match[0], result);
    match = regex.exec(expression);
  }
  
  return expression;
}

// 处理加法和减法
function processAdditionSubtraction(expression) {
  // 首先替换所有的减号为加负数
  expression = expression.replace(/([0-9.]+)-([0-9.]+)/g, "$1+-$2");
  
  // 分割成数字数组
  const numbers = expression.split('+').map(Number);
  
  // 求和
  return numbers.reduce((sum, num) => sum + num, 0);
} 