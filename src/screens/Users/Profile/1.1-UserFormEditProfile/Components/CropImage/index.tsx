import React, { useState } from 'react'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import {
  Container,
  ImageContainer,
  StyledImage,
  Controls,
  Button,
  ButtonText,
  SaveButton,
  SaveButtonText,
} from './styles'

export default function PhotoEditor() {
  const [image, setImage] = useState<{
    uri: string
    width: number
    height: number
  } | null>(null)

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    })

    if (!result.canceled) {
      const { uri, width, height } = result.assets[0]
      setImage({ uri, width, height })
    }
  }

  async function manipulateImage(actions: ImageManipulator.Action[]) {
    if (!image) return

    try {
      const result = await ImageManipulator.manipulateAsync(
        image.uri,
        actions,
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.PNG,
        },
      )

      setImage({
        uri: result.uri,
        width: result.width,
        height: result.height,
      })
    } catch (error) {
      Alert.alert('Error', 'An error occurred while manipulating the image.')
    }
  }

  function saveImage() {
    if (image) {
      Alert.alert('Image Saved', `Image saved successfully at: ${image.uri}`)
    }
  }

  return (
    <Container>
      {image ? (
        <>
          <ImageContainer>
            <StyledImage source={{ uri: image.uri }} resizeMode="contain" />
          </ImageContainer>
          <Controls>
            <Button
              onPress={() =>
                manipulateImage([
                  {
                    resize: {
                      width: image.width / 2,
                      height: image.height / 2,
                    },
                  },
                ])
              }
            >
              <ButtonText>Resize</ButtonText>
            </Button>
            <Button onPress={() => manipulateImage([{ rotate: 90 }])}>
              <ButtonText>Rotate</ButtonText>
            </Button>
            <Button
              onPress={() =>
                manipulateImage([
                  { flip: ImageManipulator.FlipType.Horizontal },
                ])
              }
            >
              <ButtonText>Flip</ButtonText>
            </Button>
            <SaveButton onPress={saveImage}>
              <SaveButtonText>Save</SaveButtonText>
            </SaveButton>
          </Controls>
        </>
      ) : (
        <Button onPress={pickImage}>
          <ButtonText>Pick an Image</ButtonText>
        </Button>
      )}
    </Container>
  )
}
