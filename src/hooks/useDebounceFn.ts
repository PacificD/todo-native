/*
 * @Author: Pacific_D
 * @Date: 2022-04-26 16:43:42
 * @LastEditTime: 2022-07-13 16:25:05
 * @LastEditors: Pacific_D
 * @Description: 函数防抖hook
 * @FilePath: \react-demo\src\hooks\useDebounceFn.ts
 */
import { useRef } from "react"

/**
 * @description: 函数防抖hook
 * @param {Function} fn: 需要进行防抖的函数
 * @param {number} duringTime: 防抖的持续时间
 * @param {*} ...args: 剩余参数为fn的参数，需要指定泛型T为参数的类型
 * @return {*}
 */
function useDebounceFn<T>(fn: Function, duringTime: number, ...args: Array<T>) {
    const callnow = useRef(true),
        timeout = useRef<NodeJS.Timeout | null>(null)

    return function () {
        const startTimeout = () => {
            clearTimeout(timeout.current as NodeJS.Timeout)
            timeout.current = setTimeout(() => {
                callnow.current = true
                clearTimeout(timeout.current as NodeJS.Timeout)
            }, duringTime)
        }

        if (callnow.current) {
            fn(...args)
            callnow.current = false
            startTimeout()
        } else {
            startTimeout()
        }
    }
}

export default useDebounceFn
