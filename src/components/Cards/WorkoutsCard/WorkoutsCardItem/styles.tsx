import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'

import { TouchableOpacity } from 'react-native'

interface Props {
  size: number
}

export const Container = styled(TouchableOpacity)``

export const InfoAndButtonAndBottomLineWrapper = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 4px 4px 0 4px;
`

export const InfoAndButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const InfoWrapper = styled.View`
  justify-content: center;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
  padding-bottom: 6px;
`

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
  opacity: 0.5;
  margin-bottom: 2px;
  width: 100%;
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
export const IconTopWrapper = styled.View`
  position: absolute;
  right: 12px;
  top: 0;
`
export const IconBottomWrapper = styled.View`
  position: absolute;
  right: 12px;
  bottom: 0;
`

export const PhotoPreLoadingImageBackground = styled.View<Props>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  opacity: 0.2;
  position: absolute;
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
