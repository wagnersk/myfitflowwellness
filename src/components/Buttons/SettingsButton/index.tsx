import React from 'react'
import Settings from '../../../assets/Settings.svg'
import { TouchableOpacityProps } from 'react-native'

import { Container } from './styles'

export function SettingsButton({ ...rest }: TouchableOpacityProps) {
  return (
    <Container {...rest}>
      <Settings width={48} height={48} />
    </Container>
  )
}
