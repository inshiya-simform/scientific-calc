import { ERROR, HISTORY, getDisplayScreen, setDisplayScreenContent, replaceDisplayScreenContent, getDisplayScreenContent } from "./constant.js"
import { getExpression, replaceExpression, setExpression } from "./index.js"

/**
 * selects an html element and provide a method to apply css styles.
 * @param {HTMLElement} element - html element to be selected.
 * @returns {Object} an object with a `css` method to apply styles.
 */
export function $(element){   
    return {
        element: element,
        css: function (property, value){
            element.style.setProperty(property,value)
            return this
        }
    }
}

/**
 * stores a key-value pair in local storage.
 * @param {string} key - the key to store the value in local storage.
 * @param {string} value - the value to store in local storage.
 */
export function setLocalStorage(key, value){
    JSON.stringify(localStorage.setItem(key,value))
}

/**
 * retreives a value from local storage.
 * @param {string} key -  the key of the item to be retirved.
 * @returns {any} the parsed value from local storage.
 */
export function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}

/**
 * removes an item from local storage.
 * @param {string} key - the key of the item to be removed.
 */
export function removeFromLocalStorage(key){
    localStorage.removeItem(key)
}

/**
 * updates the list of html elements wuth a specified CSS property and value.
 * @param {NodeList} nodeList - the list of html elements.
 * @param {string} property - the css propert to update.
 * @param {string} value - the value to set for the css property.
 */
export function updateNodeList(nodeList, property, value){
    for(const node of nodeList){
        $(node).css(property,value)
    }
}

/**
 * updates the mathematical expression and the display screen.
 * @param {string} expContent - the mathematical expression to be updated.
 * @param {string} displayContent - the content to be displayed.
 */
export function updateExpressionAndDisplay(expContent,displayContent){
    setExpression(expContent)
    setDisplayScreenContent(displayContent)
}

/**
 * clears the display screen and resets the mathematical expression.
 */
export function clearScreen(){
    replaceDisplayScreenContent("")
    $(getDisplayScreen()).css('font-size','-webkit-xxx-large').css('color','black')
    replaceExpression("")
}

/**
 * evaluates and calculates the mathematical expression, updateing the dispaly screen.
 */
export function calculateResult(){
    const removeZeroes = getExpression().replace(/\b0+(\d+)/g, "$1")
    replaceDisplayScreenContent(eval(removeZeroes).toFixed(2))
    HISTORY.push(getExpression() + '=' + getDisplayScreenContent())
    setLocalStorage('history',JSON.stringify(HISTORY))
}

/**
 * displays an error message on the display screen.
 */
export function onError(){
    replaceDisplayScreenContent(ERROR)
    $(getDisplayScreen()).css('color','red')
}

/**
 * computes factorial of a given number.
 * @param {number} num - the number to compute the factorial of.
 * @returns {number} the factorial of the given number.
 */
export function factorial(num){
    if(num === 0 || num === 1){
        return 1
    }
    else{
        return num * factorial(num-1)
    }
}