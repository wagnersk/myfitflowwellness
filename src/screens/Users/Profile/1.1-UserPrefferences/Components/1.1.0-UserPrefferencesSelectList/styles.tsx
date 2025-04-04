import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
interface Props {
  children: ReactNode
  loading?: boolean
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

/*   width: 100%;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE}; */
export const ButtonWrapper = styled(TouchableOpacity)<Props>`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: solid 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
    `}
`

export const ContentWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  height: 48px;
`
export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`

export const ItemTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(18)}px;
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
export const ListTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(18)}px;
`
