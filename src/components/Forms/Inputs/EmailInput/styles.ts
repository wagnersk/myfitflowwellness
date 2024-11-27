import { RFValue } from '@utils/RFValue'
import styled, { css } from 'styled-components/native'
import { MaskedTextInput } from 'react-native-mask-text'
import { TextInput, TextStyle } from 'react-native'

interface Props extends TextStyle {
  placeholderOpacity?: boolean
  value?: string | undefined

  type: 'transparent' | 'blue'
  borderDesign?: 'up' | 'down' | 'up-down'
  order?: 'top' | 'middle' | 'bottom' | 'alone'
  topPosition?: number
  editable?: boolean
}

export const Container = styled.View<Props>`
  width: 100%;
  flex-direction: row;
  border: solid;

  border-color: ${({ type, theme }) =>
    type === 'transparent'
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE};

  ${({ borderDesign, order }) =>
    borderDesign === 'up' &&
    order === 'top' &&
    css`
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;

      border-left-width: 2px;
      border-right-width: 2px;
      border-top-width: 2px;
      border-bottom-width: 2px;
    `}

  ${({ borderDesign, order }) =>
    borderDesign === 'up' &&
    order === 'middle' &&
    css`
      border-left-width: 2px;
      border-right-width: 2px;
      border-top-width: 2px;
      border-bottom-width: 2px;
    `}
    
  ${({ borderDesign, order }) =>
    borderDesign === 'up-down' &&
    order === 'alone' &&
    css`
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;

      border-left-width: 2px;
      border-right-width: 2px;
      border-top-width: 2px;
      border-bottom-width: 2px;
    `}

  top: ${({ topPosition }) => (topPosition ? `${topPosition}px` : '0px')};
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

  color: ${({ type, theme }) =>
    type === 'transparent'
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE};

  background-color: ${({ type, theme }) =>
    type === 'transparent'
      ? 'transparent'
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};

  border-radius: 12px;

  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;

  ${({ placeholderOpacity, value }) =>
    (placeholderOpacity || !value) &&
    css`
      opacity: 0.7;
    `}
`
