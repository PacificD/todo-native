/*
 * @Author: Pacific_D
 * @Date: 2022-05-20 10:39:45
 * @LastEditTime: 2022-07-13 16:25:29
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\hooks\useClickAway.ts
 */
import { useEffect, useRef } from "react"

// 定义默认事件 鼠标click
const defaultEvent = "click"

// 定义事件类型，浏览器的鼠标事件，移动端的触摸事件
type EventType = MouseEvent | TouchEvent

type TargetType<T> = React.RefObject<T extends HTMLElement ? T : HTMLElement>

/**
 * @description: 管理目标元素外事件的 Hook
 * 触发目标区域外的dom事件时，触发回调函数
 * @return {*}
 */
const useClickAway = (
    onClickAway: (e: EventType) => void,
    target: TargetType<React.RefObject<any>> | TargetType<React.RefObject<any>>[], // 目标dom目标dom数组
    eventName: keyof WindowEventMap = defaultEvent // 监听的事件
) => {
    const onClickAwayRef = useRef(onClickAway)
    onClickAwayRef.current = onClickAway

    useEffect(() => {
        const handler = (event: any) => {
            const targetArray = Array.isArray(target) ? target : [target]

            if (
                targetArray.some(item => {
                    // 拿到dom
                    const targetElement = item.current as HTMLElement
                    // 目标dom不存在或者目标dom内含有触发事件的事件源的dom,则不执行
                    return !targetElement || targetElement.contains(event.target)
                })
            ) {
                return
            }
            onClickAwayRef.current(event)
        }
        document.addEventListener(eventName, handler)

        return () => {
            document.removeEventListener(eventName, handler)
        }
    }, [eventName, target])
}

export default useClickAway
