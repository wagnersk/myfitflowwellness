import React, { useState } from 'react'
import {
  ImageBackground,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  UserName,
  ListWrapper,
  ContentWrapper,
  IconWrapper,
  ContainerWrapper,
  ContainerTittle,
  MonthYearACTMessage,
  FakeBackgroundWrapper,
  ButtonContainer,
  CardsWrapper,
  ContainerTittleWrapper,
  MonthYearACTMessageText,
  CardSubTittle,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { IptBrUs } from '@hooks/selectOptionsDataFirebaseTypes'

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}

export function UserPhotoTimeline() {
  const { user, isWaitingApiResponse } = useAuth()
  const [photos, setPhotos] = useState<{
    [key: string]: { profile: string; side: string; gym: string }
  }>({})
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleUploadPhoto(month: string, type: 'profile' | 'side' | 'gym') {
    return
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri
        setPhotos((prevPhotos) => ({
          ...prevPhotos,
          [month]: {
            ...prevPhotos[month],
            [type]: uri,
          },
        }))
      }
    })
  }

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  return (
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
                <UserName>
                  {user?.selectedLanguage === 'pt-br'
                    ? `Linha do Tempo`
                    : `Timeline`}
                </UserName>
                <Body>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      {months.map((month) => (
                        <ContainerWrapper key={month}>
                          <ContainerTittleWrapper>
                            <ContainerTittle>{month}</ContainerTittle>
                          </ContainerTittleWrapper>
                          <CardsWrapper>
                            <TouchableOpacity
                              onPress={() =>
                                handleUploadPhoto(month, 'profile')
                              }
                            >
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginBottom: 10,
                                }}
                              >
                                <Text>
                                  {user?.selectedLanguage === 'pt-br'
                                    ? 'Foto de Perfil'
                                    : 'Profile Photo'}
                                </Text>
                                {photos[month]?.profile ? (
                                  <Image
                                    source={{ uri: photos[month].profile }}
                                    style={{ width: 100, height: 100 }}
                                    alt=""
                                  />
                                ) : (
                                  <View
                                    style={{
                                      width: 100,
                                      height: 100,
                                      backgroundColor: 'gray',
                                    }}
                                  />
                                )}
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleUploadPhoto(month, 'side')}
                            >
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginBottom: 10,
                                }}
                              >
                                <Text>
                                  {user?.selectedLanguage === 'pt-br'
                                    ? 'Foto de Lado'
                                    : 'Side Photo'}
                                </Text>
                                {photos[month]?.side ? (
                                  <Image
                                    source={{ uri: photos[month].side }}
                                    style={{ width: 100, height: 100 }}
                                  />
                                ) : (
                                  <View
                                    style={{
                                      width: 100,
                                      height: 100,
                                      backgroundColor: 'gray',
                                    }}
                                  />
                                )}
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleUploadPhoto(month, 'gym')}
                            >
                              <View
                                style={{
                                  alignItems: 'center',
                                  marginBottom: 10,
                                }}
                              >
                                <Text>
                                  {user?.selectedLanguage === 'pt-br'
                                    ? 'Foto na Academia'
                                    : 'Gym Photo'}
                                </Text>
                                {photos[month]?.gym ? (
                                  <Image
                                    source={{ uri: photos[month].gym }}
                                    style={{ width: 100, height: 100 }}
                                  />
                                ) : (
                                  <View
                                    style={{
                                      width: 100,
                                      height: 100,
                                      backgroundColor: 'gray',
                                    }}
                                  />
                                )}
                              </View>
                            </TouchableOpacity>
                          </CardsWrapper>
                        </ContainerWrapper>
                      ))}
                    </ListWrapper>
                  </ScrollView>
                </Body>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
