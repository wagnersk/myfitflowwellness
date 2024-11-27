import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 1px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  left: 32px;
  top: 32px;
`
