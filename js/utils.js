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

// 显示特定工具
export function showTool(toolName) {
  // 更新当前工具
  window.currentTool = toolName;
  
  // 显示返回按钮
  document.getElementById('back-to-home').style.display = 'flex';
  
  // 隐藏首页网格，显示工具视图
  document.getElementById('tool-homepage').style.display = 'none';
  document.getElementById('tool-view').style.display = 'block';
  
  // 显示对应的工具卡片
  document.querySelectorAll('.tool-card').forEach(card => {
    if (card.id === `${toolName}-card`) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // 工具特定的处理
  if (toolName === 'calculator') {
    document.getElementById('result').focus();
  } else if (toolName === 'unit-converter') {
    document.getElementById('unitInput').focus();
  }
}

// 返回首页
export function goBackToHome() {
  // 更新当前工具
  window.currentTool = 'home';
  
  // 隐藏返回按钮
  document.getElementById('back-to-home').style.display = 'none';
  
  // 显示首页网格，隐藏工具视图
  document.getElementById('tool-homepage').style.display = 'grid';
  document.getElementById('tool-view').style.display = 'none';
  
  // 如果有翻转的卡片，将其恢复
  document.querySelectorAll('.grid-card.flipped').forEach(card => {
    card.classList.remove('flipped');
  });
}