/**
 * @Author: Pacific_D
 * @Date: 2022-03-20 16:01:04
 * @LastEditTime: 2022-07-14 10:12:41
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\utils\scrollTo.js
 */
import { animateScroll } from "./animateScroll"

const logError = () =>
    console.error(
        "Invalid element, are you sure you've provided element id or react ref?"
    )

const getElementPosition = element => element.offsetTop

export const scrollTo = ({ id, ref = null, duration = 2500 }) => {
    // the position of the scroll bar before the user clicks the button
    const initialPosition = window.scrollY

    // decide what type of reference that is
    // if neither ref or id is provided  set element to null
    const element = ref ? ref.current : id ? document.getElementById(id) : null

    if (!element) {
        // log error if the reference passed is invalid
        logError()
        return
    }

    animateScroll({
        targetPosition: getElementPosition(element),
        initialPosition,
        duration
    })
}
