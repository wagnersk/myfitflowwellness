import React from 'react'
import Whatsapp from '../../../../assets/Whatsapp.svg'

import { useTheme } from 'styled-components/native'

import {
  Container,
  IconContainer,
  InputTextMasked,
  ContainerWrapper,
} from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  mask: string
  placeholder?: string
  value?: string
  errorBoolean?: boolean

  type: 'transparent' | 'blue'
  borderDesign?: 'up' | 'down' | 'up-down'
  order?: 'top' | 'middle' | 'bottom'

  topPosition?: number
  editable?: boolean

  onFocus: () => void
  handleChangeWhatsapp: (data: string) => void
}

export function WhatsappInput({
  mask,
  placeholder,
  value,
  errorBoolean,
  onFocus,
  topPosition,
  borderDesign,
  order,
  editable,
  type,
  handleChangeWhatsapp,
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
          <Whatsapp
            width={18}
            height={18}
            fill={errorBoolean ? '#D92727' : '#25D366'}
            strokeWidth={1.5}
            opacity={!value ? 0.7 : 1}
          />
        </IconContainer>

        <InputTextMasked
          onFocus={onFocus}
          onChangeText={handleChangeWhatsapp}
          placeholder={placeholder}
          placeholderTextColor={COLOR}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          editable={editable}
          maxLength={16}
          mask={mask}
          keyboardType="numeric"
          returnKeyType="done"
          onBlur={Keyboard.dismiss}
          type={type}
        />
      </ContainerWrapper>
    </Container>
  )
}
