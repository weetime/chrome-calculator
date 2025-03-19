document.addEventListener('DOMContentLoaded', function() {
  const result = document.getElementById('result');
  let currentInput = '';
  let isInRadianMode = true;

  // Add event listeners to all buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

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
    radDegButton.textContent = isInRadianMode ? 'Rad' : 'Deg';
  }

  function handleFunction(func) {
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
      result.value = 'Error';
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
  radDegButton.textContent = isInRadianMode ? 'Rad' : 'Deg';
}); 