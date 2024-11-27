import React, { memo } from 'react'
import { Platform } from 'react-native'

import { Container } from './styles'

interface Props {
  active?: boolean
}

export function BulletComponent({ active = false }: Props) {
  return <Container active={active} />
}

export const BulletItem = memo(BulletComponent, (prevProps, nextProps) => {
  return prevProps.active === nextProps.active
})
