# Scientific Calculator Chrome Extension

A compact and efficient Scientific Calculator Chrome Extension that provides both basic and advanced mathematical functions.

## Features

- **Basic Operations**: Addition, Subtraction, Multiplication, Division
- **Scientific Functions**:
  - Trigonometric Functions: sin, cos, tan (supports Radian/Degree mode switching)
  - Logarithm: log (base 10)
  - Square Root: sqrt
- **Constants**: π (pi), e
- **Special Features**:
  - Radian/Degree mode toggle
  - Exponentiation (x^y)
  - Complex expression calculation with parentheses
  - Implicit multiplication (e.g., 2(3+1) = 2*(3+1))

## Installation

### From Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "Scientific Calculator"
3. Click "Add to Chrome"

### Manual Installation

1. Download or clone this repository
2. Open Chrome browser and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the folder containing this extension
5. The calculator icon will appear in your extensions toolbar

## Usage

1. Click the calculator icon in your Chrome toolbar to open the calculator
2. Enter expressions using the calculator buttons or your keyboard
3. Click "=" or press Enter to calculate the result
4. Use the "Rad/Deg" button to toggle between radian and degree modes (for trigonometric calculations)

## Examples

- Basic calculation: `2 + 3 * 4 = 14`
- Trigonometric functions:
  - In degree mode: `sin(90) = 1`
  - In radian mode: `sin(π/2) = 1`
- Complex expression: `sqrt(16) + log(100) = 6`
- Using constants: `2 * π * 10 ≈ 62.83`
- Exponentiation: `2^3 = 8`

## Project Structure

- `popup.html` - Calculator's HTML interface
- `popup.js` - Calculator's core logic
- `styles.css` - Calculator's stylesheet
- `manifest.json` - Chrome extension configuration file
- `icons/` - Folder containing extension icons (16px, 48px, 128px)

## Technical Implementation

- Implemented using vanilla JavaScript with no additional dependencies
- Custom expression parser that safely evaluates mathematical expressions without using `eval()`
- Recursive parsing for handling nested parentheses and function calls
- Priority handling for different mathematical operators
- Support for both radian and degree modes in trigonometric calculations

## Compatibility

- Chrome 88 or higher
- Chromium-based browsers (such as Edge, Opera, Brave, etc.)

## License

MIT License 