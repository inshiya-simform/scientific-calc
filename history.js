import { $, getLocalStorage } from './utils.js'
import { replaceDisplayScreenContent } from './constant.js'
import { setExpression } from './index.js'

const historyToggleButton = document.getElementById('history')
historyToggleButton.addEventListener("click",handleHistoryToggle)
const historyList = document.getElementById('history_list')
historyList.addEventListener("click",addResultInExpression)

let isHistoryEnabled = false // track history state; false: display-none; true: diplay-inline

function hideHistory(historyContainerElement){
    $(historyContainerElement).css('display','none')
}
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
        hideHistory(historyContainerElement)
    }
}

// fucntion handles click of list item in history
function addResultInExpression(e){
    let answer = e.target.textContent.match(/=(.*)/)
    replaceDisplayScreenContent(answer[1])
    setExpression(answer[1])
}