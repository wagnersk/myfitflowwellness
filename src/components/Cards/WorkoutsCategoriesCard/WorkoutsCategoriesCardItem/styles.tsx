import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'

export const Container = styled.View`
  /*   width: 144px; */
`

export const InfoAndButtonAndBottomLineWrapper = styled.View`
  flex-direction: column;
  padding: 8px;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
`

export const InfoAndButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const InfoWrapper = styled.View`
  justify-content: center;
`
export const WorkoutCategoryNameWrapper = styled.View`
  width: 126px;
  height: 50px;
`

export const WorkoutCategoryName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  margin-bottom: 8px;
  font-size: 14px;
  flex-wrap: wrap;
`

export const WorkoutCategoryTotalWorkouts = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.5;
  margin-bottom: 4px;
  font-size: 14px;
`

export const PhotoImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 104px;
`

export const PhotoPreLoadingImageBackground = styled.View`
  width: 144px;
  height: 104px;

  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  opacity: 0.2;
  position: absolute;
`

export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT_CARD_SERIE,
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 8px;

  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
`
