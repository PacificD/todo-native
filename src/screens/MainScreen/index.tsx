/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 11:37:26
 * @LastEditTime: 2022-10-19 21:39:32
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\screens\MainScreen\index.tsx
 */
import { FC } from "react"
import { Text, Box, Center, VStack, useColorModeValue } from "native-base"
import ThemeToggle from "@components/ThemeToggle"

const MainScreen: FC = () => {
  return (
    <Center
      px={4}
      flex={1}
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
    >
      <VStack space={5} alignItems="center">
        <Box bg={useColorModeValue("red.500", "yellow.500")} p={10}>
          <Text>useMemo</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default MainScreen
