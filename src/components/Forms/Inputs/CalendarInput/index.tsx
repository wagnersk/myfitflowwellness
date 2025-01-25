import React from 'react'
import Calendar from '../../../../assets/Calendar.svg'

import { useTheme } from 'styled-components/native'

import {
  Container,
  IconContainer,
  InputTextMasked,
  ContainerWrapper,
} from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  placeholder?: string
  value?: string
  errorBoolean?: boolean

  type: 'transparent' | 'blue'
  borderDesign?: 'up' | 'down' | 'up-down'
  order?: 'top' | 'middle' | 'bottom' | 'alone'
  topPosition?: number
  editable?: boolean

  onFocus: () => void
  handleChangeBirthday: (data: string) => void
}

export function CalendarInput({
  placeholder,
  value,
  errorBoolean,
  onFocus,
  topPosition,
  borderDesign,
  order,
  editable,
  type,
  handleChangeBirthday,
}: Props) {
  const theme = useTheme()

  const COLOR =
    type === 'transparent'
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE

  return (
    <Container
      topPosition={topPosition}
      type={type}
      borderDesign={borderDesign}
      order={order}
    >
      <ContainerWrapper>
        <IconContainer>
          <Calendar
            width={28}
            height={28}
            stroke={errorBoolean ? '#D92727' : COLOR}
            strokeWidth={1.5}
            opacity={!value ? 0.7 : 1}
          />
        </IconContainer>

        <InputTextMasked
          onFocus={onFocus}
          onChangeText={handleChangeBirthday}
          placeholder={placeholder}
          placeholderTextColor={COLOR}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          editable={editable}
          maxLength={16}
          mask="99/99/9999"
          keyboardType="numeric"
          returnKeyType="done"
          type={type}
          onBlur={Keyboard.dismiss}
        />
      </ContainerWrapper>
    </Container>
  )
}
