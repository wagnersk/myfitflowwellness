import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'

export const Container = styled.View`
  flex: 1;
`

export const Body = styled.View`
  /* justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: 100%;
  flex: 1;
`

export const ListWrapper = styled.View`
  padding-top: 32px;
  gap: 16px;
  flex: 1;
`

export const BodyImageWrapper = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const ImageBackgroundContainer = styled.View`
  align-items: center;
  padding: 16px;
  flex: 1;
`

export const SettingsWrapper = styled.View`
  padding-left: 16px;
  align-items: flex-start;
  width: 100%;
`
export const ContainerWrapper = styled.View`
  width: 100%;
  gap: 16px;
`

export const CardsWrapper = styled.View`
  width: 100%;
  gap: 12px;
`

export const ContainerTittleWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`
export const MonthYearACTMessage = styled.View`
  justify-content: center;
  align-items: center;
  gap: 4px;
`
export const ContainerTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(24)}px;
  padding-left: 16px;
`

export const CardTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(16)}px;
`
export const CardDate = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`
export const ButtonTitleWrapper = styled.View`
  position: absolute;
  top: 4px;
`
export const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
`

export const OpenSettingsButton = styled.TouchableOpacity``
