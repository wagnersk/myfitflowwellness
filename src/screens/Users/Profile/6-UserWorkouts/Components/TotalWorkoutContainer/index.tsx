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
  return (
    <ContainerWrapper>
      <MonthYearACTMessage>
        <CardTittle>Meus treinos</CardTittle>
      </MonthYearACTMessage>
      <CardsWrapper>
        {data &&
          data.data.map((v: IMyfitflowWorkoutInUseData, i: number) => (
            <TotalWorkoutCard
              key={i}
              data={v || null}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              handleOnPressTotalWorkout={() => handleOnPressTotalWorkout(v.id)}
              index={i}
              isActive={v.isActive}
            />
          ))}
      </CardsWrapper>
    </ContainerWrapper>
  )
}
