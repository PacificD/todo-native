/*
 * @Author: Pacific_D
 * @Date: 2022-03-29 11:37:26
 * @LastEditTime: 2022-10-25 18:35:31
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\screens\MainScreen\index.tsx
 */
import { FC, useCallback, useEffect, useRef } from "react"
import { useColorModeValue, Fab, Icon } from "native-base"
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
  toggleTodo
} from "@store"
import shortid from "shortid"
import { TodoID } from "@types"

const MainScreen: FC = () => {
  const dispatch = useAppDispatch(),
    { entities: todoList, isLoading } = useAppSelector(state => state.todoList),
    scrollY = useRef(new Animated.Value(0)).current,
    scrollRef = useRef(null)

  const createTodo = useCallback(() => {
      const id = shortid.generate()
      dispatch(
        addTodo({
          id,
          content: "",
          isDone: false
        })
      )
    }, []),
    removeTodo = useCallback((id: TodoID) => dispatch(deleteTodo(id)), []),
    toggleTodoState = useCallback((id: TodoID) => dispatch(toggleTodo(id)), [])

  useEffect(() => {
    isLoading && dispatch(initialTodo())
  }, [isLoading])

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.200", "primary.900")}
      w="full"
    >
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
