/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 11:37:26
 * @LastEditTime: 2022-08-04 20:58:37
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \animated-todo\src\screens\main-screen.tsx
 */
import React, { FC, useCallback, useState } from "react"
import { Text, Box, Center, VStack } from "native-base"
import ThemeToggle from "../components/theme-toggle"

const MainScreen: FC = () => {
  return (
    <Center
      px={4}
      flex={1}
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
    >
      <VStack space={5} alignItems="center">
        <Box>
          <Text>useMemo</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default MainScreen
