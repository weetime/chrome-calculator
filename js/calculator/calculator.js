// 计算器功能模块

// 全局变量
let isRadMode = true; // 默认使用弧度模式

// 初始化计算器模块
export function initCalculator() {
  const display = document.getElementById('result');
  
  // 从本地存储加载弧度/角度模式
  const savedMode = localStorage.getItem('calculatorMode');
  if (savedMode) {
    isRadMode = savedMode === 'rad';
    updateModeButtonText();
  }
  
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
    
    // 过滤掉完全无效的字符，保留所有数字、运算符和函数名
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
  
  // 添加按钮点击事件
  document.querySelectorAll('#calculator-card button').forEach(button => {
    button.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      handleButtonClick(value);
      // 点击按钮后让输入框获得焦点
      display.focus();
    });
  });
  
  // 让计算器输入框获得焦点
  display.focus();
}

// 处理按钮点击
export function handleButtonClick(value) {
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
export function handleKeyPress(e) {
  const key = e.key;
  const display = document.getElementById('result');
  
  // 如果帮助面板打开，处理ESC关闭
  if (document.getElementById('keyboardHelp').classList.contains('show')) {
    if (key === 'Escape') {
      document.getElementById('keyboardHelp').classList.remove('show');
      e.preventDefault();
      display.focus();
    }
    return;
  }
  
  // 如果当前不是计算器，不处理其他键盘事件
  if (window.currentTool !== 'calculator') {
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
    insertFunctionAtCursor('sin(', true);
    e.preventDefault();
  } 
  else if (key === 'c') {
    insertFunctionAtCursor('cos(', true);
    e.preventDefault();
  } 
  else if (key === 't') {
    insertFunctionAtCursor('tan(', true);
    e.preventDefault();
  } 
  else if (key === 'l') {
    insertFunctionAtCursor('log(', false);
    e.preventDefault();
  } 
  else if (key === 'r') {
    insertFunctionAtCursor('sqrt(', false);
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

// 在光标位置插入函数
function insertFunctionAtCursor(funcStr, switchToDegree) {
  const display = document.getElementById('result');
  
  // 对于三角函数，自动切换到度数模式
  if (switchToDegree && isRadMode) {
    isRadMode = false;
    updateModeButtonText();
    localStorage.setItem('calculatorMode', 'deg');
  }
  
  // 在当前光标位置插入函数
  const cursorPos = display.selectionStart;
  const selectionEnd = display.selectionEnd;
  const currentValue = display.value;
  
  // 如果有选中文本，替换它
  if (cursorPos !== selectionEnd) {
    display.value = currentValue.substring(0, cursorPos) + funcStr + currentValue.substring(selectionEnd);
  } else {
    // 否则在光标位置插入
    display.value = currentValue.substring(0, cursorPos) + funcStr + currentValue.substring(cursorPos);
  }
  
  // 将光标放在函数括号内
  display.selectionStart = display.selectionEnd = cursorPos + funcStr.length;
}

// 向显示屏添加内容
export function appendToDisplay(value) {
  const display = document.getElementById('result');
  
  // 确保光标位置正常工作
  const cursorPos = display.selectionStart;
  const currentValue = display.value;
  
  // 对于常量按钮，特殊处理
  if (value === 'pi') {
    // 在光标位置插入π
    display.value = currentValue.substring(0, cursorPos) + 'π' + currentValue.substring(cursorPos);
    display.selectionStart = display.selectionEnd = cursorPos + 1;
  }
  else if (value === 'e') {
    // 在光标位置插入e
    display.value = currentValue.substring(0, cursorPos) + 'e' + currentValue.substring(cursorPos);
    display.selectionStart = display.selectionEnd = cursorPos + 1;
  }
  else {
    // 在光标位置插入普通值
    display.value = currentValue.substring(0, cursorPos) + value + currentValue.substring(cursorPos);
    display.selectionStart = display.selectionEnd = cursorPos + value.length;
  }
  
  // 添加内容后让输入框获得焦点
  display.focus();
}

// 清除显示屏
export function clearDisplay() {
  const display = document.getElementById('result');
  display.value = '';
  display.focus(); // 清除后让输入框获得焦点
}

// 计算结果
export function calculate() {
  const display = document.getElementById('result');
  
  try {
    let expression = display.value;
    
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
export function toggleMode() {
  isRadMode = !isRadMode;
  updateModeButtonText();
  localStorage.setItem('calculatorMode', isRadMode ? 'rad' : 'deg');
  
  // 切换模式后让输入框保持焦点
  document.getElementById('result').focus();
}

// 更新模式按钮文本
export function updateModeButtonText() {
  const modeButton = document.querySelector('button[data-value="rad_deg"]');
  if (modeButton) {
    modeButton.textContent = isRadMode ? i18n.getTranslation('rad') : i18n.getTranslation('deg');
  }
}

// 表达式处理
export function processExpression(expression) {
  // 先处理表达式中的空格
  expression = expression.replace(/\s+/g, '');

  // 替换特殊字符为数值
  expression = expression.replace(/π/g, Math.PI.toString());
  expression = expression.replace(/e/g, Math.E.toString());

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

// 获取当前计算器值
export function getCurrentValue() {
  const display = document.getElementById('result');
  if (!display.value) return null;
  
  try {
    const value = processExpression(display.value);
    if (!isNaN(parseFloat(value))) {
      return parseFloat(value);
    }
  } catch (e) {
    // 处理异常
  }
  
  return null;
}