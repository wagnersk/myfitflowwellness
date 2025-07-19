import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Photo } from '@components/Photo'
import { BackButton } from '@components/Buttons/BackButton'

import { useAuth } from '@hooks/auth'

import backgroundImg from '../../../../../assets/back.png'
import { PhotoButton } from '@components/Buttons/PhotoButton'

import * as ImagePicker from 'expo-image-picker'
import {
  FlipType,
  SaveFormat,
  useImageManipulator,
  Action,
} from 'expo-image-manipulator'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ProfileWrapper,
  PhotoBorderWrapper,
  InputWrapper,
  FormWrapper,
  ImageContainer,
  StyledImage,
  Controls,
  ButtonText,
  SaveButton,
  SaveButtonText,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { WhatsappInput } from '@components/Forms/Inputs/WhatsappInput'
import { EmailInput } from '@components/Forms/Inputs/EmailInput'
import { CalendarInput } from '@components/Forms/Inputs/CalendarInput'
import { CTAButton } from '@components/Buttons/CTAButton'
import { UserNameInput } from '@components/Forms/Inputs/UserNameInput'
import { ScrollView } from 'react-native-gesture-handler'
import { emailRegex } from '@utils/emailRegex'
import { checkBirthdayDate } from '@utils/checkBirthdayDate'
import { SafeAreaView } from 'react-native-safe-area-context'

export function UserFormEditProfile() {
  const {
    user,
    updateUserForm,
    updateUserPhoto,
    uploadUserProfilePhoto,
    isWaitingApiResponse,
  } = useAuth()

  const [activeErrorCheck, setActiveErrorCheck] = useState(false)

  const [userForm, setUserForm] = useState({
    whatsappNumber: { value: '', errorBoolean: false },
    name: { value: '', errorBoolean: false },
    birthdate: { value: '', errorBoolean: false },
    email: { value: '', errorBoolean: false },
  })

  const [userPhoto, setUserPhoto] = useState({
    photo: { value: '', errorBoolean: false },
  })
  const [isLoading, setIsLoading] = useState(false)

  const [imageInfo, setImageInfo] = useState<{
    uri: string
    width: number
    height: number
    fileSize?: number
  } | null>(null)

  const context = useImageManipulator(imageInfo?.uri || '')

  const navigation = useNavigation()

  async function handlePickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (result.canceled) return

    const { uri, width, height, fileSize } = result.assets[0]

    setImageInfo((prev) => ({
      ...prev,
      uri,
      width,
      height,
      fileSize: fileSize || 0,
    }))
  }

  async function handleUpdateInfo() {
    const { birthdate, email, name, whatsappNumber } = userForm

    const letActiveErrorCheck = true
    setActiveErrorCheck(letActiveErrorCheck)

    try {
      await checkName()
      await checkBirthdate()
      // await checkWhatsappNumber()

      const data = {
        birthdate: birthdate.value,
        email: email.value,
        name: name.value,
        whatsappNumber: whatsappNumber.value,
      }

      await updateUserForm(data)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
          error.message,
        )
      } else {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
          user?.selectedLanguage === 'pt-br'
            ? 'Ocorreu um erro desconhecido'
            : 'An unknown error occurred',
        )
      }
    }

    async function checkName() {
      if ((activeErrorCheck || letActiveErrorCheck) && !userForm.name.value) {
        setUserForm((prev) => {
          return {
            ...prev,
            name: { value: prev.name.value, errorBoolean: true },
          }
        })
        throw new Error('Por favor, insira um nome válido')
      }
    }

    async function checkBirthdate() {
      const isDateValid = checkBirthdayDate(userForm.birthdate.value)

      if (
        (activeErrorCheck || letActiveErrorCheck) &&
        (!userForm.birthdate.value || !isDateValid)
      ) {
        setUserForm((prev) => {
          return {
            ...prev,
            birthdate: {
              value: prev.birthdate.value,
              errorBoolean: true,
            },
          }
        })
        throw new Error('A data de nascimento é invalida')
      }
    }
  }

  async function handleUpdatePhoto() {
    const letActiveErrorCheck = true
    setActiveErrorCheck(letActiveErrorCheck)

    try {
      setIsLoading(true)
      await checkPhoto()

      const resizedResult = await resizeImage()

      if (!resizedResult) return

      const newPhotoUrl = await uploadUserProfilePhoto(resizedResult)

      if (!newPhotoUrl) return

      const data = {
        photo: newPhotoUrl,
      }
      await updateUserPhoto(data)
      setImageInfo(null)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
          error.message,
        )
      } else {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
          user?.selectedLanguage === 'pt-br'
            ? 'Ocorreu um erro desconhecido'
            : 'An unknown error occurred',
        )
      }
    }

    async function checkPhoto() {
      if ((activeErrorCheck || letActiveErrorCheck) && !userForm.name.value) {
        setUserPhoto((prev) => {
          return {
            ...prev,
            photo: { value: prev.photo.value, errorBoolean: true },
          }
        })
        throw new Error('Por favor, insira um nome válido')
      }
    }

    async function resizeImage() {
      if (!imageInfo) return null

      try {
        context.resize({ width: 240 })
        const image = await context.renderAsync()
        const result = await image.saveAsync({
          format: SaveFormat.PNG,
          compress: 0.8,
        })

        const newFileSize = await getFileSize(result.uri)
        console.log(`newFileSize`, newFileSize)
        if (newFileSize > 300 * 1024) {
          Alert.alert(
            user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
            user?.selectedLanguage === 'pt-br'
              ? 'O tamanho do arquivo é maior que 300kb'
              : 'The file size is larger than 300kb',
          )
          return null
        }
        return result.uri
      } catch (error) {
        Alert.alert('Error', 'An error occurred while manipulating the image.')
        return null
      }
    }
  }

  async function getFileSize(uri: string): Promise<number> {
    const response = await fetch(uri)
    const blob = await response.blob()
    return blob.size
  }

  function handleGoBack() {
    navigation.goBack()
  }

  function handleChangeEmail(value: string) {
    let checkError = false

    const emailIsValid = emailRegex.test(value)

    if (activeErrorCheck && !emailIsValid) {
      console.log(`entrando`)
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        email: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeUserName(value: string) {
    let checkError = false

    if (activeErrorCheck && !value) {
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        name: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeBirthday(value: string) {
    const isDateValid = checkBirthdayDate(value)
    let checkError = false

    if (activeErrorCheck && !isDateValid) {
      checkError = true
    }
    setUserForm((prev) => {
      return {
        ...prev,
        birthdate: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeWhatsappNumber(value: string) {
    let checkError = false

    if (activeErrorCheck && value.length < 15) {
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        whatsappNumber: { value, errorBoolean: checkError },
      }
    })
  }

  useEffect(() => {
    if (user === null) return

    const {
      whatsappNumber,
      name,
      birthdate,

      email,
      photo,
    } = user

    setUserForm({
      whatsappNumber: { value: whatsappNumber || '', errorBoolean: false },
      name: { value: name || '', errorBoolean: false },
      birthdate: { value: birthdate || '', errorBoolean: false },
      email: { value: email || '', errorBoolean: false },
    })
    setUserPhoto({
      photo: { value: photo || '', errorBoolean: false },
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <BodyImageWrapper>
          <ImageBackground
            source={backgroundImg}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
            <ImageBackgroundContainer>
              <SafeAreaView style={{ flex: 1, width: '100%' }}>
                <SettingsWrapper>
                  <BackButton
                    onPress={handleGoBack}
                    changeColor
                    disabled={isWaitingApiResponse}
                  />
                </SettingsWrapper>
                <ProfileWrapper>
                  <PhotoBorderWrapper>
                    <Photo
                      defaultText={
                        user?.selectedLanguage === 'pt-br'
                          ? `Não há foto`
                          : `No Photo`
                      }
                      photo={user && user.photo}
                      newDefaultPhoto={imageInfo?.uri}
                    />
                    <PhotoButton onPress={handlePickImage} />
                  </PhotoBorderWrapper>
                </ProfileWrapper>
                <Body>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                      width: '100%',
                      gap: 16,
                    }}
                  >
                    {!imageInfo && (
                      <FormWrapper>
                        <EmailInput
                          handleChangeEmail={handleChangeEmail}
                          value={userForm.email.value}
                          errorBoolean={false}
                          editable={false}
                          onFocus={() => {
                            return false
                          }}
                          type="blue"
                          borderDesign="up-down"
                          order="alone"
                          topPosition={2}
                        />

                        <InputWrapper>
                          <UserNameInput
                            handleChangeUserName={handleChangeUserName}
                            value={userForm.name.value}
                            errorBoolean={userForm.name.errorBoolean}
                            editable={!isWaitingApiResponse}
                            onFocus={() => {}}
                            type="blue"
                            borderDesign="up"
                            order="top"
                            topPosition={4}
                          />
                          <CalendarInput
                            handleChangeBirthday={handleChangeBirthday}
                            value={userForm.birthdate.value}
                            errorBoolean={userForm.birthdate.errorBoolean}
                            editable={!isWaitingApiResponse}
                            onFocus={() => {}}
                            type="blue"
                            borderDesign="down"
                            order="bottom"
                            topPosition={2}
                          />
                          {false && (
                            <WhatsappInput
                              mask={
                                user?.selectedLanguage === 'pt-br'
                                  ? '(99) 99999-9999'
                                  : '(999) 99999-9999'
                              }
                              handleChangeWhatsapp={handleChangeWhatsappNumber}
                              value={userForm.whatsappNumber.value}
                              errorBoolean={
                                userForm.whatsappNumber.errorBoolean
                              }
                              editable={!isWaitingApiResponse}
                              onFocus={() => {}}
                              type="blue"
                              borderDesign="down"
                              order="bottom"
                            />
                          )}
                        </InputWrapper>
                      </FormWrapper>
                    )}
                  </ScrollView>
                </Body>
                <CTAButton
                  onPress={() =>
                    userPhoto ? handleUpdatePhoto() : handleUpdateInfo()
                  }
                  changeColor
                  title={imageInfo ? 'Atualizar foto' : 'Salvar'}
                  loading={isLoading}
                  enabled={!isLoading}
                />
              </SafeAreaView>
            </ImageBackgroundContainer>
          </ImageBackground>
        </BodyImageWrapper>
      </Container>
    </TouchableWithoutFeedback>
  )
}
