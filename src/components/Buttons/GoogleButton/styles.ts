import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native' // Importe o TouchableOpacity

export const ContainerBorder = styled.View`
  border: 2px solid;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`

export const Container = styled(TouchableOpacity)`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
  padding-left: 15px;
`
