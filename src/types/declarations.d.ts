/*
 * @Author: Pacific_D
 * @Date: 2022-10-19 21:08:16
 * @LastEditTime: 2022-10-19 21:08:17
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\types\declarations.d.ts
 */
declare module "*.svg" {
  import React from "react"
  import { SvgProps } from "react-native-svg"
  const content: React.FC<SvgProps>
  export default content
}
