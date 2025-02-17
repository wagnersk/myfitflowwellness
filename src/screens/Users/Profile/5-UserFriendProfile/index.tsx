import React, { useCallback, useEffect } from 'react'
import {
  Alert,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native'

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import { Photo } from '@components/Photo'
import { BackButton } from '@components/Buttons/BackButton'

import { useAuth } from '@hooks/auth'
import UserPlus from '@assets/User-circle-plus.svg'
import UserMinus from '@assets/User-circle-minus.svg'

import backgroundImg from '../../../../../assets/back.png'
import { PhotoButton } from '@components/Buttons/PhotoButton'
import { useTheme } from 'styled-components/native'

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
  Tittle,
  UserFriendEmail,
  UserFriendName,
  CopyWorkoutButton,
  ButtonText,
  UserFriendNameAndEmailWrapper,
  UserFriendNameAndEmailAndButtonWrapper,
  AddButton,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { IUserFriendProfile } from '@src/@types/navigation'
import { diffInAge } from '@utils/diffInAge'

export function UserFriendProfile() {
  const { user, isWaitingApiResponse } = useAuth()
  const route = useRoute()
  const theme = useTheme()
  const dataParams = route.params as IUserFriendProfile

  const navigation = useNavigation()

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

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  const isFriend = true
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
              <SafeAreaProvider style={{ width: `100%` }}>
                <SafeAreaView style={{ flex: 1 }}>
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
                        newDefaultPhotoBase64={`userForm.photoBase64.value`}
                      />
                    </PhotoBorderWrapper>

                    <UserFriendNameAndEmailAndButtonWrapper>
                      <UserFriendNameAndEmailWrapper>
                        <UserFriendName>
                          {dataParams.friend.name},{' '}
                          {diffInAge(dataParams.friend.birthdate)}
                        </UserFriendName>
                        <UserFriendEmail>
                          {dataParams.friend.email}
                        </UserFriendEmail>
                      </UserFriendNameAndEmailWrapper>

                      {isFriend ? (
                        <AddButton>
                          <UserMinus
                            width={38}
                            height={38}
                            fill={theme.COLORS.AUX_GOOGLE_RED}
                          />
                        </AddButton>
                      ) : (
                        <AddButton>
                          <UserPlus
                            width={38}
                            height={38}
                            fill={theme.COLORS.AUX_GOOGLE_GREEN}
                          />
                        </AddButton>
                      )}
                    </UserFriendNameAndEmailAndButtonWrapper>
                  </ProfileWrapper>

                  {isFriend && (
                    <Body>
                      <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                          width: '100%',
                          gap: 16,
                        }}
                      >
                        <InputWrapper>
                          <CopyWorkoutButton>
                            <ButtonText>Copiar treino</ButtonText>
                          </CopyWorkoutButton>
                          <CopyWorkoutButton>
                            <ButtonText>Copiar treino</ButtonText>
                          </CopyWorkoutButton>
                        </InputWrapper>
                      </ScrollView>
                    </Body>
                  )}
                </SafeAreaView>
              </SafeAreaProvider>
            </ImageBackgroundContainer>
          </ImageBackground>
        </BodyImageWrapper>
      </Container>
    </TouchableWithoutFeedback>
  )
}
