import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import { IMyfitflowWorkoutInUseData, IWorkoutOrder } from '@hooks/authTypes'
import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  dataOrder: IWorkoutOrder[]
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressActiveWorkout: (id: string) => void
  handleMoveUp: (id: string) => void
  handleMoveDown: (id: string) => void
  index: number
  isOpenSettingsMode: boolean
}

export function InUseActiveWorkoutCard({
  data,
  dataOrder,
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
          {dataOrder && dataOrder[index] && (
            <ItemCard
              index={index}
              data={data}
              handleNextStep={() => data && handleOnPressWorkout(data.id)}
              isActive={true}
              dateStart={dataOrder[index].workoutStartAt}
              dateEnd={dataOrder[index].workoutEndsAt}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
              isOpenSettingsMode={isOpenSettingsMode}
              firstElement={index === 0}
              secondElement={index === 1}
              lastElement={index === dataOrder.length - 1}
            />
          )}
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
