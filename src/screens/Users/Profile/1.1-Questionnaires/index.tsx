import React, { useCallback } from 'react'
import { Alert, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

import { useAuth } from '@hooks/auth'

import { BackButton } from '@components/Buttons/BackButton'
import backgroundImg from '../../../../../assets/back.png'

import {
  Container,
  Body,
  ImageBackgroundContainer,
  BodyImageWrapper,
  Header,
  SettingsWrapper,
  UserName,
  Card,
  CardHeader,
  CardTitle,
  CardStatus,
  CardButtons,
  Button,
  ButtonText,
  ButtonsWrapper,
} from './styles'
import { getFormattedDate } from '@utils/getFormattedDate'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const translations = {
  'pt-br': {
    title: 'Meus Questionários',
    parqTitle: 'Questionário PAR-Q',
    anamnesisTitle: 'Questionário de Anamnese',
    lastFilled: 'Preenchido em',
    notFilled: 'Pendente',
    viewButton: 'Visualizar',
    deleteButton: 'Apagar',
    newButton: 'Preencher Novo',
    fillButton: 'Preencher Agora',
    deleteConfirmTitle: 'Confirmar exclusão',
    deleteConfirmMessage:
      'Tem certeza que deseja apagar este questionário? Esta ação não pode ser desfeita.',
    cancel: 'Cancelar',
    delete: 'Apagar',
  },
  us: {
    title: 'My Questionnaires',
    parqTitle: 'PAR-Q Questionnaire',
    anamnesisTitle: 'Anamnesis Questionnaire',
    lastFilled: 'Filled on',
    notFilled: 'Pending',
    viewButton: 'View',
    deleteButton: 'Delete',
    newButton: 'Fill Again',
    fillButton: 'Fill Now',
    deleteConfirmTitle: 'Confirm deletion',
    deleteConfirmMessage:
      'Are you sure you want to delete this questionnaire? This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
  },
}

export default function Questionnaires() {
  const navigation = useNavigation()
  const {
    user,
    isWaitingApiResponse,
    userParQStatus,
    /*     userAnamnesisStatus, */
    deleteUserFirebaseParQStatus,
    deleteUserFirebaseAnamnesisStatus,
  } = useAuth()

  const language = user?.selectedLanguage || 'us'
  const t = translations[language]

  const isParqFilled = userParQStatus && userParQStatus.data
  /*   const isAnamnesisFilled = userAnamnesisStatus && userAnamnesisStatus.data
   */
  const parqLastFilledDate = isParqFilled
    ? getFormattedDate(userParQStatus.updatedAt, language)
    : t.notFilled
  /*   const anamnesisLastFilledDate = isAnamnesisFilled
    ? getFormattedDate(userAnamnesisStatus.updatedAt, language)
    : t.notFilled
 */
  function handleDelete(questionnaireType: 'parq' | 'anamnesis') {
    Alert.alert(t.deleteConfirmTitle, t.deleteConfirmMessage, [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.delete,
        style: 'destructive',
        onPress: async () => {
          if (questionnaireType === 'parq') {
            await deleteUserFirebaseParQStatus()
          }

          if (questionnaireType === 'anamnesis') {
            await deleteUserFirebaseAnamnesisStatus()
          }
        },
      },
    ])
  }

  async function handleOpenParQ() {
    navigation.navigate('parQ', { initial: false })
  }
  /*   async function handleOpenAnamnesis() {
    navigation.navigate('anamnesis')
  }
 */
  async function handleOpenViewParQ() {
    if (!userParQStatus) return
    navigation.navigate('viewParQ', userParQStatus)
  }
  /*   async function handleOpenViewAnamnesis() {
    navigation.navigate('viewAnamnesis')
  } */

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
    }, [navigation]),
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
                  <UserName>{t.title}</UserName>
                </Header>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <Body>
                    {/* PAR-Q Card */}
                    <Card>
                      <CardHeader>
                        <CardTitle>{t.parqTitle}</CardTitle>
                      </CardHeader>
                      <CardStatus>{parqLastFilledDate}</CardStatus>
                      <CardButtons>
                        {isParqFilled ? (
                          <ButtonsWrapper>
                            <Button
                              onPress={() => handleDelete('parq')}
                              variant="danger"
                            >
                              <ButtonText variant="danger">
                                {t.deleteButton}
                              </ButtonText>
                            </Button>
                            <Button
                              onPress={handleOpenViewParQ}
                              variant="secondary"
                            >
                              <ButtonText variant="secondary">
                                {t.viewButton}
                              </ButtonText>
                            </Button>
                          </ButtonsWrapper>
                        ) : (
                          <Button onPress={handleOpenParQ}>
                            <ButtonText>{t.fillButton}</ButtonText>
                          </Button>
                        )}
                      </CardButtons>
                    </Card>

                    {/* Anamnesis Card */}
                    {/*  <Card>
                    <CardHeader>
                      <CardTitle>{t.anamnesisTitle}</CardTitle>
                    </CardHeader>
                    <CardStatus>{anamnesisLastFilledDate}</CardStatus>
                    <CardButtons>
                      {isAnamnesisFilled ? (
                        <>
                          <Button
                            onPress={() =>
                              handleNavigate('anamnesisQuestion', {
                                viewOnly: true,
                              })
                            }
                            variant="secondary"
                          >
                            <ButtonText variant="secondary">
                              {t.viewButton}
                            </ButtonText>
                          </Button>
                          <Button
                            onPress={() => handleDelete('anamnesis')}
                            variant="danger"
                          >
                            <ButtonText variant="danger">
                              {t.deleteButton}
                            </ButtonText>
                          </Button>
                          <Button
                            onPress={() => handleNavigate('anamnesisQuestion')}
                          >
                            <ButtonText>{t.newButton}</ButtonText>
                          </Button>
                        </>
                      ) : (
                        <Button
                          onPress={() => handleNavigate('anamnesisQuestion')}
                        >
                          <ButtonText>{t.fillButton}</ButtonText>
                        </Button>
                      )}
                    </CardButtons>
                  </Card> */}
                  </Body>
                </ScrollView>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
