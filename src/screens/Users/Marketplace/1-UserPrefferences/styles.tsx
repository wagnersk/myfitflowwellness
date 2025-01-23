import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'

export const Container = styled.View`
  flex: 1;
`

export const Body = styled.View`
  width: 100%;
  height: 100%;
  gap: 32px;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`

export const SelectContentWrapper = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`
export const SelectWrapper = styled.View`
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  gap: 12px;
`
export const ButtonWrapper = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: center;
`

export const BodyImageWrapper = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const ImageBackgroundContainer = styled.View`
  align-items: center;
  padding: 32px;
  gap: 32px;
  flex: 1;
`

export const SettingsWrapper = styled.View`
  align-items: flex-start;
  width: 100%;
`

export const FooterWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
`
export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const SelectFilterButtonWrapper = styled.View`
  background-color: #ffffff;

  width: 96px;
  height: 96px;

  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-width: 2px;
  border-radius: 12px;
  justify-content: center;
`
export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(16)}px;
`
export const EquipamentTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(22)}px;
`
