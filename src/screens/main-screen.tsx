/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 11:37:26
 * @LastEditTime: 2022-08-05 16:43:27
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\screens\main-screen.tsx
 */
import React, { FC, useCallback, useState } from "react"
import { Pressable } from "react-native"
import {
  Text,
  Box,
  Center,
  VStack,
  useColorModeValue,
  Checkbox
} from "native-base"
import ThemeToggle from "../components/theme-toggle"
import AnimatedCheckbox from "../components/animated-checkbox"
import TaskItem from "../components/task-item"

const MainScreen: FC = () => {
  const [checked, setChecked] = useState(false)
  const handlePressCheckbox = () => {
    setChecked(prev => !prev)
  }

  return (
    <Center
      px={4}
      flex={1}
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
    >
      <VStack space={5} alignItems="center">
        <Box w="100px" h="100px">
          <TaskItem isDone={checked} onToggleCheckbox={handlePressCheckbox} />
        </Box>
        <Box bg={useColorModeValue("red.500", "yellow.500")} p={10}>
          <Text>useMemo</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default MainScreen
