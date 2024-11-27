import React from 'react'
import Google from '../../../assets/Google.svg'

import { ContainerBorder, Container, Title } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
  title: string
}

export function GoogleButton({ title, ...rest }: Props) {
  return (
    <ContainerBorder>
      <Container {...rest}>
        <Google />
        <Title>{title}</Title>
      </Container>
    </ContainerBorder>
  )
}
