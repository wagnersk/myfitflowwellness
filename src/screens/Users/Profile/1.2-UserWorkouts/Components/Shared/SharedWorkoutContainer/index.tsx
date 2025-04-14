import React from 'react'
import { ContainerWrapper, CardsWrapper } from './styles'
import {
  IMyfitflowWorkoutInUseData,
  IMyWorkouts,
  IUser,
} from '@hooks/authTypes'
import { SharedWorkoutCard } from '../SharedWorkoutCard'

interface WorkoutContainerProps {
  data: IMyWorkouts | null
  sharedWorkouts: IMyfitflowWorkoutInUseData[] | null
  user: IUser | null
  handleOnPressShareWorkout: (id: string) => void
}

export default function SharedWorkoutContainer({
  data,
  sharedWorkouts,
  user,
  handleOnPressShareWorkout,
}: WorkoutContainerProps) {
  return (
    <ContainerWrapper>
      <CardsWrapper>
        {sharedWorkouts &&
          sharedWorkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
            <SharedWorkoutCard
              key={i}
              data={v || null}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              handleOnPressShareWorkout={handleOnPressShareWorkout}
              isActive={
                data?.data.find((va) => va.id === v.id)?.isActive ?? false
              }
            />
          ))}
      </CardsWrapper>
    </ContainerWrapper>
  )
}
