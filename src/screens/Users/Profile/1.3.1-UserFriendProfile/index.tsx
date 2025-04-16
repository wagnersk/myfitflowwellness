import React, { useCallback, useEffect, useState } from 'react'
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
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
import { useTheme } from 'styled-components/native'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ProfileWrapper,
  PhotoBorderWrapper,
  InputWrapper,
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
import { set } from 'date-fns'

export function UserFriendProfile() {
  const {
    user,
    isWaitingApiResponse,
    checkIfFriendAlreadyAccepted,
    sendFriendRequest,
    cancelFriendRequest,
    deleteFriend,
  } = useAuth()
  const route = useRoute()
  const theme = useTheme()
  const dataParams = route.params as IUserFriendProfile
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false)
  const [isPendingRequest, setIsPendingRequest] = useState(false)
  const navigation = useNavigation()

  // funcao para conferir aqui

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleDeleteFriend() {
    try {
      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Remover Amizade'
          : 'Remove Friendship',
        user?.selectedLanguage === 'pt-br'
          ? 'Tem certeza de que deseja remover esta amizade?'
          : 'Are you sure you want to remove this friendship?',
        [
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
            style: 'cancel',
          },
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
            onPress: async () => {
              const responseSuccess = await deleteFriend(dataParams.friend.id)
              if (responseSuccess) {
                setIsAlreadyFriend(false)
                Alert.alert(
                  user?.selectedLanguage === 'pt-br'
                    ? 'Amizade Removida'
                    : 'Friendship Removed',
                  user?.selectedLanguage === 'pt-br'
                    ? 'A amizade foi removida com sucesso!'
                    : 'The friendship was successfully removed!',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.goBack(),
                    },
                  ],
                  { cancelable: false },
                )
              } else {
                Alert.alert(
                  user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
                  user?.selectedLanguage === 'pt-br'
                    ? 'Não foi possível remover a amizade. Tente novamente mais tarde.'
                    : 'Unable to remove the friendship. Please try again later.',
                  [{ text: 'OK' }],
                )
              }
            },
          },
        ],
        { cancelable: false },
      )
    } catch (error) {
      console.error('Erro ao tentar remover a amizade:', error)
      Alert.alert(
        user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
        user?.selectedLanguage === 'pt-br'
          ? 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
          : 'An unexpected error occurred. Please try again later.',
        [{ text: 'OK' }],
      )
    }
  }

  async function handleCancelFriendRequest() {
    Alert.alert(
      user?.selectedLanguage === 'pt-br'
        ? 'Cancelar Convite'
        : 'Cancel Request',
      user?.selectedLanguage === 'pt-br'
        ? 'Tem certeza de que deseja cancelar este convite?'
        : 'Are you sure you want to cancel this request?',
      [
        {
          text: user?.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
          style: 'cancel',
        },
        {
          text: user?.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
          onPress: async () => {
            const responseSuccess = await cancelFriendRequest(
              dataParams.friend.id,
            )
            if (responseSuccess) {
              setIsPendingRequest(false)
              Alert.alert(
                user?.selectedLanguage === 'pt-br'
                  ? 'Cancelamento'
                  : 'Cancellation',
                user?.selectedLanguage === 'pt-br'
                  ? 'O convite foi cancelado com sucesso!'
                  : 'The request was successfully canceled!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ],
                { cancelable: false },
              )
            } else {
              Alert.alert(
                user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
                user?.selectedLanguage === 'pt-br'
                  ? 'Não foi possível cancelar o convite. Tente novamente mais tarde.'
                  : 'Unable to cancel the request. Please try again later.',
                [{ text: 'OK' }],
              )
            }
          },
        },
      ],
      { cancelable: false },
    )
  }

  async function handleSendFriendRequest() {
    Alert.alert(
      user?.selectedLanguage === 'pt-br' ? 'Enviar Convite' : 'Send Request',
      user?.selectedLanguage === 'pt-br'
        ? 'Tem certeza de que deseja enviar este convite?'
        : 'Are you sure you want to send this request?',
      [
        {
          text: user?.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
          style: 'cancel',
        },
        {
          text: user?.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
          onPress: async () => {
            const responseSuccess = await sendFriendRequest(
              dataParams.friend.id,
            )
            if (responseSuccess) {
              setIsPendingRequest(true)
              Alert.alert(
                user?.selectedLanguage === 'pt-br'
                  ? 'Convite Enviado'
                  : 'Request Sent',
                user?.selectedLanguage === 'pt-br'
                  ? 'O convite foi enviado com sucesso!'
                  : 'The request was successfully sent!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ],
                { cancelable: false },
              )
            } else {
              Alert.alert(
                user?.selectedLanguage === 'pt-br' ? 'Erro' : 'Error',
                user?.selectedLanguage === 'pt-br'
                  ? 'Não foi possível enviar o convite. Tente novamente mais tarde.'
                  : 'Unable to send the request. Please try again later.',
                [{ text: 'OK' }],
              )
            }
          },
        },
      ],
      { cancelable: false },
    )
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  useEffect(() => {
    async function start() {
      const responseFriends = await checkIfFriendAlreadyAccepted(
        dataParams.friend.id,
      )
      if (responseFriends === null) {
        setIsAlreadyFriend(false)
        setIsPendingRequest(false)
        return
      }

      if (responseFriends.accepted === true) {
        setIsAlreadyFriend(true)
        setIsPendingRequest(false)
      } else if (responseFriends.accepted === false) {
        setIsAlreadyFriend(false)
        setIsPendingRequest(true)
      }
    }

    start()
  }, [dataParams.friend.id])

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
                        photo={dataParams.friend?.photo}
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

                        {isAlreadyFriend && (
                          <AddButton onPress={handleDeleteFriend}>
                            <UserCheck
                              width={38}
                              height={38}
                              fill={theme.COLORS.BLUE_STROKE}
                            />
                          </AddButton>
                        )}
                        {isPendingRequest && (
                          <AddButton onPress={handleCancelFriendRequest}>
                            <UserMinus
                              width={38}
                              height={38}
                              fill={theme.COLORS.AUX_GOOGLE_RED}
                            />
                          </AddButton>
                        )}
                        {!isAlreadyFriend && !isPendingRequest && (
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
                            <ButtonText>
                              {user?.selectedLanguage === 'pt-br'
                                ? 'Copiar treinos Personalizados'
                                : 'Copy Custom Workouts'}
                            </ButtonText>
                          </CopyWorkoutButton>
                          <CopyWorkoutButton>
                            <ButtonText>
                              {user?.selectedLanguage === 'pt-br'
                                ? 'Frequência'
                                : 'Frequency'}
                            </ButtonText>
                          </CopyWorkoutButton>
                          <CopyWorkoutButton>
                            <ButtonText>
                              {user?.selectedLanguage === 'pt-br'
                                ? 'Fotos'
                                : 'Photos'}
                            </ButtonText>
                          </CopyWorkoutButton>
                          <CopyWorkoutButton>
                            <ButtonText>
                              {user?.selectedLanguage === 'pt-br'
                                ? 'Criar Desafio'
                                : 'Create Challenge'}
                            </ButtonText>
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
