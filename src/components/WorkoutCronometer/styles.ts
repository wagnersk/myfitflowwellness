import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'

interface WorkoutCronometerWrapper {
  type: 'negative' | 'positive'
}

export const WorkoutCronometerWrapper = styled.View`
  width: 100%;
  gap: 8px;
`

export const Top = styled.View`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  flex-direction: row;
`

export const Middle = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 48px;
`
export const AnimatedCircularProgressWrapper = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: -16px;
`

export const WorkoutCronometerButton = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`
export const SaveButtonWrapper = styled.View`
  align-items: center;
  justify-content: center;
  bottom: 12px;
  position: absolute;
`
export const CircleAndButtonWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const WorkoutCronometerButtonStart = styled.TouchableOpacity`
  height: 48px;
  justify-content: center;
  align-items: center;
`
export const IncrementSeconds = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`
export const DecrementSeconds = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`

export const WorkoutCronometerTimer = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(24)}px;
`
export const WorkoutCronometerSaveTimer = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(18)}px;
`

export const WorkoutCronometerText = styled.Text<WorkoutCronometerWrapper>`
  color: ${({ theme, type }) =>
    type === 'positive'
      ? theme.COLORS.AUX_GOOGLE_GREEN
      : theme.COLORS.AUX_GOOGLE_RED};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
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
const size = 92
export const FakeAnimatedCircularProgressWrapper = styled.View`
  width: ${size}px;
  height: ${size}px;
  align-items: center;
  justify-content: center;
  border-radius: 56px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  bottom: 16px;
`
