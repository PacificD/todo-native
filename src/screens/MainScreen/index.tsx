/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 11:37:26
 * @LastEditTime: 2022-10-25 22:47:19
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\screens\MainScreen\index.tsx
 */
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import {
  useColorModeValue,
  Fab,
  Icon,
  Button,
  FormControl,
  Modal,
  Input
} from "native-base"
import Animated from "react-native-reanimated"
import { AntDesign } from "@expo/vector-icons"
import { USER, MASTHEAD } from "@conf"
import { TodoItem, AnimatedColorBox, Masthead } from "@components"
import {
  useAppSelector,
  useAppDispatch,
  addTodo,
  initialTodo,
  deleteTodo,
  toggleTodo,
  modifyTodo
} from "@store"
import shortid from "shortid"
import { Todo, TodoID } from "@types"
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData
} from "react-native"

const MainScreen: FC = () => {
  const dispatch = useAppDispatch(),
    { entities: todoList, isLoading } = useAppSelector(state => state.todoList),
    scrollY = useRef(new Animated.Value(0)).current,
    scrollRef = useRef(null),
    [showModal, setShowModal] = useState(false),
    [modifying, setModifying] = useState<TodoID | null>(null),
    [editingContent, setEditingContent] = useState(""),
    inputRef = useRef<TextInput | null>(null)

  const createTodo = useCallback(() => {
      const todo: Todo = {
        id: shortid.generate(),
        content: "",
        isDone: false
      }
      dispatch(addTodo(todo))
      openModifyModal(todo)
      inputRef.current?.focus()
    }, []),
    removeTodo = useCallback((id: TodoID) => dispatch(deleteTodo(id)), []),
    toggleTodoState = useCallback((id: TodoID) => dispatch(toggleTodo(id)), []),
    changeTodo = useCallback(
      (id: TodoID, newContent: string) => {
        dispatch(
          modifyTodo({
            id,
            newContent
          })
        )
        setShowModal(false)
      },
      [setShowModal, modifyTodo, dispatch]
    ),
    openModifyModal = useCallback(
      (todo: Todo) => {
        setEditingContent(todo.content)
        setModifying(todo.id)
        setShowModal(true)
      },
      [setModifying, setShowModal, setEditingContent]
    ),
    handleChangeSubject = useCallback(
      (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
        setEditingContent(e.nativeEvent.text),
      [setEditingContent]
    )

  useEffect(() => {
    isLoading && dispatch(initialTodo())
  }, [isLoading])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.200", "primary.900")}
      w="full"
    >
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Change Subject</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Content: </FormControl.Label>
              <Input
                value={editingContent}
                autoFocus
                ref={inputRef}
                blurOnSubmit
                onChange={e => handleChangeSubject(e)}
              />
            </FormControl>
            <Button.Group space={2} marginTop={4}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false)
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => changeTodo(modifying!, editingContent)}>
                Save
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Masthead
        title={`What's up, ${USER}!`}
        image={MASTHEAD}
        scrollY={scrollY}
      />
      {isLoading ? (
        ""
      ) : (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          data={todoList}
          keyExtractor={todo => todo.id}
          style={{
            width: "100%",
            paddingHorizontal: 16
          }}
          renderItem={({ item }) => {
            return (
              <TodoItem
                todo={item}
                toggleTodoState={toggleTodoState}
                removeTodo={removeTodo}
                simultaneousHandlers={scrollRef}
                openModifyModal={openModifyModal}
              />
            )
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        />
      )}
      <Fab
        renderInPortal={false}
        shadow={2}
        size="lg"
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />}
        onPress={createTodo}
      />
    </AnimatedColorBox>
  )
}

export default MainScreen
