// screens/Questionnaire/index.tsx
import React, { useCallback, useState } from 'react'
import { FlatList, ImageBackground } from 'react-native'

import { questions } from '../../questions'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import backgroundImg from '../../../../../../../assets/back.png'
import { BackButton } from '@components/Buttons/BackButton'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { QuestionData } from '@hooks/selectOptionsDataFirebaseTypes'
import { IParQStatus } from '@hooks/authTypes'

const ITEMS_PER_PAGE = 4

const translations = {
  'pt-br': {
    title: 'Questionário de Prontidão',
    step: 'Parte',
    of: 'de',
    back: 'Voltar',
    next: 'Próximo',
    finish: 'Fim',
    finishMessage: 'Finalizar questionário',
  },
  us: {
    title: 'Readiness Questionnaire',
    step: 'Step',
    of: 'of',
    back: 'Back',
    next: 'Next',
    finish: 'End',
    finishMessage: 'Finish questionnaire',
  },
}

export default function ViewParQ() {
  const route = useRoute()
  const { user, isWaitingApiResponse } = useAuth()

  const [page, setPage] = useState(1)
  const { data } = route.params as IParQStatus
  const [questionsData, setQuestionsData] = useState<QuestionData[] | null>(
    data,
  )

  const language = user?.selectedLanguage || 'us'

  const t = translations[language]

  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE)

  const progressPercentage = (page / totalPages) * 100

  const currentQuestions = questionsData?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  const navigation = useNavigation()

  function handleNext() {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    } else {
      handleGoBack()
    }
  }

  function handleSelectParQ(index: number, value: boolean) {
    if (!questionsData) return

    const formattedCurrentQuestions = questionsData.map((question, i) => {
      if (i === index) {
        return {
          ...question,
          isChecked: !!value,
        }
      }
      return question
    })

    setQuestionsData(formattedCurrentQuestions)
  }

  const handleBack = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({
        tabBarStyle: { display: 'none' },
        tabBarHideOnKeyboard: false,
      })
      setStatusBarStyle('dark')
    }, []),
  )

  return (
    <Container>
      <BodyImageWrapper>
        <ImageBackground
          source={backgroundImg}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <ImageBackgroundContainer>
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
                      renderItem={({ item, index }) => (
                        <QuestionStep
                          question={item}
                          language={language}
                          index={(page - 1) * ITEMS_PER_PAGE + index}
                          handleSelectParQ={handleSelectParQ}
                          viewOnly={true}
                        />
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
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
