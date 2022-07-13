/*
 * @Author: Pacific_D
 * @Date: 2022-05-05 11:30:58
 * @LastEditTime: 2022-07-13 18:03:43
 * @LastEditors: Pacific_D
 * @Description: 管理map对象的hook
 * @FilePath: \react-demo\src\hooks\useMap.ts
 */
import { useState, useMemo } from "react"

/**
 * @description: 管理map对象的hook，
 * 只要有Iterable接口就可以做map的参数
 * @param {Iterable} initState
 * @return {*}
 */
export default function useMap<K, T>(initState?: Iterable<readonly [K, T]>) {
    // 保存默认值
    const initMap = useMemo(() => {
        return initState ? new Map(initState) : new Map()
    }, [initState])

    const [map, setMap] = useState<Map<K, T>>(initMap)

    const stableActions = useMemo(
        () => ({
            remove(key: K) {
                setMap(pre => {
                    const map = new Map(pre)
                    map.delete(key)
                    return map
                })
            },
            setAll(state: Iterable<readonly [K, T]>) {
                const newMap = new Map(state)
                setMap(newMap)
            },
            set(key: K, value: T) {
                setMap(pre => {
                    const map = new Map(pre)
                    map.set(key, value)
                    return map
                })
            },
            reset() {
                setMap(initMap)
            }
        }),
        [setMap, initMap]
    )

    const utils = {
        get: (key: K) => map.get(key),
        ...stableActions
    }

    return [map, utils] as const
}
