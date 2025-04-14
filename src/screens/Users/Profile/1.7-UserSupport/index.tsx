import React, { useEffect } from 'react'
import { ImageBackground, BackHandler, SafeAreaView } from 'react-native'

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
import { IptBrUs } from '@hooks/authTypes'
import { WhiteButton } from '@components/Buttons/WhiteButton'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}
export function UserSupport() {
  const { user, isWaitingApiResponse } = useAuth()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
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
                              ? 'Dúvidas'
                              : 'Questions'}
                          </ContainerTittle>
                        </ContainerTittleWrapper>
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Envie-nos um E-mail'
                              : 'Send us an E-mail'
                          }
                          onPress={() => {}}
                          bordertype="up"
                          iconStyle="email"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Perguntas Frequentes'
                              : 'FAQ'
                          }
                          onPress={() => {}}
                          bordertype="down"
                          iconStyle="question"
                        />
                      </ContainerWrapper>

                      <ContainerWrapper>
                        <ContainerTittleWrapper>
                          <ContainerTittle>
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Legal'
                              : 'Legal'}
                          </ContainerTittle>
                        </ContainerTittleWrapper>

                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Termos e Condições'
                              : 'Terms and Conditions'
                          }
                          onPress={() => {}}
                          bordertype="up"
                          iconStyle="terms"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Política de Privacidade'
                              : 'Privacy Policy'
                          }
                          onPress={() => {}}
                          iconStyle="privacy"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Anamnese'
                              : 'Anamnesis'
                          }
                          onPress={() => {}}
                          bordertype="down"
                          iconStyle="anamnese"
                        />
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
