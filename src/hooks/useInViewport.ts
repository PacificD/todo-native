/*
 * @Author: Pacific_D
 * @Date: 2022-05-22 20:36:10
 * @LastEditTime: 2022-07-13 16:18:59
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\hooks\useInViewport.ts
 */
import { RefObject, useState } from "react"

const useInViewport = (
    target:
        | RefObject<any extends Element ? any : Element>
        | RefObject<Element>[],
    options?: IntersectionObserverInit
    // callback?: Function
) => {
    const [inViewport, setInViewport] = useState(false)
    const [ratio, setRatio] = useState(0)

    const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entrie => {
                if (entrie.intersectionRatio === 1) {
                    setInViewport(true)
                    //   callback && callback();
                } else {
                    setInViewport(false)
                }
                setRatio(entrie.intersectionRatio)
            })
        },
        options
    )

    if (Array.isArray(target)) {
        target.forEach(item => item.current && observer.observe(item.current))
    } else {
        console.log("sf", target.current)
        observer.observe(target.current)
    }

    return {
        inViewport,
        ratio
    }
}

export default useInViewport
