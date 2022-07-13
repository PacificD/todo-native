import { useCallback } from "react"
/*
 * @Author: Pacific_D
 * @Date: 2022-04-26 17:51:20
 * @LastEditTime: 2022-07-13 16:25:38
 * @LastEditors: Pacific_D
 * @Description: 将视口按指定时间缓慢移动到元素处
 * @FilePath: \react-demo\src\hooks\useScrollTo.ts
 */
import { RefObject, useRef } from "react"
import useEventListener from "./useEventListener"

const pow = Math.pow

function easeOutQuart(x: number) {
    return 1 - pow(1 - x, 4)
}

type useScrollToType = (
    ref: RefObject<HTMLElement>,
    duration?: number
) => () => void

/**
 * @description: 将视口按指定时间缓慢移动到元素处
 * @param {RefObject} ref: ReactRefObject<HTMLElement>
 * @param {number} duration: 滚动的持续时间
 * @return {*} animateScroll: 调用该函数即可将页面视口滚到到元素处
 */
const useScrollTo: useScrollToType = (
    ref: RefObject<HTMLElement>,
    duration = 2500
) => {
    const targetPosition = ref.current?.offsetTop,
        initialPosition = useRef(window.scrollY),
        isScrolling = useRef(false)

    useEventListener({
        eventType: "scroll",
        listener: () => {
            if (!isScrolling.current) {
                initialPosition.current = window.scrollY
            }
        },
        element: window
    })

    const animateScroll = () => {
        let start: number, animationFrame: number

        const requestAnimationFrame = window.requestAnimationFrame,
            cancelAnimationFrame = window.cancelAnimationFrame

        const maxAvailableScroll =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight

        const amountOfPixelsToScroll = initialPosition.current - targetPosition!

        function step(timestamp: number) {
            if (start === undefined) {
                start = timestamp
            }
            isScrolling.current = true

            const elapsed = timestamp - start,
                relativeProgress = elapsed / duration,
                easedProgress = easeOutQuart(relativeProgress),
                position =
                    initialPosition.current -
                    amountOfPixelsToScroll * Math.min(easedProgress, 1)

            window.scrollTo(0, position)

            if (
                initialPosition.current !== maxAvailableScroll &&
                window.scrollY >= maxAvailableScroll - 2
            ) {
                isScrolling.current = false
                cancelAnimationFrame(animationFrame)
                return
            }

            if (elapsed < duration) {
                animationFrame = requestAnimationFrame(step)
            }
        }

        animationFrame = requestAnimationFrame(step)
    }

    if (!ref || !ref.current)
        return () => {
            console.error("invaild refObject!")
        }

    return animateScroll
}

export default useScrollTo
