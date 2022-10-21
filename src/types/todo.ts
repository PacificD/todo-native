/*
 * @Author: Pacific_D
 * @Date: 2022-10-21 20:06:28
 * @LastEditTime: 2022-10-21 20:24:47
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\types\todo.ts
 */
export type TodoID = string

export type Todo = {
  id: string
  content: string
  isDone: boolean
}

export type TodoList = Array<Todo>
