import React from 'react'
import { BulletItem } from '../BulletItem'

import { Container } from './styles'
import { IFormattedCardExerciseData } from '@hooks/authTypes'

interface Props {
  data: IFormattedCardExerciseData[]
  workoutCardIndex: number
}

export function BulletList({ data, workoutCardIndex }: Props) {
  return (
    <Container>
      {data.map((item, index) => (
        <BulletItem
          active={index === workoutCardIndex}
          key={/* String(item workoutExerciseIndex) */ index}
        />
      ))}
    </Container>
  )
}
