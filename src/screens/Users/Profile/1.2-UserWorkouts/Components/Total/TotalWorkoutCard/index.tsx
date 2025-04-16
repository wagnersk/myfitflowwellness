import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'
import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressTotalWorkout: (index: number) => void
  index: number
}

export function TotalWorkoutCard({
  data,
  handleOnPressTotalWorkout,
  selectedLanguage,
  index,
}: PlanCardProps) {
  function handleOnPressWorkout(index: number) {
    handleOnPressTotalWorkout(index)
  }

  return (
    <Container>
      <ButtonContainer>
        <BodyWraper>
          <ItemCard
            selectedLanguage={selectedLanguage}
            data={data}
            handleNextStep={() => handleOnPressWorkout(index)}
            isActive={data?.isActive || false}
            isExpired={data?.isExpired || false}
            handleMoveUp={() => {}}
            handleMoveDown={() => {}}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
