import { ReactNode } from 'react'
import {
  Dimensions,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'

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

export const WorkoutNameAndVideoWrapper = styled.View`
  align-items: center;
  justify-content: center;

  width: 100%;
  flex: 1;
`

export const WorkoutNameWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 34px;
`

export const WorkoutName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(14)}px;
`
export const WorkoutTechieTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_YELLOW};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(12)}px;
`
export const WorkoutVideoPlayerButton = styled(TouchableOpacity)<Props>`
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`
