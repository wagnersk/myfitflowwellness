import React, { useCallback, useEffect, useState } from 'react'
import { Alert, BackHandler, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

import { useRoute, useFocusEffect } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/core'
import { setStatusBarStyle } from 'expo-status-bar'

import { BackCircleButton } from '@components/Buttons/BackCircleButton'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { CTAButton } from '@components/Buttons/CTAButton'

import { Image } from 'expo-image'

import {
  Container,
  BackButtonWrapper,
  BodyImageContainer,
  PhotoImageWrapper,
  BodyInfo,
  InfoDescriptionWrapper,
  TitleWrapper,
  LockIconWrapper,
  BodyBottomWrapper,
  BlurViewWrapper,
  SubTitle,
  WorkoutBoxInfoWrapper,
  Wrapper,
  TitleDivision,
  TitleWorkout,
  IconContainer,
  BlurIconViewWrapper,
  ContainerGradient,
  ActionButtonsWrapper,
  TextWrapper,
  UpdatedAtText,
  ButtonsWrapper,
  InfoBoxesWrapper,
  ActButton,
  TittleWrapper,
  SubTittleWrapper,
} from './styles'
import { useAuth } from '@hooks/auth'
import { IptBrUs } from '@hooks/selectOptionsDataFirebaseTypes'

import { Plan } from '@components/Plan'
import { EquipamentsInfo } from '@components/EquipamentsInfo'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { WorkoutMuscleComponent } from '@components/WorkoutMuscleComponent'

import { getIcon } from '@utils/getIcon'

import { IMarketPlaceWorkoutDetailNavigation } from '@src/@types/navigation'
import { getGenderIcon } from '@utils/getGenderIcon'
import { translateMuscleGroupInfo } from '@utils/translateMuscles'
import Arrow from '@assets/Arrow-counter-clockwise.svg'
import Export from '@assets/Export.svg'

export function MarketPlaceWorkoutDetail() {
  const {
    user,
    isWaitingApiResponse,
    myWorkout,
    updateUserWorkoutCache,
    cachedUserWorkoutsLog,
    getLastUpdatedAtUserWorkoutCache,
  } = useAuth()
  const selectedLanguage = user?.selectedLanguage
  const navigation = useNavigation()
  const route = useRoute()
  const dataParam = route.params as IMarketPlaceWorkoutDetailNavigation
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)

  const {
    loadMyWorkoutAndmyWorkoutDataArrayAndReturnExercises,
    deleteMyWorkoutAndmyWorkoutDataArray,
  } = useAuth()

  const cachedWorkoutId = myWorkout?.workoutId
  const selectedWorkoutId = dataParam.data.workoutId

  const workoutAlreadySelected = cachedWorkoutId === selectedWorkoutId

  const tittle = cachedWorkoutId
    ? workoutAlreadySelected
      ? selectedLanguage === 'pt-br'
        ? 'Cancelar treino'
        : 'Cancel workout'
      : selectedLanguage === 'pt-br'
        ? 'Cancelar outro treino antes'
        : 'Cancel other workout first'
    : selectedLanguage === 'pt-br'
      ? 'Escolher treino'
      : 'Choose workout'

  function handleGoBack() {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
    navigation.goBack()
  }

  async function handleChoose() {
    const response = await loadMyWorkoutAndmyWorkoutDataArrayAndReturnExercises(
      dataParam.data,
    )

    if (!response) return
    navigation.navigate('marketPlaceHome')
  }
  /* 
criar botao que SAlvar preferencia usando  o hook updateUserWorkoutCache

 e um botao de compartilhar que cria um QR code ( Faco dps)
  e de um de compartilhar ( faco dps)

em profile criar botao amigos
-> Aqui eu consigo buscar um amigo e enviar convite e aceitar convite

quando ele aceitar eu consigo pegar o treino dele atual


   

 
*/
  async function handleDeleteWorkout() {
    Alert.alert(
      user?.selectedLanguage === 'pt-br'
        ? 'Você realmente quer cancelar o treino?'
        : 'Do you really want to cancel the workout?',
      '',
      [
        {
          text: user?.selectedLanguage === 'pt-br' ? 'Não' : 'No',
          style: 'cancel',
        },
        {
          text: user?.selectedLanguage === 'pt-br' ? 'Sim' : 'Yes',
          onPress: async () => {
            await deleteMyWorkoutAndmyWorkoutDataArray()
            navigation.navigate('marketPlaceHome')
          },
        },
      ],
      { cancelable: false },
    )
  }

  function shareWorkout() {
    Alert.alert('Share ')
  }

  function syncronizePersonalizedWorkoutData() {
    if (!selectedWorkoutId) return
    const getWorkoutData = cachedUserWorkoutsLog?.workoutsLog.find(
      (v) => v.workoutId === selectedWorkoutId,
    )
    console.log(`getWorkoutData`)
    console.log(getWorkoutData)
    if (!getWorkoutData) return

    const lastUpdatedValue = cachedUserWorkoutsLog?.updatedAt

    if (!lastUpdatedValue) return
    updateUserWorkoutCache(selectedWorkoutId, getWorkoutData, lastUpdatedValue)
    setLastUpdated(lastUpdatedValue)
  }

  async function start() {
    if (!selectedWorkoutId) return
    const lastUpdatedValue =
      await getLastUpdatedAtUserWorkoutCache(selectedWorkoutId)
    if (!lastUpdatedValue) return
    setLastUpdated(lastUpdatedValue)
  }

  useEffect(() => {
    start()

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true
      },
    )

    return () => backHandler.remove()
  }, [selectedWorkoutId])

  function formatTimestampToDate(timestamp: number | null): string {
    if (!timestamp) return ''
    const date = new Date(timestamp)

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  return (
    <Container>
      <SafeAreaProvider style={{ width: `100%` }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <BodyImageContainer>
              <BodyImageBackground />
              <PhotoImageWrapper>
                {dataParam.data.workoutCardPhoto && (
                  <Image
                    source={{
                      uri: dataParam.data.workoutCardPhoto.photoFilePath,
                    }}
                    alt=""
                    contentFit="cover"
                    style={{
                      width: '100%',
                      height: 340,
                      borderRadius: 8,
                      backgroundColor: `gray`,
                    }}
                    cachePolicy={'memory-disk'}
                  />
                )}

                <LockIconWrapper>
                  <Plan size={48} level={dataParam.data.workoutPlanType} />
                </LockIconWrapper>

                {dataParam.enableSyncDataAndShare && (
                  <ActionButtonsWrapper
                    pointerEvents={
                      dataParam.enableSyncDataAndShare ? 'auto' : 'none'
                    }
                  >
                    <TextWrapper>
                      <TittleWrapper>
                        <UpdatedAtText>Sincronizado na núvem:</UpdatedAtText>
                      </TittleWrapper>

                      <SubTittleWrapper>
                        <UpdatedAtText>
                          {formatTimestampToDate(lastUpdated)}
                        </UpdatedAtText>
                      </SubTittleWrapper>
                    </TextWrapper>

                    <ButtonsWrapper>
                      <BlurIconViewWrapper
                        disabled={
                          lastUpdated === cachedUserWorkoutsLog?.updatedAt
                        }
                        intensity={70}
                        tint="light"
                      >
                        <ContainerGradient colors={['#000000', '#FFFFFF']}>
                          <ActButton
                            disabled={
                              lastUpdated === cachedUserWorkoutsLog?.updatedAt
                            }
                            onPress={syncronizePersonalizedWorkoutData}
                          >
                            <Arrow width={30} height={30} fill={'white'} />
                          </ActButton>
                        </ContainerGradient>
                      </BlurIconViewWrapper>
                      <BlurIconViewWrapper
                        disabled={false}
                        intensity={70}
                        tint="light"
                      >
                        <ContainerGradient colors={['#000000', '#FFFFFF']}>
                          <ActButton onPress={shareWorkout}>
                            <Export width={30} height={30} fill={'white'} />
                          </ActButton>
                        </ContainerGradient>
                      </BlurIconViewWrapper>
                    </ButtonsWrapper>
                  </ActionButtonsWrapper>
                )}
              </PhotoImageWrapper>

              <Wrapper>
                <TitleWrapper>
                  <TitleWorkout>
                    {dataParam.data.workoutName &&
                      selectedLanguage &&
                      dataParam.data.workoutName[selectedLanguage]}
                  </TitleWorkout>
                </TitleWrapper>

                <TitleWrapper>
                  <TitleDivision>
                    ( {dataParam.data.workoutDivision.division} )
                  </TitleDivision>
                </TitleWrapper>
              </Wrapper>

              <BodyInfo>
                {selectedLanguage && (
                  <WorkoutBoxInfoWrapper>
                    <WorkoutBoxInfo
                      size={36}
                      icon={getIcon('calendar-dots')}
                      description={`${dataParam.data.workoutPeriod.period_insensitive[selectedLanguage]}`}
                    />
                    <WorkoutBoxInfo
                      size={36}
                      icon={getIcon('check-circle')}
                      description={`${dataParam.data.workoutByWeek.sessionsByWeek_insensitive[selectedLanguage]}`}
                    />
                    <WorkoutBoxInfo
                      size={36}
                      icon={getIcon('clock')}
                      description={`${dataParam.data.workoutTime.timeBySession_insensitive[selectedLanguage]}`}
                    />
                  </WorkoutBoxInfoWrapper>
                )}
                {selectedLanguage && (
                  <WorkoutBoxInfoWrapper>
                    <WorkoutBoxInfo
                      size={36}
                      icon={getIcon('crosshair')}
                      description={dataParam.data.workoutGoal[selectedLanguage]}
                    />
                    <WorkoutBoxInfo
                      size={36}
                      icon={getIcon(
                        getGenderIcon(
                          dataParam.data.workoutGender[selectedLanguage],
                        ),
                      )}
                      description={`${dataParam.data.workoutGender[selectedLanguage]}`}
                    />
                    <WorkoutBoxInfo
                      size={36}
                      icon={getIcon('steps')}
                      description={
                        dataParam.data.workoutLevel[selectedLanguage]
                      }
                    />
                  </WorkoutBoxInfoWrapper>
                )}
                {selectedLanguage && (
                  <InfoDescriptionWrapper>
                    <SubTitle>
                      {dataParam.data.workoutDescription &&
                        dataParam.data.workoutDescription[selectedLanguage]}
                    </SubTitle>
                  </InfoDescriptionWrapper>
                )}

                <InfoBoxesWrapper>
                  <EquipamentsInfo
                    data={dataParam.data.workoutsUniquesFilters}
                    selectedLanguage={user?.selectedLanguage}
                  />
                  <WorkoutMuscleComponent
                    data={dataParam.data.workoutsUniquesMuscles}
                    selectedLanguage={user?.selectedLanguage}
                  />
                </InfoBoxesWrapper>
              </BodyInfo>
            </BodyImageContainer>
          </ScrollView>
          <BackButtonWrapper>
            <BackCircleButton onPress={handleGoBack} changeColor />
          </BackButtonWrapper>
          <BodyBottomWrapper>
            <BlurViewWrapper
              intensity={30}
              tint="light"
              style={{
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              <CTAButton
                enabled={!isWaitingApiResponse}
                loading={isWaitingApiResponse}
                workoutAlreadySelected={!!cachedWorkoutId}
                style={{
                  marginBottom: 52,
                  width: '100%',
                }}
                onPress={() => {
                  cachedWorkoutId ? handleDeleteWorkout() : handleChoose()
                }}
                /* bigSize={true} */
                changeColor
                title={tittle}
              />
            </BlurViewWrapper>
          </BodyBottomWrapper>
        </SafeAreaView>
      </SafeAreaProvider>
    </Container>
  )
}
