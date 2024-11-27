import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const BackButtonWrapper = styled.View`
  position: absolute;
`

export const BodyImageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  align-items: center;
  gap: 12px;
`

export const BodyTopWrapper = styled.View`
  width: 100%;
`

export const BodyImageBackgroundContainerSpaceBetween = styled.View`
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`

export const WorkoutFreeCardListWrapper = styled.View``

export const WorkoutInfoHomeCardWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
`

export const PhotoImageWrapper = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  margin-top: 30px;

  width: 100%;
  height: 340px;
  margin-bottom: 4px;
`

export const BodyInfo = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 130px;
  margin-top: 32px;
`

export const InfoDescriptionWrapper = styled.View`
  padding: 16px;
`

export const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
`
export const Wrapper = styled.View`
  padding: 8px;
  align-items: center;
  gap: 4px;
`
export const TitleWorkout = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.H1};
  font-size: ${RFValue(14)}px;
  opacity: 0.8;
`

export const BodyBottomWrapper = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
`

export const BlurViewWrapper = styled(BlurView)`
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 24px;
  margin-bottom: 16px;
  top: 40px;
`
