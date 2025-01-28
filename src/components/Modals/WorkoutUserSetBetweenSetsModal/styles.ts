import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TextInput, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { ReactNode } from 'react'

interface Props {
  isFocused?: boolean
}

type TouchableOpacityButtonProps = {
  children: ReactNode
  selected?: boolean
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
  padding: 32px 16px;

  gap: 12px;
`
export const TipsNoteBodyWrapper = styled.View`
  gap: 12px;
`

export const TipsNoteWrapper = styled.View`
  gap: 24px;
  align-items: center;
  justify-content: center;
`
export const InputsWrapper = styled.View`
  gap: 24px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export const TipsTitleNoteWrapper = styled.View`
  width: 100%;
  padding: 8px;
  align-items: center;
`

export const TitteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 4px;
  justify-content: flex-start;
`
export const SubTitteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
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

export const TipsButtonWrapper = styled.View`
  width: 100%;
  margin-bottom: 20px;
`

export const TipsButtonText = styled.Text<{ selected: boolean }>`
  color: ${({ theme, selected }) =>
    selected
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
`

export const TipsButtonLinearGradientSave = styled(LinearGradient).attrs(
  ({ theme }) => ({
    colors: [theme.COLORS.GRADIENT_BUTTON[0], theme.COLORS.GRADIENT_BUTTON[1]],
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

export const TipsButton = styled(TouchableOpacity)<TouchableOpacityButtonProps>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;

  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  border-radius: 12px;
`

export const ItensButton = styled(
  TouchableOpacity,
)<TouchableOpacityButtonProps>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
  width: 48px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
    `}
`
