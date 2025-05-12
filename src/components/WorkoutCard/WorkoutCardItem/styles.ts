import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

import { TouchableOpacity } from 'react-native'

interface Props {
  index: number
  isEnd: boolean
  color?: string[]
}

export const Container = styled(TouchableOpacity)<Props>`
  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};

  ${({ index }) =>
    index === 0 &&
    css`
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    `}

  ${({ isEnd }) =>
    isEnd &&
    css`
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    `}
`

// por shadow no card para destacar a borda shadow
export const ContainerGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT_CARD_SERIE,
  start: { x: 0, y: 1 },
  end: { x: 1, y: 0 },
}))<Props>`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 64px;
  width: 100%;

  ${({ index }) =>
    index === 0 &&
    css`
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    `}

  ${({ isEnd }) =>
    isEnd &&
    css`
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    `}
`

export const ImageWrapper = styled.View`
  margin-left: 4px;
  margin-right: 8px;
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`

export const InfoWrapper = styled.View`
  justify-content: center;
  flex: 1;
`

// configuração da máscara nao mexer
export const Mask = styled(MaskedView)`
  flex-direction: row;
  position: absolute;
`

export const GradientText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.H1};
  font-size: ${RFValue(28)}px;
`

export const LinearGradientBehindMask = styled(LinearGradient).attrs(
  ({ theme }) => ({
    colors: theme.COLORS.GRADIENT_TEXT,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }),
)`
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 40px;
`
// O RFValue ajusta o  tamanho da máscara , aparecendo mais coisas caso
// minha string aumente , precisarei aumentar o mesmo

/* Mostra atrás da mascara,posso por qualquer coisa aqui, inclusive imagem
  É a cor da Letra em sí  :->  font-color do GradientText
   */

// --------------------------- Divisão , parte do meio do card -----------------

export const WorkoutCardName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
  padding-bottom: 2px;
`

export const WorkoutCardRepeatAndQuantityWrapper = styled.View`
  flex-direction: row;
  padding-bottom: 4px;
  justify-content: space-between;
  align-items: center;
`

export const WorkoutCardRepeatAndQuantity = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
  opacity: 0.5;
  flex: 1;
`

export const WorkoutMuscleGroupWrapper = styled.View`
  margin-right: 4px;
  margin-bottom: 4px;

  align-items: center;
  justify-content: center;

  flex-direction: row;

  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 12px;
`

export const WorkoutMuscleGroup = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  padding-left: 6px;
  padding-right: 6px;
`

export const WorkoutCardDateSeparator = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`

export const WorkoutCardLineSeparator = styled.View`
  border: 0.5px solid;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  margin-top: 2px;
  margin-bottom: 8px;
  border-radius: 2px;
  width: 95%;
`

export const WorkoutCardBulletsWrapper = styled.View`
  padding-top: 8px;
  flex-direction: row;
`

export const WorkoutCardBullets = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  margin-right: 8px;
`

export const WorkoutCardForwardButton = styled.View`
  padding-right: 4px;
`

export const WorkoutMuscleGroupRowWrapper = styled.View`
  flex-wrap: wrap;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`
