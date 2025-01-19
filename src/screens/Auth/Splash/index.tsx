import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated'

import {
  LinearGradientContainer,
  MyFitFlowLetterComponent,
  MyFitFlowLogoComponent,
} from './styles'

export function Splash() {
  const splashAnimation = useSharedValue(0)
  const navigation = useNavigation()
  const myFitFlowStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
    }
  })

  function startApp() {
    navigation.navigate('onBoarding1')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 2000 }, () => {
      'worklet'
      runOnJS(startApp)()
    })
  })

  return (
    <LinearGradientContainer colors={['#000000', '#FFFFFF']}>
      <Animated.View style={{ position: 'absolute' }}>
        <MyFitFlowLetterComponent />
      </Animated.View>

      <Animated.View style={[myFitFlowStyle]}>
        <MyFitFlowLogoComponent />
      </Animated.View>
    </LinearGradientContainer>
  )
}
