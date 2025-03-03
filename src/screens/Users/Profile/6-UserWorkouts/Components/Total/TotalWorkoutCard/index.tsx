import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import {
  IMyfitflowWorkoutInUse,
  IMyfitflowWorkoutInUseData,
  IMyWorkouts,
} from '@hooks/authTypes'
import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressTotalWorkout: (index: number) => void
  index: number
  isActive: boolean
}

export function TotalWorkoutCard({
  data,
  selectedLanguage,
  handleOnPressTotalWorkout,
  index,
  isOpenSettingsMode,
  isActive,
}: PlanCardProps) {
  function handleOnPressWorkout(index: number) {
    handleOnPressTotalWorkout(index)
  }

  return (
    <Container>
      <ButtonContainer>
        <BodyWraper>
          <ItemCard
            index={index}
            data={data}
            handleNextStep={() => handleOnPressWorkout(index)}
            isActive={isActive}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
