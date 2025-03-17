/**
 * @constant {string} ERROR - generic error message.
 */
export const ERROR = "Error"

/**
 * @constant{string} MEMORY_EMPTY - error message when memory is empty.
 */
export const MEMORY_EMPTY = 'Nothing in memory!'

/**
 * @constant {string} ONLY_DIGITS - error message when non-numeric values are attempted to store in memory.
 */
export const ONLY_DIGITS = 'Can only store a number in memory.'

/**
 * @constant {Object} MEMORY_OPERATION - Object containing allowed memory operations.
 * @property {string} memoryClear - clears memory.
 * @property {string} memoryRead - reads from memory.
 * @property {string} memoryAdd - adds display content in memory.
 * @property {string} memorySubtract - subtract display content from memory.
 * @property {string} memorySave - save the display content itno memory.
 */
export const MEMORY_OPERATION = {
    memoryClear : "mc",
    memoryRead : "mr",
    memoryAdd : "m+",
    memorySubtract : "m-",
    memorySave : "ms",
}

/**
 * @constant {string} MEMORY_KEY - key used for memory storage.
 */
export const MEMORY_KEY = 'memory'

/**
 * @constant {Object} TRIGNOMETRY_ADV_MATH_OPERATION - Object containing trignometry and advance math operations.
 * @property {string} sine - sine function.
 * @property {string} cosine - cosine function.
 * @property {string} tan - tan function.
 * @property {string} floor- floor function.
 * @property {string} ceil - ceil function.
 */
export const TRIGNOMETRY_ADV_MATH_OPERATION = {
    sine : "sin(x)",
    cosine : "cos(x)",
    tan : "tan(x)",
    floor : "floor(x)",
    ceil : "ceil(x)",
}

/**
 * @constant {Object} CALCULATOR_OPERATION - Object containing calculator operations.
 * @property {string} clear - clears the dsiplay screen.
 * @property {string} calculate - calculate the result of the expression.
 * @property {string} factorial - computes factorial of a number.
 * @property {string} delete - delete the last entered character.
 * @property {string} e - represents the mathematical constant e.
 * @property {string} absolute - computes absolute value.
 * @property {string} pi - represents the mathematical constant pi.
 * @property {string} fraction - computes reciprocal(1/x).
 * @property {string} square - computes square of a number.
 * @property {string} squareRoot - computes square root of given number.
 * @property {string} power - computes x raised to the power of y.
 * @property {string} tenPower - computes 10 raised to the power of x.
 * @property {string} log - computes log base 10.
 * @property {string} ln - computes log base e.
 * @property {string} toggleSign - toggles the sign of a number.
 * @property {string} second - secondary function key.
 * @property{string} exp - expoenential fucntion
 */
export const CALCULATOR_OPERATION = {
    clear : "C",
    calculate : "calc",
    factorial : "factorial",
    delete : "del",
    e : "e",
    absolute : "abs",
    pi : "pi",
    fraction : "div-by-1",
    square : "sqr",
    squareRoot : "sqrt",
    power : "x-pow-y",
    tenPower : "10-pow-x",
    log : "log",
    ln : "ln",
    toggleSign : "+/-",
    second : "2nd",
    exp: "exp",
}

/**
 * @constant {Object} DEGREE_FE - object containing degree and fe mode operations.
 * @property {string} degree - degree and radian toggle mode.
 * @property {string} FE - exponential function mode.
 */
export const DEGREE_FE = {
    degree : "degree",
    FE : "F-E",
}

/**
 * @constant {Array} HISTORY - store all previous calculations
 */
export const HISTORY = []

/**
 * @constant {HTMLElement} DISPLAY_SCREEN - the display screen element
 */
let DISPLAY_SCREEN = document.getElementById('ans')

/**
 * gets the current content of the display screen.
 * @returns {string} the text content of the display screen.
 */
export function getDisplayScreenContent(){
    return DISPLAY_SCREEN.textContent
}

/**
 * appends a string to the display screen content.
 * @param {string} str - the string to be appended.
 */
export function setDisplayScreenContent(str){
    DISPLAY_SCREEN.textContent += str
}

/**
 * replaces the entire content of the display screen with a new string.
 * @param {string} str - the new string to set.
 */
export function replaceDisplayScreenContent(str){
    DISPLAY_SCREEN.textContent = str
}

/**
 * gets the display screen element.
 * @returns {HTMLElement} the display screen element.
 */
export function getDisplayScreen(){
    return DISPLAY_SCREEN
}