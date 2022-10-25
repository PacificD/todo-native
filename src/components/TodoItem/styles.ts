/*
 * @Author: Pacific_D
 * @Date: 2022-10-24 21:01:12
 * @LastEditTime: 2022-10-25 18:25:06
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\TodoItem\styles.ts
 */
import { StyleSheet } from "react-native"
import { LIST_ITEM_HEIGHT } from "@conf"

const styles = StyleSheet.create({
  taskContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 12,
    overflow: "hidden",
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5
  },
  task: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: LIST_ITEM_HEIGHT,
    paddingLeft: 20,
    borderRadius: 10
  },
  taskContent: {
    fontSize: 16
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    position: "absolute",
    width: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 48,
    backgroundColor: "red",
    opacity: 1,
    transform: [
      {
        translateX: -12
      }
    ],
    zIndex: -1
  }
})

export default styles
