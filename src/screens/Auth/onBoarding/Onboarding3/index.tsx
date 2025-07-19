import React, { useEffect } from 'react'
import { TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation, useRoute } from '@react-navigation/core'

import ArrowRight from '@assets/ArrowRight.svg'
import ArrowLeft from '@assets/ArrowLeft.svg'

import ChartLineUp from '@assets/ChartLineUp.svg'

import {
  BodyTop,
  Footer,
  IconContainer,
  LinearGradientContainer,
  ToggleButtonWrapper,
  Container,
  BodyWrapper,
  Tittle,
  NextScreenButton,
  PreviousButton,
  DescriptionWrapper,
  BulletPoint,
  BulletPointWrapper,
  Description,
  TittleWrapper,
} from './styles'
import { IOnBoading } from '@src/@types/navigation'
import { OnBoardingHeader } from '@components/OnBoardingHeader'

export function OnBoarding3() {
  const navigation = useNavigation()

  const route = useRoute()

  const { selectedLanguage } = route.params as IOnBoading

  async function handleNextScreen() {
    navigation.navigate('onBoarding4', { selectedLanguage })
  }

  async function handlePreviousScreen() {
    navigation.goBack()
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  return (
    <Container>
      <LinearGradientContainer colors={['#000000', '#FFFFFF']}>
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <BodyWrapper>
              <OnBoardingHeader
                paginationItems={[
                  { isLine: false },
                  { isLine: false },
                  { isLine: true },
                  { isLine: false },
                ]}
                handleSkip={() => {}}
                skipText={selectedLanguage === 'pt-br' ? 'Pular' : 'Skip'}
              />
              <BodyTop>
                <ToggleButtonWrapper>
                  <TittleWrapper>
                    <Tittle>
                      {selectedLanguage === 'pt-br'
                        ? 'Acompanhe seu progresso'
                        : 'Track Your Progress'}
                    </Tittle>
                  </TittleWrapper>
                  <ChartLineUp
                    width={120}
                    height={120}
                    fill={`white`}
                    strokeWidth={2}
                  />
                  <DescriptionWrapper>
                    <BulletPointWrapper>
                      <BulletPoint>•</BulletPoint>
                      <Description>
                        {selectedLanguage === 'pt-br'
                          ? 'Registre os pesos de cada série.'
                          : 'Log the weights for each set.'}
                      </Description>
                    </BulletPointWrapper>

                    <BulletPointWrapper>
                      <BulletPoint>•</BulletPoint>
                      <Description>
                        {selectedLanguage === 'pt-br'
                          ? 'Faça anotações sobre seus treinos.'
                          : 'Make notes about your workouts.'}
                      </Description>
                    </BulletPointWrapper>
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
