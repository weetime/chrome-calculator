// 全局变量
let isRadMode = true; // 默认使用弧度模式
let currentLanguage = 'en'; // 默认语言为英语
let currentTool = 'calculator'; // 默认工具是计算器

// 单位转换相关变量
const unitConversions = {
  length: {
    units: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
    // 所有单位转换到基本单位 (米) 的因子
    toBase: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344
    },
    // 名称翻译
    nameKeys: {
      mm: 'millimeter',
      cm: 'centimeter',
      m: 'meter',
      km: 'kilometer',
      in: 'inch',
      ft: 'foot',
      yd: 'yard',
      mi: 'mile'
    }
  },
  weight: {
    units: ['mg', 'g', 'kg', 't', 'oz', 'lb', 'st'],
    // 所有单位转换到基本单位 (克) 的因子
    toBase: {
      mg: 0.001,
      g: 1,
      kg: 1000,
      t: 1000000,
      oz: 28.3495,
      lb: 453.592,
      st: 6350.29
    },
    // 名称翻译
    nameKeys: {
      mg: 'milligram',
      g: 'gram',
      kg: 'kilogram',
      t: 'ton',
      oz: 'ounce',
      lb: 'pound',
      st: 'stone'
    }
  },
  temperature: {
    units: ['C', 'F', 'K'],
    // 温度需要特殊处理，不使用简单乘法因子
    // 名称翻译
    nameKeys: {
      C: 'celsius',
      F: 'fahrenheit',
      K: 'kelvin'
    }
  },
  area: {
    units: ['mm2', 'cm2', 'm2', 'km2', 'in2', 'ft2', 'ac', 'ha'],
    // 所有单位转换到基本单位 (平方米) 的因子
    toBase: {
      mm2: 0.000001,
      cm2: 0.0001,
      m2: 1,
      km2: 1000000,
      in2: 0.00064516,
      ft2: 0.092903,
      ac: 4046.86,
      ha: 10000
    },
    // 名称翻译
    nameKeys: {
      mm2: 'square_millimeter',
      cm2: 'square_centimeter',
      m2: 'square_meter',
      km2: 'square_kilometer',
      in2: 'square_inch',
      ft2: 'square_foot',
      ac: 'acre',
      ha: 'hectare'
    }
  },
  volume: {
    units: ['ml', 'l', 'm3', 'gal', 'pt', 'qt', 'fl_oz', 'cup'],
    // 所有单位转换到基本单位 (升) 的因子
    toBase: {
      ml: 0.001,
      l: 1,
      m3: 1000,
      gal: 3.78541,
      pt: 0.473176,
      qt: 0.946353,
      fl_oz: 0.0295735,
      cup: 0.24
    },
    // 名称翻译
    nameKeys: {
      ml: 'milliliter',
      l: 'liter',
      m3: 'cubic_meter',
      gal: 'gallon',
      pt: 'pint',
      qt: 'quart',
      fl_oz: 'fluid_ounce',
      cup: 'cup'
    }
  },
  speed: {
    units: ['m/s', 'km/h', 'mph', 'knot', 'ft/s'],
    // 所有单位转换到基本单位 (米/秒) 的因子
    toBase: {
      'm/s': 1,
      'km/h': 0.277778,
      'mph': 0.44704,
      'knot': 0.514444,
      'ft/s': 0.3048
    },
    // 名称翻译
    nameKeys: {
      'm/s': 'meter_per_second',
      'km/h': 'kilometer_per_hour',
      'mph': 'mile_per_hour',
      'knot': 'knot',
      'ft/s': 'foot_per_second'
    }
  },
  time: {
    units: ['ms', 's', 'min', 'h', 'd', 'wk', 'mo', 'yr'],
    // 所有单位转换到基本单位 (秒) 的因子
    toBase: {
      ms: 0.001,
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
      wk: 604800,
      mo: 2592000, // 平均月 (30天)
      yr: 31536000 // 普通年 (365天)
    },
    // 名称翻译
    nameKeys: {
      ms: 'millisecond',
      s: 'second',
      min: 'minute',
      h: 'hour',
      d: 'day',
      wk: 'week',
      mo: 'month',
      yr: 'year'
    }
  }
};

// 当DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const display = document.getElementById('result');
  const helpBtn = document.getElementById('helpIcon');
  const keyboardHelp = document.getElementById('keyboardHelp');
  const closeHelp = document.getElementById('closeHelp');
  const localeSelect = document.getElementById('languageSelector');
  
  // 工具导航相关元素
  const navBtns = document.querySelectorAll('.nav-btn');
  const toolCards = document.querySelectorAll('.tool-card');
  
  // 工具导航切换功能
  navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTool = this.getAttribute('data-tool');
      switchTool(targetTool);
    });
  });
  
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
    i18n.setLocale(selectedLanguage);
    currentLanguage = selectedLanguage;
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
  document.addEventListener('keydown', handleKeyPress);
  
  // 计算器加载完成后使输入框获得焦点
  display.focus();
  
  // 单位转换面板元素
  const unitInput = document.getElementById('unitInput');
  const conversionType = document.getElementById('conversionType');
  const fromUnit = document.getElementById('fromUnit');
  const toUnit = document.getElementById('toUnit');
  const swapUnits = document.getElementById('swapUnits');
  const copyResult = document.getElementById('copyResult');
  const sendToCalc = document.getElementById('sendToCalc');
  const conversionResult = document.getElementById('conversionResult');
  
  // 初始化单位转换下拉框
  initConversionSelects('length');
  
  // 单位类型变更事件
  conversionType.addEventListener('change', function() {
    const type = this.value;
    initConversionSelects(type);
    performConversion();
  });
  
  // 从/到单位变更事件
  fromUnit.addEventListener('change', performConversion);
  toUnit.addEventListener('change', performConversion);
  
  // 输入值变更事件
  unitInput.addEventListener('input', performConversion);
  
  // 交换单位按钮事件
  swapUnits.addEventListener('click', function() {
    const fromValue = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = fromValue;
    performConversion();
  });
  
  // 复制结果按钮
  copyResult.addEventListener('click', function() {
    const resultText = conversionResult.textContent;
    navigator.clipboard.writeText(resultText)
      .then(() => {
        // Visual feedback for copy success
        copyResult.textContent = '✓';
        setTimeout(() => {
          copyResult.textContent = i18n.getTranslation('copy_result');
        }, 1000);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  });
  
  // 发送到计算器按钮
  sendToCalc.addEventListener('click', function() {
    const resultText = conversionResult.textContent;
    display.value = resultText;
    switchTool('calculator');
    display.focus();
  });
  
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
      display.focus();
    }
    return;
  }
  
  // 工具切换快捷键
  if (key === '1') {
    switchTool('calculator');
    e.preventDefault();
    return;
  } else if (key === '2') {
    switchTool('unit-converter');
    e.preventDefault();
    return;
  }
  
  // 如果当前不是计算器，不处理其他键盘事件
  if (currentTool !== 'calculator') {
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

// 初始化单位转换下拉框
function initConversionSelects(type) {
  const fromUnit = document.getElementById('fromUnit');
  const toUnit = document.getElementById('toUnit');
  
  // 清空现有选项
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  
  // 获取该类型的单位
  const units = unitConversions[type].units;
  const nameKeys = unitConversions[type].nameKeys;
  
  // 填充选项
  units.forEach((unit, index) => {
    const fromOption = document.createElement('option');
    fromOption.value = unit;
    fromOption.textContent = unit + ' - ' + i18n.getTranslation(nameKeys[unit]);
    fromUnit.appendChild(fromOption);
    
    const toOption = document.createElement('option');
    toOption.value = unit;
    toOption.textContent = unit + ' - ' + i18n.getTranslation(nameKeys[unit]);
    toUnit.appendChild(toOption);
    
    // 默认选择第一个和第二个单位
    if (index === 0) fromUnit.value = unit;
    if (index === 1) toUnit.value = unit;
  });
  
  // 执行首次转换
  performConversion();
}

// 执行单位转换
function performConversion() {
  const conversionType = document.getElementById('conversionType').value;
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const inputValue = parseFloat(document.getElementById('unitInput').value) || 0;
  
  let result;
  
  // 温度需要特殊处理
  if (conversionType === 'temperature') {
    result = convertTemperature(inputValue, fromUnit, toUnit);
  } else {
    // 使用乘法因子转换其他单位类型
    const toBaseValue = inputValue * unitConversions[conversionType].toBase[fromUnit];
    result = toBaseValue / unitConversions[conversionType].toBase[toUnit];
  }
  
  // 显示结果 (最多保留10位小数)
  const formattedResult = result.toFixed(10);
  // 使用Number转换会自动去除尾随零
  document.getElementById('conversionResult').textContent = Number(formattedResult).toString();
}

// 温度转换特殊处理
function convertTemperature(value, fromUnit, toUnit) {
  // 先转换到开尔文
  let kelvin;
  
  switch (fromUnit) {
    case 'C':
      kelvin = value + 273.15;
      break;
    case 'F':
      kelvin = (value + 459.67) * (5/9);
      break;
    case 'K':
      kelvin = value;
      break;
  }
  
  // 从开尔文转换到目标单位
  switch (toUnit) {
    case 'C':
      return kelvin - 273.15;
    case 'F':
      return kelvin * (9/5) - 459.67;
    case 'K':
      return kelvin;
  }
}

// 切换工具函数
function switchTool(toolName) {
  // 更新当前工具
  currentTool = toolName;
  
  // 更新导航按钮样式
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('data-tool') === toolName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 显示对应的工具卡片
  document.querySelectorAll('.tool-card').forEach(card => {
    if (card.id === `${toolName}-card`) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
  
  // 工具特定的处理
  if (toolName === 'calculator') {
    document.getElementById('result').focus();
  } else if (toolName === 'unit-converter') {
    const unitInput = document.getElementById('unitInput');
    const display = document.getElementById('result');
    
    // 当切换到单位转换器时，如果计算器有值，则传递过来
    if (display.value) {
      try {
        // 尝试解析为数字
        const value = processExpression(display.value);
        if (!isNaN(parseFloat(value))) {
          unitInput.value = parseFloat(value);
          performConversion();
        }
      } catch (e) {
        // 无法解析为数字时，保持默认
      }
    }
    
    unitInput.focus();
  }
} 