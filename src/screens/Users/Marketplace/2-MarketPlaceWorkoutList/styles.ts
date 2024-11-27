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

export const BioInfo = styled.View`
  justify-content: center;
  align-items: center;
`

export const BioInfoLetter = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(28)}px;
  bottom: -12px;
`
export const BioInfoSubtitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  bottom: -12px;
`

export const BodyImageContainer = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  top: -20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  padding-top: 32px;
`

export const BodyTopWrapper = styled.View`
  width: 100%;
`

export const BodyImageBackgroundContainerSpaceBetween = styled.View`
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`

export const WorkoutsCategoriesCardListWrapper = styled.View``

export const WorkoutInfoHomeCardWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 32px;
  padding-right: 32px;
`
