// screens/Questionnaire/index.tsx
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { IPaqQ } from '@src/@types/navigation'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

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
export interface Question {
  'pt-br': string
  us: string
}
export interface QuestionData {
  id: number
  data: Question
  isChecked: null | boolean
}
export default function ParQ() {
  const route = useRoute()
  const { initial } = route.params as IPaqQ

  const [page, setPage] = useState(1)
  const [questionsData, setQuestionsData] = useState<QuestionData[] | null>(
    null,
  )
  const { user, isWaitingApiResponse, updateUserFirebaseParQStatus } = useAuth()

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
      handleSaveParQ()
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
    console.log(
      `formattedCurrentQuestions.isChecked`,
      formattedCurrentQuestions.map((v) => v.isChecked),
    )
    setQuestionsData(formattedCurrentQuestions)
  }

  function handleSaveParQ() {
    if (!questionsData) return
    const isSomeAnswerTrue = questionsData.some((v) => v.isChecked)
    const isSomeAnswerNull = questionsData.some((v) => v.isChecked === null)

    const isAllCheckedNegative = questionsData.every((v) => !v.isChecked)

    if (isSomeAnswerNull) {
      Alert.alert('Alerta', 'Porfavor responda todas perguntas')
    }
    if (isSomeAnswerTrue) {
      Alert.alert(
        'Alerta',
        'Procure um médico antes de praticar atividades físicas',
      )
    }

    if (isAllCheckedNegative) {
      console.log(`tudo certo!`)
      // await updateUserFirebaseParQStatus(questionsData)
    }
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

  useEffect(() => {
    const checkIfAlreadyHaveParq = false

    if (!checkIfAlreadyHaveParq) {
      const currentQuestions = questions.map((v, i) => {
        return { id: i, isChecked: null, data: v }
      })
      setQuestionsData(currentQuestions)
    }
  }, [])

  return (
    <Container>
      <BodyImageWrapper>
        <ImageBackground
          source={backgroundImg}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <StatusBar
            backgroundColor="transparent"
            style="dark"
            translucent
            animated
          />
          <ImageBackgroundContainer>
            <SafeAreaProvider style={{ width: `100%` }}>
              <SafeAreaView style={{ flex: 1 }}>
                <Header>
                  <SettingsWrapper>
                    {!initial && (
                      <BackButton
                        onPress={handleGoBack}
                        changeColor
                        disabled={initial || isWaitingApiResponse}
                      />
                    )}
                  </SettingsWrapper>
                  <UserName>{t.title} </UserName>
                </Header>
                <Body>
                  <ListWrapper>
                    <Subtitle>
                      {t.step} {page} {t.of} {totalPages} {initial}
                    </Subtitle>

                    <ProgressBarWrapper>
                      <ProgressBarFill
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </ProgressBarWrapper>
                    {/* 

pagina 1 
total itens per page = 4

marquei o index 0   


*/}
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
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
