/*
 * @Author: Pacific_D
 * @Date: 2022-10-21 21:35:54
 * @LastEditTime: 2022-10-21 21:37:01
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\screens\PromptScreen\index.tsx
 */
import { FC } from "react"
import { Text, Box, Center, VStack, useColorModeValue } from "native-base"

const PromptScreen: FC = () => {
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
      </VStack>
    </Center>
  )
}

export default PromptScreen
