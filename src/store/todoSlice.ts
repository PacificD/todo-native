/*
 * @Author: Pacific_D
 * @Date: 2022-10-21 20:06:17
 * @LastEditTime: 2022-10-21 20:55:21
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\store\todoSlice.ts
 */
import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Todo, TodoList, TodoID } from "@types"

export const todoSlice = createSlice<TodoList, SliceCaseReducers<TodoList>>({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (todoList, action: PayloadAction<Todo>) => {
      if (action.payload.content.trim() === "") return todoList
      todoList.push(action.payload)
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(todoList))
      })()
    },
    deleteTodo: (todoList, action: PayloadAction<TodoID>) => {
      todoList.filter(todo => todo.id !== action.payload)
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(todoList))
      })()
    },
    toggleTodo: (todoList, action: PayloadAction<TodoID>) => {
      todoList.map(todo => {
        if (todo.id === action.payload) todo.isDone = !todo.isDone
        return todo
      })
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(todoList))
      })()
    },
    modifyTodo: (
      todoList,
      action: PayloadAction<{
        id: TodoID
        newContent: string
      }>
    ) => {
      const { id, newContent } = action.payload
      let idx = todoList.findIndex(todo => todo.id === id)
      if (idx === -1) return todoList
      todoList[idx].content = newContent
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(todoList))
      })()
    }
  }
})

export const { addTodo, deleteTodo, toggleTodo, modifyTodo } = todoSlice.actions

export default todoSlice
