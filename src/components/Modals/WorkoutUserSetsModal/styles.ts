import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { ReactNode } from 'react'
interface Props {
  isFocused?: boolean
}

type TouchableOpacityButtonProps = {
  children: ReactNode
}

export const OverLayTop = styled.View`
  flex: 1;
  justify-content: flex-end; /* Garante que o modal fique na parte inferior */
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
`
export const OverLayBottom = styled.View`
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
`

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px;
  gap: 12px;
`
export const TipsNoteBodyWrapper = styled.View`
  gap: 12px;
`

export const TipsNoteWrapper = styled.View``

export const PickerContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`
export const PickerWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  flex-direction: row;
`
export const PickerColumWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

export const SeparatorWrapper = styled.View`
  left: 8px;
`

export const Header = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`

export const TextHeader = styled.View`
  justify-content: center;
  align-items: center;
  padding: 8px;
`

export const HeaderTittle = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 4px;
  justify-content: flex-start;
`
export const HeaderSubTittle = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 4px;
  justify-content: flex-start;
`

export const TipsWorkoutTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};

  align-items: center;
  justify-content: center;
`
export const TipsInputNotes = styled(TextInput)<Props>`
  height: 48px;
  width: 96px;
  padding-top: 48px;
  padding-bottom: 48px;
  max-height: 300px;

  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(18)}px;

  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding: 12px 20px;
  border-radius: 12px;

  border: 1px solid
    ${({ theme }) => theme.COLORS.BLUE_NOTIFICATION_BG_20PERCENT};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 2px solid
        ${({ theme }) => theme.COLORS.BLUE_NOTIFICATION_BG_20PERCENT};
    `}
`

export const TipsButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`

export const TipsButtonLinearGradientSave = styled(LinearGradient).attrs(
  ({ theme }) => ({
    colors: [theme.COLORS.GRADIENT_CARD[0], theme.COLORS.GRADIENT_CARD[1]],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }),
)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-direction: row;
`
export const SaveButtonWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
`
export const RepOrTimeButtonWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
const { width: screenWidth } = Dimensions.get('window')
const buttonWidth = screenWidth * 0.25 // 25% da largura da tela

export const ButtonBorderWrapper = styled.View<{
  redColor?: boolean
  disabled?: boolean
}>`
  width: ${buttonWidth}px;

  border: 2px solid
    ${({ theme, redColor }) =>
      redColor ? theme.COLORS.AUX_GOOGLE_RED : theme.COLORS.AUX_GOOGLE_BLUE};
  border-radius: 12px;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
    `}
`
export const ActButton = styled(TouchableOpacity)<TouchableOpacityButtonProps>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
  border-radius: 12px;
`
export const SaveButton = styled(TouchableOpacity)<TouchableOpacityButtonProps>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
  border-radius: 12px;
`

export const ActText = styled.Text<{ redColor?: boolean }>`
  color: ${({ theme, redColor }) =>
    redColor ? theme.COLORS.AUX_GOOGLE_RED : theme.COLORS.AUX_GOOGLE_BLUE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`
