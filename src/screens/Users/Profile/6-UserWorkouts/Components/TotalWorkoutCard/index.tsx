import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import {
  IMyfitflowWorkoutInUse,
  IMyfitflowWorkoutInUseData,
} from '@hooks/authTypes'
import { WorkoutsCardItem } from '@components/Cards/WorkoutsCard/WorkoutsCardItem'
import { TotalWorkoutsCardItem } from '../TotalWorkoutsCardItem'

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
          <TotalWorkoutsCardItem
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
