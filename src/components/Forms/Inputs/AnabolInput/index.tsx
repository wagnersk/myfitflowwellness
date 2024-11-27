import React from 'react'
import Dna from '../../../../assets/Dna.svg'

import { useTheme } from 'styled-components'

import { Container, IconContainer, ContainerWrapper, InputText } from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  value?: string
  errorBoolean?: boolean

  editable?: boolean

  onFocus: () => void
  handleChangeAnabol: (data: string) => void
}

export function AnabolInput({
  value,
  errorBoolean,
  editable,
  onFocus,
  handleChangeAnabol,
}: Props) {
  const theme = useTheme()

  return (
    <Container>
      <ContainerWrapper>
        <IconContainer>
          <Dna
            width={30}
            height={30}
            fill={errorBoolean ? '#D92727' : theme.COLORS.BLUE_STROKE}
            strokeWidth={1.5}
            opacity={!value ? 0.7 : 1}
          />
        </IconContainer>

        <InputText
          onFocus={onFocus}
          onChangeText={handleChangeAnabol}
          placeholder={`Anabolizante`}
          placeholderTextColor={theme.COLORS.BLUE_STROKE}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          editable={editable}
          onBlur={Keyboard.dismiss}
        />
      </ContainerWrapper>
    </Container>
  )
}
