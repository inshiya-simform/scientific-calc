import { getExpression, replaceExpression } from "./index.js"
import { DEGREE_FE, replaceDisplayScreenContent} from "./constant.js"

document.getElementById("deg").addEventListener("click", degreeClickEventHandler)
document.getElementById("fe").addEventListener("click",toggleExponential)
let isDegreeEnabled = true
export function getIsDegreeEnabled(){
  return isDegreeEnabled
}

function degreeToggle() {
    isDegreeEnabled = !isDegreeEnabled
    document.querySelector("#deg").textContent = isDegreeEnabled ? "DEG" : "RAD"
}
   
function degreeClickEventHandler(e) {
    const degreeOrRadian = e.target.closest("button")?.value
   
    switch (degreeOrRadian) {
      case DEGREE_FE.degree:
        degreeToggle()
        break;
      case DEGREE_FE.FE:
        toggleExponential()
      default:
        break
    }
}

let isExponential = false
   
export function toggleExponential() {
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