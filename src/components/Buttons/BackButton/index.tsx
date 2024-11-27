import React from 'react'
import Back from '../../../assets/Back.svg'
import { TouchableOpacityProps } from 'react-native'

import { Container } from './styles'

interface ChangeColor extends TouchableOpacityProps {
  changeColor?: boolean
}

export function BackButton({ changeColor, ...rest }: ChangeColor) {
  return (
    <Container {...rest}>
      {changeColor ? (
        <Back width={48} height={48} stroke={'#1B077F'} />
      ) : (
        <Back width={48} height={48} style={{ left: -12 }} stroke={'#EFEFFF'} />
      )}
    </Container>
  )
}
