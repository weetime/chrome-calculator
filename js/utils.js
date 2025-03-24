// 通用工具函数

// 导出函数
export function updateInterfaceTexts() {
  // 更新文档标题
  document.title = i18n.getTranslation('title');
  
  // 更新所有带有data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18n.getTranslation(key);
  });
}

// 初始化主题选择器
export function initThemeSelector() {
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

// 工具切换函数
export function switchTool(toolName, calculatorValue = null) {
  // 更新当前工具
  window.currentTool = toolName;
  
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
    
    // 当切换到单位转换器时，如果计算器有值，则传递过来
    if (calculatorValue) {
      try {
        // 尝试解析为数字
        if (!isNaN(parseFloat(calculatorValue))) {
          unitInput.value = parseFloat(calculatorValue);
          // 如果单位转换模块已加载，执行转换
          if (typeof performConversion === 'function') {
            performConversion();
          }
        }
      } catch (e) {
        // 无法解析为数字时，保持默认
      }
    }
    
    unitInput.focus();
  }
}