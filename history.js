import { $, getLocalStorage } from './utils.js'
import { replaceDisplayScreenContent } from './constant.js'
import { setExpression } from './index.js'

/**
 * button to toggle history visibility.
 * @type {HTMLElement}
 */
const historyToggleButton = document.getElementById('history')
historyToggleButton.addEventListener("click",handleHistoryToggle)

/**
 * list element that contains history items.
 * @type {HTMLElement}
 */
const historyList = document.getElementById('history_list')
historyList.addEventListener("click",addResultInExpression)

/**
 * tracks whether history is currently displayed.
 * @type {boolean}
 */
let isHistoryEnabled = false

/**
 * hides the history container.
 * @param {HTMLElement} historyContainerElement - the history container element to hide.
 */
function hideHistory(historyContainerElement){
    $(historyContainerElement).css('display','none')
}

/**
 * handles the toggle of the history section.
 * shows history if it is currently hidden, otherwise hides it.
 */
function handleHistoryToggle(){
    isHistoryEnabled = !isHistoryEnabled
    const historyContainerElement = document.querySelector('.history')
    if(isHistoryEnabled){
        $(historyContainerElement).css('display','inline')
        const history = getLocalStorage('history')
        historyList.innerHTML =""
        //create document fragment to optimize DOM updates
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

/**
 * handels the click event on a history list item.
 * extracts the result from the clicked history entry and sets in the display
 * @param {Event} e - the event object trigerred by the click event.
 */
function addResultInExpression(e){
    let answer = e.target.textContent.match(/=(.*)/)
    replaceDisplayScreenContent(answer[1])
    setExpression(answer[1])
}