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
  handleOnPressShareWorkout: (id: string) => void
  index: number
  isActive: boolean
}

export function SharedWorkoutCard({
  data,
  selectedLanguage,
  handleOnPressShareWorkout,
  index,
  isActive,
}: PlanCardProps) {
  function handleOnPressWorkout(id: string) {
    handleOnPressShareWorkout(id)
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
            handleMoveUp={() => {}}
            handleMoveDown={() => {}}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
