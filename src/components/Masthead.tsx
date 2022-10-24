/*
 * @Author: Pacific_D
 * @Date: 2022-10-21 21:30:53
 * @LastEditTime: 2022-10-23 22:08:56
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\Masthead.tsx
 */
import { FC, useCallback, useRef } from "react"
// import { ImageSourcePropType } from "react-native"
import { Box, Heading, IconButton, VStack } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import Animated from "react-native-reanimated"
import { Feather } from "@expo/vector-icons"
import TypeWriter, { TypeWriterConfig } from "./TypeWriter"
import { PROMPTS } from "@conf"

interface IProps {
  title: string
  image: any
  scrollY: Animated.Value<0>
}

const typeWriterConfig: TypeWriterConfig = {
  containerStyle: {
    marginHorizontal: 24
  },
  fontSize: 14,
  cursorSize: 22,
  cursorColor: "pink"
}

const HEIGHT = 300

const Masthead: FC<IProps> = ({ title, image, scrollY }) => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>(),
    handlePressMenuButton = useCallback(() => {
      navigation.openDrawer()
    }, [navigation])

  return (
    <Animated.View
      style={{
        height: HEIGHT,
        paddingBottom: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [-HEIGHT, 0, HEIGHT],
              outputRange: [HEIGHT / 2, 0, 0]
            })
          }
        ]
      }}
    >
      <Animated.Image
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: HEIGHT,
          resizeMode: "cover",
          transform: [
            {
              scale: scrollY.interpolate({
                inputRange: [-HEIGHT, 0, HEIGHT],
                outputRange: [2, 1, 1]
              })
            }
          ]
        }}
        source={image}
        // alt="masthead image"
      />
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        position="absolute"
        top={8}
        left={6}
        _icon={{
          as: Feather,
          name: "menu",
          size: 6,
          color: "white"
        }}
        translateY={0}
      />
      <Box flex={1} />
      <Heading color="white" p={6} size="xl">
        {title}
      </Heading>
      <TypeWriter content={PROMPTS} config={typeWriterConfig} />
    </Animated.View>
  )
}

export default Masthead
