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
import { TotalWorkoutCard } from '../TotalWorkoutCard'

interface WorkoutContainerProps {
  data: IMyWorkouts | null
  user: SignInProps | null
  handleOnPressTotalWorkout: (id: string) => void
}

export default function TotalWorkoutContainer({
  data,
  user,
  handleOnPressTotalWorkout,
}: WorkoutContainerProps) {
  // sxzaber se ativo o unao

  let activeWorkouts: IMyfitflowWorkoutInUseData[] = []
  if (data !== null && data.data !== undefined && data.dataOrder) {
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
        {data &&
          data.data &&
          data.data.map((v: IMyfitflowWorkoutInUseData, i: number) => (
            <TotalWorkoutCard
              key={i}
              data={v || null}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              handleOnPressTotalWorkout={() => handleOnPressTotalWorkout(v.id)}
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
