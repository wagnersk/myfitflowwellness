import React from 'react'
import UserCircle from '../../../../assets/UserCircle.svg'

import { useTheme } from 'styled-components/native'

import { Container, IconContainer, ContainerWrapper, InputText } from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  placeholder?: string

  value?: string
  errorBoolean?: boolean

  type: 'transparent' | 'blue'
  borderDesign?: 'up' | 'down' | 'up-down'
  order?: 'top' | 'middle' | 'bottom'
  topPosition?: number
  editable?: boolean

  onFocus: () => void
  handleChangeUserName: (data: string) => void
}

export function UserNameInput({
  placeholder,
  value,
  errorBoolean,
  onFocus,
  topPosition,
  borderDesign,
  order,
  editable,
  type,
  handleChangeUserName,
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
          <UserCircle
            width={24}
            height={24}
            fill={errorBoolean ? '#D92727' : COLOR}
            strokeWidth={1.5}
            opacity={!value ? 0.7 : 1}
          />
        </IconContainer>

        <InputText
          onFocus={onFocus}
          onChangeText={handleChangeUserName}
          placeholder={placeholder}
          placeholderTextColor={COLOR}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          type={type}
          editable={editable}
          maxLength={16}
          keyboardType="default"
          returnKeyType="done"
          onBlur={Keyboard.dismiss}
        />
      </ContainerWrapper>
    </Container>
  )
}
