import styled from 'styled-components/native'

import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from '@utils/RFValue'

import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
export const BodyWrapper = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
export const ToggleButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 32px 0;
`

export const TittleWrapper = styled.View`
  width: 100%;
`
export const Tittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(42)}px;
  text-align: center;
`
export const DescriptionWrapper = styled.View`
  margin-top: 10px;
  gap: 24px;
`
export const BulletPointWrapper = styled.View`
  flex-direction: row;
`

export const BulletPoint = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-size: ${RFValue(22)}px;
`
export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(20)}px;
  text-align: left;
  margin-bottom: 10px;
  margin-left: 10px;
`
export const BodyTop = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`

export const IconContainer = styled.View``

export const NextScreenButton = styled(TouchableOpacity)`
  height: 48px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`
export const PreviousButton = styled(TouchableOpacity)`
  height: 48px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export const LinearGradientContainer = styled(LinearGradient).attrs(
  ({ theme }) => ({
    colors: [
      theme.COLORS.GRADIENT_SPLASH_BG[0],
      theme.COLORS.GRADIENT_SPLASH_BG[1],
    ],
    start: { x: 0.5, y: 0.4 },
    end: { x: 0.5, y: 1 },
  }),
)`
  height: 100%;
  width: 100%;

  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`
