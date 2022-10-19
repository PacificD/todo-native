/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 10:48:44
 * @LastEditTime: 2022-08-05 19:48:39
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\App.tsx
 */
import React, { FC } from "react"
import AppContainer from "./src/components/app-container"
import StrokeAnimation from "./src/components/StrokeAnimation"
import Main from "./src/screens/main-screen"

const App: FC = () => {
  return (
    <AppContainer>
      {/* <Main /> */}
      <StrokeAnimation />
    </AppContainer>
  )
}

export default App
