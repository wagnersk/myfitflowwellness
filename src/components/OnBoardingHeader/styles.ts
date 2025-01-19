import styled from 'styled-components/native'
import MyFitFlowNameAndSlogan from '@assets/MyFitFlowNameAndSlogan.svg'
import Logo from '@assets/Logo.svg'

import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from '@utils/RFValue'

import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  padding: 0 16px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`
export const BulletsPagination = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export const WorkoutCardBulletsWrapper = styled.View`
  padding-bottom: 8px;
  flex-direction: row;
`

export const WorkoutCardBullets = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  margin-right: 6px;
  opacity: 0.5;
`
export const WorkoutCardLine = styled.View`
  width: 32px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  margin-right: 6px;
`

export const SkipButton = styled(TouchableOpacity)`
  height: 48px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export const SkipButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
  text-align: center;
  top: 2px;
  left: 10px;
`

export const IconContainer = styled.View``
