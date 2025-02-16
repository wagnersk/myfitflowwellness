import React, { useCallback, useState } from 'react'
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { BackButton } from '@components/Buttons/BackButton'

import { useAuth } from '@hooks/auth'
import { useTheme } from 'styled-components/native'

import backgroundImg from '../../../../../assets/back.png'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  Tittle,
  PhillsWrapper,
  PhillItem,
  PhillsRowContainer,
  TittleWrapper,
  AddFriendButton,
  AddFriendButtonText,
  FriendCardWrapper,
  FriendPhotoWrapper,
  FriendContentWrapper,
  FriendNameWrapper,
  FriendNameText,
  FriendEmailText,
  FriendEmailWrapper,
  FriendPhoto,
  ActFriendButton,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import UserPlus from '@assets/User-circle-plus.svg'

export function UserFriendList() {
  const { user, isWaitingApiResponse } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()

  const items = ['Solicitações', 'Amigos']
  const friendlist = [
    {
      name: 'Wagner',
      email: 'wagnereletroskateet@gmail.com',
      photo: 'wagnereletroskateet@gmail.com',
      birthdate: '1999-09-09',
    },
    {
      name: 'Gustavo',
      email: 'wagnereletroskateet@gmail.com',
      photo: 'wagnereletroskateet@gmail.com',
      birthdate: '1999-09-09',
    },
  ]
  const friendAcceptlist = [
    {
      name: 'Wagner',
      email: 'wagnereletroskateet@gmail.com',
      photo: 'wagnereletroskateet@gmail.com',
      birthdate: '1999-09-09',
    },
    {
      name: 'Gustavo',
      email: 'wagnereletroskateet@gmail.com',
      photo: 'wagnereletroskateet@gmail.com',
      birthdate: '1999-09-09',
    },
  ]
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // funcao para conferir aqui

  function handleGoBack() {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  /*   const userAge = diffInAge(user?.birthdate)
   */
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
                <SafeAreaView style={{ flex: 1, gap: 16 }}>
                  <SettingsWrapper>
                    <BackButton
                      onPress={handleGoBack}
                      changeColor
                      disabled={isWaitingApiResponse}
                    />
                  </SettingsWrapper>
                  <TittleWrapper>
                    <Tittle>Amigos</Tittle>
                    {/*           <ActivityIndicator color={theme.COLORS.NEUTRA_LETTER_AND_STROKE} />
                     */}
                    <AddFriendButton onPress={() => {}}>
                      <UserPlus
                        width={32}
                        height={32}
                        fill={theme.COLORS.BLUE_STROKE}
                      />
                    </AddFriendButton>
                  </TittleWrapper>
                  <PhillsRowContainer>
                    {items.map((item) => (
                      <PhillsWrapper
                        key={item}
                        selected={selectedItem === item}
                        onPress={() => setSelectedItem(item)}
                      >
                        <PhillItem selected={selectedItem === item}>
                          {item}
                        </PhillItem>
                      </PhillsWrapper>
                    ))}
                  </PhillsRowContainer>
                  <Body>
                    <ScrollView
                      style={{
                        width: '100%',
                      }}
                      keyboardShouldPersistTaps="handled"
                      contentContainerStyle={{
                        gap: 16,
                      }}
                    >
                      {/* 
                      separar as duas listas

                      crie alert para aceitar ou recusar

                      em amigos criar botao para entrar no perfil do amigo

                      dai copio o meu q mostro a foto 

                      adiciono botao clonar treino

                      fim
                      */}
                      {selectedItem === 'Solicitações'
                        ? friendAcceptlist.map((friend, friendIndex) => (
                            <FriendCardWrapper key={friendIndex}>
                              <FriendPhotoWrapper>
                                <FriendPhoto src="https://www.google.com/url?sa=i&url=https%3A%2F%2Foglobo.globo.com%2Fsaber-viver%2Ftudo-que-voce-precisa-saber-sobre-dor-de-cabeca-23307264&psig=AOvVaw1Yu1vHnqqZjDFOO-7BD5aT&ust=1739768198265000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDPhd-zx4sDFQAAAAAdAAAAABAE" />
                              </FriendPhotoWrapper>
                              <FriendContentWrapper>
                                <FriendNameWrapper>
                                  <FriendNameText>Wagner, 33</FriendNameText>
                                </FriendNameWrapper>
                                <FriendEmailWrapper>
                                  <ActFriendButton
                                    onPress={() => {}}
                                  ></ActFriendButton>
                                  <ActFriendButton
                                    onPress={() => {}}
                                  ></ActFriendButton>
                                </FriendEmailWrapper>
                              </FriendContentWrapper>
                            </FriendCardWrapper>
                          ))
                        : friendlist.map((friend, friendIndex) => (
                            <FriendCardWrapper key={friendIndex}>
                              <FriendPhotoWrapper>
                                <FriendPhoto src="https://www.google.com/url?sa=i&url=https%3A%2F%2Foglobo.globo.com%2Fsaber-viver%2Ftudo-que-voce-precisa-saber-sobre-dor-de-cabeca-23307264&psig=AOvVaw1Yu1vHnqqZjDFOO-7BD5aT&ust=1739768198265000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDPhd-zx4sDFQAAAAAdAAAAABAE" />
                              </FriendPhotoWrapper>
                              <FriendContentWrapper>
                                <FriendNameWrapper>
                                  <FriendNameText>Wagner, 33</FriendNameText>
                                </FriendNameWrapper>
                                <FriendEmailWrapper>
                                  <FriendEmailText>
                                    wagnereletroskateet@gmail.com
                                  </FriendEmailText>
                                </FriendEmailWrapper>
                              </FriendContentWrapper>
                            </FriendCardWrapper>
                          ))}
                    </ScrollView>
                  </Body>
                  {/*       <CTAButton
                    onPress={handleUpdateInfo}
                    changeColor
                    title="Salvar"
                    loading={isWaitingApiResponse}
                    enabled={!isWaitingApiResponse}
                  /> */}
                </SafeAreaView>
              </SafeAreaProvider>
            </ImageBackgroundContainer>
          </ImageBackground>
        </BodyImageWrapper>
      </Container>
    </TouchableWithoutFeedback>
  )
}
