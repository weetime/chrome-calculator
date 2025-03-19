// 全局变量
let isRadMode = true; // 默认使用弧度模式
let currentLanguage = 'en'; // 默认语言为英语

// 当DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const display = document.getElementById('result');
  const helpBtn = document.getElementById('helpIcon');
  const keyboardHelp = document.getElementById('keyboardHelp');
  const closeHelp = document.getElementById('closeHelp');
  const localeSelect = document.getElementById('languageSelector');
  
  // 启用输入框的编辑功能
  display.removeAttribute('disabled');
  display.removeAttribute('readonly'); // 完全移除readonly，以确保复制粘贴功能正常
  
  // 为输入框添加样式，使其看起来像只读
  display.classList.add('editable-input');
  
  // 确保输入框只接受有效的输入
  display.addEventListener('input', function(e) {
    // 获取当前输入值和光标位置
    const inputValue = display.value;
    const cursorPos = display.selectionStart;
    
    // 我们只需简单过滤掉完全无效的字符
    // 保留所有数字、运算符和函数名
    let filteredValue = '';
    
    for (let i = 0; i < inputValue.length; i++) {
      const char = inputValue[i];
      // 允许数字、运算符、括号、小数点、π和e常量
      if (/[0-9+\-*/^().πe]/.test(char) || char === ' ') {
        filteredValue += char;
      } 
      // 检查是否为函数开头
      else if (i + 2 < inputValue.length) {
        const threeChars = inputValue.substring(i, i + 3);
        const fourChars = inputValue.substring(i, i + 4);
        
        if (threeChars === 'sin' || threeChars === 'cos' || 
            threeChars === 'tan' || threeChars === 'log') {
          filteredValue += threeChars;
          i += 2; // 跳过已处理的字符
        } 
        else if (fourChars === 'sqrt') {
          filteredValue += 'sqrt';
          i += 3; // 跳过已处理的字符
        }
      }
    }
    
    // 如果有无效字符被过滤掉，更新输入值并保持光标位置
    if (filteredValue !== inputValue) {
      // 计算被过滤字符的数量
      const diff = inputValue.length - filteredValue.length;
      display.value = filteredValue;
      display.selectionStart = display.selectionEnd = Math.max(0, cursorPos - diff);
    }
  });
  
  // 优化粘贴事件处理
  display.addEventListener('paste', function(e) {
    // 我们不再阻止默认粘贴行为
    // 粘贴后的内容会通过input事件处理
  });
  
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
      // 点击按钮后让输入框获得焦点，便于键盘操作
      display.focus();
    });
  });
  
  // 帮助按钮点击事件
  helpBtn.addEventListener('click', () => {
    keyboardHelp.classList.add('show');
  });
  
  // 关闭帮助按钮点击事件
  closeHelp.addEventListener('click', () => {
    keyboardHelp.classList.remove('show');
    // 关闭帮助后让输入框获得焦点
    display.focus();
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
  
  // 计算器加载完成后使输入框获得焦点
  display.focus();
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
  // 对于三角函数，自动切换到度数模式
  if (value.startsWith('sin(') || value.startsWith('cos(') || value.startsWith('tan(')) {
    if (isRadMode) {
      isRadMode = false;
      updateModeButtonText();
      localStorage.setItem('calculatorMode', 'deg');
    }
  }
  
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
  const display = document.getElementById('result');
  
  // 如果帮助面板打开，处理ESC关闭
  if (document.getElementById('keyboardHelp').classList.contains('show')) {
    if (key === 'Escape') {
      document.getElementById('keyboardHelp').classList.remove('show');
      e.preventDefault();
      display.focus(); // 关闭帮助面板后让输入框获取焦点
    }
    return;
  }
  
  // 处理复制粘贴快捷键（让它们的默认行为正常进行）
  if ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'v' || key === 'x' || key === 'a')) {
    // 允许默认行为（不阻止）
    return;
  }
  
  // 处理左右光标键和Home/End键
  if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Home' || key === 'End') {
    // 允许默认光标移动行为
    return;
  }
  
  // 数字和基本运算符
  if (/[0-9]/.test(key)) {
    // 添加数字
    appendToDisplay(key);
    e.preventDefault();
  }
  else if (/[+\-*/^.()]/.test(key)) {
    // 添加运算符
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
  else if (key === 'Backspace' || key === 'Delete') {
    // 让默认行为发生
    return;
  }
  // 三角函数和其他功能，添加整个函数名，而不是单个字符
  else if (key === 's') {
    // 对于三角函数，自动切换到度数模式
    if (isRadMode) {
      isRadMode = false;
      updateModeButtonText();
      localStorage.setItem('calculatorMode', 'deg');
    }
    // 在当前光标位置插入完整的"sin("
    const cursorPos = display.selectionStart;
    const selectionEnd = display.selectionEnd;
    const currentValue = display.value;
    
    // 如果有选中文本，替换它
    if (cursorPos !== selectionEnd) {
      display.value = currentValue.substring(0, cursorPos) + 'sin(' + currentValue.substring(selectionEnd);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "sin(".length
    } else {
      // 否则在光标位置插入
      display.value = currentValue.substring(0, cursorPos) + 'sin(' + currentValue.substring(cursorPos);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "sin(".length
    }
    
    e.preventDefault();
  } 
  else if (key === 'c') {
    // 对于三角函数，自动切换到度数模式
    if (isRadMode) {
      isRadMode = false;
      updateModeButtonText();
      localStorage.setItem('calculatorMode', 'deg');
    }
    // 在当前光标位置插入完整的"cos("
    const cursorPos = display.selectionStart;
    const selectionEnd = display.selectionEnd;
    const currentValue = display.value;
    
    // 如果有选中文本，替换它
    if (cursorPos !== selectionEnd) {
      display.value = currentValue.substring(0, cursorPos) + 'cos(' + currentValue.substring(selectionEnd);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "cos(".length
    } else {
      // 否则在光标位置插入
      display.value = currentValue.substring(0, cursorPos) + 'cos(' + currentValue.substring(cursorPos);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "cos(".length
    }
    
    e.preventDefault();
  } 
  else if (key === 't') {
    // 对于三角函数，自动切换到度数模式
    if (isRadMode) {
      isRadMode = false;
      updateModeButtonText();
      localStorage.setItem('calculatorMode', 'deg');
    }
    // 在当前光标位置插入完整的"tan("
    const cursorPos = display.selectionStart;
    const selectionEnd = display.selectionEnd;
    const currentValue = display.value;
    
    // 如果有选中文本，替换它
    if (cursorPos !== selectionEnd) {
      display.value = currentValue.substring(0, cursorPos) + 'tan(' + currentValue.substring(selectionEnd);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "tan(".length
    } else {
      // 否则在光标位置插入
      display.value = currentValue.substring(0, cursorPos) + 'tan(' + currentValue.substring(cursorPos);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "tan(".length
    }
    
    e.preventDefault();
  } 
  else if (key === 'l') {
    // 在当前光标位置插入完整的"log("
    const cursorPos = display.selectionStart;
    const selectionEnd = display.selectionEnd;
    const currentValue = display.value;
    
    // 如果有选中文本，替换它
    if (cursorPos !== selectionEnd) {
      display.value = currentValue.substring(0, cursorPos) + 'log(' + currentValue.substring(selectionEnd);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "log(".length
    } else {
      // 否则在光标位置插入
      display.value = currentValue.substring(0, cursorPos) + 'log(' + currentValue.substring(cursorPos);
      display.selectionStart = display.selectionEnd = cursorPos + 4; // "log(".length
    }
    
    e.preventDefault();
  } 
  else if (key === 'r') {
    // 在当前光标位置插入完整的"sqrt("
    const cursorPos = display.selectionStart;
    const selectionEnd = display.selectionEnd;
    const currentValue = display.value;
    
    // 如果有选中文本，替换它
    if (cursorPos !== selectionEnd) {
      display.value = currentValue.substring(0, cursorPos) + 'sqrt(' + currentValue.substring(selectionEnd);
      display.selectionStart = display.selectionEnd = cursorPos + 5; // "sqrt(".length
    } else {
      // 否则在光标位置插入
      display.value = currentValue.substring(0, cursorPos) + 'sqrt(' + currentValue.substring(cursorPos);
      display.selectionStart = display.selectionEnd = cursorPos + 5; // "sqrt(".length
    }
    
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

// 向显示屏添加内容
function appendToDisplay(value) {
  const display = document.getElementById('result');
  
  // 获取当前光标位置
  const cursorPos = display.selectionStart;
  const selectionEnd = display.selectionEnd;
  
  // 如果有文本被选中，则替换选中的文本
  if (cursorPos !== selectionEnd) {
    const text = display.value;
    let newValue;
    
    // 特殊常量处理
    if (value === 'pi') {
      newValue = text.substring(0, cursorPos) + 'π' + text.substring(selectionEnd);
      // 设置新的光标位置
      const newCursorPos = cursorPos + 1;
      display.value = newValue;
      display.selectionStart = display.selectionEnd = newCursorPos;
    } 
    else if (value === 'e') {
      newValue = text.substring(0, cursorPos) + 'e' + text.substring(selectionEnd);
      // 设置新的光标位置
      const newCursorPos = cursorPos + 1;
      display.value = newValue;
      display.selectionStart = display.selectionEnd = newCursorPos;
    } 
    else {
      newValue = text.substring(0, cursorPos) + value + text.substring(selectionEnd);
      // 设置新的光标位置
      const newCursorPos = cursorPos + value.length;
      display.value = newValue;
      display.selectionStart = display.selectionEnd = newCursorPos;
    }
  } 
  else {
    // 如果没有选中文本，在光标位置插入
    const text = display.value;
    let newValue;
    
    // 特殊常量处理
    if (value === 'pi') {
      newValue = text.substring(0, cursorPos) + 'π' + text.substring(cursorPos);
      // 设置新的光标位置
      const newCursorPos = cursorPos + 1;
      display.value = newValue;
      display.selectionStart = display.selectionEnd = newCursorPos;
    } 
    else if (value === 'e') {
      newValue = text.substring(0, cursorPos) + 'e' + text.substring(cursorPos);
      // 设置新的光标位置
      const newCursorPos = cursorPos + 1;
      display.value = newValue;
      display.selectionStart = display.selectionEnd = newCursorPos;
    } 
    else {
      newValue = text.substring(0, cursorPos) + value + text.substring(cursorPos);
      // 设置新的光标位置
      const newCursorPos = cursorPos + value.length;
      display.value = newValue;
      display.selectionStart = display.selectionEnd = newCursorPos;
    }
  }
  
  // 添加内容后让输入框获得焦点
  display.focus();
}

// 清除显示屏
function clearDisplay() {
  const display = document.getElementById('result');
  display.value = '';
  display.focus(); // 清除后让输入框获得焦点
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
    if (!isNaN(parseFloat(result))) {
      const parsedResult = parseFloat(result);
      // 使用toFixed可能会有尾随零，所以先格式化，再解析回来去除不必要的零
      const formattedResult = parsedResult.toFixed(10);
      // 使用Number转换会自动去除尾随零
      display.value = Number(formattedResult).toString();
    } else {
      // 如果结果不是一个有效的数字
      display.value = i18n.getTranslation('error');
    }
  } catch (error) {
    console.error('计算错误:', error);
    display.value = i18n.getTranslation('error');
  }
  
  // 计算完成后让输入框保持焦点
  display.focus();
}

// 切换弧度/角度模式
function toggleMode() {
  isRadMode = !isRadMode;
  updateModeButtonText();
  localStorage.setItem('calculatorMode', isRadMode ? 'rad' : 'deg');
  
  // 切换模式后让输入框保持焦点
  document.getElementById('result').focus();
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
  // 先处理表达式中的空格
  expression = expression.replace(/\s+/g, '');

  // 处理隐式乘法 如 2(3) -> 2*(3) 或 )( -> )*(
  expression = expression.replace(/(\d+\.?\d*|\))(\()/g, '$1*$2');
  
  // 首先处理嵌套括号，从内到外
  let bracketRegex = /\(([^()]*)\)/g;
  while (expression.includes('(') && expression.includes(')')) {
    expression = expression.replace(bracketRegex, (match, content) => {
      // 先处理括号内的函数，如 sin(90)
      content = content.replace(/(sin|cos|tan|log|sqrt)(\d+\.?\d*)/g, (match, func, number) => {
        return handleFunction(func, parseFloat(number));
      });
      
      // 然后按顺序处理其他运算
      content = processExponents(content);
      content = processMultiplicationDivision(content);
      content = processAdditionSubtraction(content);
      
      return content;
    });
  }
  
  // 处理带括号的函数，如 sin(90)
  expression = expression.replace(/(sin|cos|tan|log|sqrt)\(([^()]*)\)/g, (match, func, content) => {
    // 进一步处理内容以确保正确计算
    const processedContent = processExpression(content);
    return handleFunction(func, parseFloat(processedContent));
  });
  
  // 处理剩余的函数（不带括号）
  expression = processFunctions(expression);
  
  // 处理幂运算
  expression = processExponents(expression);
  
  // 处理乘法和除法
  expression = processMultiplicationDivision(expression);
  
  // 处理加法和减法
  expression = processAdditionSubtraction(expression);
  
  return expression;
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
  // 匹配乘法和除法模式，确保能捕获所有有效表达式
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
  // 处理负数，确保减法操作正确解析
  // 首先替换以减号开头的情况
  if (expression.startsWith('-')) {
    expression = '0' + expression;
  }
  
  // 替换所有的减法为加法和负数
  expression = expression.replace(/(\d+\.?\d*)-(\d+\.?\d*)/g, "$1+-$2");
  
  // 分割成数字数组，过滤掉空字符串
  const numbers = expression.split('+').filter(part => part.trim() !== '').map(Number);
  
  // 求和，确保结果是数字
  const result = numbers.reduce((sum, num) => sum + num, 0);
  return result.toString();
} 