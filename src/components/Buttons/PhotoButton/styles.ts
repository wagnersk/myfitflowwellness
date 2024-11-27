import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  height: 48px;
  width: 48px;
  border-radius: 24px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`
