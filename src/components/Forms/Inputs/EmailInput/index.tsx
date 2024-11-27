import React from 'react'
import Email from '@assets/Email.svg'

import { useTheme } from 'styled-components'

import { Container, IconContainer, ContainerWrapper, InputText } from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  value?: string
  errorBoolean?: boolean

  type: 'transparent' | 'blue'
  borderDesign?: 'up' | 'down' | 'up-down'
  order?: 'top' | 'middle' | 'bottom' | 'alone'
  topPosition?: number
  editable?: boolean

  onFocus: () => void
  handleChangeEmail: (data: string) => void
}

export function EmailInput({
  value,
  errorBoolean,
  onFocus,
  topPosition,
  borderDesign,
  order,
  editable,
  type,
  handleChangeEmail,
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
          <Email
            width={30}
            height={30}
            stroke={errorBoolean ? '#D92727' : COLOR}
            strokeWidth={1.5}
            opacity={!value ? 0.7 : 1}
          />
        </IconContainer>

        <InputText
          onFocus={onFocus}
          onChangeText={handleChangeEmail}
          placeholder={`Email`}
          placeholderTextColor={COLOR}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          type={type}
          editable={editable}
          autoCapitalize="none"
          onBlur={Keyboard.dismiss}
        />
      </ContainerWrapper>
    </Container>
  )
}
