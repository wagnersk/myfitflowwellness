import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'

export const Container = styled.View`
  flex: 1;
`

export const BioInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 32px;

  padding-left: 32px;
  padding-right: 32px;
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
  padding-top: 8px;
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
`

export const Warning = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`

export const WarningWrapper = styled.View`
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
`

export const BodyImageBackgroundContainerSpaceBetween = styled.View`
  height: 100%;
  justify-content: space-between;
`

export const BlurViewWrapper = styled(BlurView)`
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  padding-top: 16px;
  padding-bottom: 50px;
  bottom: -100px;
`
