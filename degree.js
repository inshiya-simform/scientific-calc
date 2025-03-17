import { getExpression, replaceExpression } from "./index.js"
import { replaceDisplayScreenContent} from "./constant.js"

document.getElementById("deg").addEventListener("click", degreeClickEventHandler)
document.getElementById("fe").addEventListener("click",toggleExponential)
export let isDegreeEnabled = true

function degreeToggle() {
    isDegreeEnabled = !isDegreeEnabled
    document.querySelector("#deg").textContent = isDegreeEnabled ? "DEG" : "RAD"
}
   
function degreeClickEventHandler(e) {
    const degreeOrRadian = e.target.closest("button")?.value
   
    switch (degreeOrRadian) {
      case "degree":
        degreeToggle()
        break;
      case "F-E":
        toggleExponential()
      default:
        break
    }
}

let isExponential = false
   
function toggleExponential() {
    if (!getExpression() || isNaN(Number(getExpression()))) return
   
    const num = Number(getExpression())
    isExponential = !isExponential
   
    if (isExponential) {
      const exponent = num.toExponential().split("e")
      const expressionStr = `${exponent[0]}*10**${Number(exponent[1])}`
      replaceExpression(expressionStr)
      const displayStr = `${exponent[0]}*10^${Number(exponent[1])}`
      replaceDisplayScreenContent(displayStr)
      isExponential = false
    } else {
      replaceExpression(num.toString())
      replaceDisplayScreenContent(getExpression())
    }
}