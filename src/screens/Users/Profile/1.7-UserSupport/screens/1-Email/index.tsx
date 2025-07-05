import React, { useEffect } from 'react'
import {
  ImageBackground,
  BackHandler,
  SafeAreaView,
  Linking,
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
  ContainerWrapper,
  ContainerTittle,
  ContainerTittleWrapper,
  Header,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export function UserSupport() {
  const { user, isWaitingApiResponse } = useAuth()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSendEmail() {
    const email = 'abc@gmail.com'
    const subject = user?.selectedLanguage === 'pt-br' ? 'Suporte' : 'Support'
    const body =
      user?.selectedLanguage === 'pt-br'
        ? 'Olá, preciso de ajuda.'
        : 'Hello, I need help.'

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    Linking.openURL(mailtoLink).catch((err) => {
      console.error('Erro ao abrir o cliente de e-mail:', err)
    })
  }

  useEffect(() => {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

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
                <Header>
                  <SettingsWrapper>
                    <BackButton
                      onPress={handleGoBack}
                      changeColor
                      disabled={isWaitingApiResponse}
                    />
                  </SettingsWrapper>
                  <UserName>
                    {user?.selectedLanguage === 'pt-br' ? 'Suporte' : 'Support'}
                  </UserName>
                </Header>
                <Body>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      <ContainerWrapper>
                        <ContainerTittleWrapper>
                          <ContainerTittle>
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Envie-nos um E-mail'
                              : 'Send us an E-mail'}
                          </ContainerTittle>
                        </ContainerTittleWrapper>
                        {/*        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Enviar E-mail'
                              : 'Send Email'
                          }
                          onPress={handleSendEmail}
                          bordertype="up"
                          iconStyle="email"
                        /> */}
                      </ContainerWrapper>
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
