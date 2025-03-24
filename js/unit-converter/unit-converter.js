// 单位转换功能模块

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

// 初始化单位转换模块
export function initUnitConverter(initialValue = null) {
  const unitInput = document.getElementById('unitInput');
  const conversionType = document.getElementById('conversionType');
  const fromUnit = document.getElementById('fromUnit');
  const toUnit = document.getElementById('toUnit');
  const swapUnits = document.getElementById('swapUnits');
  const copyResult = document.getElementById('copyResult');
  const sendToCalc = document.getElementById('sendToCalc');
  
  // 初始化单位转换下拉框
  initConversionSelects('length');
  
  // 如果有初始值，设置并执行转换
  if (initialValue !== null && !isNaN(parseFloat(initialValue))) {
    unitInput.value = parseFloat(initialValue);
    performConversion();
  }
  
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
    const resultText = document.getElementById('conversionResult').textContent;
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
    const resultText = document.getElementById('conversionResult').textContent;
    const display = document.getElementById('result');
    display.value = resultText;
    
    // 导入utils模块中的switchTool
    import('../utils.js').then(utils => {
      utils.switchTool('calculator');
      display.focus();
    });
  });
}

// 初始化单位转换下拉框
export function initConversionSelects(type) {
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
export function performConversion() {
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
export function convertTemperature(value, fromUnit, toUnit) {
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