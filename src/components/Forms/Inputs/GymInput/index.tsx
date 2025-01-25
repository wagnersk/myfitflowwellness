import React from 'react'
import Halter from '../../../../assets/Halter.svg'

import { useTheme } from 'styled-components/native'

import { Container, IconContainer, ContainerWrapper, InputText } from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  value?: string
  errorBoolean?: boolean

  type: 'transparent' | 'blue'
  borderDesign?: 'up' | 'down' | 'up-down'
  order?: 'top' | 'middle' | 'bottom'
  topPosition?: number
  editable?: boolean

  onFocus: () => void
  handleChangeGym: (data: string) => void
}

export function GymInput({
  value,
  errorBoolean,
  onFocus,
  topPosition,
  borderDesign,
  order,
  editable,
  type,
  handleChangeGym,
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
          <Halter
            width={30}
            height={30}
            stroke={errorBoolean ? '#D92727' : COLOR}
            strokeWidth={1.5}
            opacity={!value ? 0.7 : 1}
          />
        </IconContainer>

        <InputText
          onFocus={onFocus}
          onChangeText={handleChangeGym}
          placeholder={`Academia atual`}
          placeholderTextColor={theme.COLORS.BLUE_STROKE}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          editable={editable}
          type={'blue'}
          onBlur={Keyboard.dismiss}
        />
      </ContainerWrapper>
    </Container>
  )
}
