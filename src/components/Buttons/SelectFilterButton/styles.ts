import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  loading?: boolean
}

export const Container = styled(TouchableOpacity)<Props>`
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`

export const Button = styled.View`
  width: 100%;
  border-radius: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const TittleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`
export const IconContainer = styled.View`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
`
