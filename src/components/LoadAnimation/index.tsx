import React from 'react'
import LottieView from 'lottie-react-native'

import halterAnimatedWhite from '../../assets/halterAnimatedWhite.json'

import { Container } from './styles'
interface LoadAnimationProps {
  width: number
  height: number
}

export function LoadAnimation({ width, height }: LoadAnimationProps) {
  return (
    <Container>
      <LottieView
        speed={0.7}
        source={halterAnimatedWhite}
        style={{ height, width }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  )
}
