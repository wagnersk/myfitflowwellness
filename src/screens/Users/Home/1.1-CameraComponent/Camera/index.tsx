import { useState, useRef, useCallback } from 'react'
import { Dimensions } from 'react-native'

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import {
  Skia,
  useCanvasRef,
  Image,
  SkImage,
  SkSurface,
  SkCanvas,
  SkPaint,
  SkiaDomView,
} from '@shopify/react-native-skia'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import SkiaContent from '../Components/SkiaContent'
import FlipCameraIcon from '@assets/Flip-camera.svg'
import X from '@assets/x.svg'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  CanvasFullScreen,
  CloseButton,
  Container,
  FlipButton,
  Footer,
  FooterCircleButtonWrapper,
  FooterFlipAndShareButton,
  FullScreen,
  Header,
  InnerCircle,
  Message,
  ShareButton,
  ShareButtonText,
  TakePictureButton,
  ViewFullScreen,
} from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { BackButton } from '@components/Buttons/BackButton'

const daysData = [
  { name: 'SEG', selected: true },
  { name: 'TER', selected: true },
  { name: 'QUA', selected: false },
  { name: 'QUI', selected: false },
  { name: 'SEX', selected: true },
  { name: 'SAB', selected: false },
  { name: 'DOM', selected: false },
]

function encode(arraybuffer) {
  const bytes = new Uint8Array(arraybuffer)
  const len = bytes.length
  let base64 = ''

  const lookup =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  for (let i = 0; i < len; i += 3) {
    base64 += lookup[bytes[i] >> 2]
    base64 += lookup[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
    base64 += lookup[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
    base64 += lookup[bytes[i + 2] & 63]
  }

  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '='
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '=='
  }

  return base64
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function Camera() {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions()
  const [capturedImage, setCapturedImage] = useState<SkImage | null>(null)
  const cameraRef = useRef<CameraView | null>(null)
  const canvasRef = useCanvasRef()

  const now = new Date()
  const getDayText = format(now, 'EEEE', { locale: ptBR })
  const dayText = capitalizeFirstLetter(getDayText)

  const timeText = format(now, 'HH:mm')
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('light')
    }, []),
  )

  if (!permission) {
    // Camera permissions are still loading.
    return
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Container>
        <Message>We need your permission to show the camera</Message>
        <ShareButton>Grant Permission</ShareButton>
      </Container>
    )
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  async function takePicture() {
    try {
      if (cameraRef.current) {
        const startTime = performance.now()

        const photo = await cameraRef.current.takePictureAsync({ base64: true })
        if (!photo || !photo.base64) return
        const skData = Skia.Data.fromBase64(photo.base64)
        const image = Skia.Image.MakeImageFromEncoded(skData)

        setCapturedImage(image)
        const endTime = performance.now()
        console.log(`Tempo de processamento: ${endTime - startTime} ms`)
        console.log('Image set in state')
      } else {
        console.log('Camera reference is not valid')
      }
    } catch (error) {
      console.error('Error taking picture:', error)
    }
  }

  async function addSvgToImageAndSave(): Promise<string> {
    try {
      const overlayImage = captureCanvasContent(canvasRef)
      const surface = createSkiaSurface(
        overlayImage.width(),
        overlayImage.height(),
      )
      const canvas = getCanvasFromSurface(surface)

      const paint = createSkiaPaint()

      drawOverlayImageOnCanvas(canvas, overlayImage, paint)

      const finalImage = createFinalImageFromCanvas(surface)

      const fileUri = await encodeAndSaveImage(finalImage, 'captured_image.jpg')

      return fileUri
    } catch (error) {
      console.error('Error in addSvgToImageAndSave:', error)
      throw error
    }

    function createSkiaSurface(width: number, height: number): SkSurface {
      const surface = Skia.Surface.Make(width, height)
      if (!surface) {
        throw new Error('Failed to create Skia surface')
      }
      console.log('Skia surface created')
      return surface
    }
    function getCanvasFromSurface(surface: SkSurface): SkCanvas {
      const canvas = surface.getCanvas()
      console.log('Canvas obtained from surface')
      return canvas
    }
    function createSkiaPaint(): SkPaint {
      const paint = Skia.Paint()
      console.log('Skia paint created')
      return paint
    }

    function captureCanvasContent(
      canvasRef: React.RefObject<SkiaDomView>,
    ): SkImage {
      const overlayImage = canvasRef.current?.makeImageSnapshot() // {"height": 2088, "width": 1179}
      if (!overlayImage) {
        throw new Error('Failed to create overlay image snapshot')
      }
      return overlayImage
    }

    function drawOverlayImageOnCanvas(
      canvas: SkCanvas,
      overlayImage: SkImage,
      paint: SkPaint,
    ): void {
      canvas.drawImage(overlayImage, 0, 0, paint)
    }

    function createFinalImageFromCanvas(surface: SkSurface): SkImage {
      const finalImage = surface.makeImageSnapshot()
      if (!finalImage) {
        throw new Error('Failed to create final image snapshot')
      }
      console.log('Final image created with SVG overlay:', finalImage)
      return finalImage
    }

    async function encodeAndSaveImage(
      image: SkImage,
      fileName: string,
    ): Promise<string> {
      const encoded = image.encodeToBytes()
      if (!encoded) {
        throw new Error('Failed to encode final image')
      }
      console.log('Image encoded to bytes:', encoded.length)

      const base64 = encode(encoded)
      console.log('Image converted to base64:', base64.slice(0, 30) + '...')

      const fileUri = `${FileSystem.cacheDirectory}${fileName}`
      console.log('File URI:', fileUri)

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      })
      console.log('Image written to file')

      return fileUri
    }
  }

  async function sharePicture() {
    try {
      const fileUri = await addSvgToImageAndSave()
      await Sharing.shareAsync(fileUri, {
        dialogTitle: 'Compartilhar no Instagram',
        mimeType: 'image/jpeg',
      })

      // Apagar a imagem convertida
      await FileSystem.deleteAsync(fileUri)
      console.log('Converted image deleted')
    } catch (error) {
      console.error('Error manipulating image:', error)
    }
  }

  function closeImage() {
    setCapturedImage(null)
  }

  function handleGoBack() {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
    navigation.goBack()
  }

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

  return (
    <Container>
      <Header />
      <FullScreen>
        {capturedImage ? (
          <>
            <CanvasFullScreen ref={canvasRef}>
              <Image
                image={capturedImage}
                x={0}
                y={0}
                width={screenWidth}
                height={screenHeight - 80}
                fit="fill"
              />
              <SkiaContent
                daysData={daysData}
                dayText={dayText}
                timeText={timeText}
              />
            </CanvasFullScreen>

            <CloseButton onPress={closeImage}>
              <X width={42} height={42} fill="white" />
            </CloseButton>
          </>
        ) : (
          <ViewFullScreen>
            <CameraView
              ref={cameraRef}
              style={{ width: screenWidth, height: screenHeight - 80 }}
              facing={facing}
            />

            <CanvasFullScreen ref={canvasRef}>
              <SkiaContent
                daysData={daysData}
                dayText={dayText}
                timeText={timeText}
              />
            </CanvasFullScreen>
            <BackButton
              onPress={handleGoBack}
              style={{ position: 'absolute', left: 32, top: 16 }}
            />
          </ViewFullScreen>
        )}
      </FullScreen>

      <Footer>
        <FooterFlipAndShareButton>
          {capturedImage ? (
            <ShareButton onPress={sharePicture}>
              <ShareButtonText>Compartilhar</ShareButtonText>
            </ShareButton>
          ) : (
            <>
              <FooterCircleButtonWrapper>
                {!capturedImage && (
                  <TakePictureButton onPress={takePicture}>
                    <InnerCircle />
                  </TakePictureButton>
                )}
              </FooterCircleButtonWrapper>
              <FlipButton onPress={toggleCameraFacing}>
                <FlipCameraIcon width={24} height={24} color="white" />
              </FlipButton>
            </>
          )}
        </FooterFlipAndShareButton>
      </Footer>
    </Container>
  )
}
