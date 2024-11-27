import React from 'react'
import { WorkoutsCardItem } from '../WorkoutsCardItem'

import { Container, FlatListWrapper } from './styles'
import { IMyfitflowWorkoutInUse } from '@hooks/authTypes'

interface dataProps {
  item: IMyfitflowWorkoutInUse
  handleNextStep: (data: IMyfitflowWorkoutInUse) => void
}

export function WorkoutsCardList({ item, handleNextStep }: dataProps) {
  return (
    <Container>
      <FlatListWrapper>
        <WorkoutsCardItem
          handleNextStep={() => handleNextStep(item)}
          data={item}
        />
      </FlatListWrapper>
    </Container>
  )
}
