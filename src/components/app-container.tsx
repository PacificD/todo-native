/*
 * @Author: Pacific_D
 * @Date: 2022-08-04 20:35:17
 * @LastEditTime: 2022-08-04 20:40:19
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\app-container.tsx
 */
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import theme from "../theme"

type IProps = {
  children: React.ReactNode
}

export default function AppContainer(props: IProps) {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
    </NavigationContainer>
  )
}
