import { ERROR, TRIGNOMETRY_ADV_MATH_OPERATION, CALCULATOR_OPERATION, DISPLAY_SCREEN, HISTORY } from './constant.js'
import { $, setLocalStorage } from './utils.js'

// global variables used throughout
export let expression = ""
let is2ndEnabled = false // track 2nd button state

// selecting and adding event listeners to html elements
const operationElement = document.querySelector('.keys')
operationElement.addEventListener("click",handleOperationClick)

const trignometryOperationElement = document.getElementById('trignometry')
trignometryOperationElement.addEventListener('change',handleTrignometryAdvanceMathFunction)

const advanceMathOperationElement = document.getElementById('function')
advanceMathOperationElement.addEventListener("change",handleTrignometryAdvanceMathFunction)

// key events
document.addEventListener("keydown", handleBackSpace)
document.addEventListener("keypress", handleKeyEvent)

// function to handle the backspace
function handleBackSpace(e) {
    if (e.key === "Backspace") {
      expression = expression.slice(0, -1)
      display.textContent = display.textContent.slice(0, -1)
    }
  }
// function to handle keypress events
function handleKeyEvent(e) {
    let allowedKeys = new Set([
      "Enter",
      "Backspace",
      "(",
      ")",
      "*",
      "-",
      "+",
      "/",
      ".",
      "=",
      "c",
    ])
    let key = e.key
    if ((key >= "0" && key <= "9") || allowedKeys.has(key))
    {
        if (key === "Enter" || key === "=") 
        {
            try{
                calculateResult()
            }catch(error){
                onError()
            }
            
        } 
        else if(key.toLowerCase() === "c"){
            clearScreen()
        }
        else {
            updateExpressionAndDisplay(key,key)
        }
    }
}

// selecting elements from html
const squareRootElement = document.getElementById('sqrt__change')
const squareElement = document.getElementById('sqr__change')

// function handles trignometric, floor and ceil functions
function handleTrignometryAdvanceMathFunction(e){
    const operationName = e.target.value
    const trignometryOperation = document.getElementById('trigno_func')
    const advMathOperation = document.getElementById('func')
    switch(operationName){
        case TRIGNOMETRY_ADV_MATH_OPERATION.sine:
            updateExpressionAndDisplay('Math.sin(','sin(')
            trignometryOperation.selected = true
            break
        case TRIGNOMETRY_ADV_MATH_OPERATION.cosine:
            updateExpressionAndDisplay('Math.cos(','cos(')
            trignometryOperation.selected = true
            break
        case TRIGNOMETRY_ADV_MATH_OPERATION.tan:
            updateExpressionAndDisplay('Math.tan(','tan(')
            trignometryOperation.selected = true
            break
        case TRIGNOMETRY_ADV_MATH_OPERATION.floor:
            updateExpressionAndDisplay('Math.floor(','floor(')
            advMathOperation.selected = true
            break
        case TRIGNOMETRY_ADV_MATH_OPERATION.ceil:
            updateExpressionAndDisplay('Math.ceil(','ceil(')
            advMathOperation.selected = true
            break
    }  
}

// function handles all the key operations
function handleOperationClick(event){
    const name = event.target.closest("button")?.name
    const IS_DIGIT = name >=0 && name <=9
    const IS_ARITHEMATIC_OPERATION = name== '+' || name == '-' || name == '*' || name == '/' || name == '(' || name == ')' || name== '%' || name == '.'
    if(((IS_DIGIT) || (IS_ARITHEMATIC_OPERATION)) && name !== undefined && name != "calc") 
    {
        updateExpressionAndDisplay(name,name)      
    }
    else{
        switch (name){
            case CALCULATOR_OPERATION.clear:
                clearScreen()
                break
            case CALCULATOR_OPERATION.calculate:
                try{
                    calculateResult()
                    break
                }
                catch(error){
                    onError()
                    break
                }
            case CALCULATOR_OPERATION.factorial:
                DISPLAY_SCREEN.textContent = expression + '!'
                const factorialAnswer = factorial(expression[expression.length - 1])
                expression = expression.slice(0,expression.length-1)
                expression += factorialAnswer
                break
            case CALCULATOR_OPERATION.delete:
                if(expression.endsWith('**')){
                    expression = expression.slice(0,-1)
                }
                if(expression.endsWith('Math.E')){
                    expression = expression.slice(0,-7)
                }
                else if(expression.endsWith('Math.PI')){
                    expression = expression.slice(0,-8)
                }
                else{
                    expression = expression.slice(0,-1)
                }
                DISPLAY_SCREEN.textContent = DISPLAY_SCREEN.textContent.slice(0,-1)
                break
            case CALCULATOR_OPERATION.e:
                DISPLAY_SCREEN.textContent +=  'e'
                expression = expression ? expression + "*Math.E" : "Math.E"
                break
            case CALCULATOR_OPERATION.absolute:
                updateExpressionAndDisplay('Math.abs(','abs(')
                break
            case CALCULATOR_OPERATION.pi:
                DISPLAY_SCREEN.textContent +=  '𝜋'
                expression = expression ? expression + "*Math.PI" : "Math.PI"
                break
            case CALCULATOR_OPERATION.fraction:
                expression += "(1/"
                DISPLAY_SCREEN.textContent = expression
                break
            case CALCULATOR_OPERATION.square:
                const val = second__flag ? Math.pow(expression[expression.length-1], 3) : Math.pow(expression[expression.length-1], 2)
                expression = expression.slice(0, expression.length-1) + val
                DISPLAY_SCREEN.textContent += is2ndEnabled ? '^3' : '^2'
                break
            case CALCULATOR_OPERATION.squareRoot:
                expression += is2ndEnabled ? 'Math.cbrt(' :'Math.sqrt('
                DISPLAY_SCREEN.textContent += is2ndEnabled ? '∛(' : '√('
                break
            case CALCULATOR_OPERATION.power:
                updateExpressionAndDisplay("**","^")
                break
            case CALCULATOR_OPERATION.tenPower:
                updateExpressionAndDisplay("10**","10^")
                break
            case CALCULATOR_OPERATION.log:
                updateExpressionAndDisplay("Math.log(","log(")
                break
            case CALCULATOR_OPERATION.ln:
                updateExpressionAndDisplay('Math.log10(','ln(')
                break
            case CALCULATOR_OPERATION.toggleSign:
                const lastDigitOfExpression = DISPLAY_SCREEN.textContent.match(/(-?\d+(\.\d+)?)$/)
                const toggleLastDigit = Number(lastDigitOfExpression[1]) * -1
                expression = expression.replace(/(-?\d+(\.\d+)?)$/, `${toggleLastDigit}`)
                DISPLAY_SCREEN.textContent = DISPLAY_SCREEN.textContent.replace(/(-?\d+(\.\d+)?)$/, `${toggleLastDigit}`)
            case CALCULATOR_OPERATION.second:
                is2ndEnabled = !is2ndEnabled
                // if flag if true then change superscript characters to 3 else 2
                if(is2ndEnabled){
                    squareRootElement.textContent = '3'
                    squareElement.textContent = '3'
                }
                else{
                    squareRootElement.textContent = '2'
                    squareElement.textContent = '2'
                }
        }
    }
}

//returns factorial of given number
function factorial(num){
    if(num === 0 || num === 1){
        return 1
    }
    else{
        return num * factorial(num-1)
    }
}

// updates data
function updateExpressionAndDisplay(expContent,displayContent){
    expression += expContent
    DISPLAY_SCREEN.textContent += displayContent
}

// clear display content
function clearScreen(){
    DISPLAY_SCREEN.textContent =""
    $(DISPLAY_SCREEN).css('font-size','-webkit-xxx-large').css('color','black')
    expression = ""
}

// calculates result
function calculateResult(){
    DISPLAY_SCREEN.textContent = eval(expression).toFixed(2)
    HISTORY.push(expression + '=' + DISPLAY_SCREEN.textContent)
    setLocalStorage('history',JSON.stringify(HISTORY))
}

// error
function onError(){
    DISPLAY_SCREEN.textContent = ERROR
    $(DISPLAY_SCREEN).css('color','red')
}