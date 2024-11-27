import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'

import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
  size: number
}

export const Container = styled(TouchableOpacity)`
  width: 100%;
`

export const ContentWrapper = styled.View`
  flex: 1;
  padding: 8px;

  height: 100%;
`

export const SubTittleWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding-top: 8px;
`

export const InfoWrapper = styled.View`
  flex: 1;
`

export const TopContent = styled.View``

export const BottomContent = styled.View`
  flex: 1;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
  padding-bottom: 4px;
`

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
  opacity: 0.5;
  margin-bottom: 2px;
  width: 100%;
`

export const WorkoutCardForwardButton = styled.View`
  position: absolute;
  right: 0;
  top: 44%;
  bottom: 56%;
`

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

export const PhotoPreLoadingImageBackground = styled.View<Props>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  opacity: 0.2;
  position: absolute;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
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

  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
`
