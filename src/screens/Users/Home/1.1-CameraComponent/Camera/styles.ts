import styled from 'styled-components/native'
import { Canvas } from '@shopify/react-native-skia'
import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-content: center;
`

export const Message = styled.Text`
  text-align: center;
  padding-bottom: 10px;
`

export const FullScreen = styled.View`
  flex: 1;
`

export const CanvasFullScreen = styled(Canvas)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
`
export const ViewFullScreen = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
`

export const Header = styled.View`
  height: 60px;
`

export const Footer = styled.View`
  height: 96px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

export const FooterCircleButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;
`

export const FooterFlipAndShareButton = styled.View`
  width: 100%;
  align-items: flex-end;
  padding-right: 16px;
`

export const TakePictureButton = styled(TouchableOpacity)`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  border-width: 4px;
  border-color: white;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  bottom: 120px;
`

export const InnerCircle = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
`

export const FlipButton = styled(TouchableOpacity)`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  width: 42px;
  height: 42px;
`

export const Text = styled.Text`
  font-size: 18px;
  color: white;
`

export const ImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  left: 12px;
  top: 12px;
  border-radius: 20px;
  padding: 10px;
`

export const ShareButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 25px;
  padding: 10px 20px;
`

export const ShareButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
`
/*  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  fullScreen: {
    flex: 1,
  },
 
  canvasFullScreen: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  cameraContainer: {
    flex: 1,
  },

  header: {
    height: 60,
  },
  footer: {
    height: 96,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerCircleButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },
  footerFlipAndShareButton: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 16,

  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth:4,
    borderColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
    position: 'absolute',
    bottom: 120,
  },
  innerCircle:{
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  flipButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 999,
    width: 42,
    height: 42,
    
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 12,
    top: 12,
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }, 
   shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  
}) */
