/*
 * @Author: Pacific_D
 * @Date: 2022-10-24 21:00:56
 * @LastEditTime: 2022-10-25 18:36:48
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \todo-native\src\components\TodoItem\index.tsx
 */
import { FC, useState } from "react"
import { Dimensions, Pressable } from "react-native"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps
} from "react-native-gesture-handler"
import Animated, {
  BounceIn,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { FontAwesome5 } from "@expo/vector-icons"
import AnimatedCheckbox from "react-native-checkbox-reanimated"
import { useColorModeValue, useToken } from "native-base"
import { Todo, TodoID } from "@types"
import { LIST_ITEM_HEIGHT } from "@conf"
import styles from "./styles"
import AnimatedTaskLabel from "./AnimatedTaskLabel"

const { width: SCREEN_WIDTH } = Dimensions.get("window"),
  TRANSLATE_X_THRESHOLE = -SCREEN_WIDTH * 0.4

interface IProps extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  todo: Todo
  removeTodo: (id: TodoID) => void
  toggleTodoState: (id: TodoID) => void
}

const TodoItem: FC<IProps> = ({
  todo,
  removeTodo,
  toggleTodoState,
  simultaneousHandlers
}) => {
  const translateX = useSharedValue(0),
    itemHeight = useSharedValue(LIST_ITEM_HEIGHT),
    marginVertical = useSharedValue(10),
    opacity = useSharedValue(1)

  const [checked, setChecked] = useState<boolean>(todo.isDone),
    handleCheckboxPress = () => {
      setChecked(prev => !prev)
      toggleTodoState(todo.id)
    },
    onPressLabel = () => {},
    activeTextColor = useToken(
      "colors",
      useColorModeValue("darkText", "lightText")
    ),
    doneTextColor = useToken(
      "colors",
      useColorModeValue("muted.400", "muted.600")
    )

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: e => {
      translateX.value = e.translationX
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLE
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        itemHeight.value = withTiming(0)
        marginVertical.value = withTiming(0)
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished) {
            runOnJS(removeTodo)(todo.id)
          }
        })
      } else {
        translateX.value = withTiming(0)
      }
    }
  })

  const rStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: translateX.value
        }
      ]
    })),
    rIconContainerStyle = useAnimatedStyle(() => {
      return {
        left: SCREEN_WIDTH - 32 + translateX.value
      }
    }),
    rTaskContainerStyle = useAnimatedStyle(() => {
      return {
        height: itemHeight.value,
        marginVertical: marginVertical.value,
        opacity: opacity.value
      }
    })

  return (
    <Animated.View
      style={[styles.taskContainer, rTaskContainerStyle]}
      entering={BounceIn}
    >
      {/* delete icon */}
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name="trash-alt"
          size={LIST_ITEM_HEIGHT * 0.4}
          color="white"
        />
      </Animated.View>
      <PanGestureHandler
        // fix the confilct of PanGesture and SwipeGesture
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View
          style={[
            styles.task,
            rStyle,
            {
              backgroundColor: useColorModeValue("white", "#2e2e33")
            }
          ]}
        >
          {/* <LottieView
              autoPlay={false}
              ref={animation}
              style={{
                height: 160
              }}
              source={CHECKBOX_ANIMATION}
            /> */}
          <Pressable
            onPress={handleCheckboxPress}
            style={{
              width: 32,
              height: 32,
              marginRight: 16
            }}
          >
            <AnimatedCheckbox
              checked={checked}
              highlightColor="#2d89ef"
              checkmarkColor="#eee"
              boxOutlineColor="#2d89ef"
            />
          </Pressable>
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={todo.isDone}
            onPress={onPressLabel}
          >
            {todo.id}
          </AnimatedTaskLabel>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default TodoItem
