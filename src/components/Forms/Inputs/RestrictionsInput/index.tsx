import React from 'react'
import Warning from '../../../../assets/Warning.svg'

import { useTheme } from 'styled-components/native'

import { Container, IconContainer, ContainerWrapper, InputText } from './styles'
import { Keyboard } from 'react-native'

export interface Props {
  value?: string
  errorBoolean?: boolean

  editable?: boolean

  onFocus: () => void
  handleChangeRestrictions: (data: string) => void
}

export function RestrictionsInput({
  value,
  errorBoolean,
  editable,
  onFocus,
  handleChangeRestrictions,
}: Props) {
  const theme = useTheme()

  return (
    <Container>
      <ContainerWrapper>
        <IconContainer>
          <Warning
            width={24}
            height={24}
            fill={errorBoolean ? '#D92727' : theme.COLORS.BLUE_STROKE}
            strokeWidth={1.5}
            opacity={!value ? 0.7 : 1}
          />
        </IconContainer>

        <InputText
          onFocus={onFocus}
          onChangeText={handleChangeRestrictions}
          placeholder={`Restrição`}
          placeholderTextColor={theme.COLORS.BLUE_STROKE}
          autoCorrect={false}
          placeholderOpacity={!value}
          value={value}
          editable={editable}
          maxLength={200}
          keyboardType="default"
          returnKeyType="done"
          multiline
          onBlur={Keyboard.dismiss}
        />
      </ContainerWrapper>
    </Container>
  )
}
