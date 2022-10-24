/*
 * @Author: Pacific_D
 * @Date: 2022-10-23 22:24:06
 * @LastEditTime: 2022-10-23 22:52:01
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\ScreenWrapper.tsx
 */
import { FC, useRef } from "react"
import { useColorModeValue, Fab, Icon } from "native-base"
import Animated from "react-native-reanimated"
import { AntDesign } from "@expo/vector-icons"
import AnimatedColorBox from "./AnimatedColorBox"
import Masthead from "./Masthead"
import { USER, MASTHEAD } from "@conf"

interface IProps {
  children: React.ReactNode
  iconPressCallback: () => void
}

const ScreenWrapper: FC<IProps> = ({ children, iconPressCallback }) => {
  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.50", "primary.900")}
      w="full"
    >
      <Masthead
        title={`What's up, ${USER}!`}
        image={MASTHEAD}
        scrollY={scrollY}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY }
              }
            }
          ],
          { useNativeDriver: true }
        )}
      >
        {children}
      </Animated.ScrollView>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="lg"
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />}
        onPress={iconPressCallback}
      />
    </AnimatedColorBox>
  )
}

export default ScreenWrapper
