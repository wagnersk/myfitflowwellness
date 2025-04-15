import React, { useState } from 'react'
import { Keyboard, TextInputProps, TouchableOpacity } from 'react-native'

import { useTheme } from 'styled-components/native'

import { Container, IconContainer, InputText, ContainerWrapper } from './styles'

import EyePassword from '@assets/EyePassword.svg'
import EyePasswordOff from '@assets/EyePasswordOff.svg'
import Lock from '@assets/Lock.svg'

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
  handleChangePassword: (data: string) => void
}

export function PasswordInput({
  placeholder,
  value,
  errorBoolean,
  onFocus,
  borderDesign,
  type,
  order,
  editable,
  handleChangePassword,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const theme = useTheme()

  const COLOR =
    type === 'transparent'
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState)
  }

  return (
    <Container type={type} borderDesign={borderDesign} order={order}>
      <ContainerWrapper>
        <IconContainer>
          <Lock
            width={24}
            height={24}
            fill={errorBoolean ? '#D92727' : COLOR}
            strokeWidth={1.5}
            opacity={value ? 1 : 0.7}
          />
        </IconContainer>

        <InputText
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={COLOR}
          secureTextEntry={!isPasswordVisible}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          onChangeText={handleChangePassword}
          type={type}
          editable={editable}
          onBlur={Keyboard.dismiss}
          selectionColor={'white'}
        />
      </ContainerWrapper>

      {!!value && (
        <TouchableOpacity onPress={handlePasswordVisibilityChange}>
          <IconContainer>
            {isPasswordVisible ? (
              <EyePassword
                width={28}
                height={28}
                stroke={COLOR}
                strokeWidth={1.5}
                opacity={value ? 1 : 0.7}
              />
            ) : (
              <EyePasswordOff
                width={28}
                height={28}
                stroke={COLOR}
                strokeWidth={1.5}
                opacity={value ? 1 : 0.7}
              />
            )}
          </IconContainer>
        </TouchableOpacity>
      )}
    </Container>
  )
}
