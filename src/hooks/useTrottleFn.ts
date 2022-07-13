/*
 * @Author: Pacific_D
 * @Date: 2022-04-26 17:20:58
 * @LastEditTime: 2022-07-13 16:20:02
 * @LastEditors: Pacific_D
 * @Description: 函数节流hook
 * @FilePath: \react-demo\src\hooks\useTrottleFn.ts
 */
import { useRef } from "react"

/**
 * @description: 函数节流hook
 * @param {Function} fn: 需要进行节流的函数
 * @param {number} duringTime: 节流的持续时间
 * @param {*} ...args: 剩余参数为fn的参数，需要指定泛型T为参数的类型
 * @return {*}
 */
function useTrottleFn<T>(fn: Function, duringTime: number, ...args: Array<T>) {
    const callnow = useRef(true),
        timeout = useRef<NodeJS.Timeout | null>(null)

    return function () {
        if (callnow.current) {
            callnow.current = false
            timeout.current = setTimeout(() => {
                fn(...args)
                callnow.current = true
                clearTimeout(timeout.current as NodeJS.Timeout)
            }, duringTime)
        }
    }
}

export default useTrottleFn
