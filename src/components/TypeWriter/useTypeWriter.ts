/*
 * @Author: Pacific_D
 * @Date: 2022-10-22 17:07:19
 * @LastEditTime: 2022-10-22 20:34:36
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \learn-react-native\src\components\TypeWriter\useTypeWriter.ts
 */
import { useState, useEffect } from 'react'

export enum Phase {
  Typing,
  Pasuing,
  Deleting
}

const TYPING_INTERVAL = 150,
  PAUSING_INTERVAL = 1000,
  DELETING_INTERVAL = 50

const useTypeWriter = (content: Array<string>) => {
  const [typed, setTyped] = useState(''),
    [phase, setPhase] = useState<Phase>(Phase.Typing),
    [selectedIdx, setSelectedIdx] = useState(0)

  useEffect(() => {
    switch (phase) {
      case Phase.Typing:
        // TYPING:
        const nextTyped = content[selectedIdx].slice(0, typed.length + 1)
        if (nextTyped === typed) {
          setPhase(Phase.Pasuing)
          return
        }

        const typingTimeout = setTimeout(
          () => setTyped(nextTyped),
          TYPING_INTERVAL
        )
        return () => clearTimeout(typingTimeout)
      case Phase.Deleting:
        // DELETING:
        if (!typed) {
          setSelectedIdx(prevIdx =>
            prevIdx === content.length - 1 ? 0 : prevIdx + 1
          )
          setPhase(Phase.Typing)
          return
        }
        const nextRemaining = content[selectedIdx].slice(0, typed.length - 1),
          deletingTimeout = setTimeout(
            () => setTyped(nextRemaining),
            DELETING_INTERVAL
          )
        return () => clearTimeout(deletingTimeout)
      case Phase.Pasuing:
        // PASUING:
        const pasuingTimeout = setTimeout(
          () => setPhase(Phase.Deleting),
          PAUSING_INTERVAL
        )
        return () => clearTimeout(pasuingTimeout)
      default:
        return
    }
  }, [content, typed, phase, selectedIdx])

  return { typed }
}

export default useTypeWriter
