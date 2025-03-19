document.addEventListener('DOMContentLoaded', function() {
  const result = document.getElementById('result');
  let currentInput = '';
  let isInRadianMode = true;

  // 初始化国际化
  i18n.initLocale();
  
  // 更新 UI 文本
  updateUITranslations();
  
  // 设置语言选择器的当前值
  const localeSelect = document.getElementById('locale-select');
  localeSelect.value = i18n.getCurrentLocale();
  
  // 绑定语言选择器变化事件
  localeSelect.addEventListener('change', function() {
    i18n.setLocale(this.value);
    // UI 更新由 i18n.setLocale 内部的事件监听器处理
  });
  
  // 监听语言变化事件
  document.addEventListener('localeChanged', function(e) {
    updateUITranslations();
  });
  
  // 更新 UI 文本的函数
  function updateUITranslations() {
    // 更新文档标题
    document.title = i18n.getTranslation('title');
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18n.getTranslation(key);
    });
    
    // 特殊情况：Rad/Deg 按钮
    const radDegButton = document.querySelector('[data-value="rad_deg"]');
    radDegButton.textContent = isInRadianMode ? i18n.getTranslation('rad') : i18n.getTranslation('deg');
  }

  // Add event listeners to all buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

  // Add keyboard event listener
  document.addEventListener('keydown', handleKeyPress);
  
  // Help button functionality
  const helpIcon = document.getElementById('helpIcon');
  const keyboardHelp = document.getElementById('keyboardHelp');
  const closeHelp = document.getElementById('closeHelp');
  
  // Show help panel when clicking the help icon
  helpIcon.addEventListener('click', function() {
    keyboardHelp.classList.add('show');
  });
  
  // Hide help panel when clicking the close button
  closeHelp.addEventListener('click', function() {
    keyboardHelp.classList.remove('show');
  });
  
  // Hide help panel when pressing Escape while it's open
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && keyboardHelp.classList.contains('show')) {
      keyboardHelp.classList.remove('show');
      e.stopPropagation(); // Prevent the calculator clear action
    }
  });

  // Handle keyboard input
  function handleKeyPress(e) {
    // Skip handling keyboard input if help is shown
    if (keyboardHelp.classList.contains('show')) {
      return;
    }
    
    e.preventDefault(); // Prevent default action for some keys

    // Numbers, decimal point, operators
    if (/^[0-9.+\-*/()^]$/.test(e.key)) {
      appendToDisplay(e.key);
    } 
    // Enter key for equals
    else if (e.key === 'Enter') {
      calculateResult();
    } 
    // Backspace for deleting last character
    else if (e.key === 'Backspace') {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        result.value = currentInput;
      }
    } 
    // Escape key for clear
    else if (e.key === 'Escape') {
      clearDisplay();
    }
    // Function keys
    else if (e.key === 's') {
      // 自动切换到度数模式
      switchToDegreeMode();
      handleFunction('sin');
    }
    else if (e.key === 'c') {
      // 自动切换到度数模式
      switchToDegreeMode();
      handleFunction('cos');
    }
    else if (e.key === 't') {
      // 自动切换到度数模式
      switchToDegreeMode();
      handleFunction('tan');
    }
    else if (e.key === 'l') {
      handleFunction('log');
    }
    else if (e.key === 'r') {
      handleFunction('sqrt');
    }
    // Toggle Radian/Degree with 'd'
    else if (e.key === 'd') {
      toggleRadianDegree();
    }
    // Pi with 'p'
    else if (e.key === 'p') {
      appendToDisplay(Math.PI);
    }
    // e with 'e'
    else if (e.key === 'e') {
      appendToDisplay(Math.E);
    }
  }

  function handleButtonClick(e) {
    const value = e.target.getAttribute('data-value');
    
    if (value === 'clear') {
      clearDisplay();
    } else if (value === 'equals') {
      calculateResult();
    } else if (value === 'rad_deg') {
      toggleRadianDegree();
    } else if (value === 'sin' || value === 'cos' || value === 'tan' || value === 'log' || value === 'sqrt') {
      handleFunction(value);
    } else if (value === 'pi') {
      appendToDisplay(Math.PI);
    } else if (value === 'e') {
      appendToDisplay(Math.E);
    } else if (value === 'power') {
      appendToDisplay('^');
    } else {
      appendToDisplay(value);
    }
  }

  function appendToDisplay(value) {
    currentInput += value;
    result.value = currentInput;
  }

  function clearDisplay() {
    currentInput = '';
    result.value = '';
  }

  function toggleRadianDegree() {
    isInRadianMode = !isInRadianMode;
    const radDegButton = document.querySelector('[data-value="rad_deg"]');
    radDegButton.textContent = isInRadianMode ? i18n.getTranslation('rad') : i18n.getTranslation('deg');
  }

  // 对于三角函数的辅助函数，用于自动切换到度数模式
  function switchToDegreeMode() {
    if (isInRadianMode) {
      isInRadianMode = false;
      const radDegButton = document.querySelector('[data-value="rad_deg"]');
      radDegButton.textContent = i18n.getTranslation('deg');
    }
  }

  function handleFunction(func) {
    // 对于三角函数，自动切换到度数模式
    if ((func === 'sin' || func === 'cos' || func === 'tan') && isInRadianMode) {
      switchToDegreeMode();
    }
    
    switch (func) {
      case 'sin':
        appendToDisplay('sin(');
        break;
      case 'cos':
        appendToDisplay('cos(');
        break;
      case 'tan':
        appendToDisplay('tan(');
        break;
      case 'log':
        appendToDisplay('log(');
        break;
      case 'sqrt':
        appendToDisplay('sqrt(');
        break;
    }
  }

  function calculateResult() {
    try {
      // Create a safe expression parser instead of using eval
      let expression = currentInput;
      
      // Process parentheses and operations correctly
      const calculatedResult = processExpression(expression);
      
      // Format the result (limit decimal places for readability)
      let formattedResult;
      if (typeof calculatedResult === 'number') {
        // Limit to 10 decimal places and remove trailing zeros
        formattedResult = parseFloat(calculatedResult.toFixed(10)).toString();
      } else {
        formattedResult = calculatedResult;
      }
      
      // Update the display
      result.value = formattedResult;
      currentInput = formattedResult;
    } catch (error) {
      result.value = i18n.getTranslation('error');
      currentInput = '';
      console.error('Calculation error:', error);
    }
  }
  
  // Safely process and evaluate mathematical expressions
  function processExpression(expr) {
    // Replace scientific functions and constants
    expr = expr.replace(/(\d+\.?\d*|\))(\()/g, '$1*$2'); // Implicit multiplication e.g. 2(3) -> 2*(3)
    
    // Handle functions with parentheses like sin(90)
    const funcParenPattern = /(sin|cos|tan|log|sqrt)\(([^()]*)\)/g;
    while (funcParenPattern.test(expr)) {
      expr = expr.replace(funcParenPattern, function(match, func, innerExpr) {
        // Process the inner expression first
        const innerResult = processExpression(innerExpr);
        const value = parseFloat(innerResult);
        
        // Apply the appropriate function
        switch(func) {
          case 'sin':
            const sinAngle = isInRadianMode ? value : (value * Math.PI / 180);
            return Math.sin(sinAngle);
          case 'cos':
            const cosAngle = isInRadianMode ? value : (value * Math.PI / 180);
            return Math.cos(cosAngle);
          case 'tan':
            const tanAngle = isInRadianMode ? value : (value * Math.PI / 180);
            return Math.tan(tanAngle);
          case 'log':
            return Math.log10(value);
          case 'sqrt':
            return Math.sqrt(value);
        }
      });
    }
    
    // Handle regular parentheses
    while (expr.includes('(') && expr.includes(')')) {
      const lastOpenParenIndex = expr.lastIndexOf('(');
      const closeParenIndex = expr.indexOf(')', lastOpenParenIndex);
      
      if (lastOpenParenIndex !== -1 && closeParenIndex !== -1) {
        const subExpr = expr.substring(lastOpenParenIndex + 1, closeParenIndex);
        const subResult = processExpression(subExpr);
        expr = expr.substring(0, lastOpenParenIndex) + subResult + expr.substring(closeParenIndex + 1);
      } else {
        break; // Mismatched parentheses
      }
    }
    
    // Process functions (for any direct function applications like sin90)
    expr = processFunctions(expr);
    
    // Process exponents (^)
    expr = processExponents(expr);
    
    // Process multiplication and division
    expr = processMultiplicationDivision(expr);
    
    // Process addition and subtraction
    expr = processAdditionSubtraction(expr);
    
    return expr;
  }
  
  function processFunctions(expr) {
    // Handle sin, cos, tan, log, sqrt functions
    let result = expr;
    
    // Find functions applied to numbers (e.g. sin90 or numbers left after parentheses processing)
    const funcPattern = /(sin|cos|tan|log|sqrt)(-?\d+\.?\d*)/g;
    
    result = result.replace(funcPattern, function(match, func, num) {
      const value = parseFloat(num);
      
      switch(func) {
        case 'sin':
          const sinAngle = isInRadianMode ? value : (value * Math.PI / 180);
          return Math.sin(sinAngle);
        case 'cos':
          const cosAngle = isInRadianMode ? value : (value * Math.PI / 180);
          return Math.cos(cosAngle);
        case 'tan':
          const tanAngle = isInRadianMode ? value : (value * Math.PI / 180);
          return Math.tan(tanAngle);
        case 'log':
          return Math.log10(value);
        case 'sqrt':
          return Math.sqrt(value);
      }
    });
    
    return result;
  }
  
  function processExponents(expr) {
    // Process exponents (^)
    const expRegex = /(-?\d+\.?\d*)\^(-?\d+\.?\d*)/;
    let result = expr;
    
    while (expRegex.test(result)) {
      result = result.replace(expRegex, function(match, base, exponent) {
        return Math.pow(parseFloat(base), parseFloat(exponent));
      });
    }
    
    return result;
  }
  
  function processMultiplicationDivision(expr) {
    // Process multiplication and division
    const multDivRegex = /(-?\d+\.?\d*)([\*\/])(-?\d+\.?\d*)/;
    let result = expr;
    
    while (multDivRegex.test(result)) {
      result = result.replace(multDivRegex, function(match, a, op, b) {
        if (op === '*') {
          return parseFloat(a) * parseFloat(b);
        } else if (op === '/') {
          return parseFloat(a) / parseFloat(b);
        }
      });
    }
    
    return result;
  }
  
  function processAdditionSubtraction(expr) {
    // Process addition and subtraction
    // First, make sure subtraction is handled correctly for negative numbers
    let result = expr.replace(/([+\-\*\/])-/g, '$1-');
    
    // Handle addition and subtraction
    const addSubRegex = /(-?\d+\.?\d*)([+\-])(-?\d+\.?\d*)/;
    
    while (addSubRegex.test(result)) {
      result = result.replace(addSubRegex, function(match, a, op, b) {
        if (op === '+') {
          return parseFloat(a) + parseFloat(b);
        } else if (op === '-') {
          return parseFloat(a) - parseFloat(b);
        }
      });
    }
    
    return result;
  }
  
  // Initialize rad/deg button state
  const radDegButton = document.querySelector('[data-value="rad_deg"]');
  radDegButton.textContent = isInRadianMode ? i18n.getTranslation('rad') : i18n.getTranslation('deg');
}); 