import React, { useEffect } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation, useRoute } from '@react-navigation/core'

import ArrowRight from '@assets/ArrowRight.svg'
import ArrowLeft from '@assets/ArrowLeft.svg'

import {
  BodyTop,
  Footer,
  IconContainer,
  LinearGradientContainer,
  Container,
  BodyWrapper,
  Tittle,
  NextScreenButton,
  PreviousButton,
  Description,
  TittleWrapper,
  ToggleButtonWrapper,
  DescriptionWrapper,
} from './styles'
import { IOnBoading } from '@src/@types/navigation'
import { OnBoardingHeader } from '@components/OnBoardingHeader'
import { LoadAnimation } from '@components/LoadAnimation'

export function OnBoarding2() {
  const navigation = useNavigation()

  const { width, height } = Dimensions.get('window')
  const svgSize = Math.min(width, height) * 0.7 // Ajuste a proporção conforme necessário

  const route = useRoute()
  const { selectedLanguage } = route.params as IOnBoading

  async function handleNextScreen() {
    navigation.navigate('onBoarding3', { selectedLanguage })
  }

  async function handlePreviousScreen() {
    navigation.goBack()
  }
  async function handleSkipScreen() {
    navigation.navigate('login', { selectedLanguage })
  }
  return (
    <Container>
      <LinearGradientContainer colors={['#000000', '#FFFFFF']}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <BodyWrapper>
              <OnBoardingHeader
                paginationItems={[
                  { isLine: false },
                  { isLine: true },
                  { isLine: false },
                  { isLine: false },
                ]}
                handleSkip={handleSkipScreen}
                skipText={selectedLanguage === 'pt-br' ? 'Pular' : 'Skip'}
              />
              <BodyTop>
                <ToggleButtonWrapper>
                  <TittleWrapper>
                    <Tittle>
                      {selectedLanguage === 'pt-br'
                        ? 'Bem-vindo ao MyFitFlow'
                        : 'Welcome to MyFitFlow'}
                    </Tittle>
                  </TittleWrapper>
                  <LoadAnimation width={svgSize} height={svgSize} />
                  <DescriptionWrapper>
                    <Description>
                      {selectedLanguage === 'pt-br'
                        ? 'Treinos personalizados para você atingir seus objetivos!'
                        : 'Personalized workouts to help you reach your goals!'}
                    </Description>
                  </DescriptionWrapper>
                </ToggleButtonWrapper>
              </BodyTop>
              <Footer>
                <PreviousButton onPress={handlePreviousScreen}>
                  <IconContainer>
                    <ArrowLeft
                      width={40}
                      height={40}
                      fill={`white`}
                      strokeWidth={2}
                      opacity={0.7}
                    />
                  </IconContainer>
                </PreviousButton>
                <NextScreenButton onPress={handleNextScreen}>
                  <IconContainer>
                    <ArrowRight
                      width={40}
                      height={40}
                      fill={`white`}
                      strokeWidth={2}
                    />
                  </IconContainer>
                </NextScreenButton>
              </Footer>
            </BodyWrapper>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </LinearGradientContainer>
    </Container>
  )
}
