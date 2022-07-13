/*
 * @Author: Pacific_D
 * @Date: 2022-04-25 22:58:45
 * @LastEditTime: 2022-07-13 16:41:52
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\pages\App.tsx
 */
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react"
import useClickAway from "../hooks/useClickAway"
import useDebounceFn from "../hooks/useDebounceFn"
import useDocumentTitle from "../hooks/useDocumentTitle"
import useEventListener from "../hooks/useEventListener"
import useImageOnLoad from "../hooks/useImageOnLoad"
import useInViewport from "../hooks/useInViewport"
import useLocalStorage from "../hooks/useLocalStorage"
import useMap from "../hooks/useMap"
import useScrollTo from "../hooks/useScrollTo"
import useTrottleFn from "../hooks/useTrottleFn"
import Test from "./Test"

function App() {
    // useDocumentTitle
    const [value, setValue] = useState("page title")
    const [show, setIsShow] = useState(true)
    const toggleIsShow = useCallback(() => {
        setIsShow(show => !show)
    }, [])

    useDocumentTitle(value, true)

    // useEventListener
    const inputRef = useRef<HTMLInputElement>(null)

    useEventListener({
        eventType: "change",
        listener: e => {
            console.log((e.target as HTMLInputElement).value)
        },
        element: inputRef
    })

    // useLocalStoarge
    const { state, setLocalStorageState } = useLocalStorage<object>(
        "demo-dev-1.0-test",
        {
            name: "mama",
            age: 20
        }
    )

    const setStorage = () => {
        setLocalStorageState(inputRef.current?.value as any)
    }

    // useImageOnLoaded
    const { handleImageOnLoad, css } = useImageOnLoad()

    const style: { [key: string]: CSSProperties } = {
        wrap: {
            position: "relative",
            width: 400,
            height: 400,
            margin: "auto"
        },
        image: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        }
    }

    //useDebounce
    const [num, setNum] = useState(0)
    const incrNumDebounce = useDebounceFn<string>(
        (sf: string) => {
            setNum(num => num + 1)
            console.log(sf)
        },
        1000,
        "debounceFn"
    )
    const incrNumTrottle = useTrottleFn<string>(
        (sf: string) => {
            setNum(num => num + 1)
            console.log(sf)
        },
        1000,
        "trottleFn"
    )

    // useScrollTo
    const scrollElementRef = useRef<HTMLDivElement>(null)
    const scrollTo = useScrollTo(scrollElementRef, 5000)

    useEventListener({
        eventType: "keydown",
        listener: (e: Event) => {
            if ((e as KeyboardEvent).code === "Enter") {
                scrollTo()
            }
        },
        element: window
    })

    //useMap
    const initState: Iterable<readonly [string, number]> = [
        ["age", 20] as [string, number]
    ]
    const [map, mapAction] = useMap<string, number>(initState)

    // useClickAway
    const imgRef = useRef<HTMLImageElement>(null),
        bgRef = useRef<HTMLDivElement>(null)
    useClickAway(() => {
        console.log("yes!")
    }, [imgRef, bgRef])

    // useInview
    // const intersectionRef = useRef<HTMLDivElement>(null),
    //   {inViewport, ratio} = useInViewport(intersectionRef)

    return (
        <div className="App" style={{ position: "relative" }}>
            {JSON.stringify(state)}
            <br />
            <button onClick={setStorage}>setStorage</button>
            <br />
            <button onClick={toggleIsShow}>click</button>
            {show ? (
                <input
                    onChange={e => setValue(e.target.value)}
                    ref={inputRef}
                    value={value}
                />
            ) : (
                ""
            )}
            <div style={style.wrap}>
                {/* Small image load fast */}
                <img
                    alt="thumbnail"
                    src="https://via.placeholder.com/50"
                    style={{ ...style.image, ...css.thumbnail }}
                />
                {/* Full size image */}
                <img
                    alt="fullImage"
                    onLoad={handleImageOnLoad}
                    ref={imgRef}
                    src="https://w.wallhaven.cc/full/y8/wallhaven-y8oxmk.jpg"
                    style={{ ...style.image, ...css.fullSize }}
                />
            </div>
            <div style={{ fontSize: "24px", marginLeft: "64px" }}>
                num: {num} &emsp;{" "}
                <button onClick={incrNumDebounce}>incr-debounce</button>{" "}
                <button onClick={incrNumTrottle}>incr-trottle</button>
            </div>
            <div
                ref={bgRef}
                style={{
                    background: "#0077ff",
                    width: "100%",
                    height: "512px"
                }}
            ></div>
            <div
                ref={scrollElementRef}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: " center",
                    margin: "64px 0"
                }}
            >
                scrollTo
            </div>
            <Test />
            <div style={{ width: "100%", height: "100vh" }}></div>
            {/* <div  style={{
        position: 'fixed',
        top: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        isInviewport: {inViewport},
        ratio: {ratio}
      </div>
      <div ref={intersectionRef} style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'red'
      }}>useInViewport</div> */}
        </div>
    )
}

export default App
