/*
 * @Author: Pacific_D
 * @Date: 2022-10-21 20:00:49
 * @LastEditTime: 2022-10-25 21:49:30
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\store\index.ts
 */
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import todoReducer, {
  addTodo,
  deleteTodo,
  toggleTodo,
  initialTodo,
  modifyTodo,
  cleatTodoList
} from "./todoSlice"

const store = configureStore({
  reducer: {
    todoList: todoReducer
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export {
  addTodo,
  deleteTodo,
  toggleTodo,
  initialTodo,
  modifyTodo,
  cleatTodoList
}

export default store
