/* eslint-disable camelcase */
import React from 'react'
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
  IncrementSecondsContent,
  BlurViewAddSecondsWrapper,
  FakeAnimatedCircularProgressWrapper,
} from './styles'
import { useTheme } from 'styled-components/native'
import { Circle } from 'react-native-svg'

interface CronometerProps {
  enabled: boolean
  percentage: number
  circularProgressRef: React.RefObject<AnimatedCircularProgress>
  onPlay: () => void
  onPause: () => void
  onRestart: () => void
  onAdd15Seconds: () => void
  onSubtract15Seconds: () => void
  minutes: number
  seconds: number
  isRunning: boolean
}

export function WorkoutCronometer({
  enabled,
  circularProgressRef,
  onAdd15Seconds,
  onSubtract15Seconds,
  onPlay,
  onPause,
  onRestart,
  percentage,
  minutes,
  seconds,
  isRunning,
}: CronometerProps) {
  function handlePause() {
    onPause()
  }

  function handlOnPlay() {
    onPlay()
  }

  function handleRestart() {
    onRestart()
  }

  function add15Seconds() {
    onAdd15Seconds()
  }

  function subtract15Seconds() {
    onSubtract15Seconds()
  }
  const theme = useTheme()

  return (
    <WorkoutCronometerWrapper>
      <Top>
        <IncrementSeconds disabled={!enabled} onPress={subtract15Seconds}>
          <WorkoutCronometerText type="negative">-15s</WorkoutCronometerText>
        </IncrementSeconds>
        <DecrementSeconds disabled={!enabled} onPress={add15Seconds}>
          <WorkoutCronometerText type="positive">+15s</WorkoutCronometerText>
        </DecrementSeconds>
      </Top>
      <Middle>
        <AnimatedCircularProgressWrapper>
          {enabled ? (
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
              onAnimationComplete={() => console.log('onAnimationComplete')}
              // eslint-disable-next-line react/no-children-prop
              children={() => (
                <WorkoutCronometerTimer>
                  {minutes}:{seconds <= 9 ? `0${seconds}` : seconds}
                </WorkoutCronometerTimer>
              )} /* crie uma view com o mesmo tamamnho */
            />
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
