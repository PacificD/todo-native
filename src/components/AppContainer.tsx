/*
 * @Author: Pacific_D
 * @Date: 2022-08-04 20:35:17
 * @LastEditTime: 2022-10-23 22:29:16
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\AppContainer.tsx
 */
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import { Provider } from "react-redux"
import store from "@store"
import theme from "../theme"

type IProps = {
  children: React.ReactNode
}

export default function AppContainer(props: IProps) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  )
}
