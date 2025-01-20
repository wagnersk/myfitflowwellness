import React, { useCallback, useEffect, useState, useRef } from 'react'
import {
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Photo } from '@components/Photo'
import { BackButton } from '@components/Buttons/BackButton'

import { useAuth } from '@hooks/auth'

import backgroundImg from '../../../../../assets/back.png'
import { PhotoButton } from '@components/Buttons/PhotoButton'

import * as ImagePicker from 'expo-image-picker'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ProfileWrapper,
  PhotoBorderWrapper,
  InputWrapper,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { WhatsappInput } from '@components/Forms/Inputs/WhatsappInput'
import { EmailInput } from '@components/Forms/Inputs/EmailInput'
import { CalendarInput } from '@components/Forms/Inputs/CalendarInput'
import { CTAButton } from '@components/Buttons/CTAButton'
import { GymInput } from '@components/Forms/Inputs/GymInput'
import { AnabolInput } from '@components/Forms/Inputs/AnabolInput'
import { RestrictionsInput } from '@components/Forms/Inputs/RestrictionsInput'
import { UserNameInput } from '@components/Forms/Inputs/UserNameInput'
import { WhenStartedAtGymInput } from '@components/Forms/Inputs/WhenStartedAtGymInput'
import { ScrollView } from 'react-native-gesture-handler'
import { emailRegex } from '@utils/emailRegex'
import { checkBirthdayDate } from '@utils/checkBirthdayDate'
import { differenceInYears, isAfter, isBefore, isValid, parse } from 'date-fns'

export function UserFormEditProfile() {
  const { user, updateUserForm, isWaitingApiResponse } = useAuth()

  const [activeErrorCheck, setActiveErrorCheck] = useState(false)

  const [userForm, setUserForm] = useState({
    photoBase64: { value: '', errorBoolean: false },
    whatsappNumber: { value: '', errorBoolean: false },
    name: { value: '', errorBoolean: false },
    birthdate: { value: '', errorBoolean: false },
    whenStartedAtGym: { value: '', errorBoolean: false },
    anabol: { value: '', errorBoolean: false },
    gym: { value: '', errorBoolean: false },
    restrictions: { value: '', errorBoolean: false },
    email: { value: '', errorBoolean: false },
  })

  const navigation = useNavigation()

  async function handleUpdateInfo() {
    const {
      anabol,
      birthdate,
      email,
      gym,
      name,
      photoBase64,
      restrictions,
      whatsappNumber,
      whenStartedAtGym,
    } = userForm

    const letActiveErrorCheck = true
    setActiveErrorCheck(letActiveErrorCheck)

    try {
      await checkName()
      await checkWhatsappNumber()
      await checkBirthdate()
      await checkWhenStartedAtGym()

      const data = {
        anabol: anabol.value,
        birthdate: birthdate.value,
        email: email.value,
        gym: gym.value,
        name: name.value,
        photoBase64: photoBase64.value,
        restrictions: restrictions.value,
        whatsappNumber: whatsappNumber.value,
        whenStartedAtGym: whenStartedAtGym.value,
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

    async function checkWhatsappNumber() {
      if (
        (activeErrorCheck || letActiveErrorCheck) &&
        (!userForm.whatsappNumber.value ||
          userForm.whatsappNumber.value.length < 15)
      ) {
        setUserForm((prev) => {
          return {
            ...prev,
            whatsappNumber: {
              value: prev.whatsappNumber.value,
              errorBoolean: true,
            },
          }
        })
        throw new Error(
          'O número de whatsapp deve ter pelo menos 11 caracteres',
        )
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

    async function checkWhenStartedAtGym() {
      const parsedDate = parse(
        userForm.whenStartedAtGym.value,
        'dd/MM/yyyy',
        new Date(),
      )
      let isDateValidDateDNS = true

      if (userForm.whenStartedAtGym.value) {
        isDateValidDateDNS = isValid(parsedDate)
      }

      if (
        (activeErrorCheck || letActiveErrorCheck) &&
        (!isDateValidDateDNS || isBefore(new Date(), parsedDate))
      ) {
        setUserForm((prev) => {
          return {
            ...prev,
            whenStartedAtGym: {
              value: prev.whenStartedAtGym.value,
              errorBoolean: true,
            },
          }
        })
        throw new Error('A data de tempo de experiência é inválida')
      }

      const birthDateParsed = parse(
        userForm.birthdate.value,
        'dd/MM/yyyy',
        new Date(),
      )
      const ageAtStart = differenceInYears(parsedDate, birthDateParsed)

      if ((activeErrorCheck || letActiveErrorCheck) && ageAtStart < 0) {
        setUserForm((prev) => {
          return {
            ...prev,
            whenStartedAtGym: {
              value: prev.whenStartedAtGym.value,
              errorBoolean: true,
            },
          }
        })
        throw new Error('O tempo de experiência não pode ser maior que a idade')
      }
    }
  }

  // funcao para conferir aqui

  async function handlePickImage() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        base64: true,
      })

      if (result.assets === null) {
        return
      }

      // const { size } = await imageResponse.blob()
      function getBase64Size(base64: string): number {
        // Removendo o prefixo 'data:image/jpeg;base64,' ou similar
        const stringWithoutPrefix = base64.split(',')[1] || base64

        // Calculando o tamanho em bytes
        const sizeInBytes =
          (stringWithoutPrefix.length * 3) / 4 -
          (stringWithoutPrefix.endsWith('==')
            ? 2
            : stringWithoutPrefix.endsWith('=')
              ? 1
              : 0)

        return sizeInBytes
      }
      const base64String = result.assets[0].base64

      let sizeInBytes = 0
      if (base64String) {
        sizeInBytes = getBase64Size(base64String)
      }
      if (!result.canceled) {
        if (!sizeInBytes) {
          return Alert.alert(
            user?.selectedLanguage === 'pt-br' ? 'Atenção' : 'Attention',
            user?.selectedLanguage === 'pt-br'
              ? 'Tamanho da foto não encontrado.'
              : 'Photo size not found.',
          )
        }

        const MAXFIREBASELIMITPROPERTY = 1000000

        if (sizeInBytes > MAXFIREBASELIMITPROPERTY) {
          return Alert.alert(
            user?.selectedLanguage === 'pt-br' ? 'Atenção' : 'Attention',
            user?.selectedLanguage === 'pt-br'
              ? 'Sua foto deve ter no máximo 1 mega'
              : 'Your photo must be at most 1 megabyte',
          )
        }
        if (base64String) {
          setUserForm((prev) => {
            return {
              ...prev,
              photoBase64: {
                value: base64String,
                errorBoolean: prev.photoBase64.errorBoolean,
              },
            }
          })
        }
      }
    }
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

  function handleChangeGym(value: string) {
    let checkError = false

    if (activeErrorCheck && !value) {
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        gym: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeAnabol(value: string) {
    let checkError = false

    if (activeErrorCheck && !value) {
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        anabol: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeWhenStartedAtGym(value: string) {
    let checkError = false

    // Verificar se o valor está presente
    if (!value) {
      checkError = true
      setUserForm((prev) => {
        return {
          ...prev,
          whenStartedAtGym: { value, errorBoolean: checkError },
        }
      })
      return
    }

    // Parse a data e verifique se é válida
    const parsedDate = parse(value, 'dd/MM/yyyy', new Date())
    const isDateValid = isValid(parsedDate)

    // Verificar se a data é válida e não está no futuro
    if (
      activeErrorCheck &&
      (!isDateValid || isBefore(new Date(), parsedDate))
    ) {
      checkError = true
      console.log('Data inválida')
    }

    setUserForm((prev) => {
      return {
        ...prev,
        whenStartedAtGym: { value, errorBoolean: checkError },
      }
    })
  }

  function handleChangeRestrictions(value: string) {
    let checkError = false

    if (activeErrorCheck && !value) {
      checkError = true
    }

    setUserForm((prev) => {
      return {
        ...prev,
        restrictions: { value, errorBoolean: checkError },
      }
    })
  }

  useEffect(() => {
    if (user === null) return

    const {
      photoBase64,
      whatsappNumber,
      name,
      birthdate,
      whenStartedAtGym,
      anabol,
      gym,
      restrictions,
      email,
    } = user

    setUserForm({
      photoBase64: { value: photoBase64 || '', errorBoolean: false },
      whatsappNumber: { value: whatsappNumber || '', errorBoolean: false },
      name: { value: name || '', errorBoolean: false },
      birthdate: { value: birthdate || '', errorBoolean: false },
      whenStartedAtGym: { value: whenStartedAtGym || '', errorBoolean: false },
      anabol: { value: anabol || '', errorBoolean: false },
      gym: { value: gym || '', errorBoolean: false },
      restrictions: { value: restrictions || '', errorBoolean: false },
      email: { value: email || '', errorBoolean: false },
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
                    defaultPhotoBase64={user?.photoBase64}
                    newDefaultPhotoBase64={userForm.photoBase64.value}
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
                      borderDesign="up-down"
                      order="middle"
                      topPosition={2}
                    />
                    <WhatsappInput
                      mask={
                        user?.selectedLanguage === 'pt-br'
                          ? '(99) 99999-9999'
                          : '(999) 99999-9999'
                      }
                      handleChangeWhatsapp={handleChangeWhatsappNumber}
                      value={userForm.whatsappNumber.value}
                      errorBoolean={userForm.whatsappNumber.errorBoolean}
                      editable={!isWaitingApiResponse}
                      onFocus={() => {}}
                      type="blue"
                      borderDesign="down"
                      order="bottom"
                    />
                  </InputWrapper>
                  {user?.personalTrainerContractId && (
                    <InputWrapper>
                      <GymInput
                        handleChangeGym={handleChangeGym}
                        value={userForm.gym.value}
                        errorBoolean={false}
                        editable={!isWaitingApiResponse}
                        onFocus={() => {}}
                        type="blue"
                        borderDesign="up"
                        order="top"
                      />
                      <AnabolInput
                        handleChangeAnabol={handleChangeAnabol}
                        value={userForm.anabol.value}
                        errorBoolean={false}
                        editable={!isWaitingApiResponse}
                        onFocus={() => {}}
                      />
                    </InputWrapper>
                  )}

                  {user?.personalTrainerContractId && (
                    <InputWrapper>
                      <WhenStartedAtGymInput
                        handleChangeBirthday={handleChangeWhenStartedAtGym}
                        value={userForm.whenStartedAtGym.value}
                        errorBoolean={false}
                        editable={!isWaitingApiResponse}
                        onFocus={() => {}}
                      />
                      <RestrictionsInput
                        handleChangeRestrictions={handleChangeRestrictions}
                        value={userForm.restrictions.value}
                        errorBoolean={false}
                        editable={!isWaitingApiResponse}
                        onFocus={() => {}}
                      />
                    </InputWrapper>
                  )}
                </ScrollView>
              </Body>
              <CTAButton
                onPress={handleUpdateInfo}
                changeColor
                title="Salvar"
                loading={isWaitingApiResponse}
                enabled={!isWaitingApiResponse}
              />
            </ImageBackgroundContainer>
          </ImageBackground>
        </BodyImageWrapper>
      </Container>
    </TouchableWithoutFeedback>
  )
}
