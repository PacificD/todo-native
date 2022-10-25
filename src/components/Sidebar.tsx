/*
 * @Author: Pacific_D
 * @Date: 2022-10-19 23:01:56
 * @LastEditTime: 2022-10-25 21:51:36
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\Sidebar.tsx
 */
import { useCallback } from "react"
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue
} from "native-base"
import { DrawerContentComponentProps } from "@react-navigation/drawer"
import AnimatedColorBox from "./AnimatedColorBox"
import { Feather } from "@expo/vector-icons"
import { USER, AVATAR_URI } from "@conf"
import ThemeToggle from "./ThemeToggle"
import MenuButton from "./MenuButton"
import { useAppDispatch, cleatTodoList } from "@store"

const Sidebar = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props,
    currentRoute = state.routeNames[state.index],
    dispatch = useAppDispatch()

  const handlePressBackButton = useCallback(() => {
      navigation.closeDrawer()
    }, [navigation]),
    handlePressMenuButton = useCallback(
      (screen: string) => {
        navigation.navigate(screen)
      },
      [navigation]
    ),
    handlePressClearButton = useCallback(() => dispatch(cleatTodoList()), [])

  return (
    <AnimatedColorBox
      safeArea
      flex={1}
      bg={useColorModeValue("blue.50", "darkBlue.800")}
      p={7}
    >
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue("blue.300", "darkBlue.700")}
            _icon={{
              as: Feather,
              name: "chevron-left",
              size: 6,
              color: useColorModeValue("blue.800", "darkBlue.700")
            }}
          />
        </HStack>
        <Avatar
          source={AVATAR_URI}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        />
        <Heading mb={4} size="xl">
          {USER}
        </Heading>
        <MenuButton
          active={currentRoute === "Main"}
          onPress={() => handlePressMenuButton("Main")}
          icon="inbox"
        >
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === "Prompt"}
          onPress={() => handlePressMenuButton("Prompt")}
          icon="info"
        >
          Prompt
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  )
}

export default Sidebar
