import React from 'react'

import { TouchableHighlightProps, ActivityIndicator } from 'react-native'

import {
  Container,
  Title,
  LinearGradientButton,
  CTAButtonPressable,
} from './styles'
import { useTheme } from 'styled-components'

interface Props extends TouchableHighlightProps {
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
        disabled={!enabled}
        loading={loading}
        workoutAlreadySelected={workoutAlreadySelected}
        {...rest}
      >
        <LinearGradientButton
          changeColor={changeColor}
          workoutAlreadySelected={workoutAlreadySelected || false}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#000000', '#000000']}
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
