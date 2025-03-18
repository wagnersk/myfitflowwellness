import React, { useCallback, useState } from 'react'
import {
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

import { SettingsButton } from '@components/Buttons/SettingsButton'
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
  EditProfileNameText,
  EditProfileButtonWraper,
} from './styles'
import { getTranslatedFiltersOfWorkout } from '@utils/getTranslatedFiltersOfWorkout'
import {
  IEquipamentsFilters,
  IUserFormProps,
  SignInProps,
} from '@hooks/authTypes'
import { diffInAge } from '@utils/diffInAge'
import { WhiteButton } from '@components/Buttons/WhiteButton'

export interface IptBrUs {
  'pt-br': string
  us: string
}

export function UserProfile() {
  const {
    user,
    updateUserSelectedLanguage,
    updateLocalCacheAnonymousUserSelectedLanguage,
    isWaitingApiResponse,
    firebaseSignOut,
  } = useAuth()
  const navigation = useNavigation()
  async function handleDeleteAccountTimer() {
    console.log(`mudar para deletar conta em 7 dias e abrir contagem`)
    if (!user) return
    Alert.alert(
      user.selectedLanguage === 'pt-br' ? 'Tem certeza?' : 'Are you sure?',
      user.selectedLanguage === 'pt-br'
        ? 'Se você sair, irá precisar de internet para conectar-se novamente.'
        : 'If you leave, you will need internet to connect again.',
      [
        {
          text: user.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
          onPress: () => {},
        },
        {
          text: user.selectedLanguage === 'pt-br' ? 'Sair' : 'Sign Out',
          onPress: () => firebaseSignOut(),
        },
      ],
    )
  }

  const [selectedLanguage, setSelectedLanguage] = useState(
    user?.selectedLanguage || 'us',
  )

  function handleEditProfileNextStep() {
    navigation.navigate('userFormEditProfile')
  }
  function handleMyPlanNextStep() {
    navigation.navigate('userPlan')
  }
  function handleMyWorkoutsNextStep() {
    navigation.navigate('userWorkouts')
  }
  function handleMyPhotosNextStep() {
    navigation.navigate('userPhotoTimeline')
  }
  function handleMyFriendListNextStep() {
    navigation.navigate('userFriendList')
  }

  function handleSuporteNextStep() {
    navigation.navigate('userSupport')
  }
  const userAge = diffInAge(user?.birthdate)
  const experienceTime = diffInAge(user?.whenStartedAtGym)

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

  let equipmentFilters: IEquipamentsFilters | undefined

  if (
    user &&
    user.freeData &&
    user.freeData.data &&
    user.freeData.data.barSelectData &&
    user.pulleyData &&
    user.pulleyData.data &&
    user.machineData &&
    user.machineData.data
  ) {
    equipmentFilters = {
      bar: user.freeData.data.barSelectData.map((item) => item.bar_insensitive),
      bench: user.freeData.data.benchSelectData.map(
        (item) => item.bench_insensitive,
      ),
      machine: user.machineData.data.machineSelectData.map(
        (item) => item.machine_insensitive,
      ),
      other: user.freeData.data.otherSelectData.map(
        (item) => item.other_insensitive,
      ),
      pulley: user.pulleyData.data.pulleySelectData.map(
        (item) => item.pulley_insensitive,
      ),
      pulleyHandles: user.pulleyData.data.pulleyHandlerSelectData.map(
        (item) => item.pulleyHandler_insensitive,
      ),
      weight: user.freeData.data.weightSelectData.map(
        (item) => item.weight_insensitive,
      ),
    }
  }
  const auxDataUnicFiltersText =
    user && selectedLanguage
      ? getTranslatedFiltersOfWorkout(equipmentFilters, selectedLanguage)
      : []

  const formattedMuscleFocus =
    user &&
    selectedLanguage &&
    user.muscleFocus &&
    user.muscleFocus.muscleSelectedData &&
    user.muscleFocus.muscleSelectedData.reduce(
      (acc: string, curr: IptBrUs, index: number) => {
        const muscleUs = curr?.[selectedLanguage] // Acessando diretamente o SELECTEDLANGUAGE
        return muscleUs ? acc + (index > 0 ? ', ' : '') + muscleUs : acc
      },
      '',
    )

  const formattedGoal =
    user &&
    selectedLanguage &&
    user.goal &&
    user.goal.goalSelectedData &&
    user.goal.goalSelectedData[selectedLanguage]
      ? user.goal.goalSelectedData[selectedLanguage].charAt(0).toUpperCase() +
        user.goal.goalSelectedData[selectedLanguage].slice(1)
      : ''

  const formattedFrequencyByWeek =
    user &&
    selectedLanguage &&
    user.sessionsByWeek &&
    user.sessionsByWeek.sessionsByWeekSelectedData &&
    user.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      ? user.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      : ''

  const formattedTimeBySession =
    user &&
    selectedLanguage &&
    user.timeBySession &&
    user.timeBySession.timeBySessionSelectedData &&
    user.timeBySession.timeBySessionSelectedData[selectedLanguage] &&
    user.timeBySession.timeBySessionSelectedData[selectedLanguage]
      ? user.timeBySession.timeBySessionSelectedData[selectedLanguage]
      : ''

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
                    defaultPhotoBase64={user?.photoBase64}
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
                        ? 'Meus Amigos'
                        : 'My Friends'
                    }
                    onPress={handleMyFriendListNextStep}
                    bordertype="up"
                    iconStyle="friendlist"
                  />

                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Meus Treinos'
                        : 'My Workouts'
                    }
                    onPress={handleMyWorkoutsNextStep}
                    bordertype="none"
                    iconStyle="barbell"
                  />
                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Minhas Fotos'
                        : 'My Photos'
                    }
                    onPress={handleMyPhotosNextStep}
                    bordertype="down"
                    iconStyle="camera"
                  />
                </Body>
                <Body>
                  <BodyText>
                    {selectedLanguage === 'pt-br' ? 'Pagamento' : 'Payment'}
                  </BodyText>

                  <WhiteButton
                    tittle={
                      user?.selectedLanguage === 'pt-br'
                        ? 'Meu Plano'
                        : 'My Plan'
                    }
                    onPress={handleMyPlanNextStep}
                    bordertype="up"
                    iconStyle="plan"
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
                  <BodyText>
                    {selectedLanguage === 'pt-br' ? 'Conta' : 'Preferences'}
                  </BodyText>

                  {/* so por botao logout facil */}

                  <WhiteButton
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

                {/* nao mostar pois vou transfromar em botoes */}
                {user?.anonymousUser && (
                  <ProfileInfoWrapper>
                    <Title>
                      {selectedLanguage === 'pt-br' ? 'Objetivo' : 'Goal'}:
                    </Title>
                    <ProfileInfoText>
                      {formattedGoal}
                      {formattedGoal && ', '}
                      {formattedMuscleFocus &&
                        (selectedLanguage === 'pt-br'
                          ? 'foco em: '
                          : 'focus on: ')}
                      {formattedMuscleFocus}
                    </ProfileInfoText>

                    {user && user.personalTrainerContractId && (
                      <>
                        <ProfileInfoDivisor />
                        <Title>
                          {selectedLanguage === 'pt-br'
                            ? 'Tempo de treino'
                            : 'Training time'}
                          :{' '}
                        </Title>
                        <ProfileInfoText>
                          {experienceTime}{' '}
                          {experienceTime &&
                            (selectedLanguage === 'pt-br' ? 'anos' : 'years')}
                        </ProfileInfoText>
                        <ProfileInfoDivisor />
                      </>
                    )}

                    {user && user.personalTrainerContractId && (
                      <>
                        <Title>
                          {selectedLanguage === 'pt-br' ? 'Academia' : 'Gym'}:
                        </Title>
                        <ProfileInfoText>{user && user.gym}</ProfileInfoText>
                      </>
                    )}

                    <ProfileInfoDivisor />
                    <Title>
                      {selectedLanguage === 'pt-br' ? 'Por semana' : 'Per week'}
                      :{' '}
                    </Title>
                    <ProfileInfoText>
                      {formattedFrequencyByWeek || ''}
                      {formattedFrequencyByWeek &&
                        (selectedLanguage === 'pt-br' ? ' de ' : ' of ')}
                      {formattedTimeBySession || ''}
                      {formattedTimeBySession &&
                        (selectedLanguage === 'pt-br' ? ' cada' : ' each')}
                    </ProfileInfoText>
                    <ProfileInfoDivisor />
                    {user && user.personalTrainerContractId && (
                      <>
                        <Title>
                          {selectedLanguage === 'pt-br'
                            ? 'Anabolizante'
                            : 'Anabolic'}
                          :
                        </Title>
                        <ProfileInfoText>
                          {user && user.anabol
                            ? user.anabol
                            : selectedLanguage === 'pt-br'
                              ? 'Nenhum'
                              : 'None'}
                        </ProfileInfoText>
                        <ProfileInfoDivisor />
                        <Title>
                          {selectedLanguage === 'pt-br'
                            ? 'Restrições'
                            : 'Restrictions'}
                          :
                        </Title>
                        <ProfileInfoText>
                          {user && user.restrictions
                            ? user.restrictions
                            : selectedLanguage === 'pt-br'
                              ? 'Nenhuma'
                              : 'None'}
                        </ProfileInfoText>
                        <ProfileInfoDivisor />
                        <Title>
                          {selectedLanguage === 'pt-br'
                            ? 'Equipamentos disponíveis'
                            : 'Available equipment'}
                          :
                        </Title>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                          }}
                        >
                          {auxDataUnicFiltersText.map((val, i) => {
                            return (
                              <LabelWrapper key={i}>
                                {val.data.length > 0 &&
                                  val.data.map((_val, _i) => {
                                    if (_val.value) {
                                      return (
                                        <LabelWrapper key={_i}>
                                          <Label>
                                            {_val.key}: {_val.value}
                                          </Label>
                                        </LabelWrapper>
                                      )
                                    } else {
                                      return null
                                    }
                                  })}
                              </LabelWrapper>
                            )
                          })}
                        </View>
                      </>
                    )}
                  </ProfileInfoWrapper>
                )}
              </BodyWrapper>
            </ScrollView>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
