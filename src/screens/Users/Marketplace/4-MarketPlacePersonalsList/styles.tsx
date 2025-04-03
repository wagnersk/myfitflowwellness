import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
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

export const BioInfoGreetings = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(18)}px;
`

export const BioInfoName = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`

export const BioInfo = styled.View`
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-top: 24px;
`

export const BioInfoLetter = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`

export const BodyImageContainer = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  top: -20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const BodyTopWrapper = styled.View`
  width: 100%;
`

export const Warning = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`

export const WarningGreetings = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`

export const WarningWrapper = styled.View`
  flex-direction: row;
  padding-top: 16px;
  padding-bottom: 16px;
  position: absolute;
  top: 0;
  left: 32px;
`

export const BodyImageBackgroundContainerSpaceBetween = styled.View`
  height: 100%;
  justify-content: space-between;
  align-items: center;
`
