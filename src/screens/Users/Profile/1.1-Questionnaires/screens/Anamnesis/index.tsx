// screens/Anamnesis/index.tsx
import React, { useEffect, useState } from 'react'
import { BackHandler, FlatList, ImageBackground } from 'react-native'
import { anamnesisQuestions } from './anamnesisQuestion' // Importar as novas perguntas
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
  QuestionText, // Importar QuestionText do seu style
  AnamnesisInput, // Adicionar AnamnesisInput
} from './styles' // Manter as estilizações existentes e adicionar as novas
import { useAuth } from '@hooks/auth'
import { SafeAreaView } from 'react-native-safe-area-context'
import backgroundImg from '../../../../../assets/back.png'
import { BackButton } from '@components/Buttons/BackButton'
import { useNavigation } from '@react-navigation/native'

// Você pode ajustar ITEMS_PER_PAGE se quiser mais perguntas por tela na anamnese
const ITEMS_PER_PAGE_ANAMNESIS = 3 // Exemplo: 3 perguntas por tela

const translations = {
  'pt-br': {
    title: 'Questionário de Anamnese',
    step: 'Parte',
    of: 'de',
    back: 'Voltar',
    next: 'Próximo',
    finish: 'Finalizar',
    finishMessage: 'Anamnese finalizada!',
  },
  us: {
    title: 'Anamnesis Questionnaire',
    step: 'Step',
    of: 'of',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    finishMessage: 'Anamnesis finished!',
  },
}

export default function AnamnesisForm() {
  const [page, setPage] = useState(1)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({}) // Estado para armazenar as respostas
  const { user, isWaitingApiResponse } = useAuth()
  const language = user?.selectedLanguage || 'us'
  const t = translations[language]

  const totalPages = Math.ceil(
    anamnesisQuestions.length / ITEMS_PER_PAGE_ANAMNESIS,
  )
  const progressPercentage = (page / totalPages) * 100

  const currentQuestions = anamnesisQuestions.slice(
    (page - 1) * ITEMS_PER_PAGE_ANAMNESIS,
    page * ITEMS_PER_PAGE_ANAMNESIS,
  )

  const navigation = useNavigation()

  const handleNext = () => {
    // Aqui você pode adicionar validações antes de avançar
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    } else {
      console.log(t.finishMessage, answers) // Exibe todas as respostas no console
      // Aqui você enviaria as respostas para o backend ou navegaria para a próxima tela
    }
  }

  const handleBack = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleAnswerChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }))
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    // Oculta a tab bar ao entrar no questionário
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    // Lida com o botão de voltar do Android para não sair do app
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Se estiver na primeira página da anamnese, ou já no PAR-Q, pode permitir o back ou mostrar um aviso
        // Por enquanto, apenas impede o back direto
        return true
      },
    )

    return () => backHandler.remove() // Remove o listener ao desmontar
  }, [navigation])

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
                <UserName>{t.title}</UserName>
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
                        <>
                          <QuestionText>
                            {item.id}. {item[language].question}
                          </QuestionText>
                          <AnamnesisInput
                            placeholder={item[language].placeholder}
                            multiline={true} // Permite múltiplas linhas para respostas mais longas
                            numberOfLines={4} // Número inicial de linhas visíveis
                            value={answers[item.id] || ''}
                            onChangeText={(text) =>
                              handleAnswerChange(item.id, text)
                            }
                          />
                        </>
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
