import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-wrap: wrap;
  gap: 8px;
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`
export const DescriptionWrapper = styled.View`
  flex-direction: column;

  gap: 4px;
  flex-wrap: wrap;
`
export const BorderWrapper = styled.View`
  position: relative;
  border-radius: 8px;
  border: 1px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  flex-wrap: wrap;
  padding: 16px;
  gap: 24px;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`
export const TitleWrapper = styled.View`
  position: absolute;
  top: -12px;
  left: 10px;
  padding: 2px 4px 2px 4px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`

export const BlurViewWrapper = styled(BlurView)`
  position: absolute;
  top: -12px;
  left: 10px;
  padding: 2px 4px 2px 4px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  background-color: transparent;
  border-radius: 8px;
  overflow: hidden;
`

export const MusclesWrapper = styled.View`
  flex-wrap: wrap;
  gap: 8px;
  opacity: 0.8;
`
