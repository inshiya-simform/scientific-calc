import {ERROR} from './constant.js'

//selecting and adding event listeners to html elements
const keys = document.querySelector('.keys')
keys.addEventListener("click",handleClick)

const trigno = document.getElementById('trignometry')
trigno.addEventListener('change',handleChange)

const functions = document.getElementById('function')
functions.addEventListener("change",handleChange)

//key events
document.addEventListener("keydown", handleBackSpcae)
document.addEventListener("keypress", handleKeyEvent)

// function to handle the backspace
function handleBackSpcae(e) {
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
                display.textContent = eval(expression).toFixed(2)
            }catch(error){
                display.textContent = ERROR
                display.style.color = "red"
            }
            
        } 
        else if(key.toLowerCase() === "c"){
            display.textContent = ""
            expression = ""
        }
        else {
            expression += key
            display.textContent += key
        }
    }
}

// selecting elements from html
const display = document.getElementById('ans')
const sqrt__changed = document.getElementById('sqrt__change')
const sqr__changed = document.getElementById('sqr__change')

//global variables used throughout
let expression = ""
let second__flag = false // track 2nd button state

// function handles trignometric, floor and ceil functions
function handleChange(e){
    let value = e.target.value
    const trigno_func = document.getElementById('trigno_func')
    const func = document.getElementById('func')
    switch(value){
        case "sin(x)":
            updateData('Math.sin(','sin(')
            trigno_func.selected = true
            break
        case "cos(x)":
            updateData('Math.cos(','cos(')
            trigno_func.selected = true
            break
        case "tan(x)":
            updateData('Math.tan(','tan(')
            trigno_func.selected = true
            break
        case "floor(x)":
            updateData('Math.floor(','floor(')
            func.selected = true
            break
        case "ceil(x)":
            updateData('Math.ceil(','ceil(')
            func.selected = true
            break
    }  
}

// function handles all the key operations
function handleClick(event){
    let name = event.target.closest("button")?.name
    if(((name >=0 && name <=9) || (name== '+' || name == '-' || name == '*' || name == '/' || name == '(' || name == ')' || name== '%' || name == '.')) 
        && name !== undefined 
        && name != "calc") 
    {
        updateData(name,name)      
    }
    else{
        switch (name){
            case "C":
                display.textContent =""
                display.style.fontSize = "-webkit-xxx-large"
                display.style.color = "black"
                expression = ""
                break
            case "calc":
                try{
                    display.textContent = eval(expression).toFixed(2)
                    break
                }
                catch(error){
                    display.textContent = ERROR
                    display.style.color = "red"
                    break
                }
            case "factorial":
                display.textContent = expression + '!'
                let fact__ans = factorial(expression[expression.length - 1])
                expression = expression.slice(0,expression.length-1)
                expression += fact__ans
                break
            case "del":
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
                display.textContent = display.textContent.slice(0,-1)
                break
            case "e":
                display.textContent +=  'e'
                expression = expression ? expression + "*Math.E" : "Math.E"
                break
            case "abs":
                expression += 'abs('
                display.textContent = expression
                break
            case "pi":
                display.textContent +=  '𝜋'
                expression = expression ? expression + "*Math.PI" : "Math.PI"
                break
            case "div-by-1":
                expression += "(1/"
                display.textContent = expression
                break
            case "sqr":
                let val = second__flag ? Math.pow(expression[expression.length-1], 3) : Math.pow(expression[expression.length-1], 2)
                expression = expression.slice(0, expression.length-1) + val
                display.textContent += second__flag ? '^3' : '^2'
                break
            case "sqrt":
                expression += second__flag ? 'Math.cbrt(' :'Math.sqrt('
                display.textContent += second__flag ? '∛(' : '√('
                break
            case "x-pow-y":
                updateData("**","^")
                break
            case "10-pow-x":
                updateData("10**","10^")
                break
            case "log":
                updateData("Math.log(","log(")
                break
            case "ln":
                updateData('Math.log10(','ln(')
                break
            case "+/-":
                let match = expression.match(/(-?\d+(\.\d+)?)$/)
                let toggle = Number(match[1]) * -1
                expression = expression.replace(/(-?\d+(\.\d+)?)$/, `${toggle}`)
                display.textContent = display.textContent.replace(/(-?\d+(\.\d+)?)$/, `${toggle}`)
            case "2nd":
                second__flag = !second__flag
                // if flag if true then change superscript characters to 3 else 2
                if(second__flag){
                    sqrt__changed.textContent = '3'
                    sqr__changed.textContent = '3'
                }
                else{
                    sqrt__changed.textContent = '2'
                    sqr__changed.textContent = '2'
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
function updateData(expContent,displayContent){
    expression += expContent
    display.textContent += displayContent
  }