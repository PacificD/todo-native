/*
 * @Author: Pacific_D
 * @Date: 2022-05-10 15:18:37
 * @LastEditTime: 2022-07-14 10:27:25
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\pages\Test.tsx
 */
import { useEffect, useState } from "react"

const Test = () => {
    const [isPaused, setPause] = useState(false)

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8082/send/1")
        ws.onopen = () => console.log("ws opened")
        ws.onclose = () => console.log("ws closed")

        ws.onmessage = e => {
            if (isPaused) return
            const message = JSON.parse(e.data)
            console.log("e", message)
        }

        return () => {
            ws.close()
        }
    }, [])

    return (
        <div>
            <button onClick={() => setPause(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
            </button>
        </div>
    )
}

export default Test
