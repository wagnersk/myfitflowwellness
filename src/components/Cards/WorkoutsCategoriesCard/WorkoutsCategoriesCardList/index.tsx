import React from 'react'
import { WorkoutsCategoriesCardItem } from '../WorkoutsCategoriesCardItem'

import { Container } from './styles'
import { IWorkoutCategory } from '@src/@types/navigation'

interface dataProps {
  item: IWorkoutCategory
  isGuestCategory: boolean

  handleNextStep: (data: IWorkoutCategory) => void
}

export function WorkoutsCategoriesCardList({
  item,
  isGuestCategory,
  handleNextStep,
}: dataProps) {
  return (
    <Container>
      <WorkoutsCategoriesCardItem
        data={item}
        isGuestCategory={isGuestCategory}
        handleNextStep={() => handleNextStep(item)}
      />
    </Container>
  )
}
