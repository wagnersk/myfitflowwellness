import { ReactNode } from 'react'
import {
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

interface Props extends TouchableOpacityProps {
  children: ReactNode
  workoutExerciseDone?: boolean
  enabled?: boolean
}

interface PropsToReduceHeight {
  isFocused: boolean
}

export const WorkoutNameAndVideoWrapper = styled.View`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 140px;
  flex: 1;
`

export const WorkoutNameWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const WorkoutName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(18)}px;
  padding-bottom: 12px;
`

export const WorkoutInfoWrapper = styled.View`
  padding: 4px 0;
  width: 100%;
  height: 160px;
  justify-content: space-between;
`

export const WorkoutRepetitionAndSerieAndWeightWrapper = styled.View`
  flex: 1;
`

export const WorkoutInfoAndWeightWrapper = styled.View`
  align-items: center;
  justify-content: center;
`

export const WorkoutRepetitionAndSerieWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

export const WorkoutRepetitionWrapper = styled.View`
  width: 80px;
  align-items: center;
  justify-content: center;
`

export const WorkoutTipsTitleWrapper = styled.View`
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  padding: 0 8px;
  border-radius: 4px;
`

export const WorkoutTipsTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(12)}px;
`

export const WorkoutRepetitionName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(12)}px;
  padding-bottom: 4px;
`

export const WorkoutRepetitionValue = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  word-break: normal;
`

export const WorkoutWeightAndButtonPlusLessWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0 48px;
`

export const WorkoutButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const WorkoutButton = styled(TouchableOpacity)<Props>`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`

export const WorkoutButtonLess = styled.Text`
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(38)}px;
`

export const WorkoutButtonMore = styled.Text`
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(38)}px;
`

export const WorkoutWeightValueAndTextWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const WorkoutWeightValueWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const WorkoutWeightValue = styled(TextInput)`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(34)}px;
`

export const WorkoutWeightText = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
`

export const WorkoutSerieWrapper = styled.View`
  align-items: center;
  width: 80px;
`

export const WorkoutSerieName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(12)}px;
  padding-bottom: 4px;
`

export const WorkoutSerieValue = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`

export const WorkoutButtonConfirm = styled(TouchableOpacity)<Props>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
  width: 136px;
  border-radius: 16px;
`

export const BlurViewWrapper = styled(BlurView)`
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
  width: 136px;
  border-radius: 16px;
`

export const WorkoutButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`

export const Container = styled(TouchableOpacity)`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`

export const WorkoutUserNotesAndConfirmButtonWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

export const WorkoutUserNotesWrapper = styled.View`
  width: 100%;
  flex-direction: row;
`

export const WorkoutUserNotesButton = styled(TouchableOpacity)<Props>`
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
`

export const WorkoutVideoPlayerButton = styled(TouchableOpacity)<Props>`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`

export const WorkoutUserNotesWrite = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`

export const WorkoutTextBoxWrapper = styled.View`
  height: 72px;
  margin: 0 24px;
  padding: 4px;
`

export const WorkoutTextBoxTitle = styled.Text``

export const WorkoutTextBoxLetterCountWrapper = styled.View`
  align-items: flex-end;
`

export const WorkoutTextBoxLetterCount = styled.Text``

export const WorkoutUserNotesNullViewToBalanceCSS = styled.View`
  height: 48px;
  width: 48px;
`

export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT_CARD,
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))<PropsToReduceHeight>`
  flex: 1;
  padding: 12px;
  margin: 0 10px;

  align-items: center;
  border-radius: 16px;
  width: ${Dimensions.get('window').width * 0.8 - 20}px;
  height: ${Dimensions.get('window').width * 1}px;

  ${({ isFocused }) =>
    !isFocused &&
    css`
      height: ${Dimensions.get('window').width * 0.9}px;

      margin-top: 20px;
    `}
`
export const WorkoutUserNotes = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT_BUTTON,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  height: 24px;
  width: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  flex-direction: row;
`
