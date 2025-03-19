// i18n.js - 国际化语言支持

// 支持的语言列表
const supportedLocales = ['en', 'zh', 'es', 'fr', 'ja'];

// 默认语言
let currentLocale = 'en';

// 语言包
const translations = {
  // 英语 (English)
  'en': {
    // 界面文本
    'title': 'Scientific Calculator',
    'rad_deg': 'Rad|Deg',
    'rad': 'Rad',
    'deg': 'Deg',
    'clear': 'C',
    // 帮助面板
    'help_title': 'Keyboard Shortcuts',
    'help_close': '×',
    'basic_operations': 'Basic Operations',
    'functions_constants': 'Functions & Constants',
    'control_keys': 'Control Keys',
    'special_notes': 'Special Notes',
    // 基本操作
    'numbers': 'Numbers',
    'decimal_point': 'Decimal point',
    'addition': 'Addition',
    'subtraction': 'Subtraction',
    'multiplication': 'Multiplication',
    'division': 'Division',
    'exponentiation': 'Exponentiation',
    'parentheses': 'Parentheses',
    // 函数与常数
    'sine_function': 'Sine function (sin)',
    'cosine_function': 'Cosine function (cos)',
    'tangent_function': 'Tangent function (tan)',
    'logarithm_function': 'Logarithm function (log)',
    'sqrt_function': 'Square root function (sqrt)',
    'pi_constant': 'π constant',
    'e_constant': 'e constant',
    'toggle_rad_deg': 'Toggle Radian/Degree mode',
    // 控制键
    'calculate_result': 'Calculate result',
    'clear_display': 'Clear display',
    'delete_last': 'Delete last character',
    // 特别说明
    'auto_switch_deg': 'When using trigonometric functions (sin, cos, tan), the calculator automatically switches to degree mode',
    'manual_toggle': 'Use the key to toggle between Radian and Degree modes anytime',
    // 错误信息
    'error': 'Error',
    // 语言选择
    'language': 'Language'
  },
  
  // 中文 (Chinese)
  'zh': {
    // 界面文本
    'title': '科学计算器',
    'rad_deg': '弧度|角度',
    'rad': '弧度',
    'deg': '角度',
    'clear': '清除',
    // 帮助面板
    'help_title': '键盘快捷键',
    'help_close': '×',
    'basic_operations': '基本操作',
    'functions_constants': '函数与常数',
    'control_keys': '控制键',
    'special_notes': '特别说明',
    // 基本操作
    'numbers': '数字',
    'decimal_point': '小数点',
    'addition': '加法',
    'subtraction': '减法',
    'multiplication': '乘法',
    'division': '除法',
    'exponentiation': '幂运算',
    'parentheses': '括号',
    // 函数与常数
    'sine_function': '正弦函数 (sin)',
    'cosine_function': '余弦函数 (cos)',
    'tangent_function': '正切函数 (tan)',
    'logarithm_function': '对数函数 (log)',
    'sqrt_function': '平方根函数 (sqrt)',
    'pi_constant': 'π 常数',
    'e_constant': 'e 常数',
    'toggle_rad_deg': '切换弧度/角度模式',
    // 控制键
    'calculate_result': '计算结果',
    'clear_display': '清除显示',
    'delete_last': '删除最后一个字符',
    // 特别说明
    'auto_switch_deg': '使用三角函数(sin, cos, tan)时，计算器会自动切换到角度(Deg)模式',
    'manual_toggle': '使用键可以随时在弧度(Rad)和角度(Deg)模式之间切换',
    // 错误信息
    'error': '错误',
    // 语言选择
    'language': '语言'
  },
  
  // 西班牙语 (Spanish)
  'es': {
    // 界面文本
    'title': 'Calculadora Científica',
    'rad_deg': 'Rad|Grados',
    'rad': 'Rad',
    'deg': 'Grados',
    'clear': 'C',
    // 帮助面板
    'help_title': 'Atajos de Teclado',
    'help_close': '×',
    'basic_operations': 'Operaciones Básicas',
    'functions_constants': 'Funciones y Constantes',
    'control_keys': 'Teclas de Control',
    'special_notes': 'Notas Especiales',
    // 基本操作
    'numbers': 'Números',
    'decimal_point': 'Punto decimal',
    'addition': 'Suma',
    'subtraction': 'Resta',
    'multiplication': 'Multiplicación',
    'division': 'División',
    'exponentiation': 'Potenciación',
    'parentheses': 'Paréntesis',
    // 函数与常数
    'sine_function': 'Función seno (sin)',
    'cosine_function': 'Función coseno (cos)',
    'tangent_function': 'Función tangente (tan)',
    'logarithm_function': 'Función logaritmo (log)',
    'sqrt_function': 'Función raíz cuadrada (sqrt)',
    'pi_constant': 'Constante π',
    'e_constant': 'Constante e',
    'toggle_rad_deg': 'Alternar modo Radián/Grados',
    // 控制键
    'calculate_result': 'Calcular resultado',
    'clear_display': 'Borrar pantalla',
    'delete_last': 'Borrar último carácter',
    // 特别说明
    'auto_switch_deg': 'Al usar funciones trigonométricas (sin, cos, tan), la calculadora cambia automáticamente al modo de grados',
    'manual_toggle': 'Use la tecla para alternar entre los modos Radián y Grados en cualquier momento',
    // 错误信息
    'error': 'Error',
    // 语言选择
    'language': 'Idioma'
  },
  
  // 法语 (French)
  'fr': {
    // 界面文本
    'title': 'Calculatrice Scientifique',
    'rad_deg': 'Rad|Deg',
    'rad': 'Rad',
    'deg': 'Deg',
    'clear': 'C',
    // 帮助面板
    'help_title': 'Raccourcis Clavier',
    'help_close': '×',
    'basic_operations': 'Opérations de Base',
    'functions_constants': 'Fonctions et Constantes',
    'control_keys': 'Touches de Contrôle',
    'special_notes': 'Notes Spéciales',
    // 基本操作
    'numbers': 'Chiffres',
    'decimal_point': 'Point décimal',
    'addition': 'Addition',
    'subtraction': 'Soustraction',
    'multiplication': 'Multiplication',
    'division': 'Division',
    'exponentiation': 'Exponentielle',
    'parentheses': 'Parenthèses',
    // 函数与常数
    'sine_function': 'Fonction sinus (sin)',
    'cosine_function': 'Fonction cosinus (cos)',
    'tangent_function': 'Fonction tangente (tan)',
    'logarithm_function': 'Fonction logarithme (log)',
    'sqrt_function': 'Fonction racine carrée (sqrt)',
    'pi_constant': 'Constante π',
    'e_constant': 'Constante e',
    'toggle_rad_deg': 'Basculer entre les modes Radian/Degré',
    // 控制键
    'calculate_result': 'Calculer le résultat',
    'clear_display': 'Effacer l\'affichage',
    'delete_last': 'Supprimer le dernier caractère',
    // 特别说明
    'auto_switch_deg': 'Lors de l\'utilisation des fonctions trigonométriques (sin, cos, tan), la calculatrice passe automatiquement en mode degrés',
    'manual_toggle': 'Utilisez la touche pour basculer entre les modes Radian et Degré à tout moment',
    // 错误信息
    'error': 'Erreur',
    // 语言选择
    'language': 'Langue'
  },
  
  // 日语 (Japanese)
  'ja': {
    // 界面文本
    'title': '科学電卓',
    'rad_deg': 'ラジアン|度',
    'rad': 'ラジアン',
    'deg': '度',
    'clear': 'C',
    // 帮助面板
    'help_title': 'キーボードショートカット',
    'help_close': '×',
    'basic_operations': '基本操作',
    'functions_constants': '関数と定数',
    'control_keys': 'コントロールキー',
    'special_notes': '特記事項',
    // 基本操作
    'numbers': '数字',
    'decimal_point': '小数点',
    'addition': '足し算',
    'subtraction': '引き算',
    'multiplication': '掛け算',
    'division': '割り算',
    'exponentiation': '累乗',
    'parentheses': '括弧',
    // 函数与常数
    'sine_function': '正弦関数 (sin)',
    'cosine_function': '余弦関数 (cos)',
    'tangent_function': '正接関数 (tan)',
    'logarithm_function': '対数関数 (log)',
    'sqrt_function': '平方根関数 (sqrt)',
    'pi_constant': 'π定数',
    'e_constant': 'e定数',
    'toggle_rad_deg': 'ラジアン/度モード切替',
    // 控制键
    'calculate_result': '結果を計算',
    'clear_display': 'ディスプレイをクリア',
    'delete_last': '最後の文字を削除',
    // 特别说明
    'auto_switch_deg': '三角関数(sin、cos、tan)を使用すると、電卓は自動的に度モードに切り替わります',
    'manual_toggle': 'キーを使用して、いつでもラジアンモードと度モードを切り替えることができます',
    // 错误信息
    'error': 'エラー',
    // 语言选择
    'language': '言語'
  }
};

// 获取翻译
function getTranslation(key) {
  if (translations[currentLocale] && translations[currentLocale][key]) {
    return translations[currentLocale][key];
  }
  
  // 回退到英语
  if (translations['en'] && translations['en'][key]) {
    return translations['en'][key];
  }
  
  // 最后回退到键名本身
  return key;
}

// 设置当前语言
function setLocale(locale) {
  if (supportedLocales.includes(locale)) {
    currentLocale = locale;
    // 存储用户语言选择
    localStorage.setItem('calculator_locale', locale);
    // 更新UI
    updateUI();
    return true;
  }
  return false;
}

// 获取当前语言
function getCurrentLocale() {
  return currentLocale;
}

// 获取所有支持的语言
function getSupportedLocales() {
  return supportedLocales;
}

// 初始化语言 - 从本地存储或浏览器设置获取
function initLocale() {
  const savedLocale = localStorage.getItem('calculator_locale');
  if (savedLocale && supportedLocales.includes(savedLocale)) {
    currentLocale = savedLocale;
  } else {
    // 尝试从浏览器获取语言设置
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
      const langCode = browserLang.split('-')[0]; // 获取语言代码，如 'en-US' -> 'en'
      if (supportedLocales.includes(langCode)) {
        currentLocale = langCode;
      }
    }
  }
  return currentLocale;
}

// 更新UI语言
function updateUI() {
  // 这个函数将在主JS文件中实现
  // 触发自定义事件
  const event = new CustomEvent('localeChanged', { detail: { locale: currentLocale } });
  document.dispatchEvent(event);
}

// 导出函数
window.i18n = {
  getTranslation,
  setLocale,
  getCurrentLocale,
  getSupportedLocales,
  initLocale,
  updateUI
}; 