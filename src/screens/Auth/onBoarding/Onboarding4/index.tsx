import React, { useEffect } from 'react'
import { TouchableWithoutFeedback, Keyboard, BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation, useRoute } from '@react-navigation/core'

import ArrowRight from '@assets/ArrowRight.svg'
import ArrowLeft from '@assets/ArrowLeft.svg'
import Timer from '@assets/Timer.svg'
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

export function OnBoarding4() {
  const navigation = useNavigation()

  const route = useRoute()

  const { selectedLanguage } = route.params as IOnBoading

  async function handleNextScreen() {
    navigation.navigate('login', { selectedLanguage })
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
                  { isLine: false },
                  { isLine: true },
                ]}
                handleSkip={() => {}}
                skipText={selectedLanguage === 'pt-br' ? 'Pular' : 'Skip'}
              />
              <BodyTop>
                <ToggleButtonWrapper>
                  <TittleWrapper>
                    <Tittle>
                      {selectedLanguage === 'pt-br'
                        ? 'Use o cronômetro'
                        : 'Use the Timer'}
                    </Tittle>
                  </TittleWrapper>
                  <Timer
                    width={120}
                    height={120}
                    fill={`white`}
                    strokeWidth={2}
                  />
                  <DescriptionWrapper>
                    <BulletPointWrapper>
                      <BulletPoint>{/* fake info to ajust css */}</BulletPoint>
                      <Description>{/* fake info to ajust css */}</Description>
                    </BulletPointWrapper>
                    <BulletPointWrapper>
                      <BulletPoint>•</BulletPoint>
                      <Description>
                        {selectedLanguage === 'pt-br'
                          ? 'Use o cronômetro para descansar o tempo ideal.'
                          : 'Use the timer to rest for the ideal time.'}
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
