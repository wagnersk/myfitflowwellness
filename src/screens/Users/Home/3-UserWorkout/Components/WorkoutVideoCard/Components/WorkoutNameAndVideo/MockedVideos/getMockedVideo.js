import barraFixaMp4 from './barra-fixa.mp4'
import paralelaMp4 from './paralela.mp4'
import roscaComBarraMp4 from './rosca-com-barra.mp4'
import roscaDiretaMp4 from './rosca-direta-com-barra.mp4'
import supinoInclinadoMp4 from './supino-inclinado.mp4'
import francesMp4 from './triceps-frances.mp4'
import { Asset } from 'expo-asset'

export function getMockedVideo(videoId) {
  console.log('recebendo -> ', videoId)
  switch (videoId) {
    case '6EtsaZKn3dgqg1s0EhUc':
      return Asset.fromModule(barraFixaMp4).uri
    case 'nKFwLA9czq2NNEflrLVz':
      return Asset.fromModule(supinoInclinadoMp4).uri
    case '0jkS1piYwCiodxRnb9Rq':
      return Asset.fromModule(paralelaMp4).uri
    case 'AyLzgudD0CvxoxZM4nRO':
      return Asset.fromModule(francesMp4).uri
    case 'Qeaa3blESYxLPXXVgRZk':
      return Asset.fromModule(roscaDiretaMp4).uri
    case 'XpWPFplx1Vf89WJTFbT6':
      return Asset.fromModule(roscaComBarraMp4).uri
    default:
      console.error(`Video ID desconhecido: ${videoId}`)
      return null
  }
}
