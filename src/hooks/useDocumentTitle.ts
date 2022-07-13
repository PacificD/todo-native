/*
 * @Author: Pacific_D
 * @Date: 2022-04-26 13:39:35
 * @LastEditTime: 2022-07-13 16:19:07
 * @LastEditors: Pacific_D
 * @Description: 修改页面title的hook
 * @FilePath: \react-demo\src\hooks\useDocumentTitle.ts
 */

import { useEffect, useRef } from "react"

/**
 * @description: 用于修改页面title的hook
 * @param {string} title
 * @param {boolean} retainOnUnmount: 可选
 * @return {*}
 */
function useDocumentTitle(title: string, retainOnUnmount = false) {
    const defaultTitle = useRef(document.title)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!retainOnUnmount) {
                document.title = defaultTitle.current
            }
        }
    }, [])
}

export default useDocumentTitle
