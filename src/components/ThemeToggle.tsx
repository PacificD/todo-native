/*
 * @Author: Pacific_D
 * @Date: 2022-08-04 20:48:01
 * @LastEditTime: 2022-08-04 20:49:57
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\theme-toggle.tsx
 */
import React, { FC } from "react"
import { Text, HStack, Switch, useColorMode } from "native-base"

const ThemeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
      ></Switch>
      <Text>Light</Text>
    </HStack>
  )
}

export default ThemeToggle
