/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 10:48:44
 * @LastEditTime: 2022-08-04 20:50:43
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \animated-todo\App.tsx
 */
import React, { FC } from "react"
import AppContainer from "./src/components/app-container"
import Main from "./src/screens/main-screen"

const App: FC = () => {
  return (
    <AppContainer>
      <Main />
    </AppContainer>
  )
}

export default App
