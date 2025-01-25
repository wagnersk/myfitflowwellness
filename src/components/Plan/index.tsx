import React from 'react'

import Lock from '../../assets/Lock-simple-fill.svg'

import { Container } from './styles'
import { DefaultTheme, useTheme } from 'styled-components/native'

interface Props {
  level?: string
  size: number
}
function transform(theme: DefaultTheme, size: number, data?: string) {
  if (!data) return
  if (data === 'premium') {
    return (
      <Lock width={size} height={size} fill={theme.COLORS.NEUTRA_PLACEHOLDER} />
    )
  }
}
export function Plan({ level, size }: Props) {
  const theme = useTheme() as DefaultTheme

  return <Container>{transform(theme, size, level)}</Container>
}
