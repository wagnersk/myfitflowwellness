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

  index: number
}

export function InUseExpiredWorkoutCard({
  data,
  expiredData,
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
