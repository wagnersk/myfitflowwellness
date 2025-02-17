import React, { useCallback, useState } from 'react'
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
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
  FriendPhotoImage,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Search from '@assets/Search.svg'
import { diffInAge } from '@utils/diffInAge'
import FriendList from './Components/FriendList'
import FriendRequest from './Components/FriendRequest'

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
      birthdate: '30/10/1991',
    },
    {
      name: 'Gustavo',
      email: 'wagnereletroskateet@gmail.com',
      photo: 'wagnereletroskateet@gmail.com',
      birthdate: '30/10/1991',
    },
  ]

  const friendAcceptlist = [
    {
      name: 'Wagner',
      email: 'wagnereletroskateet@gmail.com',
      photo: 'wagnereletroskateet@gmail.com',
      birthdate: '30/10/1991',
    },
    {
      name: 'Gustavo',
      email: 'wagnereletroskateet@gmail.com',
      photo: 'wagnereletroskateet@gmail.com',
      birthdate: '30/10/1996',
    },
  ]

  const [selectedItem, setSelectedItem] = useState<string | null>('Amigos')

  // funcao para conferir aqui

  function handleGoBack() {
    navigation.goBack()
  }
  function handleOpenFriendProfile(friendIndex: number) {
    const friend = friendlist[friendIndex]

    navigation.navigate('userFriendProfile', { friend })
  }
  function handleAcceptFriend() {
    Alert.alert(`cliquei em aceitar`)
  }
  function handleDeclineFriend() {
    Alert.alert(`cliquei em recusar`)
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
                      <Search
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
                      {selectedItem === 'Solicitações'
                        ? friendAcceptlist.map((friend, friendIndex) => (
                            <FriendRequest
                              key={friendIndex}
                              friendIndex={friendIndex}
                              friendName={friend.name}
                              friendAge={diffInAge(friend?.birthdate)}
                              onAccept={handleAcceptFriend}
                              onDecline={handleDeclineFriend}
                            />
                          ))
                        : friendlist.map((friend, friendIndex) => (
                            <FriendList
                              key={friendIndex}
                              friendIndex={friendIndex}
                              friendName={friend.name}
                              friendAge={diffInAge(friend?.birthdate)}
                              openFriendProfile={handleOpenFriendProfile}
                            />
                          ))}
                    </ScrollView>
                  </Body>
                </SafeAreaView>
              </SafeAreaProvider>
            </ImageBackgroundContainer>
          </ImageBackground>
        </BodyImageWrapper>
      </Container>
    </TouchableWithoutFeedback>
  )
}
