import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'
import { InUseWorkoutItem } from '../InUseWorkoutItem'
import { InUseExpiredWorkoutItem } from '../InUseExpiredWorkoutItem'
import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressExpiredWorkout: (id: string) => void

  index: number
}

export function InUseExpiredWorkoutCard({
  data,
  selectedLanguage,
  handleOnPressExpiredWorkout,
  index,
  isOpenSettingsMode,
  handleOnPressTotalWorkout,
}: PlanCardProps) {
  function onExpiredWorkout(id: string) {
    handleOnPressExpiredWorkout(id)
  }
  return (
    <Container>
      <ButtonContainer>
        <BodyWraper>
          <ItemCard
            index={index}
            data={data}
            handleNextStep={() => onExpiredWorkout(data?.id || '')}
            isActive={false}
            isExpired={true}
            handleMoveUp={() => {}}
            handleMoveDown={() => {}}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
