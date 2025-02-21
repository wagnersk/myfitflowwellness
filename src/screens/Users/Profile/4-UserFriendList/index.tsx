import React, { useCallback, useEffect, useState } from 'react'
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
  InputWrapper,
  InputSearchFriend,
  CTAButtonWrapper,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Search from '@assets/Search.svg'
import Dna from '@assets/Dna.svg'
import { diffInAge } from '@utils/diffInAge'
import FriendList from './Components/FriendList'
import FriendRequest from './Components/FriendRequest'
import { CTAButton } from '@components/Buttons/CTAButton'
import { SignInProps } from '@hooks/authTypes'

export function UserFriendList() {
  const {
    user,
    isWaitingApiResponse,
    fetchListOfUsers,
    fetchFriendList,
    fetchUserProfile,
    fetchUserInfo,
  } = useAuth()
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
  const [isVisibleInput, setIsVisibleInput] = useState(false)
  const [listOfSearchUsers, setListOfSearchUsers] = useState<SignInProps[]>([])
  const [userRequestList, setUserRequestList] = useState<SignInProps[]>([])
  const [userFriendList, setUserFriendList] = useState<SignInProps[]>([])
  const [search, setSearch] = useState('')

  // funcao para conferir aqui

  function handleGoBack() {
    navigation.goBack()
  }
  function handleOpenFriendProfile(friend: SignInProps) {
    navigation.navigate('userFriendProfile', { friend })
  }
  function handleAcceptFriend() {
    Alert.alert(`cliquei em aceitar`)
  }
  function handleDeclineFriend() {
    Alert.alert(`cliquei em recusar`)
  }
  function handleSetInputVisible() {
    setIsVisibleInput((prev) => !prev)
  }

  /*   const [search, setSearch] = useState([{ user: 'wagner' }]) */

  function handleSearchFriend(text: string) {
    setSearch(text.toLocaleLowerCase())
  }

  async function handleFetchUsers() {
    const getListOfUsers = await fetchListOfUsers(search)
    if (!getListOfUsers) return
    setListOfSearchUsers(getListOfUsers)
  }

  async function handleClickOutArea() {
    setIsVisibleInput(false)
    setSearch('')
    setListOfSearchUsers([])
    if (search === '') {
      Keyboard.dismiss()
    }
  }

  /*  */
  useEffect(() => {
    async function fetchRequests() {
      if (userRequestList.length > 0) return
      const acceptedFriends = false
      const getUserRequestList = await fetchFriendList(acceptedFriends)
      if (getUserRequestList) {
        const userRequests = (await Promise.all(
          getUserRequestList.map(async (request) => {
            const userProfile = await fetchUserInfo(request.id)
            return { ...request, ...userProfile }
          }),
        )) as SignInProps[]

        setUserRequestList(userRequests)
        console.log(`getUserRequestList`, userRequests)
      }
    }
    fetchRequests()
  }, [selectedItem === 'Solicitações'])

  useEffect(() => {
    async function fetchRequests() {
      if (userFriendList.length > 0) return
      const acceptedFriends = true
      const getUserRequestList = await fetchFriendList(acceptedFriends)
      if (getUserRequestList) {
        const userRequests = (await Promise.all(
          getUserRequestList.map(async (request) => {
            const userProfile = await fetchUserInfo(request.id)
            return { ...request, ...userProfile }
          }),
        )) as SignInProps[]

        setUserFriendList(userRequests)
        console.log(`getUserRequestList`, userRequests)
      }
    }
    fetchRequests()
  }, [selectedItem === 'Amigos'])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  /*   const userAge = diffInAge(user?.birthdate)
   */
  return (
    <TouchableWithoutFeedback onPress={handleClickOutArea}>
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

                    <AddFriendButton onPress={handleSetInputVisible}>
                      <Search
                        width={32}
                        height={32}
                        fill={theme.COLORS.BLUE_STROKE}
                      />
                    </AddFriendButton>
                  </TittleWrapper>
                  <PhillsRowContainer>
                    {isVisibleInput ? (
                      <InputWrapper>
                        <InputSearchFriend
                          textAlign="left"
                          placeholder="Procurar um amigo"
                          placeholderTextColor="rgba(27, 7, 127, 0.5)" // Azul escuro com 0.6 de opacidade
                          onChangeText={handleSearchFriend}
                          value={search}
                        />
                      </InputWrapper>
                    ) : (
                      items.map((item) => (
                        <PhillsWrapper
                          key={item}
                          selected={selectedItem === item}
                          onPress={() => setSelectedItem(item)}
                        >
                          <PhillItem selected={selectedItem === item}>
                            {item}
                          </PhillItem>
                        </PhillsWrapper>
                      ))
                    )}
                  </PhillsRowContainer>

                  <Body>
                    {!isVisibleInput ? (
                      <ScrollView
                        style={{
                          width: '100%',
                        }}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                          gap: 16,
                        }}
                      >
                        {/*! isVisibleInput && quando  search tiver algo nao mostarr o q tinha antes  */}

                        {search === '' &&
                          (selectedItem === 'Solicitações'
                            ? userRequestList.map((friend, friendIndex) => (
                                <FriendRequest
                                  key={friendIndex}
                                  friendIndex={friendIndex}
                                  friendName={friend.name}
                                  friendAge={diffInAge(friend?.birthdate)}
                                  onAccept={handleAcceptFriend}
                                  onDecline={handleDeclineFriend}
                                />
                              ))
                            : userFriendList.map((friend, friendIndex) => (
                                <FriendList
                                  key={friendIndex}
                                  friend={friend}
                                  openFriendProfile={handleOpenFriendProfile}
                                />
                              )))}
                      </ScrollView>
                    ) : (
                      listOfSearchUsers &&
                      listOfSearchUsers.length > 0 &&
                      listOfSearchUsers.map((friend, friendIndex) => (
                        <FriendList
                          key={friendIndex}
                          friend={friend}
                          openFriendProfile={handleOpenFriendProfile}
                        />
                      ))
                    )}
                  </Body>

                  {search.length > 0 && (
                    <CTAButton
                      changeColor={true}
                      disabled={false}
                      loading={false}
                      title={'Buscar'}
                      onPress={handleFetchUsers}
                      style={{ bottom: 20 }}
                    />
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
