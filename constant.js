export const ERROR = "Error"
export const MEMORY_EMPTY = 'Nothing in memory!'
export const ONLY_DIGITS = 'Can only store a number in memory.'
export const MEMORY_OPERATION = {
    memoryClear : "mc",
    memoryRead : "mr",
    memoryAdd : "m+",
    memorySubtract : "m-",
    memorySave : "ms",

}
export const MEMORY_KEY = 'memory'
export const TRIGNOMETRY_ADV_MATH_OPERATION = {
    sine : "sin(x)",
    cosine : "cos(x)",
    tan : "tan(x)",
    floor : "floor(x)",
    ceil : "ceil(x)",
}
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
export const DEGREE_FE = {
    degree : "degree",
    FE : "F-E",
}
export const HISTORY = [] // store all previous calculations
let DISPLAY_SCREEN = document.getElementById('ans')
export function getDisplayScreenContent(){
    return DISPLAY_SCREEN.textContent
}
export function setDisplayScreenContent(str){
    DISPLAY_SCREEN.textContent += str
}
export function replaceDisplayScreenContent(str){
    DISPLAY_SCREEN.textContent = str
}
export function getDisplayScreen(){
    return DISPLAY_SCREEN
}