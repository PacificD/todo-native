/*
 * @Author: Pacific_D
 * @Date: 2022-10-21 20:06:17
 * @LastEditTime: 2022-10-25 21:49:04
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\store\todoSlice.ts
 */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Todo, TodoList, TodoID } from "@types"

export const initialTodo = createAsyncThunk(
  "todoList/initialTodo",
  async () => {
    let storage = await AsyncStorage.getItem("todoList")
    return storage ? JSON.parse(storage) : []
  }
)

export const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    entities: [] as TodoList,
    isLoading: true
  },
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.entities.unshift(action.payload)
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(state.entities))
      })()
    },
    deleteTodo: (state, action: PayloadAction<TodoID>) => {
      state.entities = state.entities.filter(todo => todo.id !== action.payload)
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(state.entities))
      })()
    },
    toggleTodo: (state, action: PayloadAction<TodoID>) => {
      state.entities.forEach(todo => {
        if (todo.id === action.payload) todo.isDone = !todo.isDone
      })
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(state.entities))
      })()
    },
    modifyTodo: (
      state,
      action: PayloadAction<{
        id: TodoID
        newContent: string
      }>
    ) => {
      const { id, newContent } = action.payload
      state.entities.forEach(todo => {
        if (todo.id === id) todo.content = newContent
      })
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(state.entities))
      })()
    },
    cleatTodoList: state => {
      state.entities = []
      ;(async () => {
        await AsyncStorage.setItem("todoList", JSON.stringify(state.entities))
      })()
    }
  },
  extraReducers: builder => {
    builder.addCase(initialTodo.fulfilled, (state, { payload }) => {
      state.entities = state.entities.concat(payload)
      state.isLoading = false
    })
  }
})

export const { addTodo, deleteTodo, toggleTodo, modifyTodo, cleatTodoList } =
  todoSlice.actions

export default todoSlice.reducer
