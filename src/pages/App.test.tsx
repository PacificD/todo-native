/*
 * @Author: Pacific_D
 * @Date: 2022-04-25 22:58:45
 * @LastEditTime: 2022-07-14 10:27:28
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \react-demo\src\pages\App.test.tsx
 */
import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
