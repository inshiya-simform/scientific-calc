const keys = document.querySelector('.keys')
keys.addEventListener("click",handleClick)

const display = document.getElementById('ans')
let expression="";
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
                expression = expression.slice(0,expression.length-1)
                display.textContent = display.textContent.slice(0,expression.length-1)
                break
            case "e":
                display.textContent +=  'e'
                expression ? expression += "*Math.E" : expression += "Math.E"
                break
            case "abs":
                expression += 'abs('
                display.textContent = expression
                break
            case "pi":
                display.textContent +=  '𝜋'
                expression ? expression += "*Math.PI" : expression += "Math.PI"
                break
            case "div-by-1":
                expression += "(1/"
                display.textContent = expression
                break
            case "sqr":
                let val = square(expression[expression.length-1])
                expression = expression.slice(0, expression.length-1) + val
                display.textContent += '^2'
                break
            case "sqrt":
                expression += 'Math.sqrt('
                display.textContent += '√('
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
        }
    }
}
function factorial(num){
    if(num === 0 || num === 1){
        return 1
    }
    else{
        return num * factorial(num-1)
    }
}
function square(num){
    if(typeof num == 'string'){
        return num*num
    }else{
        return null
    }
}