/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 11:37:26
 * @LastEditTime: 2022-10-24 20:18:04
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\screens\MainScreen\index.tsx
 */
import { FC, useCallback, useEffect } from "react"
import { Center, Heading, VStack, useTheme, Input, Text } from "native-base"
import Animated from "react-native-reanimated"
import { ScreenWrapper } from "@components"
import { useAppSelector, useAppDispatch, addTodo, initialTodo } from "@store"
import shortid from "shortid"
import { useAsyncStorage } from "@react-native-async-storage/async-storage"

const MainScreen: FC = () => {
  const dispatch = useAppDispatch(),
    { entities: todoList, isLoading } = useAppSelector(state => state.todoList),
    { getItem, setItem } = useAsyncStorage("todoList")

  const createTodo = useCallback(() => {
    const id = shortid.generate()
    dispatch(
      addTodo({
        id,
        content: "",
        isDone: false
      })
    )
  }, [])

  useEffect(() => {
    isLoading && dispatch(initialTodo())
    console.log("refresh: ", todoList)
  }, [isLoading])

  return (
    <ScreenWrapper iconPressCallback={createTodo}>
      {isLoading
        ? ""
        : todoList.map(todo => <Text key={todo.id}>{todo.id}</Text>)}
    </ScreenWrapper>
  )
}

export default MainScreen
