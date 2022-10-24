/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 10:48:44
 * @LastEditTime: 2022-10-23 22:27:29
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\App.tsx
 */
import { FC } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { AppContainer, Sidebar } from "@components"
import { MainScreen, PromptScreen } from "@screens"

const Drawer = createDrawerNavigator()

const App: FC = () => {
  return (
    <AppContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={props => <Sidebar {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "back",
          overlayColor: "#00000000"
        }}
      >
        <Drawer.Screen name="Main" component={MainScreen} />
        <Drawer.Screen name="Prompt" component={PromptScreen} />
      </Drawer.Navigator>
    </AppContainer>
  )
}

export default App
