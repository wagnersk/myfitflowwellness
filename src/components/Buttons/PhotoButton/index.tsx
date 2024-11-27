import React from 'react'
import Camera from '../../../assets/Camera.svg'
import { TouchableOpacityProps } from 'react-native'

import { Container } from './styles'

export function PhotoButton({ ...rest }: TouchableOpacityProps) {
  return (
    <Container {...rest}>
      <Camera width={48} height={48} stroke={'#1B077F'} strokeWidth={2} />
    </Container>
  )
}
