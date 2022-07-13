/*
 * @Author: Pacific_D
 * @Date: 2022-04-26 14:29:45
 * @LastEditTime: 2022-07-13 16:20:09
 * @LastEditors: Pacific_D
 * @Description: 事件监听hook
 * @FilePath: \react-demo\src\hooks\useEventListener.ts
 */
import { useEffect, useRef, useCallback, RefObject } from "react"

interface IUseEventListener {
    eventType: keyof WindowEventMap
    listener: EventListener
    element?: RefObject<Element> | Document | Window | null
    options?: AddEventListenerOptions
}

/**
 * @description: 事件监听hook
 * @param {string} eventType： 事件类型
 * @param {Function} listener: 监听器函数
 * @param {*} element: 监听的对象，可选
 * @param {*} options: addeventlistener的其他配置，可选
 * @return {*}
 */
const useEventListener = ({
    eventType,
    listener,
    element = null,
    options
}: IUseEventListener) => {
    const savedListener = useRef<EventListener>()

    useEffect(() => {
        savedListener.current = listener
    }, [listener])

    const eventListener = useCallback(
        (event: Event) => savedListener.current?.(event),
        []
    )

    useEffect(() => {
        const target =
            element && "current" in element ? element.current : element

        if (!target?.addEventListener) return

        target?.addEventListener(eventType, eventListener, options)

        return () => {
            target?.removeEventListener(eventType, eventListener)
        }
    }, [eventType, element, eventListener, options])
}

export default useEventListener
