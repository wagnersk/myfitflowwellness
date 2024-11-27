import React from 'react'

import { Container, Description } from './styles'
import { useTheme } from 'styled-components'
import PersonSimple from '../../assets/Person-simple.svg'

interface Props {
  description: string | number
}

export function WorkoutMuscleComponent({ description }: Props) {
  const theme = useTheme()

  return (
    <Container>
      <PersonSimple
        width={22}
        height={22}
        strokeWidth={1.5}
        fill={theme.COLORS.BLUE_STROKE}
      />
      <Description> {description && description}</Description>
    </Container>
  )
}
