import { getExpression, replaceExpression } from "./index.js"
import { replaceDisplayScreenContent} from "./constant.js"

/**
 * event listeners for triggering exponential mode
 */
document.getElementById("fe").addEventListener("click",toggleExponential)

/**
 * keeps track of whether the exponential mode is enabled
 * @type {boolean}
 */
let isExponential = false

/**
 * Toggles the exponential notation of the number on the display.
 * converts between standard numeric representation and scientific notation.
 */
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