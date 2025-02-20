import React from 'react'
import { WorkoutsCardItem } from '../WorkoutsCardItem'

import { Container, FlatListWrapper } from './styles'
import { IMyfitflowWorkoutInUse } from '@hooks/authTypes'

interface dataProps {
  item: IMyfitflowWorkoutInUse
  handleNextStep: (data: IMyfitflowWorkoutInUse) => void
  index: number
}

export function WorkoutsCardList({ item, handleNextStep, index }: dataProps) {
  return (
    <Container>
      <FlatListWrapper>
        <WorkoutsCardItem
          handleNextStep={() => handleNextStep(item)}
          data={item}
          index={index}
        />
      </FlatListWrapper>
    </Container>
  )
}
