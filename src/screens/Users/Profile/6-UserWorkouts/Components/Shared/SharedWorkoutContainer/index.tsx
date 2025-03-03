import React from 'react'
import {
  ContainerWrapper,
  MonthYearACTMessage,
  CardTittle,
  CardsWrapper,
} from './styles'
import {
  IMyfitflowWorkoutInUseData,
  IMyWorkouts,
  SignInProps,
} from '@hooks/authTypes'
import { SharedWorkoutCard } from '../SharedWorkoutCard'

interface WorkoutContainerProps {
  data: IMyWorkouts | null
  sharedData: IMyfitflowWorkoutInUseData[] | null
  user: SignInProps | null
  handleOnPressSendWorkout: (id: string) => void
}
// tirasr bolinha vermelha e por coisas apenas do shared

export default function SharedWorkoutContainer({
  data,
  sharedData,
  user,
  handleOnPressSendWorkout,
}: WorkoutContainerProps) {
  let activeWorkouts: IMyfitflowWorkoutInUseData[] = []
  if (data) {
    const listOfWorkouts = data.data.filter((v) => v.isInUse)

    const getActiveWorkouts = listOfWorkouts
      .map((workout) => {
        const active = data.dataOrder.find((order) => order.id === workout.id)
        if (!active) return false

        return workout
      })
      .filter((workout) => workout !== false)

    activeWorkouts = getActiveWorkouts
  }

  return (
    <ContainerWrapper>
      <CardsWrapper>
        {sharedData &&
          sharedData.map((v: IMyfitflowWorkoutInUseData, i: number) => (
            <SharedWorkoutCard
              key={i}
              data={v || null}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              handleOnPressSendWorkout={handleOnPressSendWorkout}
              index={i}
              isActive={
                !!activeWorkouts.find((va) => va.id === v.id && va.isInUse)
              }
            />
          ))}
      </CardsWrapper>
    </ContainerWrapper>
  )
}
