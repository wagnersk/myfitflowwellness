import React from 'react'
import { WorkoutsCategoriesCardItem } from '../WorkoutsCategoriesCardItem'

import { Container } from './styles'
import { IWorkoutCategory } from '@src/@types/navigation'

interface dataProps {
  item: IWorkoutCategory
  handleNextStep: (data: IWorkoutCategory) => void
}

export function WorkoutsCategoriesCardList({
  item,
  handleNextStep,
}: dataProps) {
  return (
    <Container>
      <WorkoutsCategoriesCardItem
        data={item}
        handleNextStep={() => handleNextStep(item)}
      />
    </Container>
  )
}
