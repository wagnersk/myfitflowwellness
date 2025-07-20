import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'
import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressExpiredWorkout: (id: string) => void
}

export function InUseExpiredWorkoutCard({
  data,
  selectedLanguage,
  handleOnPressExpiredWorkout,
}: PlanCardProps) {
  function onExpiredWorkout(id: string) {
    handleOnPressExpiredWorkout(id)
  }
  return (
    <Container>
      <ButtonContainer>
        <BodyWraper>
          <ItemCard
            data={data}
            handleNextStep={() => data && onExpiredWorkout(data.id)}
            isActive={false}
            isExpired={true}
            handleMoveUp={() => {}}
            handleMoveDown={() => {}}
            selectedLanguage={selectedLanguage}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
