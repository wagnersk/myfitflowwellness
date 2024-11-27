import React from 'react'

import GenderMale from '../../assets/Gender-male.svg'
import GenderFemale from '../../assets/Gender-female.svg'

import { Container } from './styles'
import { DefaultTheme, useTheme } from 'styled-components'

interface Props {
  level: string
  size: number
}
function transform(data: string, theme: DefaultTheme, size: number) {
  if (data === 'masculino' || data === 'male') {
    return (
      <GenderMale width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
    )
  }

  if (data === 'feminino' || data === 'female') {
    return (
      <GenderFemale
        width={size}
        height={size}
        fill={theme.COLORS.BLUE_STROKE}
      />
    )
  }
}
export function Gender({ level, size }: Props) {
  const theme = useTheme()

  return <Container>{transform(level, theme, size)}</Container>
}
