import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import {
  IMyfitflowWorkoutInUseData,
  IMyInUseActiveData,
} from '@hooks/authTypes'
import { ItemCard } from '../../ItemCard'
/*   data: IMyfitflowWorkoutInUseData[] // total de treinos
  activeData: IMyInUseActiveData[] // total de treinos
  expiredData: IMyInUseExpiredData[] // total de treinos
  mySharedWorkouts: IMySharedWorkoutsData[] // lista de treinos compartilhados
  copiedWorkouts: IMyCopiedWorkoutsData[] // lista de treinos copiados */
interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  activeData: IMyInUseActiveData[]
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressActiveWorkout: (id: string) => void
  handleMoveUp: (id: string) => void
  handleMoveDown: (id: string) => void
  index: number
  isOpenSettingsMode: boolean
}

export function InUseActiveWorkoutCard({
  activeData,
  selectedLanguage,
  handleMoveUp,
  handleMoveDown,
  isOpenSettingsMode,
  index,
  handleOnPressActiveWorkout,
}: PlanCardProps) {
  function handleOnPressWorkout(id: string) {
    handleOnPressActiveWorkout(id)
  }
  return (
    <Container>
      <ButtonContainer>
        <BodyWraper>
          {activeData && (
            <ItemCard
              index={index}
              data={data}
              handleNextStep={() => data && handleOnPressWorkout(data.id)}
              isActive={true}
              isExpired={false}
              dateStart={activeData[index].workoutStartAt}
              dateEnd={activeData[index].workoutEndsAt}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
              isOpenSettingsMode={isOpenSettingsMode}
              firstElement={index === 0}
              secondElement={index === 1}
              lastElement={index === activeData.length - 1}
            />
          )}
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
