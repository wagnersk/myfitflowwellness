import React, { useEffect, useState } from 'react'
import { ImageBackground, BackHandler, SafeAreaView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'

import { ScrollView } from 'react-native-gesture-handler'
import { IptBrUs } from '@hooks/authTypes'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ButtonWrapper,
  UserName,
  ListWrapper,
  CardTitle,
  ContainerWrapper,
  ContainerTittle,
  MonthYearACTMessage,
  ToggleButtonWrapper,
  ToggleButton,
  ToggleButtonText,
  FakeBackgroundWrapper,
  ButtonContainer,
  CardsWrapper,
  ContainerTittleWrapper,
  MonthYearACTMessageText,
  CardSubTittle,
  Header,
} from './styles'

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}

export function UserPlan() {
  const { user, isWaitingApiResponse } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('mensal')

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
                    {user?.selectedLanguage === 'pt-br'
                      ? `Selecione seu plano`
                      : `Select your plan`}
                  </UserName>
                </Header>
                <Body>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      <ContainerWrapper>
                        <ContainerTittleWrapper>
                          <ContainerTittle>
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Escolha seu plano: Free ou Premium'
                              : 'Choose Your Plan: Free or Premium'}
                          </ContainerTittle>
                        </ContainerTittleWrapper>

                        <ToggleButtonWrapper>
                          <FakeBackgroundWrapper>
                            <ToggleButton
                              selected={selectedPlan === 'mensal'}
                              onPress={() => setSelectedPlan('mensal')}
                            >
                              <ToggleButtonText
                                selected={selectedPlan === 'mensal'}
                              >
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Mensal'
                                  : 'Monthly'}
                              </ToggleButtonText>
                            </ToggleButton>
                            <ToggleButton
                              selected={selectedPlan === 'anual'}
                              onPress={() => setSelectedPlan('anual')}
                            >
                              <ToggleButtonText
                                selected={selectedPlan === 'anual'}
                              >
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Anual'
                                  : 'Yearly'}
                              </ToggleButtonText>
                            </ToggleButton>
                          </FakeBackgroundWrapper>
                        </ToggleButtonWrapper>

                        <MonthYearACTMessage>
                          <MonthYearACTMessageText>
                            {user?.selectedLanguage === 'pt-br'
                              ? 'Economize mais com o plano anual!'
                              : 'Save more with the yearly plan!'}
                          </MonthYearACTMessageText>
                        </MonthYearACTMessage>

                        <CardsWrapper>
                          <ButtonWrapper onPress={() => {}}>
                            <ButtonContainer type={'neutral'}>
                              <CardTitle>
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Plano Free'
                                  : 'Free Plan'}
                              </CardTitle>
                              <CardSubTittle>
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Acesso básico aos treinos. Ideal para quem está começando.'
                                  : 'Basic access to workouts. Perfect for beginners.'}
                              </CardSubTittle>
                              <CardSubTittle>
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Acesso limitado a funcionalidades.'
                                  : 'Limited access to features.'}
                              </CardSubTittle>
                            </ButtonContainer>
                          </ButtonWrapper>
                          <ButtonWrapper onPress={() => {}}>
                            <ButtonContainer type={'positive'}>
                              <CardTitle>
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Plano Premium'
                                  : 'Premium Plan'}
                              </CardTitle>
                              <CardSubTittle>
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Acesso completo com treinos personalizados.'
                                  : 'Full access with personalized workouts.'}
                              </CardSubTittle>
                              <CardSubTittle>
                                {user?.selectedLanguage === 'pt-br'
                                  ? 'Suporte 24/7 e todas as funcionalidades.'
                                  : '24/7 support and all features.'}
                              </CardSubTittle>
                            </ButtonContainer>
                          </ButtonWrapper>
                        </CardsWrapper>
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
