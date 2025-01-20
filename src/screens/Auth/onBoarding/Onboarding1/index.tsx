import React, { useState } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/core'

import ArrowRight from '@assets/ArrowRight.svg'
import { getLocales } from 'expo-localization'

import {
  BodyTop,
  Footer,
  IconContainer,
  LinearGradientContainer,
  ButtonText,
  ToggleButton,
  ToggleButtonWrapper,
  NextScreenButton,
  Container,
  BodyWrapper,
  Tittle,
  SelectLanguageWrapper,
} from './styles'
import { OnBoardingHeader } from '@components/OnBoardingHeader'

export function OnBoarding1() {
  const navigation = useNavigation()

  function getDeviceLanguage() {
    const locales = getLocales()
    if (locales && locales.length > 0) {
      console.log(locales[0].languageCode)
      const languageCode = locales[0].languageCode

      return languageCode === 'pt' ? 'pt-br' : 'us'
    }
    return 'us'
  }

  const [selectedLanguage, setSelectedLanguage] = useState<'pt-br' | 'us'>(
    getDeviceLanguage(),
  )

  async function handleNextScreen() {
    navigation.navigate('onBoarding2', { selectedLanguage })
  }

  async function handleLanguageChange(language: 'pt-br' | 'us') {
    setSelectedLanguage(language)
  }
  async function handleSkipScreen() {
    navigation.navigate('login', { selectedLanguage })
  }
  return (
    <Container>
      <LinearGradientContainer colors={['#000000', '#FFFFFF']}>
        <SafeAreaProvider style={{ width: `100%` }}>
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <BodyWrapper>
                <OnBoardingHeader
                  paginationItems={[
                    { isLine: true },
                    { isLine: false },
                    { isLine: false },
                    { isLine: false },
                  ]}
                  handleSkip={handleSkipScreen}
                  skipText={selectedLanguage === 'pt-br' ? 'Pular' : 'Skip'}
                />

                <BodyTop>
                  <ToggleButtonWrapper>
                    <Tittle>
                      {selectedLanguage === 'pt-br'
                        ? 'Escolha seu idioma'
                        : 'Choose your language'}
                    </Tittle>

                    <SelectLanguageWrapper>
                      <ToggleButton
                        onPress={() => handleLanguageChange('pt-br')}
                        selected={selectedLanguage === 'pt-br'}
                      >
                        <ButtonText
                          style={{
                            opacity: selectedLanguage === 'pt-br' ? 1 : 0.5,
                          }}
                        >
                          🇧🇷
                        </ButtonText>
                      </ToggleButton>
                      <ToggleButton
                        selected={selectedLanguage === 'us'}
                        onPress={() => handleLanguageChange('us')}
                      >
                        <ButtonText
                          style={{
                            opacity: selectedLanguage === 'us' ? 1 : 0.5,
                          }}
                        >
                          🇺🇸
                        </ButtonText>
                      </ToggleButton>
                    </SelectLanguageWrapper>
                  </ToggleButtonWrapper>
                </BodyTop>
                <Footer>
                  <IconContainer></IconContainer>
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
        </SafeAreaProvider>
      </LinearGradientContainer>
    </Container>
  )
}
