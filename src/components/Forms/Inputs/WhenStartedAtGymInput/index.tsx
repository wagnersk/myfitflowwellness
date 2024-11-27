import React from 'react'

import { useTheme } from 'styled-components'
import Calendar from '../../../../assets/Calendar.svg'

import {
  Container,
  IconContainer,
  InputTextMasked,
  ContainerWrapper,
} from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  value?: string
  errorBoolean?: boolean

  editable?: boolean

  onFocus: () => void
  handleChangeBirthday: (data: string) => void
}

export function WhenStartedAtGymInput({
  value,
  errorBoolean,
  editable,
  onFocus,
  handleChangeBirthday,
}: Props) {
  const theme = useTheme()

  return (
    <Container>
      <ContainerWrapper>
        <IconContainer>
          <Calendar
            width={28}
            height={28}
            stroke={errorBoolean ? '#D92727' : theme.COLORS.BLUE_STROKE}
            strokeWidth={1.5}
            opacity={value ? 1 : 0.7}
          />
        </IconContainer>

        <InputTextMasked
          onFocus={onFocus}
          onChangeText={handleChangeBirthday}
          placeholder={'Tempo de experiencia'}
          placeholderTextColor={theme.COLORS.BLUE_STROKE}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          editable={editable}
          maxLength={16}
          mask="99/99/9999"
          keyboardType="numeric"
          returnKeyType="done"
          onBlur={Keyboard.dismiss}
        />
      </ContainerWrapper>
    </Container>
  )
}
