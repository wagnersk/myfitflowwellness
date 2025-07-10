import React, { useCallback, useEffect } from 'react'
import { ImageBackground, BackHandler, SafeAreaView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons' // Exemplo: usando Expo Icons. Adapte para sua biblioteca.

import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'
import { BackButton } from '@components/Buttons/BackButton'

import {
  Container,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  UserName,
  Body,
  Header,
  PremiumCard,
  PlanTitle,
  FeatureList,
  FeatureItem,
  FeatureText,
  ActionsWrapper,
  PricingWrapper,
  PriceText,
  DiscountText,
  CTAButton,
  CTAText,
  SecondaryAction,
  SecondaryActionText,
} from './styles'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

// Criei este item para listar as vantagens do plano.
// O ícone de check pode vir da sua biblioteca de preferência.
const Feature = ({ text }: { text: string }) => (
  <FeatureItem>
    <Feather name="check-circle" size={20} color="#004AAD" />
    {/* Adapte a cor para theme.COLORS.BLUE_STROKE se desejar */}
    <FeatureText>{text}</FeatureText>
  </FeatureItem>
)

export function UserPlan() {
  const { user, isWaitingApiResponse } = useAuth()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handlePremiumSignUp() {
    // TODO: Implementar a lógica de assinatura aqui
    console.log('Usuário clicou para contratar o plano Premium!')
  }

  useEffect(() => {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    const backAction = () => {
      handleGoBack()
      return true // Previne o comportamento padrão (fechar o app)
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        style="dark"
        translucent
        animated
      />
      <BodyImageWrapper>
        <ImageBackground
          source={backgroundImg}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <ImageBackgroundContainer>
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
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
                    ? `Seu Plano`
                    : `Your Plan`}
                </UserName>
              </Header>

              <Body>
                <PremiumCard>
                  <PlanTitle>
                    {user?.selectedLanguage === 'pt-br'
                      ? 'Plano Premium'
                      : 'Premium Plan'}
                  </PlanTitle>

                  <FeatureList>
                    <Feature
                      text={
                        user?.selectedLanguage === 'pt-br'
                          ? 'Acesso completo com treinos personalizados.'
                          : 'Full access with personalized workouts.'
                      }
                    />
                    <Feature
                      text={
                        user?.selectedLanguage === 'pt-br'
                          ? 'Suporte 24/7 e todas as funcionalidades.'
                          : '24/7 support and all features.'
                      }
                    />
                    <Feature
                      text={
                        user?.selectedLanguage === 'pt-br'
                          ? 'Acompanhamento de progresso detalhado.'
                          : 'Detailed progress tracking.'
                      }
                    />
                  </FeatureList>
                </PremiumCard>

                <ActionsWrapper>
                  <PricingWrapper>
                    <PriceText>
                      {user?.selectedLanguage === 'pt-br'
                        ? 'R$ 0,01 / mês'
                        : '$ 0.01 / month'}
                    </PriceText>
                    <DiscountText>
                      {user?.selectedLanguage === 'pt-br'
                        ? 'Desconto especial de versão Beta'
                        : 'Special Beta version discount'}
                    </DiscountText>
                  </PricingWrapper>

                  <CTAButton
                    onPress={handlePremiumSignUp}
                    disabled={isWaitingApiResponse}
                  >
                    <CTAText>
                      {user?.selectedLanguage === 'pt-br'
                        ? 'Contratar Plano Premium'
                        : 'Upgrade to Premium'}
                    </CTAText>
                  </CTAButton>

                  <SecondaryAction onPress={handleGoBack}>
                    <SecondaryActionText>
                      {user?.selectedLanguage === 'pt-br'
                        ? 'Continuar com o plano Free'
                        : 'Continue with Free Plan'}
                    </SecondaryActionText>
                  </SecondaryAction>
                </ActionsWrapper>
              </Body>
            </SafeAreaView>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
