import styled, { css } from 'styled-components/native'
import { MaskedTextInput } from 'react-native-mask-text'
import { TextStyle } from 'react-native'
import { RFValue } from '@utils/RFValue'

interface Props extends TextStyle {
  borderDesign?: string
  moveComponentALittleDown?: boolean
  moveComponentALittleDown2x?: boolean
  moveComponentALittleDown3x?: boolean
  moveComponentALittleDown4x?: boolean
  changeColor?: boolean
  transparentBackground?: boolean
  placeholderOpacity?: boolean
  valueStyle?: boolean
  value?: string | undefined
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  border: solid;
  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-left-width: 2px;
  border-right-width: 2px;

  background-color: #ffffff;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  border-left-width: 2px;
  border-right-width: 2px;
  border-top-width: 2px;
  border-bottom-width: 2px;
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

  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;

  ${({ placeholderOpacity, value }) =>
    (placeholderOpacity || !value) &&
    css`
      opacity: 0.7;
    `}
`
