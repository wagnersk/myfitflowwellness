import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'
import { Dimensions } from 'react-native'

export const Container = styled.View`
  flex: 1;
  height: 600px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const BioInfoWrapper = styled.View`
  align-items: row;
  padding: 0 32px;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  padding-bottom: 16px;
`

export const BioInfoLetter = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(28)}px;
`

export const BioInfo = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 24px;
`

export const BioInfoName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`

export const BodyImageContainer = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  top: -20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  justify-content: space-between;
`

export const BodyImageBackgroundContainerSpaceBetween = styled.View`
  flex: 1;
`

export const FlatListWrapper = styled.View``

export const BulletsCronometerAndCTAButtonWrapper = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 24px;
`

export const IosBackgroundBlurViewTipsWrapper = styled(BlurView)`
  justify-content: center;
  align-items: flex-start;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_BLUE};
`

export const AndroidBackgroundTipsWrapper = styled.View`
  border-radius: 16px;
`

export const TipsTitleWrapper = styled.View``

export const TipsTextWrapper = styled.View``

export const TipsTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.COLORS.NEUTRA_BLACK_LOGO};
  padding-bottom: 2px;
  align-items: flex-start;
  width: 100%;
`

export const TipsWrapper = styled.View`
  padding: 12px;
  height: ${(Dimensions.get('window').width / 10) * 3}px;
`

export const TipsText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  color: ${({ theme }) => theme.COLORS.NEUTRA_BLACK_LOGO};
  font-size: ${RFValue(14)}px;
  opacity: 0.9;
`

export const OpacityBackgroundPositionAbsolute = styled.View`
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_BLUE};
  width: 100%;
  opacity: 0.4;
  position: absolute;
  border-radius: 16px;
  padding: 12px;
  height: 100%;
`

export const ContentWrapper = styled.View`
  border-radius: 16px;
  padding: 12px;
`
