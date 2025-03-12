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
      "C",
    ])
    let key = e.key
    if ((key >= "0" && key <= "9") || allowedKeys.has(key))
    {
        if (key === "Enter" || key === "=") 
        {
            try{
                display.textContent = eval(expression).toFixed(2)
            }catch(error){
                display.textContent = "Error"
                display.style.color = "red"
            }
            
        } 
        else if(key === "c" || key === "C"){
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
    switch(value){
        case "sin(x)":
            expression += 'Math.sin('
            display.textContent += 'sin('
            break
        case "cos(x)":
            expression += 'Math.cos('
            display.textContent += 'cos('
            break
        case "tan(x)":
            expression += 'Math.tan('
            display.textContent += 'tan('
            break
        case "floor(x)":
            expression += 'Math.floor('
            display.textContent += 'floor('
            break
        case "ceil(x)":
            expression += 'Math.ceil('
            display.textContent += 'ceil('
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
        expression += name
        display.textContent += name        
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
                    display.textContent = "Error"
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
                let val = second__flag ? cube(expression[expression.length-1]) : square(expression[expression.length-1])
                expression = expression.slice(0, expression.length-1) + val
                display.textContent += second__flag ? '^3' : '^2'
                break
            case "sqrt":
                expression += second__flag ? 'Math.cbrt(' :'Math.sqrt('
                display.textContent += second__flag ? '∛(' : '√('
                break
            case "x-pow-y":
                expression += "**"
                display.textContent += "^"
                break
            case "10-pow-x":
                expression += "10**"
                display.textContent += "10^"
                break
            case "log":
                expression += "Math.log("
                display.textContent += "log("
                break
            case "ln":
                expression += 'Math.log10('
                display.textContent += "ln("
                break
            case "+/-":
                let match = expression.match(/(-?\d+(\.\d+)?)$/)
                let toggle = Number(match[1]) * -1
                expression = expression.replace(/(-?\d+(\.\d+)?)$/, `${toggle}`)
                display.textContent = display.textContent.replace(/(-?\d+(\.\d+)?)$/, `${toggle}`)
            case "2nd":
                second__flag = !second__flag
                second__flag ? sqrt__changed.textContent = sqr__changed.textContent = '3' : sqrt__changed.textContent = sqr__changed.textContent = '2'
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

//returns square of given number
function square(num){
    if(typeof num == 'string'){
        return num*num
    }else{
        return null
    }
}

//returns cube of given number
function cube(num){
    if(typeof num == 'string'){
        return num*num*num
    }else{
        return null
    }
}