import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import {
  IMyfitflowWorkoutInUse,
  IMyfitflowWorkoutInUseData,
} from '@hooks/authTypes'
import { WorkoutsCardItem } from '@components/Cards/WorkoutsCard/WorkoutsCardItem'
import { TotalWorkoutsCardItem } from '../TotalWorkoutsCardItem'
import { SharedWorkoutsCardItem } from '../SharedWorkoutsCardItem'

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
  isOpenSettingsMode,
  isActive,
}: PlanCardProps) {
  function handleOnPressWorkout(id: string) {
    handleOnPressSendWorkout(id)
  }
  return (
    <Container>
      <ButtonContainer>
        <BodyWraper>
          <SharedWorkoutsCardItem
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
