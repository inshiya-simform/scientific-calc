const keys = document.querySelector('.keys')
keys.addEventListener("click",handleClick)

const display = document.getElementById('ans')
let answer="";
function handleClick(event){
    let name = event.target.name
    if(((name >=0 && name <=9) || (name== '+' || name == '-' || name == '*' || name == '/' || name == '(' || name == ')' || name== '%' || name == '.')) 
        && name !== undefined 
        && name != "calc") 
    {
        answer += name
        display.textContent += name        
    }
    else{
        switch (name){
            case "C":
                display.textContent =""
                display.style.fontSize = "-webkit-xxx-large"
                display.style.color = "black"
                answer = ""
                break
            case "calc":
                try{
                    display.textContent = eval(answer).toFixed(2)
                    break
                }
                catch(error){
                    display.textContent = error.message
                    display.style.fontSize = "medium"
                    display.style.color = "red"
                    break
                }
            case "factorial":
                display.textContent = answer + '!'
                let fact__ans = factorial(answer[answer.length - 1])
                answer = answer.slice(0,answer.length-1)
                answer += fact__ans
                break
            case "del":
                answer = answer.slice(0,answer.length-1)
                display.textContent = display.textContent.slice(0,answer.length-1)
                break
            case "e":
                display.textContent +=  'e'
                answer ? answer += "*2.7183" : answer += "2.7183"
                break
            case "abs":
                answer += 'abs('
                display.textContent = answer
                break
            case "pi":
                display.textContent +=  '𝜋'
                answer ? answer += "*3.14" : answer += "3.14"
                break
            case "div-by-1":
                answer += "(1/"
                display.textContent = answer
                break
            case "sqr":
                let val = square(answer[answer.length-1])
                answer = answer.slice(0, answer.length-1) + val
                display.textContent += '^2'
                break
            case "sqrt":
                answer += 'Math.sqrt('
                display.textContent += '√('
                break
            case "x-pow-y":
                answer += "**"
                display.textContent += "^"
                break
            case "10-pow-x":
                answer += "10**"
                display.textContent += "10^"
                break
            case "log":
                answer += "Math.log("
                display.textContent += "log("
                break
            case "ln":
                answer += 'Math.log10('
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