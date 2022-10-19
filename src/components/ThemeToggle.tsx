/*
 * @Author: Pacific_D
 * @Date: 2022-08-04 20:48:01
 * @LastEditTime: 2022-10-19 22:57:25
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\ThemeToggle.tsx
 */
import { FC } from "react"
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  useColorModeValue
} from "native-base"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"

const ThemeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack space={2} alignItems="center">
      <Ionicons
        name="moon"
        size={24}
        color={useColorModeValue("#282c3f", "#eee")}
      />
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
      ></Switch>
      <MaterialCommunityIcons
        name="lightbulb-on"
        size={24}
        color={useColorModeValue("#282c3f", "#eee")}
      />
    </HStack>
  )
}

export default ThemeToggle
