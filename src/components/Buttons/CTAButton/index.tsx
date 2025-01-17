import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { TouchableHighlightProps, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

import {
  Container,
  Title,
  LinearGradientButton,
  CTAButtonPressable,
} from './styles'

interface Props extends TouchableHighlightProps {
  title: string
  changeColor?: boolean
  onPress?: () => void
  enabled?: boolean
  loading?: boolean
}

export function CTAButton({
  changeColor,
  title,
  enabled = true,
  loading,
  ...rest
}: Props) {
  const theme = useTheme()
  const colors = changeColor
    ? theme.COLORS.GRADIENT_CARD
    : theme.COLORS.GRADIENT_BUTTON

  return (
    <Container>
      <CTAButtonPressable disabled={!enabled} loading={loading} {...rest}>
        <LinearGradientButton
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {loading ? (
            <ActivityIndicator color={theme.COLORS.NEUTRA_LETTER_AND_STROKE} />
          ) : (
            <Title>{title}</Title>
          )}
        </LinearGradientButton>
      </CTAButtonPressable>
    </Container>
  )
}
