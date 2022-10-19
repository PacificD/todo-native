/*
 * @Author: Pacific_D
 * @Date: 2022-08-05 16:31:03
 * @LastEditTime: 2022-08-05 19:37:02
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\task-item.tsx
 */
import {
  Box,
  Checkbox,
  HStack,
  Text,
  themeTools,
  useColorModeValue,
  useTheme
} from "native-base"
import React, { FC } from "react"
import { Pressable } from "react-native"
import AnimatedCheckbox from "./animated-checkbox"

interface IProps {
  isDone: boolean
  onToggleCheckbox?: () => void
}

const TaskItem: FC<IProps> = ({ isDone, onToggleCheckbox }) => {
  const theme = useTheme()
  const highlightColor = themeTools.getColor(
      theme,
      useColorModeValue("blue.500", "blue.400")
    ),
    boxStroke = themeTools.getColor(
      theme,
      useColorModeValue("muted.300", "muted.500")
    ),
    checkmarkColor = themeTools.getColor(
      theme,
      useColorModeValue("white", "white")
    ),
    activeTextColor = themeTools.getColor(
      theme,
      useColorModeValue("darkText", "lightText")
    ),
    doneTextColor = themeTools.getColor(
      theme,
      useColorModeValue("muted.400", "muted.600")
    )

  return (
    <HStack
      alignItems="center"
      w="full"
      px={4}
      py={2}
      bg={useColorModeValue("warmGray.50", "primary.900")}
    >
      <Box w={30} h={30} mr={2}>
        <Pressable onPress={onToggleCheckbox}>
          {/* <AnimatedCheckbox
          highlightColor={highlightColor}
          checkmarkColor={checkmarkColor}
          boxOutlineColor={boxStroke}
          checked={isDone}
        /> */}
          <Checkbox isChecked={isDone} value="check" aria-label="checkbox" />
        </Pressable>
      </Box>
      <Text>Task item</Text>
    </HStack>
  )
}

export default TaskItem
