/*
 * @Author: Pacific_D
 * @Date: 2022-10-19 23:02:39
 * @LastEditTime: 2022-10-19 23:02:40
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\MenuButton.tsx
 */
import { FC } from "react"
import { Button, Icon, IButtonProps } from "native-base"
import { Feather } from "@expo/vector-icons"

interface IProps extends IButtonProps {
  active: boolean
  icon: string
  children: React.ReactNode
}

const MenuButton: FC<IProps> = ({ active, icon, children, ...props }) => {
  return (
    <Button
      size="lg"
      _light={{
        colorScheme: "blue",
        _pressed: {
          bg: "primary.100"
        },
        _text: {
          color: active ? "blue.50" : "blue.500"
        }
      }}
      _dark={{
        colorScheme: "darkBlue",
        _pressed: {
          bg: "primary.600"
        },
        _text: {
          color: active ? "blue.50" : undefined
        }
      }}
      bg={active ? undefined : "transparent"}
      variant="solid"
      justifyContent="flex-start"
      leftIcon={<Icon as={Feather} name={icon} size="sm" opacity={0.5} />}
      {...props}
    >
      {children}
    </Button>
  )
}

export default MenuButton
