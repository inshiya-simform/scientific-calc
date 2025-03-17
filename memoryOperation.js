import { MEMORY_OPERATION, getDisplayScreen, getDisplayScreenContent, setDisplayScreenContent, replaceDisplayScreenContent, MEMORY_EMPTY, ONLY_DIGITS, MEMORY_KEY } from "./constant.js"
import { $, setLocalStorage, getLocalStorage, removeFromLocalStorage, updateNodeList } from './utils.js'
import { setExpression } from './index.js'

const memoryOperationElement = document.getElementById('memory-op')
memoryOperationElement.addEventListener("click", handleMemoryOperation)

const nodeList = document.querySelectorAll('.light')
if(getLocalStorage(MEMORY_KEY) != null){
    updateNodeList(nodeList, 'color', 'black')
}
// function handles memory related operations
function handleMemoryOperation(e){
    const name = e.target.name
    switch(name){
        case MEMORY_OPERATION.memoryClear:
            if(getLocalStorage(MEMORY_KEY) != null){
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
            if(!getLocalStorage(MEMORY_KEY) != null){
                setDisplayScreenContent(localStorage.getItem(MEMORY_KEY))
                setExpression(getDisplayScreenContent())
            }
            else{
                alert(MEMORY_EMPTY)
            }
            break
        case MEMORY_OPERATION.memoryAdd:
            if(getLocalStorage(MEMORY_KEY) != null){
                setLocalStorage(MEMORY_KEY,Number(getDisplayScreenContent()) + Number(getLocalStorage(MEMORY_KEY)))
            }
            else{
                alert(MEMORY_EMPTY)
            }
            break
        case MEMORY_OPERATION.memorySubtract:
            if(getLocalStorage(MEMORY_KEY) != null){
                setLocalStorage(MEMORY_KEY, getLocalStorage(MEMORY_KEY) - getDisplayScreenContent())
            }
            else{
                alert(MEMORY_EMPTY)
            }            
            break
        case MEMORY_OPERATION.memorySave:
            if(getDisplayScreenContent().match(/^\d+$/)){
                setLocalStorage(MEMORY_KEY,getDisplayScreenContent())                
                updateNodeList(nodeList, 'color', 'black')
            }
            else{
                alert(ONLY_DIGITS)
            }
            break
    }
}