import { RFValue } from '@utils/RFValue'
import styled, { css } from 'styled-components/native'
import { MaskedTextInput } from 'react-native-mask-text'
import { TextInput, TextStyle } from 'react-native'

interface Props extends TextStyle {
  placeholderOpacity?: boolean
  value?: string | undefined
}

export const Container = styled.View<Props>`
  width: 100%;
  flex-direction: row;
  border: solid;
  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-left-width: 2px;
  border-right-width: 2px;

  background-color: #ffffff;

  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;

  border-left-width: 2px;
  border-right-width: 2px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  top: -2px;
`

export const ContainerWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`

export const IconContainer = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
`

export const InputTextMasked = styled(MaskedTextInput)<Props>`
  flex: 1;
`

export const InputText = styled(TextInput)<Props>`
  flex: 1;

  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;

  ${({ placeholderOpacity, value }) =>
    (placeholderOpacity || !value) &&
    css`
      opacity: 0.7;
    `}
`
