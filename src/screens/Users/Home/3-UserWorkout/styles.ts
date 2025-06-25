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
  //padding-bottom: 16px;
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
  padding-top: 12px;
`

export const FlatListWrapper = styled.View``
