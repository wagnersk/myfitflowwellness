import { RFValue } from '@utils/RFValue'
import { BlurView } from 'expo-blur'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border-radius: 8px;
  flex: 1;
`
export const BorderWrapper = styled.View`
  position: relative;
  border-radius: 8px;
  border: 1px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  flex-wrap: wrap;
  padding: 16px;
  gap: 24px;
  flex: 1;
`
export const TitleWrapper = styled.View`
  position: absolute;
  top: -12px;
  left: 10px;
  padding: 2px 4px 2px 4px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`
export const InfoWrapper = styled.View`
  flex-direction: column;

  gap: 4px;
`
export const EquipamentItensWrapper = styled.View`
  flex-direction: column;

  gap: 4px;
  flex-wrap: wrap;
`

const EquipamentWrapper = styled.View`
  flex-wrap: wrap;
  gap: 8px;
`
export const EquipamentTitleWrapper = styled.View``

export const FreeStyleWrapper = styled(EquipamentWrapper)``
export const PoliaStyleWrapper = styled(EquipamentWrapper)``
export const MachineStyleWrapper = styled(EquipamentWrapper)``

export const EquipamentTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`
export const EquipamentItens = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.8;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
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
