// screens/Questionnaire/index.tsx
import React, { useEffect, useState } from 'react'
import {
  BackHandler,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from 'react-native'
import { questions } from './questions'
import QuestionStep from '@components/Questions'
import {
  Container,
  Subtitle,
  ProgressBarWrapper,
  ProgressBarFill,
  QuestionList,
  Navigation,
  NavButton,
  NavButtonText,
  ListWrapper,
  Body,
  ImageBackgroundContainer,
  BodyImageWrapper,
  Header,
  SettingsWrapper,
  UserName,
} from './styles'
import { useAuth } from '@hooks/auth'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import backgroundImg from '../../../../../assets/back.png'
import { BackButton } from '@components/Buttons/BackButton'
import { useNavigation } from '@react-navigation/native'

const ITEMS_PER_PAGE = 4

const translations = {
  'pt-br': {
    title: 'Questionário de Prontidão',
    step: 'Parte',
    of: 'de',
    back: 'Voltar',
    next: 'Próximo',
    finish: 'Finalizar',
    finishMessage: 'Finalizar questionário',
  },
  us: {
    title: 'Readiness Questionnaire',
    step: 'Step',
    of: 'of',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    finishMessage: 'Finish questionnaire',
  },
}

export default function ParQ() {
  const [page, setPage] = useState(1)
  const { user, isWaitingApiResponse } = useAuth()
  const language = user?.selectedLanguage || 'us'
  const t = translations[language]

  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE)
  const progressPercentage = (page / totalPages) * 100

  const currentQuestions = questions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  const navigation = useNavigation()
  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
    else console.log(t.finishMessage)
  }

  const handleBack = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

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
                  <UserName>{t.title} </UserName>
                </Header>
                <Body>
                  <ListWrapper>
                    <Subtitle>
                      {t.step} {page} {t.of} {totalPages}
                    </Subtitle>

                    <ProgressBarWrapper>
                      <ProgressBarFill
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </ProgressBarWrapper>

                    <QuestionList>
                      <FlatList
                        data={currentQuestions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <QuestionStep question={item} language={language} />
                        )}
                        contentContainerStyle={{ gap: 20 }}
                      />
                    </QuestionList>

                    <Navigation singleButton={page <= 1}>
                      {page > 1 && (
                        <NavButton onPress={handleBack}>
                          <NavButtonText>{t.back}</NavButtonText>
                        </NavButton>
                      )}
                      <NavButton onPress={handleNext}>
                        <NavButtonText>
                          {page === totalPages ? t.finish : t.next}
                        </NavButtonText>
                      </NavButton>
                    </Navigation>
                  </ListWrapper>
                </Body>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
