import React from 'react'
import { ButtonContainer, Container, BodyWraper } from './styles'
import { IMyfitflowWorkoutInUseData, IWorkoutOrder } from '@hooks/authTypes'
import { ItemCard } from '../../ItemCard'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUseData | null
  dataOrder: IWorkoutOrder[]
  selectedLanguage: 'pt-br' | 'us'
  handleOnPressActiveWorkout: (id: string) => void

  index: number
}

export function InUseActiveWorkoutCard({
  data,
  dataOrder,
  selectedLanguage,
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
          <ItemCard
            index={index}
            data={data}
            handleNextStep={() => data && handleOnPressWorkout(data.id)}
            isActive={true}
            dateStart={dataOrder[index].workoutStartAt}
            dateEnd={dataOrder[index].workoutEndsAt}
          />
        </BodyWraper>
      </ButtonContainer>
    </Container>
  )
}
