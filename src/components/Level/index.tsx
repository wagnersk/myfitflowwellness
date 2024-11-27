import React from 'react'

import Star from '../../assets/Star.svg'
import StarFill from '../../assets/Star-fill.svg'

import { Container } from './styles'
import { DefaultTheme, useTheme } from 'styled-components'

interface Props {
  level: string
  size: number
}
function transform(data: string, theme: DefaultTheme, size: number) {
  if (data === 'iniciante' || data === 'beginner') {
    return (
      <>
        <StarFill width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
        <Star width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
        <Star width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
      </>
    )
  }

  if (data === 'intermediário' || data === 'intermediate') {
    return (
      <>
        <StarFill width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
        <StarFill width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
        <Star width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
      </>
    )
  }

  if (data === 'avançado' || data === 'advanced') {
    return (
      <>
        <StarFill width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
        <StarFill width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
        <StarFill width={size} height={size} fill={theme.COLORS.BLUE_STROKE} />
      </>
    )
  }
}
export function Level({ level, size }: Props) {
  const theme = useTheme()

  return <Container>{transform(level, theme, size)}</Container>
}
