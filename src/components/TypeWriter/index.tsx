/*
 * @Author: Pacific_D
 * @Date: 2022-10-22 17:06:54
 * @LastEditTime: 2022-10-23 15:51:56
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\TypeWriter\index.tsx
 */
import { FC } from "react"
import { View, Text, StyleProp, ViewStyle } from "react-native"
import useTypeWriter from "./useTypeWriter"

export type TypeWriterConfig = {
  containerStyle?: StyleProp<ViewStyle>
  fontSize?: number
  fontWeight?: number
  color?: string
  cursorSize?: number
  cursorColor?: string
}

interface IProps {
  content: Array<string>
  config?: TypeWriterConfig
}

const TypeWriter: FC<IProps> = ({ content, config }) => {
  const { typed } = useTypeWriter(content)

  return (
    <View
      style={[
        {
          alignItems: "center",
          flexDirection: "row"
        },
        config?.containerStyle
      ]}
    >
      <Text
        style={{
          color: config?.color ?? "#fff",
          fontSize: config?.fontSize ?? 20
        }}
      >
        {typed}
      </Text>
      <Text
        style={{
          marginLeft: 4,
          fontSize: config?.cursorSize ?? 30,
          color: config?.cursorColor ?? "#22d3ee"
        }}
      >
        |
      </Text>
    </View>
  )
}

export default TypeWriter
