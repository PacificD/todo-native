/*
 * @Author: Pacific_D
 * @Date: 2022-08-05 20:21:13
 * @LastEditTime: 2022-08-05 20:29:51
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\StrokeAnimation\AnimatedStroke.tsx
 */

import React, { FC, useState, useRef } from "react"
import Animated from "react-native-reanimated"
import { Path } from "react-native-svg"

interface IProps {
  d: string
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const AnimatedStroke: FC<IProps> = ({ d }) => {
  const [length, setLength] = useState(0),
    ref = useRef<typeof AnimatedPath>(null)

  return (
    <AnimatedPath
      ref={ref}
      d={d}
      stroke="black"
      strokeWidth={10}
      onLayout={() => setLength(ref.current!.getTotalLength())}
      strokeDasharray={length}
      strokeDashoffset={0}
    />
  )
}

export default AnimatedStroke
