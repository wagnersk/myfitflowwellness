/* eslint-disable camelcase */
import React, { memo, useCallback, useRef, useState } from 'react'
import Play from '@assets/Play.svg'
import Pause from '@assets/Pause.svg'
import ArrowCounterClockwise from '@assets/Arrow-counter-clockwise.svg'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import {
  WorkoutCronometerWrapper,
  WorkoutCronometerButtonStart,
  WorkoutCronometerTimer,
  WorkoutCronometerText,
  Top,
  Middle,
  DecrementSeconds,
  IncrementSeconds,
  AnimatedCircularProgressWrapper,
  BlurViewAddSecondsWrapper,
  FakeAnimatedCircularProgressWrapper,
  SaveButtonWrapper,
  WorkoutCronometerButton,
  CircleAndButtonWrapper,
  WorkoutCronometerSaveTimer,
} from './styles'
import { useTheme } from 'styled-components/native'
import { Circle } from 'react-native-svg'

interface CronometerProps {
  enabled: boolean
  onPlay: () => void
  onPause: () => void
  onRestart: () => void
  onAdd15Seconds: () => void
  onSubtract15Seconds: () => void
  onSaveNewTimer: () => void
  minutes: number
  seconds: number
  isRunning: boolean
  getModalTimer: number
  totalSeconds: number
}

export function WorkoutCronometerComponent({
  enabled,
  onAdd15Seconds,
  onSubtract15Seconds,
  onSaveNewTimer,
  onPlay,
  onPause,
  onRestart,
  minutes,
  seconds,
  isRunning,
  getModalTimer,
  totalSeconds,
}: CronometerProps) {
  const circularProgressRef = useRef<AnimatedCircularProgress>(null)
  const elapsedTime = getModalTimer - totalSeconds
  const percentage = getModalTimer ? (elapsedTime / getModalTimer) * 100 : 0

  const [showSaveButton, setShowSaveButton] = useState(false)

  const handlePause = useCallback(() => {
    onPause()
  }, [onPause])

  const handlOnPlay = useCallback(() => {
    onPlay()
  }, [onPlay])

  const handleRestart = useCallback(() => {
    onRestart()
  }, [onRestart])

  const handleAdd15Seconds = useCallback(() => {
    onAdd15Seconds()
    setShowSaveButton(true)
  }, [onAdd15Seconds])

  const handleSubtract15Seconds = useCallback(() => {
    onSubtract15Seconds()
    setShowSaveButton(true)
  }, [onSubtract15Seconds])

  const handleSaveNewTimer = useCallback(() => {
    onSaveNewTimer()
    setShowSaveButton(false)
  }, [onSaveNewTimer])

  const theme = useTheme()

  return (
    <WorkoutCronometerWrapper>
      <Top>
        <IncrementSeconds disabled={!enabled} onPress={handleSubtract15Seconds}>
          <WorkoutCronometerText type="negative">-15s</WorkoutCronometerText>
        </IncrementSeconds>
        <DecrementSeconds disabled={!enabled} onPress={handleAdd15Seconds}>
          <WorkoutCronometerText type="positive">+15s</WorkoutCronometerText>
        </DecrementSeconds>
      </Top>
      <Middle>
        <AnimatedCircularProgressWrapper>
          {enabled ? (
            <CircleAndButtonWrapper>
              <AnimatedCircularProgress
                ref={circularProgressRef}
                size={112}
                width={3}
                fill={percentage}
                tintColor={theme.COLORS.AUX_GOOGLE_GREEN}
                backgroundColor={theme.COLORS.NEUTRA_BACKGROUND}
                padding={10}
                renderCap={({ center }) => (
                  <Circle cx={center.x} cy={center.y} r="6" fill="green" />
                )}
                onAnimationComplete={
                  () => {} /* console.log('onAnimationComplete') */
                }
                // eslint-disable-next-line react/no-children-prop
                children={() => (
                  <WorkoutCronometerTimer>
                    {minutes}:{seconds <= 9 ? `0${seconds}` : seconds}
                  </WorkoutCronometerTimer>
                )}
              />
              <SaveButtonWrapper>
                {showSaveButton && (
                  <WorkoutCronometerButton onPress={() => handleSaveNewTimer()}>
                    <WorkoutCronometerSaveTimer>
                      Save
                    </WorkoutCronometerSaveTimer>
                  </WorkoutCronometerButton>
                )}
              </SaveButtonWrapper>
            </CircleAndButtonWrapper>
          ) : (
            <FakeAnimatedCircularProgressWrapper />
          )}
        </AnimatedCircularProgressWrapper>
        <WorkoutCronometerButtonStart
          disabled={!enabled}
          onPress={() => {
            handleRestart()
          }}
        >
          <BlurViewAddSecondsWrapper intensity={30}>
            <ArrowCounterClockwise width={32} height={32} fill={'white'} />
          </BlurViewAddSecondsWrapper>
        </WorkoutCronometerButtonStart>

        <WorkoutCronometerButtonStart
          disabled={!enabled}
          onPress={() => {
            isRunning ? handlePause() : handlOnPlay()
          }}
        >
          <BlurViewAddSecondsWrapper intensity={30}>
            {isRunning ? (
              <Pause width={32} height={32} fill={'white'} />
            ) : (
              <Play width={32} height={32} fill={'white'} />
            )}
          </BlurViewAddSecondsWrapper>
        </WorkoutCronometerButtonStart>
      </Middle>
    </WorkoutCronometerWrapper>
  )
}

export const WorkoutCronometer = memo(
  WorkoutCronometerComponent,
  (prevProps, nextProps) => {
    return prevProps === nextProps
  },
)
