import {ERROR} from './constant.js'

//selecting and adding event listeners to html elements
const keys = document.querySelector('.keys')
keys.addEventListener("click",handleClick)

const trigno = document.getElementById('trignometry')
trigno.addEventListener('change',handleChange)

const functions = document.getElementById('function')
functions.addEventListener("change",handleChange)

const memory_operation = document.getElementById('memory-op')
memory_operation.addEventListener("click", handleMemoryClick)

const history_btn = document.getElementById('history')
history_btn.addEventListener("click",handleHistory)

const history_list = document.getElementById('history_list')
history_list.addEventListener("click",handleHistoryClick)

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
                history_arr.push(expression + '=' + display.textContent)
                localStorage.setItem('history',JSON.stringify(history_arr))
            }catch(error){
                display.textContent = ERROR
                display.style.color = "red"
            }
            
        } 
        else if(key.toLowerCase() === "c"){
            display.textContent = ""
            display.style.fontSize = "-webkit-xxx-large"
            display.style.color = "black"
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
let history__flag = false //track history state
let history_arr = []

// function handles memory related operations
function handleMemoryClick(e){
    let name = e.target.name
    switch(name){
        case "mc":
            if(localStorage.getItem("memory")){
                localStorage.removeItem("memory")
                const nodeList = document.querySelectorAll('.light')
                for(let node of nodeList){
                    node.style.color = 'rgb(199, 198, 198)'
                }
            }
            else{
                alert('Nothing in memory!')
            }
            break
        case "mr":
            if(localStorage.getItem("memory")){
                display.textContent = localStorage.getItem('memory')
                expression = display.textContent
            }
            else{
                alert('Nothing in memory!')
            }
            break
        case "m+":
            if(localStorage.getItem('memory')){
                localStorage.setItem('memory',Number(display.textContent) + Number(localStorage.getItem('memory')))
            }
            else{
                alert('Nothing in memory!')
            }
            break
        case "m-":
            if(localStorage.getItem('memory')){
                localStorage.setItem('memory', localStorage.getItem('memory') - display.textContent)
            }
            else{
                alert('Nothing in memory!')
            }            
            break
        case "ms":
            if(display.textContent.match(/^\d+$/)){
                localStorage.setItem("memory",display.textContent)
                const nodeList = document.querySelectorAll('.light')
                for(let node of nodeList){
                    node.style.color = 'black'
                }
            }
            else{
                alert('Can only store a number in memory.')
            }
            break
    }
}

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
                    history_arr.push(expression + '=' + display.textContent)
                    localStorage.setItem('history',JSON.stringify(history_arr))
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

// function handles history
function handleHistory(){
    history__flag = !history__flag
    const history_container = document.querySelector('.history')
    if(history__flag){
        history_container.style.display = 'inline'
        const history = JSON.parse(localStorage.getItem('history'))
        history_list.innerHTML =""
        for(let result of history){
            let li = document.createElement('li')
            li.textContent = result
            $(li).css("border-bottom","1px solid #333").css("padding","5px")
            history_list.appendChild(li)
        }
    }else{
        history_container.style.display = 'none'
    }
}

// fucntion handles click of list item in history
function handleHistoryClick(e){
    let answer = e.target.textContent.match(/=(.*)/)
    display.textContent = answer[1]
    expression += answer[1]
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

//utility function
function $(element){   
    return {
        element: element,
        css: function (property, value){
            element.style.setProperty(property,value)
            return this
        }
    }
}