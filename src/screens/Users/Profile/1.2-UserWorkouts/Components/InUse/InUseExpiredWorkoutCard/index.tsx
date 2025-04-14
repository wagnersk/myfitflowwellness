import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import {
  IMyfitflowWorkoutInUseData,
  IMyInUseExpiredData,
} from '@hooks/authTypes'
import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  expiredData: IMyInUseExpiredData[]
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressExpiredWorkout: (id: string) => void
}

export function InUseExpiredWorkoutCard({
  data,
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
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
