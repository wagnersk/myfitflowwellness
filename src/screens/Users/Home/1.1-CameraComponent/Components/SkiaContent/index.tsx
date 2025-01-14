import React, { useEffect, useState } from 'react'
import {
  Group,
  Rect,
  Text as SkiaText,
  ImageSVG,
  Skia,
  SkFont,
  matchFont,
  DiffRect,
  rect,
  rrect,
  vec,
  Line,
  SkiaDomView,
} from '@shopify/react-native-skia'
import { Dimensions, Platform } from 'react-native'
import { CanvasFullScreen } from './styles'

type Slant = 'normal' | 'italic' | 'oblique'

type Weight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

interface RNFontStyle {
  fontFamily: string
  fontSize: number
  fontStyle: Slant
  fontWeight: Weight
}

interface IDaysData {
  index: number
  name: string
  selected: boolean
}

interface Props {
  dayText: string
  timeText: string
  daysData: IDaysData[]
  children?: React.ReactNode
  fowardRef?: React.RefObject<SkiaDomView>
  handleDayPress: (index: number) => void
}

const logoSvg = Skia.SVG.MakeFromString(`
    <svg viewBox="0 0  245 58" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M32.0666 0.793457L36.1291 28.5851H29.2957L27.1499 13.0643L20.4832 28.5851H16.8166L10.1499 12.981L7.96241 28.5851H1.17075L5.23325 0.793457H11.2332L18.6916 18.2518L26.1499 0.793457H32.0666Z" fill="white"/>
  <path d="M51.4702 11.1476L56.5535 0.793457H63.991L54.8452 17.856V28.5851H47.9077V17.856L38.8452 0.793457H46.3869L51.4702 11.1476Z" fill="white"/>
  <path d="M84.5827 0.793457V6.85596H74.9369V12.4185H84.1869V18.231H74.9369V28.5851H67.9786V0.793457H84.5827Z" fill="white"/>
  <path d="M97.4332 28.5851H90.4957V0.793457H97.4332V28.5851Z" fill="white"/>
  <path d="M116.229 28.5851H109.27V7.06429H102.437V0.793457H122.979V7.06429H116.229V28.5851Z" fill="white"/>
  <path d="M144.404 0.793457V6.85596H134.758V12.4185H144.008V18.231H134.758V28.5851H127.8V0.793457H144.404Z" fill="white"/>
  <path d="M167.379 28.5851H150.108V0.793457H157.067V22.3143H167.379V28.5851Z" fill="white"/>
  <path d="M185.648 29.1058C182.966 29.1058 180.482 28.5016 178.19 27.2933C175.909 26.085 174.091 24.387 172.732 22.1891C171.383 19.9964 170.711 17.4964 170.711 14.6891C170.711 11.887 171.383 9.38704 172.732 7.18913C174.091 4.98079 175.909 3.28288 178.19 2.08496C180.482 0.876628 182.966 0.272461 185.648 0.272461C188.315 0.272461 190.794 0.876628 193.086 2.08496C195.378 3.28288 197.195 4.98079 198.544 7.18913C199.904 9.38704 200.586 11.887 200.586 14.6891C200.586 17.4964 199.904 19.9964 198.544 22.1891C197.195 24.387 195.378 26.085 193.086 27.2933C190.794 28.5016 188.315 29.1058 185.648 29.1058ZM185.648 22.7516C187.133 22.7516 188.471 22.4131 189.669 21.7308C190.878 21.0381 191.815 20.0798 192.482 18.8558C193.159 17.637 193.503 16.2464 193.503 14.6891C193.503 13.1214 193.159 11.7308 192.482 10.5225C191.815 9.30371 190.878 8.35059 189.669 7.66829C188.471 6.97559 187.133 6.62663 185.648 6.62663C184.159 6.62663 182.815 6.97559 181.607 7.66829C180.409 8.35059 179.471 9.30371 178.794 10.5225C178.128 11.7308 177.794 13.1214 177.794 14.6891C177.794 16.2464 178.128 17.637 178.794 18.8558C179.471 20.0798 180.409 21.0381 181.607 21.7308C182.815 22.4131 184.159 22.7516 185.648 22.7516Z" fill="white"/>
  <path d="M232.094 18.0226L237.01 0.793457H244.323L235.26 28.5851H229.24L223.865 10.7518L218.469 28.5851H212.469L203.427 0.793457H210.76L215.698 17.9393L221.01 0.793457H226.781L232.094 18.0226Z" fill="white"/>
  <path d="M1.76528 49.9443V52.6735H4.74445V53.5693H1.76528V56.3818H5.07778V57.2568H0.681946V49.0693H5.07778V49.9443H1.76528Z" fill="white"/>
  <path d="M21.5096 49.0898L18.4263 57.2565H17.1763L14.0929 49.0898H15.2388L17.8013 56.1315L20.3846 49.0898H21.5096Z" fill="white"/>
  <path d="M31.7915 49.9443V52.6735H34.7707V53.5693H31.7915V56.3818H35.104V57.2568H30.7082V49.0693H35.104V49.9443H31.7915Z" fill="white"/>
  <path d="M49.0775 57.2565L47.14 53.9232H45.8483V57.2565H44.765V49.0898H47.4108C48.0358 49.0898 48.5567 49.194 48.9733 49.4023C49.4004 49.6107 49.7233 49.8971 49.9317 50.2565C50.14 50.6211 50.2442 51.0273 50.2442 51.4857C50.2442 52.0586 50.0827 52.5586 49.765 52.9857C49.4421 53.4023 48.9577 53.6888 48.3067 53.8398L50.3483 57.2565H49.0775ZM45.8483 53.0482H47.4108C47.9942 53.0482 48.4212 52.9128 48.7025 52.6315C48.9942 52.3398 49.14 51.9596 49.14 51.4857C49.14 51.0013 48.9942 50.6263 48.7025 50.3607C48.4212 50.1003 47.9942 49.9648 47.4108 49.9648H45.8483V53.0482Z" fill="white"/>
  <path d="M65.6657 49.0898L62.999 54.1732V57.2565H61.9365V54.1732L59.2698 49.0898H60.4573L62.4573 53.2148L64.4782 49.0898H65.6657Z" fill="white"/>
  <path d="M77.3889 49.0898C78.2743 49.0898 79.0452 49.2565 79.7014 49.5898C80.3525 49.9128 80.8525 50.3815 81.2014 51.0065C81.5452 51.6211 81.7223 52.3503 81.7223 53.194C81.7223 54.0273 81.5452 54.7513 81.2014 55.3607C80.8525 55.9753 80.3525 56.444 79.7014 56.7773C79.0452 57.1003 78.2743 57.2565 77.3889 57.2565H74.8264V49.0898H77.3889ZM77.3889 56.3815C78.441 56.3815 79.2431 56.1055 79.7848 55.5482C80.3368 54.9805 80.6181 54.194 80.6181 53.194C80.6181 52.168 80.3368 51.3711 79.7848 50.7982C79.2275 50.2305 78.4306 49.944 77.3889 49.944H75.9098V56.3815H77.3889Z" fill="white"/>
  <path d="M95.9929 55.4443H92.4304L91.7846 57.2568H90.6596L93.5971 49.1318H94.8471L97.7846 57.2568H96.6596L95.9929 55.4443ZM95.7012 54.5693L94.2221 50.4443L92.7429 54.5693H95.7012Z" fill="white"/>
  <path d="M112.835 49.0898L110.168 54.1732V57.2565H109.106V54.1732L106.439 49.0898H107.626L109.626 53.2148L111.647 49.0898H112.835Z" fill="white"/>
  <path d="M143.457 49.0898L141.082 57.2565H139.874L137.978 50.6732L136.02 57.2565L134.832 57.2773L132.541 49.0898H133.687L135.457 56.0065L137.437 49.0898H138.624L140.499 55.9857L142.291 49.0898H143.457Z" fill="white"/>
  <path d="M153.739 49.9443V52.6735H156.718V53.5693H153.739V56.3818H157.051V57.2568H152.655V49.0693H157.051V49.9443H153.739Z" fill="white"/>
  <path d="M167.795 56.3815H170.65V57.2565H166.712V49.0898H167.795V56.3815Z" fill="white"/>
  <path d="M180.902 56.3815H183.756V57.2565H179.819V49.0898H180.902V56.3815Z" fill="white"/>
  <path d="M199.362 57.2568H198.3L194.008 50.7568V57.2568H192.925V49.0693H194.008L198.3 55.5693V49.0693H199.362V57.2568Z" fill="white"/>
  <path d="M210.294 49.9443V52.6735H213.274V53.5693H210.294V56.3818H213.607V57.2568H209.211V49.0693H213.607V49.9443H210.294Z" fill="white"/>
  <path d="M225.872 57.34C225.33 57.34 224.841 57.2463 224.414 57.0483C223.997 56.8556 223.664 56.59 223.414 56.2567C223.174 55.9129 223.049 55.5171 223.039 55.0692H224.185C224.226 55.4598 224.377 55.7879 224.643 56.0483C224.919 56.314 225.33 56.4442 225.872 56.4442C226.372 56.4442 226.768 56.3192 227.06 56.0692C227.362 55.8088 227.518 55.4754 227.518 55.0692C227.518 54.7671 227.424 54.5171 227.247 54.3192C227.08 54.1265 226.862 53.9806 226.601 53.8817C226.351 53.7723 226.002 53.6629 225.56 53.5483C225.018 53.3973 224.586 53.2515 224.268 53.1108C223.945 52.9754 223.669 52.7567 223.435 52.465C223.195 52.1629 223.08 51.7515 223.08 51.2358C223.08 50.7931 223.19 50.4025 223.414 50.0692C223.648 49.7254 223.966 49.4598 224.372 49.2775C224.789 49.0848 225.258 48.9858 225.789 48.9858C226.565 48.9858 227.195 49.1838 227.685 49.5692C228.169 49.9442 228.44 50.4442 228.497 51.0692H227.33C227.289 50.7671 227.122 50.4963 226.83 50.2567C226.549 50.0067 226.169 49.8817 225.685 49.8817C225.237 49.8817 224.877 50.0015 224.601 50.2358C224.32 50.4754 224.185 50.7931 224.185 51.1942C224.185 51.5015 224.268 51.7515 224.435 51.9442C224.601 52.1265 224.799 52.2671 225.039 52.3608C225.289 52.4598 225.633 52.5692 226.08 52.6942C226.622 52.8504 227.06 53.0015 227.393 53.1525C227.726 53.2931 228.002 53.5171 228.226 53.8192C228.461 54.1108 228.58 54.5171 228.58 55.0275C228.58 55.4338 228.476 55.8088 228.268 56.1525C228.06 56.5015 227.747 56.7879 227.33 57.0067C226.914 57.2306 226.424 57.34 225.872 57.34Z" fill="white"/>
  <path d="M240.797 57.34C240.256 57.34 239.766 57.2463 239.339 57.0483C238.922 56.8556 238.589 56.59 238.339 56.2567C238.099 55.9129 237.974 55.5171 237.964 55.0692H239.11C239.151 55.4598 239.302 55.7879 239.568 56.0483C239.844 56.314 240.256 56.4442 240.797 56.4442C241.297 56.4442 241.693 56.3192 241.985 56.0692C242.287 55.8088 242.443 55.4754 242.443 55.0692C242.443 54.7671 242.349 54.5171 242.172 54.3192C242.006 54.1265 241.787 53.9806 241.526 53.8817C241.276 53.7723 240.927 53.6629 240.485 53.5483C239.943 53.3973 239.511 53.2515 239.193 53.1108C238.87 52.9754 238.594 52.7567 238.36 52.465C238.12 52.1629 238.006 51.7515 238.006 51.2358C238.006 50.7931 238.115 50.4025 238.339 50.0692C238.573 49.7254 238.891 49.4598 239.297 49.2775C239.714 49.0848 240.183 48.9858 240.714 48.9858C241.49 48.9858 242.12 49.1838 242.61 49.5692C243.094 49.9442 243.365 50.4442 243.422 51.0692H242.256C242.214 50.7671 242.047 50.4963 241.756 50.2567C241.474 50.0067 241.094 49.8817 240.61 49.8817C240.162 49.8817 239.802 50.0015 239.526 50.2358C239.245 50.4754 239.11 50.7931 239.11 51.1942C239.11 51.5015 239.193 51.7515 239.36 51.9442C239.526 52.1265 239.724 52.2671 239.964 52.3608C240.214 52.4598 240.558 52.5692 241.006 52.6942C241.547 52.8504 241.985 53.0015 242.318 53.1525C242.651 53.2931 242.927 53.5171 243.151 53.8192C243.386 54.1108 243.506 54.5171 243.506 55.0275C243.506 55.4338 243.401 55.8088 243.193 56.1525C242.985 56.5015 242.672 56.7879 242.256 57.0067C241.839 57.2306 241.349 57.34 240.797 57.34Z" fill="white"/>
  </svg>
   `)!
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' })

const fontBoxDayStyle: RNFontStyle = {
  fontFamily,
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 'bold',
}
const fontDayStyle: RNFontStyle = {
  fontFamily,
  fontSize: 24,
  fontStyle: 'normal',
  fontWeight: 'bold',
}

const fonHoursStyle: RNFontStyle = {
  fontFamily,
  fontSize: 22,
  fontStyle: 'italic',
  fontWeight: 'bold',
}

const fontBoxDay: SkFont = matchFont(fontBoxDayStyle)
const fontDay: SkFont = matchFont(fontDayStyle)
const fontHour: SkFont = matchFont(fonHoursStyle)

const logoWidth = screenWidth * 0.45 // Calcula a largura da logo como 45% da largura da tela
const logoHeight = screenHeight * 0.05 // Calcula a altura da logo como 5% da altura da tela

const rectInitialPositionY = screenHeight * 0.2 // Calcula a posição Y inicial dos quadrados como 20% da altura da tela
const rectVerticalSpacing = screenHeight * 0.09 // Calcula o espaçamento vertical entre os quadrados como 10% da altura da tela

const squareSize = Math.min(screenWidth, screenHeight) * 0.1 // Calcula o tamanho dos quadrados como 10% da menor dimensão da tela
const footerDayTextY =
  rectInitialPositionY + 3.9 * rectVerticalSpacing + squareSize // Calcula a posição Y do texto do dia no footer alinhado com o último quadrado
const footerTimeTextY = footerDayTextY + 30 // Calcula a posição Y do texto da hora no footer abaixo do texto do dia

export default function SkiaContent({
  dayText,
  timeText,
  daysData,
  children,
  fowardRef,
  handleDayPress,
}: Props) {
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })

  function renderDay(day: IDaysData, index: number) {
    const rectY = index * rectVerticalSpacing
    const textY = rectY - 8 // Ajuste a posição Y do texto

    const outer = rrect(rect(0, rectY, squareSize, squareSize), 10, 10)
    const inner = rrect(
      rect(2, rectY + 2, squareSize - 4, squareSize - 4),
      8,
      8,
    )

    const vStartX = squareSize / 4
    const vStartY = rectY + squareSize / 2
    const vMiddleX = squareSize / 2
    const vMiddleY = rectY + (squareSize * 3) / 4
    const vEndX = (squareSize * 3) / 4
    const vEndY = rectY + squareSize / 4

    return (
      <Group key={day.name} transform={[{ translateY: index * 4 }]}>
        <SkiaText
          text={day.name}
          x={0}
          y={textY}
          font={fontBoxDay}
          color="white"
        />

        <Rect
          x={2} // Ajuste a posição X para o preenchimento interno
          y={rectY + 2} // Ajuste a posição Y para o preenchimento interno
          width={squareSize - 4} // Ajuste a largura para o preenchimento interno
          height={squareSize - 4} // Ajuste a altura para o preenchimento interno
          color="rgba(255, 255, 255, 0.3)"
        />

        <DiffRect inner={inner} outer={outer} color="white" />
        {day.selected && (
          <Group>
            <Line
              p1={vec(vStartX, vStartY)}
              p2={vec(vMiddleX, vMiddleY)}
              color="#00FF00" // Cor verde em hex
              style="stroke"
              strokeWidth={4}
              strokeCap={'round'}
            />
            <Line
              p1={vec(vMiddleX, vMiddleY)}
              p2={vec(vEndX, vEndY)}
              color="#00FF00" // Cor verde em hex
              style="stroke"
              strokeWidth={4}
              strokeCap={'round'}
            />
          </Group>
        )}
      </Group>
    )
  }

  function calculateTextWidth(text: string, font: SkFont) {
    const glyphs = font.getGlyphIDs(text)
    const widths = font.getGlyphWidths(glyphs)
    return widths.reduce((acc, width) => acc + width, 0)
  }

  const handleTouch = (event) => {
    console.log('handleTouch event')
    const { locationX, locationY } = event.nativeEvent
    setTouchPosition({ x: locationX, y: locationY })
    console.log(`handleTouch event x ${locationX} y ${locationY}`)
    const adjustedY = locationY - (paddingTop + 20)

    const index = Math.floor(adjustedY / rectVerticalSpacing)
    if (index >= 0 && index < daysData.length) {
      handleDayPress(index)
    }
  }

  const dayTextWidth = calculateTextWidth(dayText, fontDay)
  const timeTextWidth = calculateTextWidth(timeText, fontHour)

  const positionXDay = (screenWidth - dayTextWidth) / 2 // Centraliza o grupo horizontalmente
  const positionXTime = (screenWidth - timeTextWidth) / 2 // Centraliza o grupo horizontalmente

  const paddingTop = 60
  const paddingLeft = 32
  const paddingRight = screenWidth - 64

  const daysGroupHeight = daysData.length * rectVerticalSpacing
  const daysGroupY = paddingTop + (logoHeight - daysGroupHeight) / 2
  console.log('daysGroupY', daysGroupY) //   daysGroupY -187.07999999999998

  return (
    <CanvasFullScreen ref={fowardRef} onTouchStart={handleTouch}>
      {children}
      <Group>
        <Group>
          {logoSvg && (
            <ImageSVG
              svg={logoSvg}
              x={paddingLeft}
              y={paddingTop}
              width={logoWidth}
              height={logoHeight}
            />
          )}
        </Group>

        <Group
          transform={[
            { translateY: paddingTop + 20 },
            { translateX: paddingRight },
          ]}
        >
          {daysData.map((day, index) => renderDay(day, index))}
        </Group>

        <SkiaText
          x={positionXDay}
          y={footerDayTextY}
          text={dayText}
          font={fontDay}
          color="white"
        />
        <SkiaText
          x={positionXTime}
          y={footerTimeTextY}
          text={timeText}
          font={fontHour}
          color="white"
        />
      </Group>
    </CanvasFullScreen>
  )
}
