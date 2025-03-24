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
    'toolset_title': 'Tool Suite',
    'calculator': 'Calculator',
    'calculator_tool': 'Calculator',
    'calculator_description': 'Scientific calculator with keyboard shortcuts',
    'unit_converter': 'Unit Converter',
    'unit_converter_tool': 'Unit Converter',
    'unit_converter_description': 'Convert between different units of measurement',
    'coming_soon': 'Coming Soon',
    'coming_soon_description': 'More tools are on the way',
    'back_to_home': 'Back',
    'tools': 'Tools',
    'switch_to_calculator': 'Switch to Calculator (Cmd+1/Ctrl+1)',
    'switch_to_unit_converter': 'Switch to Unit Converter (Cmd+2/Ctrl+2)',
    'copy_result': 'Copy',
    'send_to_calc': 'Send to Calculator',
    'rad_deg': 'Rad|Deg',
    'rad': 'Rad',
    'deg': 'Deg',
    'clear': 'C',
    // 帮助面板
    'help_title': 'Help & Settings',
    'help_close': '×',
    'basic_operations': 'Basic Operations',
    'functions_constants': 'Functions & Constants',
    'control_keys': 'Keyboard Shortcuts',
    'special_notes': 'Special Notes',
    // 基本操作
    'numbers': 'Numbers',
    'decimal_point': 'Decimal point',
    'addition': 'Addition',
    'subtraction': 'Subtraction',
    'multiplication': 'Multiplication',
    'division': 'Division',
    'exponentiation': 'Power',
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
    'calculate_result': 'Calculate',
    'clear_display': 'Clear',
    'delete_last': 'Delete last character',
    // 特别说明
    'auto_switch_deg': 'When using trigonometric functions (sin, cos, tan), the calculator automatically switches to degree mode',
    'manual_toggle': 'Use the key to toggle between Radian and Degree modes anytime',
    // 错误信息
    'error': 'Error',
    // 语言选择
    'language': 'Language',
    'theme': 'Theme',
    // 单位转换
    'unit_conversion': 'Units',
    'unit_conversion_title': 'Unit Conversion',
    'length': 'Length',
    'weight': 'Weight',
    'temperature': 'Temperature',
    'area': 'Area',
    'volume': 'Volume',
    'speed': 'Speed',
    'time': 'Time',
    'from': 'From:',
    'to': 'To:',
    'apply_result': 'Apply',
    'open_unit_conversion': 'Open unit conversion panel',
    // 单位
    // 长度
    'millimeter': 'millimeter',
    'centimeter': 'centimeter',
    'meter': 'meter',
    'kilometer': 'kilometer',
    'inch': 'inch',
    'foot': 'foot',
    'yard': 'yard',
    'mile': 'mile',
    
    // 重量
    'milligram': 'milligram',
    'gram': 'gram',
    'kilogram': 'kilogram',
    'ton': 'ton',
    'ounce': 'ounce',
    'pound': 'pound',
    'stone': 'stone',
    
    // 温度
    'celsius': 'Celsius',
    'fahrenheit': 'Fahrenheit',
    'kelvin': 'Kelvin',
    
    // 面积
    'square_millimeter': 'square millimeter',
    'square_centimeter': 'square centimeter',
    'square_meter': 'square meter',
    'square_kilometer': 'square kilometer',
    'square_inch': 'square inch',
    'square_foot': 'square foot',
    'acre': 'acre',
    'hectare': 'hectare',
    
    // 体积
    'milliliter': 'milliliter',
    'liter': 'liter',
    'cubic_meter': 'cubic meter',
    'gallon': 'gallon',
    'pint': 'pint',
    'quart': 'quart',
    'fluid_ounce': 'fluid ounce',
    'cup': 'cup',
    
    // 速度
    'meter_per_second': 'meter per second',
    'kilometer_per_hour': 'kilometer per hour',
    'mile_per_hour': 'mile per hour',
    'knot': 'knot',
    'foot_per_second': 'foot per second',
    
    // 时间
    'millisecond': 'millisecond',
    'second': 'second',
    'minute': 'minute',
    'hour': 'hour',
    'day': 'day',
    'week': 'week',
    'month': 'month',
    'year': 'year'
  },
  
  // 中文 (Chinese)
  'zh': {
    // 界面文本
    'title': '科学计算器',
    'toolset_title': '工具集',
    'calculator': '计算器',
    'calculator_tool': '计算器',
    'calculator_description': '带有键盘快捷键的科学计算器',
    'unit_converter': '单位转换器',
    'unit_converter_tool': '单位转换器',
    'unit_converter_description': '在不同计量单位之间转换',
    'coming_soon': '即将推出',
    'coming_soon_description': '更多工具正在开发中',
    'back_to_home': '返回',
    'tools': '工具',
    'switch_to_calculator': '切换到计算器 (Cmd+1/Ctrl+1)',
    'switch_to_unit_converter': '切换到单位转换 (Cmd+2/Ctrl+2)',
    'copy_result': '复制',
    'send_to_calc': '发送到计算器',
    'rad_deg': '弧度|角度',
    'rad': '弧度',
    'deg': '角度',
    'clear': '清除',
    // 帮助面板
    'help_title': '帮助与设置',
    'help_close': '×',
    'basic_operations': '基本操作',
    'functions_constants': '函数与常数',
    'control_keys': '键盘快捷键',
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
    'calculate_result': '计算',
    'clear_display': '清除',
    'delete_last': '删除最后一个字符',
    // 特别说明
    'auto_switch_deg': '使用三角函数(sin, cos, tan)时，计算器会自动切换到角度(Deg)模式',
    'manual_toggle': '使用键可以随时在弧度(Rad)和角度(Deg)模式之间切换',
    // 错误信息
    'error': '错误',
    // 语言选择
    'language': '语言',
    'theme': '主题',
    // 单位转换
    'unit_conversion': '单位转换',
    'unit_conversion_title': '单位转换',
    'length': '长度',
    'weight': '重量',
    'temperature': '温度',
    'area': '面积',
    'volume': '体积',
    'speed': '速度',
    'time': '时间',
    'from': '从:',
    'to': '到:',
    'apply_result': '应用',
    'open_unit_conversion': '打开单位转换面板',
    // 单位
    // 长度
    'millimeter': '毫米',
    'centimeter': '厘米',
    'meter': '米',
    'kilometer': '千米',
    'inch': '英寸',
    'foot': '英尺',
    'yard': '码',
    'mile': '英里',
    
    // 重量
    'milligram': '毫克',
    'gram': '克',
    'kilogram': '千克',
    'ton': '吨',
    'ounce': '盎司',
    'pound': '磅',
    'stone': '英石',
    
    // 温度
    'celsius': '摄氏度',
    'fahrenheit': '华氏度',
    'kelvin': '开尔文',
    
    // 面积
    'square_millimeter': '平方毫米',
    'square_centimeter': '平方厘米',
    'square_meter': '平方米',
    'square_kilometer': '平方千米',
    'square_inch': '平方英寸',
    'square_foot': '平方英尺',
    'acre': '英亩',
    'hectare': '公顷',
    
    // 体积
    'milliliter': '毫升',
    'liter': '升',
    'cubic_meter': '立方米',
    'gallon': '加仑',
    'pint': '品脱',
    'quart': '夸脱',
    'fluid_ounce': '液量盎司',
    'cup': '杯',
    
    // 速度
    'meter_per_second': '米/秒',
    'kilometer_per_hour': '千米/小时',
    'mile_per_hour': '英里/小时',
    'knot': '节',
    'foot_per_second': '英尺/秒',
    
    // 时间
    'millisecond': '毫秒',
    'second': '秒',
    'minute': '分钟',
    'hour': '小时',
    'day': '天',
    'week': '周',
    'month': '月',
    'year': '年'
  },
  
  // 西班牙语 (Spanish)
  'es': {
    // 界面文本
    'title': 'Calculadora Científica',
    'toolset_title': 'Suite de Herramientas',
    'calculator': 'Calculadora',
    'calculator_tool': 'Calculadora',
    'unit_converter': 'Conversor de Unidades',
    'unit_converter_tool': 'Conversor',
    'tools': 'Herramientas',
    'switch_to_calculator': 'Cambiar a Calculadora (Cmd+1/Ctrl+1)',
    'switch_to_unit_converter': 'Cambiar a Conversor de Unidades (Cmd+2/Ctrl+2)',
    'copy_result': 'Copiar',
    'send_to_calc': 'Enviar a Calculadora',
    'rad_deg': 'Rad|Grados',
    'rad': 'Rad',
    'deg': 'Grados',
    'clear': 'C',
    // 帮助面板
    'help_title': 'Ayuda y Configuración',
    'help_close': '×',
    'basic_operations': 'Operaciones Básicas',
    'functions_constants': 'Funciones y Constantes',
    'control_keys': 'Atajos de Teclado',
    'special_notes': 'Notas Especiales',
    // 基本操作
    'numbers': 'Números',
    'decimal_point': 'Punto decimal',
    'addition': 'Suma',
    'subtraction': 'Resta',
    'multiplication': 'Multiplicación',
    'division': 'División',
    'exponentiation': 'Potencia',
    'parentheses': 'Paréntesis',
    // 函数与常数
    'sine_function': 'Función seno (sin)',
    'cosine_function': 'Función coseno (cos)',
    'tangent_function': 'Función tangente (tan)',
    'logarithm_function': 'Función logaritmo (log)',
    'sqrt_function': 'Función raíz cuadrada (sqrt)',
    'pi_constant': 'Constante π',
    'e_constant': 'Constante e',
    'toggle_rad_deg': 'Cambiar Radián/Grados',
    // 控制键
    'calculate_result': 'Calcular',
    'clear_display': 'Borrar',
    'delete_last': 'Borrar último carácter',
    // 特别说明
    'auto_switch_deg': 'Al usar funciones trigonométricas (sin, cos, tan), la calculadora cambia automáticamente al modo de grados',
    'manual_toggle': 'Use la tecla para alternar entre los modos Radián y Grados en cualquier momento',
    // 错误信息
    'error': 'Error',
    // 语言选择
    'language': 'Idioma',
    'theme': 'Tema',
    // 单位转换
    'unit_conversion': 'Unidades',
    'unit_conversion_title': 'Conversión de Unidades',
    'length': 'Longitud',
    'weight': 'Peso',
    'temperature': 'Temperatura',
    'area': 'Área',
    'volume': 'Volumen',
    'speed': 'Velocidad',
    'time': 'Tiempo',
    'from': 'De:',
    'to': 'A:',
    'apply_result': 'Aplicar',
    'open_unit_conversion': 'Abrir panel de conversión de unidades',
    // 单位
    // 长度
    'millimeter': 'milímetro',
    'centimeter': 'centímetro',
    'meter': 'metro',
    'kilometer': 'kilómetro',
    'inch': 'pulgada',
    'foot': 'pie',
    'yard': 'yarda',
    'mile': 'milla',
    
    // 重量
    'milligram': 'miligramo',
    'gram': 'gramo',
    'kilogram': 'kilogramo',
    'ton': 'tonelada',
    'ounce': 'onza',
    'pound': 'libra',
    'stone': 'stone',
    
    // 温度
    'celsius': 'Celsius',
    'fahrenheit': 'Fahrenheit',
    'kelvin': 'Kelvin',
    
    // 面积
    'square_millimeter': 'milímetro cuadrado',
    'square_centimeter': 'centímetro cuadrado',
    'square_meter': 'metro cuadrado',
    'square_kilometer': 'kilómetro cuadrado',
    'square_inch': 'pulgada cuadrada',
    'square_foot': 'pie cuadrado',
    'acre': 'acre',
    'hectare': 'hectárea',
    
    // 体积
    'milliliter': 'mililitro',
    'liter': 'litro',
    'cubic_meter': 'metro cúbico',
    'gallon': 'galón',
    'pint': 'pinta',
    'quart': 'cuarto',
    'fluid_ounce': 'onza líquida',
    'cup': 'taza',
    
    // 速度
    'meter_per_second': 'metro por segundo',
    'kilometer_per_hour': 'kilómetro por hora',
    'mile_per_hour': 'milla por hora',
    'knot': 'nudo',
    'foot_per_second': 'pie por segundo',
    
    // 时间
    'millisecond': 'milisegundo',
    'second': 'segundo',
    'minute': 'minuto',
    'hour': 'hora',
    'day': 'día',
    'week': 'semana',
    'month': 'mes',
    'year': 'año'
  },
  
  // 法语 (French)
  'fr': {
    // 界面文本
    'title': 'Calculatrice Scientifique',
    'toolset_title': 'Suite d\'Outils',
    'calculator': 'Calculatrice',
    'calculator_tool': 'Calculatrice',
    'unit_converter': 'Convertisseur d\'Unités',
    'unit_converter_tool': 'Convertisseur',
    'tools': 'Outils',
    'switch_to_calculator': 'Passer à la Calculatrice (Cmd+1/Ctrl+1)',
    'switch_to_unit_converter': 'Passer au Convertisseur (Cmd+2/Ctrl+2)',
    'copy_result': 'Copier',
    'send_to_calc': 'Envoyer à la Calculatrice',
    'rad_deg': 'Rad|Deg',
    'rad': 'Rad',
    'deg': 'Deg',
    'clear': 'C',
    // 帮助面板
    'help_title': 'Aide et Paramètres',
    'help_close': '×',
    'basic_operations': 'Opérations de Base',
    'functions_constants': 'Fonctions et Constantes',
    'control_keys': 'Raccourcis Clavier',
    'special_notes': 'Notes Spéciales',
    // 基本操作
    'numbers': 'Nombres',
    'decimal_point': 'Point décimal',
    'addition': 'Addition',
    'subtraction': 'Soustraction',
    'multiplication': 'Multiplication',
    'division': 'Division',
    'exponentiation': 'Puissance',
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
    'calculate_result': 'Calculer',
    'clear_display': 'Effacer',
    'delete_last': 'Supprimer le dernier caractère',
    // 特别说明
    'auto_switch_deg': 'Lors de l\'utilisation des fonctions trigonométriques (sin, cos, tan), la calculatrice passe automatiquement en mode degrés',
    'manual_toggle': 'Utilisez la touche pour basculer entre les modes Radian et Degré à tout moment',
    // 错误信息
    'error': 'Erreur',
    // 语言选择
    'language': 'Langue',
    'theme': 'Thème',
    // 单位转换
    'unit_conversion': 'Unités',
    'unit_conversion_title': 'Conversion d\'Unités',
    'length': 'Longueur',
    'weight': 'Poids',
    'temperature': 'Température',
    'area': 'Superficie',
    'volume': 'Volume',
    'speed': 'Vitesse',
    'time': 'Temps',
    'from': 'De:',
    'to': 'À:',
    'apply_result': 'Appliquer',
    'open_unit_conversion': 'Ouvrir le panneau de conversion d\'unités',
    // 单位
    // 长度
    'millimeter': 'millimètre',
    'centimeter': 'centimètre',
    'meter': 'mètre',
    'kilometer': 'kilomètre',
    'inch': 'pouce',
    'foot': 'pied',
    'yard': 'yard',
    'mile': 'mile',
    
    // 重量
    'milligram': 'milligramme',
    'gram': 'gramme',
    'kilogram': 'kilogramme',
    'ton': 'tonne',
    'ounce': 'once',
    'pound': 'livre',
    'stone': 'stone',
    
    // 温度
    'celsius': 'Celsius',
    'fahrenheit': 'Fahrenheit',
    'kelvin': 'Kelvin',
    
    // 面积
    'square_millimeter': 'millimètre carré',
    'square_centimeter': 'centimètre carré',
    'square_meter': 'mètre carré',
    'square_kilometer': 'kilomètre carré',
    'square_inch': 'pouce carré',
    'square_foot': 'pied carré',
    'acre': 'acre',
    'hectare': 'hectare',
    
    // 体积
    'milliliter': 'millilitre',
    'liter': 'litre',
    'cubic_meter': 'mètre cube',
    'gallon': 'gallon',
    'pint': 'pinte',
    'quart': 'quart',
    'fluid_ounce': 'once liquide',
    'cup': 'tasse',
    
    // 速度
    'meter_per_second': 'mètre par seconde',
    'kilometer_per_hour': 'kilomètre par heure',
    'mile_per_hour': 'mile par heure',
    'knot': 'nœud',
    'foot_per_second': 'pied par seconde',
    
    // 时间
    'millisecond': 'milliseconde',
    'second': 'seconde',
    'minute': 'minute',
    'hour': 'heure',
    'day': 'jour',
    'week': 'semaine',
    'month': 'mois',
    'year': 'an'
  },
  
  // 日语 (Japanese)
  'ja': {
    // 界面文本
    'title': '科学電卓',
    'toolset_title': 'ツールスイート',
    'calculator': '電卓',
    'calculator_tool': '電卓',
    'unit_converter': '単位変換',
    'unit_converter_tool': '単位変換',
    'tools': 'ツール',
    'switch_to_calculator': '電卓に切り替え (Cmd+1/Ctrl+1)',
    'switch_to_unit_converter': '単位変換に切り替え (Cmd+2/Ctrl+2)',
    'copy_result': 'コピー',
    'send_to_calc': '電卓に送信',
    'rad_deg': 'ラジアン|度',
    'rad': 'ラジアン',
    'deg': '度',
    'clear': 'C',
    // 帮助面板
    'help_title': 'ヘルプと設定',
    'help_close': '×',
    'basic_operations': '基本操作',
    'functions_constants': '関数と定数',
    'control_keys': 'キーボードショートカット',
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
    'calculate_result': '計算',
    'clear_display': 'クリア',
    'delete_last': '最後の文字を削除',
    // 特别说明
    'auto_switch_deg': '三角関数(sin、cos、tan)を使用すると、電卓は自動的に度モードに切り替わります',
    'manual_toggle': 'キーを使用して、いつでもラジアンモードと度モードを切り替えることができます',
    // 错误信息
    'error': 'エラー',
    // 语言选择
    'language': '言語',
    'theme': 'テーマ',
    // 单位转换
    'unit_conversion': '単位変換',
    'unit_conversion_title': '単位変換',
    'length': '長さ',
    'weight': '重量',
    'temperature': '温度',
    'area': '面積',
    'volume': '体積',
    'speed': '速度',
    'time': '時間',
    'from': 'から:',
    'to': 'へ:',
    'apply_result': '適用',
    'open_unit_conversion': '単位変換パネルを開く',
    // 单位
    // 长度
    'millimeter': 'ミリメートル',
    'centimeter': 'センチメートル',
    'meter': 'メートル',
    'kilometer': 'キロメートル',
    'inch': 'インチ',
    'foot': 'フィート',
    'yard': 'ヤード',
    'mile': 'マイル',
    
    // 重量
    'milligram': 'ミリグラム',
    'gram': 'グラム',
    'kilogram': 'キログラム',
    'ton': 'トン',
    'ounce': 'オンス',
    'pound': 'ポンド',
    'stone': 'ストーン',
    
    // 温度
    'celsius': '摂氏',
    'fahrenheit': '華氏',
    'kelvin': 'ケルビン',
    
    // 面积
    'square_millimeter': '平方ミリメートル',
    'square_centimeter': '平方センチメートル',
    'square_meter': '平方メートル',
    'square_kilometer': '平方キロメートル',
    'square_inch': '平方インチ',
    'square_foot': '平方フィート',
    'acre': 'エーカー',
    'hectare': 'ヘクタール',
    
    // 体积
    'milliliter': 'ミリリットル',
    'liter': 'リットル',
    'cubic_meter': '立方メートル',
    'gallon': 'ガロン',
    'pint': 'パイント',
    'quart': 'クォート',
    'fluid_ounce': '液量オンス',
    'cup': 'カップ',
    
    // 速度
    'meter_per_second': 'メートル毎秒',
    'kilometer_per_hour': 'キロメートル毎時',
    'mile_per_hour': 'マイル毎時',
    'knot': 'ノット',
    'foot_per_second': 'フィート毎秒',
    
    // 时间
    'millisecond': 'ミリ秒',
    'second': '秒',
    'minute': '分',
    'hour': '時間',
    'day': '日',
    'week': '週間',
    'month': '月',
    'year': '年'
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