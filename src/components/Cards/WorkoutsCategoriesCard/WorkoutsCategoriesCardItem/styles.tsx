import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'

export const Container = styled.View`
  position: relative;
`

export const InfoAndButtonAndBottomLineWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

export const InfoAndButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

export const InfoWrapper = styled.View`
  justify-content: center;
  align-items: center;
`
export const WorkoutCategoryNameWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

export const WorkoutCategoryName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.H1};
  font-size: ${RFValue(12)}px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
`

export const PhotoImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`

export const PhotoPreLoadingImageBackground = styled.View`
  height: 80px;

  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  opacity: 0.2;
  position: absolute;
`

export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    theme.COLORS.GRADIENT_CARD_SERIE[0],
    theme.COLORS.GRADIENT_CARD_SERIE[1],
  ],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 8px;

  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  width: 100%;
`
export const CircleCounterWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 1;
`

// Estilo para o contador circular
export const CircleCounter = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
`
