import { $, getLocalStorage } from './utils.js'
import { DISPLAY_SCREEN } from './constant.js'
import { expression } from './index.js'

const historyToggleButton = document.getElementById('history')
historyToggleButton.addEventListener("click",handleHistoryToggle)

const historyList = document.getElementById('history_list')
historyList.addEventListener("click",addResultInExpression)

let isHistoryEnabled = false // track history state

// function handles history
function handleHistoryToggle(){
    isHistoryEnabled = !isHistoryEnabled
    const historyContainerElement = document.querySelector('.history')
    if(isHistoryEnabled){
        $(historyContainerElement).css('display','inline')
        const history = getLocalStorage('history')
        historyList.innerHTML =""
        const historyFragment = document.createDocumentFragment()
        for(let result of history){
            const li = document.createElement('li')
            li.textContent = result
            $(li).css("border-bottom","1px solid #333").css("padding","5px")
            historyFragment.appendChild(li)
        }
        historyList.appendChild(historyFragment)
    }else{
        $(historyContainerElement).css('display','none')
    }
}

// fucntion handles click of list item in history
function addResultInExpression(e){
    let answer = e.target.textContent.match(/=(.*)/)
    DISPLAY_SCREEN.textContent = answer[1]
    expression += answer[1]
}