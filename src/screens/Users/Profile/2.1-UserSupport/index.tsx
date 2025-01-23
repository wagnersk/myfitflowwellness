import React, { useEffect, useState } from 'react'
import { ImageBackground, BackHandler, SafeAreaView } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'
import Email from '@assets/Email.svg'
import Question from '@assets/Question.svg'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ButtonWrapper,
  UserName,
  ListWrapper,
  IconWrapper,
  ListTitle,
  ContainerWrapper,
  ContainerTittle,
  ContainerTittleWrapper,
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
                <SettingsWrapper>
                  <BackButton
                    onPress={handleGoBack}
                    changeColor
                    disabled={isWaitingApiResponse}
                  />
                </SettingsWrapper>
                <UserName>
                  {user?.selectedLanguage === 'pt-br' ? `Suporte` : 'Suportt'}
                </UserName>
                <Body>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      <ContainerWrapper>
                        <ContainerTittleWrapper>
                          <ContainerTittle>
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Dúvidas'
                              : 'Legal'}
                          </ContainerTittle>
                        </ContainerTittleWrapper>
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Send us an E-mail'
                              : 'Send us an E-mail'
                          }
                          onPress={() => {}}
                          bordertype="up"
                          iconStyle="email"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br' ? 'FAQ' : 'FAQ'
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
                              ? 'Terms and Conditions'
                              : 'Terms and Conditions'
                          }
                          onPress={() => {}}
                          bordertype="up"
                          iconStyle="question"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Privacy Policy'
                              : 'Privacy Policy'
                          }
                          onPress={() => {}}
                          iconStyle="question"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Anamnese'
                              : 'Anamnese'
                          }
                          onPress={() => {}}
                          bordertype="down"
                          iconStyle="question"
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
