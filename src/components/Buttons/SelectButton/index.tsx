import React from 'react'

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
  type: 'first' | 'last'
}

export function SelectButton({
  title,
  enabled = true,
  type,
  loading,
  onPress,
}: Props) {
  const theme = useTheme()

  return (
    <Container
      type={type}
      onPress={onPress}
      disabled={!enabled}
      loading={loading}
    >
      <Button>
        <TittleWrapper>
          <Title>{getTrimmedName(30, title)}</Title>
        </TittleWrapper>
        <IconContainer>
          <Caretdown width={24} height={24} fill={theme.COLORS.BLUE_STROKE} />
        </IconContainer>
      </Button>
    </Container>
  )
}
