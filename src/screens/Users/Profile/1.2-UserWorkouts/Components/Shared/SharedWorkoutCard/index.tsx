import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'

import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressShareWorkout: (id: string) => void
  isActive: boolean
}

export function SharedWorkoutCard({
  data,
  handleOnPressShareWorkout,
  selectedLanguage,
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
            selectedLanguage={selectedLanguage}
            data={data}
            handleNextStep={() => data && handleOnPressWorkout(data.id)}
            isActive={isActive}
            isExpired={data ? data.isExpired : false}
            handleMoveUp={() => {}}
            handleMoveDown={() => {}}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
