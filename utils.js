export function $(element){   
    return {
        element: element,
        css: function (property, value){
            element.style.setProperty(property,value)
            return this
        }
    }
}

export function setLocalStorage(key, value){
    JSON.stringify(localStorage.setItem(key,value))
}

export function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}

export function removeFromLocalStorage(key){
    localStorage.removeItem(key)
}

export function updateNodeList(nodeList, property, value){
    for(const node of nodeList){
        $(node).css(property,value)
    }
}