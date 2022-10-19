/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 10:48:44
 * @LastEditTime: 2022-10-19 21:13:01
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\App.tsx
 */
import React, { FC } from "react"
import AppContainer from "./src/components/AppContainer"
import Main from "./src/screens/MainScreen"

const App: FC = () => {
  return (
    <AppContainer>
      <Main />
    </AppContainer>
  )
}

export default App
