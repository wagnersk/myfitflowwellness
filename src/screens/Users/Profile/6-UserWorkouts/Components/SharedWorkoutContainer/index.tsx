import React from 'react'
import {
  ContainerWrapper,
  MonthYearACTMessage,
  CardTittle,
  CardsWrapper,
} from './styles'
import { IMyfitflowWorkoutInUseData, SignInProps } from '@hooks/authTypes'
import { SharedWorkoutCard } from '../SharedWorkoutCard'

interface WorkoutContainerProps {
  data: IMyfitflowWorkoutInUseData[] | null
  user: SignInProps | null
  handleOnPressSendWorkout: (id: string) => void
}
// tirasr bolinha vermelha e por coisas apenas do shared

export default function SharedWorkoutContainer({
  data,
  user,
  handleOnPressSendWorkout,
}: WorkoutContainerProps) {
  return (
    <ContainerWrapper>
      <MonthYearACTMessage>
        <CardTittle>Compartilhados com amigos</CardTittle>
      </MonthYearACTMessage>
      <CardsWrapper>
        {data &&
          data.map((v: IMyfitflowWorkoutInUseData, i: number) => (
            <SharedWorkoutCard
              key={i}
              data={v || null}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              handleOnPressSendWorkout={handleOnPressSendWorkout}
              index={i}
              isActive={v.isActive}
            />
          ))}
      </CardsWrapper>
    </ContainerWrapper>
  )
}
