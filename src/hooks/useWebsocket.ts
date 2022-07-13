/*
 * @Author: Pacific_D
 * @Date: 2022-05-20 10:17:37
 * @LastEditTime: 2022-07-13 16:19:21
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\hooks\useWebsocket.ts
 */
import { useCallback, useLayoutEffect, useRef } from "react"

export type WebSocketConfig = {
    url: string
    onmessage?: ((this: WebSocket, ev: MessageEvent<any>) => any) | null
    onopen?: (this: WebSocket, ev: Event) => any
    onclose?: ((this: WebSocket, ev: CloseEvent) => any) | null
    onerror?: ((this: WebSocket, ev: Event) => any) | null
    send: Function
}

const useWebsocket = (config: WebSocketConfig) => {
    const socket = useRef<WebSocket | null>(null)

    const webSocketInit = useCallback(() => {
        if (!socket.current || socket.current.readyState === 3) {
            socket.current = new WebSocket(config.url)

            socket.current.onopen =
                config.onopen || (() => console.log("新建连接"))
            socket.current.onclose =
                config.onclose || (() => console.log("断开连接"))
            socket.current.onerror =
                config.onerror || (() => console.log("连接错误"))
        }
    }, [config.url, config.onopen, config.onclose, config.onerror])

    const setSocketOnmessage = useCallback(() => {
        if (socket.current) {
            socket.current.onmessage =
                config.onmessage || (msg => console.log("收到消息: ", msg.data))
        }
    }, [config.onmessage])

    useLayoutEffect(() => {
        webSocketInit()

        return () => {
            socket.current?.close()
        }
    }, [socket, webSocketInit])

    useLayoutEffect(() => {
        setSocketOnmessage()
    }, [setSocketOnmessage])

    const sendMessage = config.send

    return {
        socket,
        sendMessage
    }
}

export default useWebsocket
