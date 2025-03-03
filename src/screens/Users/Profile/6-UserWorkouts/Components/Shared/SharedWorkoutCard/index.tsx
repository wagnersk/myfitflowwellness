import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import {
  IMyfitflowWorkoutInUse,
  IMyfitflowWorkoutInUseData,
} from '@hooks/authTypes'

import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressSendWorkout: (id: string) => void
  index: number
  isActive: boolean
}

export function SharedWorkoutCard({
  data,
  selectedLanguage,
  handleOnPressSendWorkout,
  index,
  isActive,
}: PlanCardProps) {
  function handleOnPressWorkout(id: string) {
    handleOnPressSendWorkout(id)
  }
  return (
    <Container>
      <ButtonContainer>
        <BodyWraper>
          <ItemCard
            index={index}
            data={data}
            handleNextStep={() => data && handleOnPressWorkout(data.id)}
            isActive={isActive}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
