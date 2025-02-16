import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const BackButtonWrapper = styled.View`
  position: absolute;
  left: 0;
  top: 32px;
`

export const BodyImageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  align-items: center;
  gap: 8px;
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

  width: 100%;
`

export const BodyInfo = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 130px;
`

export const InfoDescriptionWrapper = styled.View`
  padding: 16px;
`
export const InfoBoxesWrapper = styled.View`
  gap: 16px;
  flex-direction: row;
  padding-top: 16px;
`

export const TitleWrapper = styled.View``
export const Wrapper = styled.View`
  padding: 8px;
  align-items: center;
`
export const TitleWorkout = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
`
export const TitleDivision = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`
export const LockIconWrapper = styled.View`
  padding: 2px 4px 2px 4px;
  position: absolute;

  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  margin-left: 16px;
  bottom: 24px;
`

export const WorkoutBoxInfoWrapper = styled.View`
  justify-content: space-around;

  flex-direction: row;
  width: 100%;
`
export const ActionButtonsWrapper = styled.View`
  padding-top: 8px;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;

  width: 100%;
`

export const TextWrapper = styled.View`
  padding-left: 4px;
  flex-direction: column;
  gap: 4px;
`
export const TittleWrapper = styled.View`
  padding-left: 4px;
`
export const SubTittleWrapper = styled.View`
  padding-left: 4px;
`
export const ButtonsWrapper = styled.View`
  flex-direction: row;
  gap: 16px;
`

export const UpdatedAtText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.7;
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
export const BlurIconViewWrapper = styled(BlurView)<{ disabled: boolean }>`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  border-radius: 12px;
  overflow: hidden;
  background-color: red;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
export const ActButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.COLORS.GRADIENT_CARD[0], theme.COLORS.GRADIENT_CARD[1]],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 48px;
  width: 48px;
  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 8px;

  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  width: 100%;
`
