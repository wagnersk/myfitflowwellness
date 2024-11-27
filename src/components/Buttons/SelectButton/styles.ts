import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  loading?: boolean
  type: 'first' | 'middle' | 'last'
}

export const Container = styled(TouchableOpacity)<Props>`
  border: solid;
  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-left-width: 2px;
  border-right-width: 2px;

  background-color: #ffffff;

  justify-content: center;
  align-items: center;

  border-left-width: 2px;
  border-right-width: 2px;
  border-top-width: 2px;
  border-bottom-width: 2px;
  height: 48px;

  ${({ type }) =>
    type === 'first' &&
    css`
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
    `}

  ${({ type }) =>
    type === 'last' &&
    css`
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      top: -2px;
    `}
`

export const Title = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`

export const Button = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-direction: row;
`

export const TittleWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`
export const IconContainer = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;

  position: absolute;
  right: 0;
`
