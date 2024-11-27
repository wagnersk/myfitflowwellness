import React from 'react'
import { Image } from 'react-native'
import backgroundImg from '../../../../assets/back.png'

import { Container } from './styles'

export function BodyImageBackground() {
  return (
    <Container>
      <Image
        source={backgroundImg}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </Container>
  )
}
