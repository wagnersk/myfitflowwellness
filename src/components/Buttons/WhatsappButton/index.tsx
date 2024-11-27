import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

import { Container, Title } from './styles'
import Whatsapp from '@assets/Whatsapp.svg'

interface Props {
  onPress?: () => void
  enabled?: boolean
  loading?: boolean
}

export function WhatsappButton({ enabled = true, loading }: Props) {
  const theme = useTheme()

  return (
    <GestureHandlerRootView style={{ width: '100%' }}>
      <Container disabled={!enabled} loading={loading}>
        {loading ? (
          <ActivityIndicator color={theme.COLORS.NEUTRA_LETTER_AND_STROKE} />
        ) : (
          <>
            <Title>Whatsapp</Title>
            <Whatsapp width={24} height={24} fill="#FFFFFF" />
          </>
        )}
      </Container>
    </GestureHandlerRootView>
  )
}
