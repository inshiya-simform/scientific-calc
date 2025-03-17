import { ERROR, TRIGNOMETRY_ADV_MATH_OPERATION, CALCULATOR_OPERATION, setDisplayScreenContent, getDisplayScreenContent, replaceDisplayScreenContent, HISTORY, getDisplayScreen } from './constant.js'
import { $, setLocalStorage } from './utils.js'

// global variables used throughout
let expression = ""
export function getExpression(){
    return expression
}
export function setExpression(str){
    expression += str
}
export function replaceExpression(str){
    expression = str
}

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
      replaceExpression(getExpression().slice(0, -1))
      replaceDisplayScreenContent(getDisplayScreenContent().slice(0, -1))
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
                replaceDisplayScreenContent(getExpression() + '!')
                const factorialAnswer = factorial(getExpression()[getExpression().length - 1])
                replaceExpression(getExpression().slice(0,getExpression().length-1))
                setExpression(factorialAnswer)
                break
            case CALCULATOR_OPERATION.delete:
                if(getExpression().endsWith('**')){
                    replaceExpression(getExpression().slice(0,-1))
                }
                if(getExpression().endsWith('Math.E')){
                    replaceExpression(getExpression().slice(0,-7))
                }
                else if(getExpression().endsWith('Math.PI')){
                    replaceExpression(getExpression().slice(0,-8))
                }
                else{
                    replaceExpression(getExpression().slice(0,-1))
                }
                replaceDisplayScreenContent(getDisplayScreenContent().textContent.slice(0,-1))
                break
            case CALCULATOR_OPERATION.e:
                setDisplayScreenContent('e')
                const eValue = getExpression() ? getExpression() + "*Math.E" : "Math.E"
                replaceExpression(eValue)
                break
            case CALCULATOR_OPERATION.absolute:
                updateExpressionAndDisplay('Math.abs(','abs(')
                break
            case CALCULATOR_OPERATION.pi:
                setDisplayScreenContent('𝜋')
                const piValue = getExpression() ? getExpression() + "*Math.PI" : "Math.PI"
                replaceExpression(piValue)

                break
            case CALCULATOR_OPERATION.fraction:
                setExpression("(1/")
                replaceDisplayScreenContent(getExpression())
                break
            case CALCULATOR_OPERATION.square:
                const val = is2ndEnabled ? Math.pow(getExpression()[getExpression().length-1], 3) : Math.pow(getExpression()[getExpression().length-1], 2)
                replaceExpression(getExpression().slice(0, getExpression().length-1) + val)
                const valOn2nd= is2ndEnabled ? '^3' : '^2'
                setDisplayScreenContent(valOn2nd)
                break
            case CALCULATOR_OPERATION.squareRoot:
                const cbrtValue = is2ndEnabled ? 'Math.cbrt(' :'Math.sqrt('
                setExpression(cbrtValue)
                const rootOn2nd = is2ndEnabled ? '∛(' : '√('
                setDisplayScreenContent(rootOn2nd)
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
                const lastDigitOfExpression = getDisplayScreenContent().match(/(-?\d+(\.\d+)?)$/)
                const toggleLastDigit = Number(lastDigitOfExpression[1]) * -1
                replaceExpression(getExpression().replace(/(-?\d+(\.\d+)?)$/, `${toggleLastDigit}`))
                replaceDisplayScreenContent(getDisplayScreenContent().replace(/(-?\d+(\.\d+)?)$/, `${toggleLastDigit}`))
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
    setExpression(expContent)
    setDisplayScreenContent(displayContent)
}

// clear display content
function clearScreen(){
    replaceDisplayScreenContent("")
    $(getDisplayScreen()).css('font-size','-webkit-xxx-large').css('color','black')
    replaceExpression("")
}

// calculates result
function calculateResult(){
    replaceDisplayScreenContent(eval(getExpression()).toFixed(2))
    HISTORY.push(getExpression() + '=' + getDisplayScreenContent())
    setLocalStorage('history',JSON.stringify(HISTORY))
}

// error
function onError(){
    replaceDisplayScreenContent(ERROR)
    $(getDisplayScreen()).css('color','red')
}