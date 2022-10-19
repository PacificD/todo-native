/*
 * @Author: Pacific_D
 * @Date: 2022-10-19 21:10:44
 * @LastEditTime: 2022-10-19 21:10:45
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\InputField.tsx
 */
/*
 * @Author: Pacific_D
 * @Date: 2022-10-19 16:19:35
 * @LastEditTime: 2022-10-19 20:45:03
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \learn-react-native\src\components\InputField.tsx
 */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardTypeOptions
} from "react-native"
import { FC } from "react"

interface IProps {
  label: string
  icon: React.ReactNode
  inputPassword?: boolean
  keyboardType?: KeyboardTypeOptions | undefined
  fieldButtonLabel?: string
  fieldButtonFunction?: () => void
}

const InputField: FC<IProps> = ({
  label,
  icon,
  inputPassword,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25
      }}
    >
      {icon}
      {inputPassword ? (
        <TextInput
          placeholder={label}
          placeholderTextColor="#aaa"
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          placeholderTextColor="#aaa"
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0 }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default InputField
