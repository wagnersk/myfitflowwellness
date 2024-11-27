import { Dimensions, PixelRatio } from 'react-native'

// Obtenha as dimensões da tela
const { width: SCREEN_WIDTH } = Dimensions.get('window')

// Função RFValue Dinâmica
export const RFValue = (fontSize: number): number => {
  // Definir a base como a largura real da tela
  const baseWidth = SCREEN_WIDTH

  // Calcular a escala com base na largura da tela
  const scale = SCREEN_WIDTH / baseWidth
  console.log(`scale`)
  console.log(scale)
  // Retorna o valor da fonte ajustado dinamicamente
  return PixelRatio.roundToNearestPixel(fontSize * scale)
}
