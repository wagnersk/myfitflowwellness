import React, { useEffect } from 'react'
import {
  ImageBackground,
  BackHandler,
  SafeAreaView,
  Linking,
  Alert,
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
  function handleEmailPress() {
    const email = 'suporte@myfitflow.com.br'
    const subject = 'Dúvidas e Sugestões'
    const body = 'Olá, gostaria de...'

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    const errorMessage = {
      'pt-br': 'Não foi possível abrir o app de e-mail.',
      us: 'Could not open the email app.',
    }

    const selectedLanguage = user?.selectedLanguage || 'us' // Define 'us' como padrão caso undefined

    Linking.openURL(url).catch(() =>
      Alert.alert('Error', errorMessage[selectedLanguage]),
    )
  }
  function handleFrequentQuestions() {
    navigation.navigate('frequentQuestions')
  }

  function handlePrivacyPolicy() {
    const url = 'https://www.myfitflow.com.br/privacy-policy' // Substitua pelo link desejado
    Linking.openURL(url).catch((err) => {
      console.error('Erro ao abrir o link:', err)
    })
  }
  function handleTermsAndConditions() {
    const url = 'https://www.myfitflow.com.br/terms-and-conditions' // Substitua pelo link desejado
    Linking.openURL(url).catch((err) => {
      console.error('Erro ao abrir o link:', err)
    })
  }
  function handleRefund() {
    const url = 'https://myfitflow.com.br/return-refund-policy' // Substitua pelo link desejado
    Linking.openURL(url).catch((err) => {
      console.error('Erro ao abrir o link:', err)
    })
  }
  function handleDisclaimer() {
    const url = 'https://myfitflow.com.br/disclaimer' // Substitua pelo link desejado
    Linking.openURL(url).catch((err) => {
      console.error('Erro ao abrir o link:', err)
    })
  }
  function handleEULA() {
    const url = 'https://myfitflow.com.br/eula' // Substitua pelo link desejado
    Linking.openURL(url).catch((err) => {
      console.error('Erro ao abrir o link:', err)
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
                          onPress={handleEmailPress}
                          bordertype="up"
                          iconStyle="email"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Perguntas Frequentes'
                              : 'FAQ'
                          }
                          onPress={handleFrequentQuestions}
                          bordertype="down"
                          iconStyle="question"
                        />
                      </ContainerWrapper>
                      {/*       <ContainerWrapper>
                        <ContainerTittleWrapper>
                          <ContainerTittle>
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Minha saúde'
                              : 'My Health'}
                          </ContainerTittle>
                        </ContainerTittleWrapper>

                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Anamnese'
                              : 'Anamnesis'
                          }
                          onPress={handleParQ}
                          bordertype="up-down"
                          iconStyle="anamnese"
                        />
                      </ContainerWrapper> */}

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
                              ? 'Política de Privacidade'
                              : 'Privacy Policy'
                          }
                          onPress={handlePrivacyPolicy}
                          bordertype="up"
                          iconStyle="terms"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Termos e Condições'
                              : 'Terms and Conditions'
                          }
                          onPress={handleTermsAndConditions}
                          bordertype="none"
                          iconStyle="terms"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Política de Reembolso'
                              : 'Refund Policy'
                          }
                          onPress={handleRefund}
                          bordertype="none"
                          iconStyle="terms"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br'
                              ? 'Contrato de Lic de Usuário F.'
                              : 'End User License Agreement'
                          }
                          onPress={handleDisclaimer}
                          bordertype="none"
                          iconStyle="terms"
                        />
                        <WhiteButton
                          tittle={
                            user?.selectedLanguage === 'pt-br' ? 'EULA' : 'EULA'
                          }
                          onPress={handleEULA}
                          bordertype="down"
                          iconStyle="terms"
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
