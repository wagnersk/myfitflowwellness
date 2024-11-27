import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useTheme } from 'styled-components'

import {
  Container,
  Title,
  Button,
  IconContainer,
  TittleWrapper,
} from './styles'
import Caretdown from '../../../assets/Caretdown.svg'
import { getTrimmedName } from '@utils/getTrimmedName'

interface Props {
  title: string
  onPress?: () => void
  enabled?: boolean
  loading?: boolean
}

export function SelectFilterButton({
  title,
  enabled = true,
  loading,
  onPress,
  ...rest
}: Props) {
  const theme = useTheme()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container onPress={onPress} disabled={!enabled} loading={loading}>
        <Button>
          <TittleWrapper>
            <Title>{getTrimmedName(15, title)}</Title>
          </TittleWrapper>
          <IconContainer>
            <Caretdown width={24} height={24} fill={theme.COLORS.BLUE_STROKE} />
          </IconContainer>
        </Button>
      </Container>
    </GestureHandlerRootView>
  )
}
