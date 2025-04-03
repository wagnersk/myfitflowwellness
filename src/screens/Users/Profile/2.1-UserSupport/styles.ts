import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'
interface Props {
  children: ReactNode
  loading?: boolean
  type?: 'up' | 'down' | 'up-down'
}

export const Container = styled.View`
  flex: 1;
`

export const Body = styled.View`
  /* justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 32px;
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
  padding: 32px;
  flex: 1;
`

export const SettingsWrapper = styled.View`
  align-items: flex-start;
  width: 100%;
`
export const ContainerWrapper = styled.View`
  width: 100%;
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`

export const ContainerTittleWrapper = styled.View`
  left: 16px;
`
export const ContainerTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(16)}px;
`
export const ButtonTitleWrapper = styled.View`
  position: absolute;
  top: 4px;
`
