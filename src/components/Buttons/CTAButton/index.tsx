import React from 'react'

import { TouchableOpacityProps, ActivityIndicator } from 'react-native'

import {
  Container,
  Title,
  LinearGradientButton,
  CTAButtonPressable,
} from './styles'
import { useTheme } from 'styled-components/native'

interface Props extends TouchableOpacityProps {
  title: string
  changeColor?: boolean
  onPress?: () => void
  enabled?: boolean
  loading?: boolean
  workoutAlreadySelected?: boolean
}

export function CTAButton({
  changeColor,
  title,
  enabled = true,
  loading,
  workoutAlreadySelected,
  ...rest
}: Props) {
  const theme = useTheme()
  return (
    <Container>
      <CTAButtonPressable
        disabled={!enabled || loading || workoutAlreadySelected}
        loading={loading}
        workoutAlreadySelected={workoutAlreadySelected}
        {...rest}
      >
        <LinearGradientButton changeColor={changeColor}>
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
