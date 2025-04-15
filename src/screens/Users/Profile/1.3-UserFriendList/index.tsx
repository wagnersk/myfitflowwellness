import React, { useCallback, useEffect, useState } from 'react'
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
  ActivityIndicator,
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
  InputWrapper,
  InputSearchFriend,
  Header,
  LeftContent,
  RightContent,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Search from '@assets/Search.svg'
import FriendList from './Components/FriendList'
import FriendRequest from './Components/FriendRequest'
import { CTAButton } from '@components/Buttons/CTAButton'
import { IUser } from '@hooks/authTypes'
import FriendReceived from './Components/FriendReceived'

export function UserFriendList() {
  const {
    isWaitingApiResponse,
    fetchListOfUsers,
    fetchReceivedRequestsList,
    fetchFriendRequestsList,
    fetchFriendList,
    fetchUserInfo,
    cancelFriendRequest,
    declineReceivedRequest,
    acceptFriendRequest,
  } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()

  const items = ['Solicitações', 'Amigos', 'Envios']

  const [selectedItem, setSelectedItem] = useState<string | null>('Amigos')
  const [isVisibleInput, setIsVisibleInput] = useState(false)
  const [listOfSearchUsers, setListOfSearchUsers] = useState<IUser[]>([])
  const [userRequestList, setUserRequestList] = useState<IUser[]>([])
  const [userReceivedList, setUserReceivedList] = useState<IUser[]>([])
  const [userFriendList, setUserFriendList] = useState<IUser[]>([])
  const [search, setSearch] = useState('')

  // funcao para conferir aqui

  function handleGoBack() {
    navigation.goBack()
  }

  function handleOpenFriendProfile(friend: IUser) {
    navigation.navigate('userFriendProfile', { friend })
  }

  async function handleAcceptFriend(friendId: string) {
    const sucess = await acceptFriendRequest(friendId)

    if (!sucess) return

    const userReceived = userReceivedList.filter(
      (request) => request.id !== friendId,
    )

    setUserReceivedList(userReceived)
    setUserFriendList((prev) => prev) // teste

    Alert.alert(`Convite aceito com sucesso`)
  }

  async function handleDeclineFriend(friendId: string) {
    const sucess = await declineReceivedRequest(friendId)

    if (!sucess) return

    const userReceived = userReceivedList.filter(
      (request) => request.id !== friendId,
    )

    setUserReceivedList(userReceived)
    setUserFriendList((prev) => prev) // teste

    Alert.alert(`Convite recusado com sucesso`)
  }

  async function handleOnCancelRequest(friendId: string) {
    const sucess = await cancelFriendRequest(friendId)

    if (!sucess) return

    const userRequest = userRequestList.filter(
      (request) => request.id !== friendId,
    )

    setUserRequestList(userRequest)
    setUserFriendList((prev) => prev) // teste

    // userRequestList
    Alert.alert(`Convite cancelado com sucesso`)
  }
  function handleSetInputVisible() {
    setIsVisibleInput((prev) => !prev)
  }

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

  const renderFriendList = () => {
    if (search !== '') return null

    if (selectedItem === 'Solicitações') {
      return userReceivedList.map((friend, friendIndex) => (
        <FriendReceived
          key={friendIndex}
          friend={friend}
          onAccept={() => handleAcceptFriend(friend.id)}
          onDecline={() => handleDeclineFriend(friend.id)}
        />
      ))
    }

    if (selectedItem === 'Amigos') {
      return userFriendList.map((friend, friendIndex) => (
        <FriendList
          key={friendIndex}
          friend={friend}
          openFriendProfile={handleOpenFriendProfile}
        />
      ))
    }

    if (selectedItem === 'Envios') {
      return userRequestList.map((friend, friendIndex) => (
        <FriendRequest
          key={friendIndex}
          friend={friend}
          onCancelRequest={() => handleOnCancelRequest(friend.id)}
        />
      ))
    }

    return null
  }

  useEffect(() => {
    async function fetchReceivedRequests() {
      if (userRequestList.length > 0) return

      const getUserRequestList = await fetchReceivedRequestsList()
      if (getUserRequestList) {
        const userRequests = (await Promise.all(
          getUserRequestList.map(async (request) => {
            const userProfile = await fetchUserInfo(request.id)
            return { ...request, ...userProfile }
          }),
        )) as IUser[]

        setUserReceivedList(userRequests)
        console.log(`getUserRequestList`, userRequests)
      }
    }
    fetchReceivedRequests()
  }, [selectedItem === 'Solicitações'])

  useEffect(() => {
    async function fetchRequests() {
      if (userFriendList.length > 0) return
      const getUserRequestList = await fetchFriendList()
      if (getUserRequestList) {
        const userRequests = (await Promise.all(
          getUserRequestList.map(async (request) => {
            const userProfile = await fetchUserInfo(request.id)
            return { ...request, ...userProfile }
          }),
        )) as IUser[]

        setUserFriendList(userRequests)
        console.log(`getUserRequestList a`, userRequests)
      }
    }
    fetchRequests()
  }, [selectedItem === 'Amigos'])

  useEffect(() => {
    async function fetchRequests() {
      if (userFriendList.length > 0) return
      const getUserRequestList = await fetchFriendRequestsList()
      if (getUserRequestList) {
        const userRequests = (await Promise.all(
          getUserRequestList.map(async (request) => {
            const userProfile = await fetchUserInfo(request.id)
            return { ...request, ...userProfile }
          }),
        )) as IUser[]

        setUserRequestList(userRequests)
        console.log(`getUserRequestList`, userRequests)
      }
    }
    fetchRequests()
  }, [selectedItem === 'Envios'])

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
                  <Header>
                    <SettingsWrapper>
                      <BackButton
                        onPress={handleGoBack}
                        changeColor
                        disabled={isWaitingApiResponse}
                      />
                    </SettingsWrapper>
                    <Tittle>Amigos</Tittle>
                  </Header>
                  <TittleWrapper>
                    {/*         <AddFriendButton onPress={handleSetInputVisible}>
                      <Search
                        width={32}
                        height={32}
                        fill={theme.COLORS.BLUE_STROKE}
                      />
                    </AddFriendButton> */}
                  </TittleWrapper>
                  <PhillsRowContainer>
                    <LeftContent>
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
                    </LeftContent>
                    <RightContent>
                      <AddFriendButton onPress={handleSetInputVisible}>
                        <Search
                          width={32}
                          height={32}
                          fill={theme.COLORS.BLUE_STROKE}
                        />
                      </AddFriendButton>
                    </RightContent>
                  </PhillsRowContainer>

                  <Body>
                    {/* entender pq ta renderizando tudo 2x 
               -> nao preciso do active quando aceito / recuso
               nao preciso quando => tirar active de baixco ActivityIndicator */}
                    {isWaitingApiResponse && (
                      <ActivityIndicator
                        size="large"
                        color={theme.COLORS.BLUE_STROKE}
                      />
                    )}
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

                        {renderFriendList()}
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
