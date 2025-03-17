/**
 * event listeners for triggering degree/radian mode
 */
document.getElementById("deg").addEventListener("click", degreeClickEventHandler)

/**
 * toggles between degree and radian mode.
 * @type {boolean}
 */
export let isDegreeEnabled = true

/**
 * toggles the degree/radian mode and updates the button text accordingly.
 */
function degreeToggle() {
    isDegreeEnabled = !isDegreeEnabled
    document.querySelector("#deg").textContent = isDegreeEnabled ? "DEG" : "RAD"
}

/**
 * handles the click event for the degree/radian and F-E button.
 * @param {Event} e - the event object triggered by the click event.
 */
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