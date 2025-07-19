import React, { useCallback, useState, useEffect } from 'react'
import { Alert, ImageBackground, ScrollView, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

import { Photo } from '@components/Photo'

import backgroundImg from '../../../../../assets/back.png'
import { useAuth } from '@hooks/auth'
import PencilLine from '@assets/Pencil-line.svg'
import {
  Container,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ProfileWrapper,
  UserNameWrapper,
  UserName,
  ProfileInfoWrapper,
  Title,
  ProfileInfoText,
  ProfileInfoDivisor,
  PhotoBorderWrapper,
  LabelWrapper,
  Label,
  ToggleButton,
  ToggleButtonText,
  BodyText,
  BodyWrapper,
  Body,
  ToggleButtonWrapper,
  UserEmail,
  UserNameAndEmailWrapper,
  EditProfileButton,
  EditProfileButtonWraper,
} from './styles'
import { diffInAge } from '@utils/diffInAge'
import { WhiteButton } from '@components/Buttons/WhiteButton'

export function UserProfile() {
  const {
    user,
    userGymInfo,
    userEquipaments,
    userParQStatus,
    updateUserSelectedLanguage,
    updateLocalCacheAnonymousUserSelectedLanguage,
    loadAndSaveUserEquipaments,
    loadAndSaveUserGymInfo,
    loadAndSaveUserParQ,
  } = useAuth()
  /* saveUserGymInfo */
  const navigation = useNavigation()

  const [selectedLanguage, setSelectedLanguage] = useState(
    user?.selectedLanguage || 'us',
  )
  async function handleDeleteAccountTimer() {
    console.log(`Configurar para deletar conta em 7 dias e abrir contagem`)
    if (!user) return
    Alert.alert(
      user.selectedLanguage === 'pt-br' ? 'Tem certeza?' : 'Are you sure?',
      user.selectedLanguage === 'pt-br'
        ? 'Sua conta será marcada para exclusão e será deletada permanentemente em 7 dias. Você pode cancelar a exclusão fazendo login novamente antes do prazo.'
        : 'Your account will be scheduled for deletion and permanently deleted in 7 days. You can cancel the deletion by logging in again before the deadline.',
      [
        {
          text: user.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: user.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
          onPress: () => {
            console.log('Conta marcada para exclusão em 7 dias')
            // Aqui você pode adicionar a lógica para marcar a conta para exclusão
          },
        },
      ],
    )
  }
  function handleParQ() {
    navigation.navigate('questionnaires')
  }
  function handleAnamnese() {
    navigation.navigate('anamnese')
  }

  function handleEditProfileNextStep() {
    navigation.navigate('userFormEditProfile')
  }
  function handleMyPlanNextStep() {
    navigation.navigate('userPlan')
  }
  function handleMyWorkoutsNextStep() {
    navigation.navigate('userWorkouts')
  }
  function handleSuporteNextStep() {
    navigation.navigate('userSupport')
  }

  function handlePersonalTrainerNextStep() {
    navigation.navigate('userPersonalTrainer')
  }
  function handleChallengesNextStep() {
    navigation.navigate('userChallenges')
  }
  function handleMyPhotosNextStep() {
    navigation.navigate('userPhotoTimeline')
  }
  function handleMyFriendListNextStep() {
    navigation.navigate('userFriendList')
  }
  function handlePreferencesStep() {
    navigation.navigate('userPrefferences')
  }

  const userAge = diffInAge(user?.birthdate)
  const experienceTime = diffInAge(userGymInfo?.whenStartedAtGym)

  async function handleLanguageChange(language: 'pt-br' | 'us') {
    setSelectedLanguage(language)

    if (user?.anonymousUser) {
      await updateLocalCacheAnonymousUserSelectedLanguage(language)
    }
    if (!user?.anonymousUser) {
      await updateUserSelectedLanguage(language)
    }
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
      setStatusBarStyle('dark')
    }, []),
  )
  useEffect(() => {
    async function startPreferencesOptions() {
      if (!userGymInfo) {
        await loadAndSaveUserGymInfo()
        console.log(`atualizando userGymInfo`)
      }
      if (!userEquipaments) {
        await loadAndSaveUserEquipaments()
        console.log(`atualizando userEquipaments`)
      }
      if (!userParQStatus) {
        if (!user?.id) return
        await loadAndSaveUserParQ(user.id)
        console.log(`atualizando userParQ`)
      }
    }
    // startPreferencesOptions()
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
            <SettingsWrapper>
              {!user?.anonymousUser && (
                <ToggleButtonWrapper>
                  <ToggleButton
                    onPress={() =>
                      handleLanguageChange(
                        selectedLanguage === 'pt-br' ? 'us' : 'pt-br',
                      )
                    }
                  >
                    <ToggleButtonText>
                      {selectedLanguage === 'pt-br' ? '🇧🇷' : '🇺🇸'}
                    </ToggleButtonText>
                  </ToggleButton>
                </ToggleButtonWrapper>
              )}
            </SettingsWrapper>

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                width: '100%',
              }}
              showsVerticalScrollIndicator={false}
            >
              <ProfileWrapper>
                <PhotoBorderWrapper>
                  <Photo
                    photo={user && user.photo}
                    defaultText={
                      selectedLanguage === 'pt-br' ? `Não há foto` : `No Photo`
                    }
                  />
                  <EditProfileButtonWraper>
                    <EditProfileButton onPress={handleEditProfileNextStep}>
                      <PencilLine fill="blue" width={36} height={36} />
                    </EditProfileButton>
                  </EditProfileButtonWraper>
                </PhotoBorderWrapper>

                <UserNameWrapper>
                  {user?.anonymousUser ? (
                    <UserName>
                      {selectedLanguage === 'pt-br' ? `Convidado` : `Guest`}
                    </UserName>
                  ) : (
                    <UserNameAndEmailWrapper>
                      <UserName>
                        {user?.name}, {userAge}
                      </UserName>
                      <UserEmail>{user?.email}</UserEmail>
                    </UserNameAndEmailWrapper>
                  )}
                </UserNameWrapper>
              </ProfileWrapper>
              <BodyWrapper>
                <Body>
                  <BodyText>
                    {selectedLanguage === 'pt-br'
                      ? 'Seja bem-vindo ao seu perfil'
                      : 'Welcome to your profile'}
                  </BodyText>
                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Meus Treinos'
                        : 'My Workouts'
                    }
                    onPress={handleMyWorkoutsNextStep}
                    bordertype="up"
                    iconStyle="barbell"
                  />
                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Meu Plano'
                        : 'My Plan'
                    }
                    onPress={handleMyPlanNextStep}
                    bordertype="none"
                    iconStyle="plan"
                  />
                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Questionário de Saúde'
                        : 'Health Questionnaire'
                    }
                    onPress={handleParQ}
                    bordertype="none"
                    iconStyle="anamnese"
                  />
                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br' ? 'Suporte' : 'Support'
                    }
                    onPress={handleSuporteNextStep}
                    bordertype="down"
                    iconStyle="support"
                  />
                </Body>
                <Body>
                  {/*    <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Anamnese'
                        : 'Anamnesis'
                    }
                    onPress={handleAnamnese}
                    bordertype="none"
                    iconStyle="anamnese"
                  /> */}
                  {/*     <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Preferencias'
                        : 'Preferences'
                    }
                    onPress={handlePreferencesStep}
                    bordertype="down"
                    iconStyle="settings"
                  /> */}
                </Body>
                {/* 
                  <WhiteButton
                    betaMode
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Meus Desafios'
                        : 'My Challenges'
                    }
                    onPress={handleChallengesNextStep}
                    bordertype="none"
                    iconStyle="trophy"
                  /> 
                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Meus Amigos'
                        : 'My Friends'
                    }
                    onPress={handleMyFriendListNextStep}
                    bordertype="none"
                    iconStyle="friendlist"
                  />

                  <WhiteButton
                    betaMode
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Minhas Fotos'
                        : 'My Photos'
                    }
                    onPress={handleMyPhotosNextStep}
                    bordertype="down"
                    iconStyle="camera"
                  />
                  */}
                {/*        <Body>   <WhiteButton
                    betaMode
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Preferencias'
                        : 'Preferences'
                    }
                    onPress={handlePreferencesStep}
                    bordertype="up"
                    iconStyle="settings"
                  /> */}
                {/*  'Informações Pessoais' = GymInfo 
                  testar se ta tudo funfando
                  inclusive form do aluno
                  criar conceito de add foto
                  renderizar isso quando cahama o amigo
                  
                  por foto padrao
                  por activit indicator no loading dos alunos
                  fazer build 
                  
                  e seguranca das fotos */}
                {/*      <WhiteButton
                    betaMode
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Personal Trainer'
                        : 'Personal Trainer'
                    }
                    onPress={handlePersonalTrainerNextStep}
                    bordertype="down"
                    iconStyle="boxing-glove"
                  />    </Body> */}
                <Body>
                  <BodyText>
                    {selectedLanguage === 'pt-br' ? 'Conta' : 'Preferences'}
                  </BodyText>

                  {/* so por botao logout facil */}

                  <WhiteButton
                    betaMode
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Deletar conta'
                        : 'Delete Account'
                    }
                    onPress={handleDeleteAccountTimer}
                    bordertype="up-down"
                    iconStyle="trash"
                  />
                </Body>
              </BodyWrapper>
            </ScrollView>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
