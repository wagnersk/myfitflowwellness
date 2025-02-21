import React, { useCallback, useEffect, useState } from 'react'
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
import UserCheck from '@assets/User-circle-check.svg'

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
  UserFriendRequestText,
  NameAndEmailWrapper,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { IUserFriendProfile } from '@src/@types/navigation'
import { diffInAge } from '@utils/diffInAge'

export function UserFriendProfile() {
  const {
    user,
    isWaitingApiResponse,
    fetchUserProfile,
    sendFriendRequest,
    cancelFriendRequest,
    deleteFriend,
  } = useAuth()
  const route = useRoute()
  const theme = useTheme()
  const dataParams = route.params as IUserFriendProfile
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false)
  const [isPendingRequest, setIsPendingRequest] = useState(false)
  console.log(`isAlreadyFriend`, isAlreadyFriend)
  console.log(`isPendingRequest`, isPendingRequest)
  const navigation = useNavigation()

  // funcao para conferir aqui

  function handleGoBack() {
    navigation.goBack()
  }

  function handleDeleteFriend() {
    // navigation.goBack()
  }
  function handleCancelFriendRequest() {
    cancelFriendRequest(dataParams.friend.id)
    setIsPendingRequest(false)
    // navigation.goBack()
  }
  function handleSendFriendRequest() {
    // NMRDMVRHlAeWx2BIJJWE6XOcSnm1
    sendFriendRequest(dataParams.friend.id)
    setIsPendingRequest(true)

    // navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  useEffect(() => {
    async function start() {
      const friendRequest = await fetchUserProfile(dataParams.friend.id)
      console.log(`friendRequest`, friendRequest)
      if (friendRequest === null) {
        setIsAlreadyFriend(false)
        setIsPendingRequest(false)
        return
      }

      if (friendRequest.accepted === true) {
        setIsAlreadyFriend(true)
        setIsPendingRequest(false)
      } else if (friendRequest.accepted === false) {
        setIsAlreadyFriend(false)
        setIsPendingRequest(true)
      }
    }

    start()
  }, [dataParams.friend.id, fetchUserProfile])

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
                        <NameAndEmailWrapper>
                          <UserFriendName>
                            {dataParams.friend.name},{' '}
                            {diffInAge(dataParams.friend.birthdate)}
                          </UserFriendName>
                          <UserFriendEmail>
                            {dataParams.friend.email}
                          </UserFriendEmail>
                        </NameAndEmailWrapper>
                        {isAlreadyFriend ? (
                          <AddButton onPress={handleDeleteFriend}>
                            <UserCheck
                              width={38}
                              height={38}
                              fill={theme.COLORS.BLUE_STROKE}
                            />
                          </AddButton>
                        ) : isPendingRequest ? (
                          <AddButton onPress={handleCancelFriendRequest}>
                            <UserMinus
                              width={38}
                              height={38}
                              fill={theme.COLORS.AUX_GOOGLE_RED}
                            />
                          </AddButton>
                        ) : (
                          <AddButton onPress={handleSendFriendRequest}>
                            <UserPlus
                              width={38}
                              height={38}
                              fill={theme.COLORS.AUX_GOOGLE_GREEN}
                            />
                          </AddButton>
                        )}
                      </UserFriendNameAndEmailWrapper>

                      {isPendingRequest && (
                        <UserFriendRequestText>
                          {user?.selectedLanguage === 'pt-br'
                            ? `Solicitação pendente`
                            : `Pending request`}
                        </UserFriendRequestText>
                      )}
                    </UserFriendNameAndEmailAndButtonWrapper>
                  </ProfileWrapper>

                  {isAlreadyFriend && (
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
