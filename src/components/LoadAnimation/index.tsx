import React from 'react'
import LottieView from 'lottie-react-native'

import halterAnimated from '../../assets/halterAnimated.json'

import { Container } from './styles'

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={halterAnimated}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  )
}
