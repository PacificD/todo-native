/*
 * @Author: Pacific_D
 * @Date: 2022-04-26 15:52:06
 * @LastEditTime: 2022-07-13 16:19:44
 * @LastEditors: Pacific_D
 * @Description: 操作localStorage的hook
 * @FilePath: \react-demo\src\hooks\useLocalStorage.ts
 */
import { useState, useEffect, useCallback } from "react"
import CryptoJS from "crypto-js"

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("ef94a38d51c20b76")
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("ef94a38d51c20b76")

// 加密方法
function encrypt(data: any): string {
    if (typeof data === "object") {
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.error("encrypt error:", error)
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
}

// 解密方法
function decrypt(data: string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

/**
 * @description: 操作localStorage的hook，通过泛型约束value
 * @param {string} key
 * @param {any} initialValue
 * @return {*} {state, setLocalStorageState}
 */
function useLocalStorage<T>(key = "", initialValue: T) {
    const [state, setState] = useState<T | null>(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item) {
                return JSON.parse(decrypt(item))
            }
            return initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    const setLocalStorageState = useCallback((newState: T) => {
        try {
            if (!newState) {
                setState(null)
                window.localStorage.removeItem(key)
            } else {
                const newStateValue =
                    typeof newState === "function" ? newState(state) : newState
                setState(newStateValue)
                window.localStorage.setItem(key, encrypt(newStateValue))
            }
        } catch (error) {
            console.error(
                `Unable to store new value for ${key} in localStorage. error: ${error}`
            )
        }
    }, [])

    useEffect(() => {
        initialValue && setLocalStorageState(initialValue)
    }, [])

    return { state, setLocalStorageState }
}

export default useLocalStorage
