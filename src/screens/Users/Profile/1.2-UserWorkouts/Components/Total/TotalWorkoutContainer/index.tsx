import React from 'react'
import { ContainerWrapper, CardsWrapper } from './styles'
import { IMyfitflowWorkoutInUseData, IUser } from '@hooks/authTypes'
import { TotalWorkoutCard } from '../TotalWorkoutCard'

interface WorkoutContainerProps {
  myTotalWorkouts: IMyfitflowWorkoutInUseData[] | null
  user: IUser | null
  handleOnPressTotalWorkout: (id: string) => void
}

export default function TotalWorkoutContainer({
  myTotalWorkouts,
  user,
  handleOnPressTotalWorkout,
}: WorkoutContainerProps) {
  // sxzaber se ativo o unao
  console.log(`mytotalWorkouts`, myTotalWorkouts)
  return (
    <ContainerWrapper>
      <CardsWrapper>
        {myTotalWorkouts &&
          myTotalWorkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
            <TotalWorkoutCard
              key={i}
              data={v || null}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              handleOnPressTotalWorkout={() => handleOnPressTotalWorkout(v.id)}
              index={i}
            />
          ))}
      </CardsWrapper>
    </ContainerWrapper>
  )
}
