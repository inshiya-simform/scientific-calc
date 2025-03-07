const keys = document.querySelector('.keys')
keys.addEventListener("click",handleClick)

const result = document.getElementById('calculate')
result.addEventListener("click",getResult)

const display = document.getElementById('ans')

let answer="";
function handleClick(event){
    let name = event.target.name
    if(((name >=0 && name <=9) || (name== '+' || name == '-' || name == '*' || name == '/' || name == '(' || name == ')')) && name !== undefined) {
        answer += name
        display.textContent = answer
        console.log(answer)
    }
    else if(name == "C"){
        display.textContent =""
        display.style.fontSize = "-webkit-xxx-large"
        display.style.color = "black"
        answer = ""
    }
}
function getResult(){
    try{    
        console.log(eval(answer))  
        console.log("check",display.textContent)
        display.textContent = eval(answer)
        console.log("check",display.textContent)
    }
    catch(error){
        console.log("catch")
        const newNode = document.createTextNode('Error')
        display.appendChild(newNode)
        display.style.fontSize = "medium"
        display.style.color = "red"
    }
}
