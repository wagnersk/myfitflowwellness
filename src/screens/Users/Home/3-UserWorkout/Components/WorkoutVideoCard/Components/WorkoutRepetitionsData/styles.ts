import { ReactNode } from 'react'
import {
  Dimensions,
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

const cardHeight = Dimensions.get('window').height / 1.5 // 426
const cardWidth = Dimensions.get('window').width * 0.8 - 20 // 294.40000000000003

const bottomCardHeight = cardHeight * 0.6 // 170.4

const confirmButtonHeight = 36 // 170.4
const confirmButtonWidth = cardWidth / 1.4 // 170.4

export const TableWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const WorkoutNameAndVideoWrapper = styled.View`
  align-items: center;
  justify-content: center;

  width: 100%;
  flex: 1;
`
export const WorkoutInfoWrapper = styled.View`
  height: 100%;
  width: 100%;
  height: ${bottomCardHeight}px;
  gap: 8px;
`
export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.COLORS.GRADIENT_CARD[0], theme.COLORS.GRADIENT_CARD[1]],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))<PropsToReduceHeight>`
  flex: 1;
  padding: 12px;
  margin: 0 10px;

  align-items: center;
  border-radius: 12px;
  height: ${cardHeight}px;
  width: ${cardWidth}px;

  ${({ isFocused }) =>
    !isFocused &&
    css`
      height: ${cardHeight - 40}px;

      margin-top: 20px;
    `}
`

export const WorkoutNameWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const WorkoutName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(14)}px;
  padding-bottom: 8px;
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
  height: 100%;
  align-items: flex-start;
  flex: 1;
  padding-top: 4px;
`

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

export const WorkoutButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const WorkoutButton = styled(TouchableOpacity)<Props>`
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`

export const WorkoutButtonLess = styled.Text`
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(38)}px;
`

export const WorkoutButtonMore = styled.Text`
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
  font-family: ${({ theme }) => theme.FONTS.BODY};
`

export const WorkoutWeightValueAndTextWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`

export const WorkoutWeightValueWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const WorkoutWeightValue = styled(TouchableOpacity)<Props>`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  flex-direction: row;
  border-radius: 12px;
  height: 36px;
  justify-content: center;
  align-items: center;
`
export const WorkoutIndexButton = styled(TouchableOpacity)<Props>`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  flex-direction: row;
  border-radius: 12px;
  height: 36px;
  width: 48px;
  justify-content: center;
  align-items: center;
`

export const WorkoutButtonConfirm = styled(TouchableOpacity)<Props>`
  justify-content: center;
  align-items: center;
  flex-direction: row;

  height: ${confirmButtonHeight}px;
  width: ${confirmButtonWidth}px;
  border-radius: 12px;
`

export const BlurViewWrapper = styled(BlurView)`
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: ${confirmButtonHeight}px;
  width: ${confirmButtonWidth}px;
  height: 48px;
  border-radius: 12px;
`
export const BlurViewAddSecondsWrapper = styled(BlurView)`
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  height: 48px;
  width: 48px;
  border-radius: 12px;
`

export const WorkoutButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
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

export const WorkoutTextBoxLetterCountWrapper = styled.View`
  align-items: flex-end;
`

export const WorkoutTextBoxTitle = styled.Text``
export const WorkoutTextBoxLetterCount = styled.Text``
export const WorkoutCronometerWrapper = styled.View``

export const BulletsCronometerAndCTAButtonWrapper = styled.View`
  justify-content: center;
`

export const WorkoutSerieWrapper = styled.View<{
  activeWeightIndex: boolean
}>`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  border-radius: 12px;
`
export const WorkoutWeightMetric = styled.Text<{
  activedGreenColor: boolean
  activeWeightIndex: boolean
}>`
  font-size: ${({ activeWeightIndex }) =>
    activeWeightIndex ? `${RFValue(14)}px` : `${RFValue(14)}px`};

  color: ${({ theme, activedGreenColor }) =>
    activedGreenColor
      ? theme.COLORS.AUX_GOOGLE_GREEN
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};

  font-family: ${({ theme }) => theme.FONTS.BODY};

  font-family: ${({ theme, activeWeightIndex }) =>
    activeWeightIndex ? theme.FONTS.BUTTON : theme.FONTS.BODY};
  border-bottom-width: ${({ activeWeightIndex }) =>
    activeWeightIndex ? `1px  ` : 'none'};

  border-bottom-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`

export const WorkoutSerieValue = styled.Text<{
  activeWeightIndex: boolean
}>`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};

  font-family: ${({ theme, activeWeightIndex }) =>
    activeWeightIndex ? theme.FONTS.BUTTON : theme.FONTS.BODY};

  font-size: ${({ activeWeightIndex }) =>
    activeWeightIndex ? `${RFValue(18)}px` : `${RFValue(16)}px`};
`

export const WorkoutWeightText = styled.Text<{
  activedGreenColor: boolean
  alreadySelected: boolean
  activeWeightIndex: boolean
}>`
  font-size: ${({ activeWeightIndex }) =>
    activeWeightIndex ? `${RFValue(14)}px` : `${RFValue(12)}px`};

  font-family: ${({ theme, alreadySelected }) =>
    alreadySelected ? theme.FONTS.BUTTON : theme.FONTS.BODY};
  color: ${({ theme, activedGreenColor }) =>
    activedGreenColor
      ? theme.COLORS.AUX_GOOGLE_GREEN
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  text-align: center;
  border-bottom-width: ${({ activeWeightIndex }) =>
    activeWeightIndex ? `1px  ` : 'none'};

  border-bottom-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};

  ${({ alreadySelected }) =>
    alreadySelected &&
    css`
      text-decoration-color: ${({ theme }) =>
        theme.COLORS.NEUTRA_LETTER_AND_STROKE};
    `};
`
