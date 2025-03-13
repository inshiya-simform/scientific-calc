import { MEMORY_OPERATION, DISPLAY_SCREEN, MEMORY_EMPTY, ONLY_DIGITS, MEMORY_KEY } from "./constant.js"
import { $, setLocalStorage, getLocalStorage, removeFromLocalStorage, updateNodeList } from './utils.js'
import { expression } from './index.js'

const memoryOperationElement = document.getElementById('memory-op')
memoryOperationElement.addEventListener("click", handleMemoryOperation)

// function handles memory related operations
function handleMemoryOperation(e){
    const name = e.target.name
    switch(name){
        case MEMORY_OPERATION.memoryClear:
            if(getLocalStorage(MEMORY_KEY)){
                removeFromLocalStorage(MEMORY_KEY)
                const nodeList = document.querySelectorAll('.light')
                for(let node of nodeList){
                    $(node).css('color','rgb(199, 198, 198)')
                }
            }
            else{
                alert(MEMORY_EMPTY)
            }
            break
        case MEMORY_OPERATION.memoryRead:
            if(localStorage.getItem(MEMORY_KEY)){
                DISPLAY_SCREEN.textContent = localStorage.getItem(MEMORY_KEY)
                expression = DISPLAY_SCREEN.textContent
            }
            else{
                alert(MEMORY_EMPTY)
            }
            break
        case MEMORY_OPERATION.memoryAdd:
            if(getLocalStorage(MEMORY_KEY)){
                setLocalStorage(MEMORY_KEY,Number(DISPLAY_SCREEN.textContent) + Number(getLocalStorage(MEMORY_KEY)))
            }
            else{
                alert(MEMORY_EMPTY)
            }
            break
        case MEMORY_OPERATION.memorySubtract:
            if(getLocalStorage(MEMORY_KEY)){
                setLocalStorage(MEMORY_KEY, getLocalStorage(MEMORY_KEY) - DISPLAY_SCREEN.textContent)
            }
            else{
                alert(MEMORY_EMPTY)
            }            
            break
        case MEMORY_OPERATION.memorySave:
            if(DISPLAY_SCREEN.textContent.match(/^\d+$/)){
                setLocalStorage(MEMORY_KEY,DISPLAY_SCREEN.textContent)
                const nodeList = document.querySelectorAll('.light')
                updateNodeList(nodeList, 'color', 'black')
            }
            else{
                alert(ONLY_DIGITS)
            }
            break
    }
}