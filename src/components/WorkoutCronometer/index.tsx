/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { useTimer } from 'react-timer-hook'

import {
  WorkoutCronometerWrapper,
  WorkoutCronometerButtonStart,
  WorkoutCronometerTimer,
  WorkoutCronometerText,
} from './styles'

interface CronometerProps {
  rest_time: number
  flagToResetCronometer: number
  startText: string
  resetText: string
}

export function WorkoutCronometer({
  rest_time,
  flagToResetCronometer,
  startText,
  resetText,
}: CronometerProps) {
  const time = new Date()

  time.setSeconds(time.getSeconds() + rest_time)

  const { seconds, minutes, isRunning, pause, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.log('acabouu'),
    autoStart: false,
  })
  const { width } = useWindowDimensions()

  useEffect(() => {
    pause()
    const time = new Date()
    time.setSeconds(time.getSeconds() + rest_time)
    restart(time, false)
  }, [rest_time, flagToResetCronometer])

  function handlePause() {
    pause()
    const time = new Date()
    time.setSeconds(time.getSeconds() + rest_time)
    restart(time, false)
  }

  function handleRestart() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + rest_time)
    restart(time)
  }

  return (
    <WorkoutCronometerWrapper>
      <WorkoutCronometerTimer style={{ left: width / 2.7 }}>
        {minutes}:{seconds <= 9 ? `0${seconds}` : seconds}
      </WorkoutCronometerTimer>

      <WorkoutCronometerButtonStart
        onPress={() => {
          isRunning ? handlePause() : handleRestart()
        }}
      >
        <WorkoutCronometerText>
          {isRunning ? resetText : startText}
        </WorkoutCronometerText>
      </WorkoutCronometerButtonStart>
    </WorkoutCronometerWrapper>
  )
}
