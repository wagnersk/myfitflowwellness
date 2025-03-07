import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'

import { TouchableOpacity } from 'react-native'

interface Props {
  size: number
}

export const Container = styled.TouchableOpacity``

export const InfoAndButtonWrapper = styled.View`
  flex-direction: row;
  height: 100%;
`

export const InfoWrapper = styled.View`
  height: 100%;
  flex: 1;
`
export const SubTittleWrapper = styled.View`
  padding-left: 2px;
  justify-content: flex-end;
`
export const DateWrapper = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  padding-bottom: 6px;
`

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
  opacity: 0.6;
  width: 100%;
  padding-bottom: 2px;
`

export const WorkoutCardForwardButton = styled.View``

export const WorkoutCardForwardButtonWrapper = styled.View`
  padding-right: 4px;

  height: 100%;
  align-items: center;
`

export const PhotoImageWrapper = styled.View<Props>`
  justify-content: center;
  align-items: center;

  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
`
export const ActiveBall = styled.View<{ color: 'red' | 'green' | 'yellow' }>`
  position: absolute;
  right: 16px;
  top: 6px;
  background-color: ${({ theme, color }) => {
    switch (color) {
      case 'green':
        return theme.COLORS.AUX_GOOGLE_GREEN
      case 'yellow':
        return theme.COLORS.AUX_GOOGLE_YELLOW
      case 'red':
      default:
        return theme.COLORS.AUX_GOOGLE_RED
    }
  }};
  width: 12px;
  height: 12px;
  border-radius: 6px;
`
export const GenderIconWrapper = styled.View`
  position: absolute;
  right: 32px;

  top: 6px;

  width: 12px;
  height: 12px;
  border-radius: 6px;
`
export const ShareIconWrapper = styled.View`
  position: absolute;
  right: 2px;

  top: 6px;

  width: 12px;
  height: 12px;
  border-radius: 6px;
`

export const IconBottomWrapper = styled.View`
  position: absolute;
  right: 8px;
  bottom: 0;
`

export const PhotoPreLoadingImageBackground = styled.View<Props>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  opacity: 0.2;
  position: absolute;
`
export const ButtonsContainer = styled.View`
  gap: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 4px;
  bottom: 4px;
`
export const MoveCardUpButton = styled.TouchableOpacity`
  gap: 12px;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
`
export const MoveCardDownButton = styled.TouchableOpacity`
  gap: 12px;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
`

export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT_CARD_SERIE,
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  border: 2px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 8px;

  width: 100%;
`
export const InfoAndButtonAndBottomLineWrapper = styled.View<{
  isOpenSettingsMode: boolean
}>`
  flex-direction: column;
  flex: 1;
  padding: 4px 4px 0 4px;
  opacity: ${({ theme, isOpenSettingsMode }) => (isOpenSettingsMode ? 0.5 : 1)};
`
export const MoveToFirstButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 0 8px;
`
