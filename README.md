# Scientific Calculator Chrome Extension

A Chrome extension that provides a scientific calculator with basic and advanced mathematical functions.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, division
- Scientific functions: sin, cos, tan, log, square root
- Constants: π (pi), e
- Support for both radian and degree angle calculations
- Parentheses for complex expressions

## Installation

### From Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "Scientific Calculator"
3. Click "Add to Chrome"

### Manual Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the folder containing this extension
5. The calculator should appear in your extensions toolbar

#### Icon Generation Options

The extension includes multiple ways to generate icons:

1. **Simple Color Icons (Recommended)**: 
   ```
   npm run generate-icons
   ```
   This uses Node.js built-in modules to create simple colored icons.

2. **Browser-based Generator**:
   ```
   npm run generate-icons-html
   ```
   Then open the generated `generate_icons.html` file in your browser and follow the instructions.

3. **Shell Script (requires ImageMagick)**:
   ```
   chmod +x icons/create_simple_icons.sh
   ./icons/create_simple_icons.sh
   ```

## Usage

1. Click the calculator icon in your Chrome toolbar to open the calculator
2. Enter expressions using the calculator buttons or your keyboard
3. Press "=" or Enter to calculate the result
4. Toggle between radian and degree modes for trigonometric calculations

## Examples

- Basic calculation: `2 + 3 * 4`
- Scientific function: `sin(45)` (in degree mode)
- Complex expression: `sqrt(16) + log(100)`
- Using constants: `2 * π * 10`

## License

MIT License 