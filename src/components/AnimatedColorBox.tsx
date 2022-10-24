/*
 * @Author: Pacific_D
 * @Date: 2022-10-19 23:08:25
 * @LastEditTime: 2022-10-19 23:11:07
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\AnimatedColorBox.tsx
 */
import { useEffect } from "react"
import { Box, useToken } from "native-base"
import usePrevious from "../utils/usePrevious"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor
} from "react-native-reanimated"

const AnimatedBox = Animated.createAnimatedComponent(Box)

const AnimatedColorBox = ({ bg, ...props }: any) => {
  const hexBg = useToken("colors", bg)
  const prevHexBg = usePrevious(hexBg)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = 0
  }, [hexBg])

  const animatedStyles = useAnimatedStyle(() => {
    progress.value = withTiming(1, { duration: 200 })
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [prevHexBg || hexBg, hexBg]
      )
    }
  }, [hexBg])
  return <AnimatedBox {...props} style={animatedStyles} />
}

export default AnimatedColorBox
