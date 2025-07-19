import React, { useCallback, useEffect, useState } from 'react'
import {
  BackHandler,
  ActivityIndicator,
  Alert,
  View,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from 'styled-components/native'

import { useAuth } from '@hooks/auth'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import { setStatusBarStyle } from 'expo-status-bar'

import { WorkoutBlueCardList } from '@components/Cards/WorkoutBlueCard/WorkoutBlueCardList'
import { HeaderImageBackground } from '@components/ImageBackgrounds/HeaderImageBackground'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { differenceInDays } from 'date-fns'
import Camera from '@assets/Camera.svg'
import {
  Container,
  BioInfoWrapper,
  BioInfoName,
  BioInfo,
  BioInfoGreetings,
  BodyImageContainer,
  BodyTopWrapper,
  Warning,
  WarningGreetings,
  WarningWrapper,
  BodyImageBackgroundContainerSpaceBetween,
  FavoriteIconContainer,
  LinearGradientButton,
  NoWorkoutFoundWrapper,
  CameraBorder,
} from './styles'

import { LogoutButton } from '@components/Buttons/LogoutButton'
import { IWorkoutInfo, IWorkoutsData } from '@hooks/authTypes'
import SmileySad from '@assets/SmileySad.svg'
import { fakeMyWorkout } from './mock/fakeMyWorkout'
import { fakeMyWorkoutDataArray } from './mock/fakeMyWorkoutDataArray'
import ParQ from '@screens/Users/Profile/1.1-Questionnaires/screens/ParQ'

export function UserHome() {
  const navigation = useNavigation()

  const {
    user,
    userPersonalTrainerContract,
    isLoadingUserStorageData,
    myWorkout,
    myWorkoutDataArray,
    loadWeightProgression,
    weightProgression,
    firebaseSignOut,
    loadPersonalTrainerClientContract,
    loadPersonalTrainerData,
    savePersonalTrainerData,

    getLastUpdatedAtUserWorkoutCache,
    updateUserFirebaseWorkoutCache,
    saveCachedUserWorkoutsLog,
    cachedUserWorkoutsLog,
    fetchworkoutDataCache,
    userParQStatus,
  } = useAuth()

  // console.log(`myWorkout`, JSON.stringify(myWorkout)) // hardcodded usuario anomimo
  // console.log(`myWorkoutDataArray`, JSON.stringify(myWorkoutDataArray)) // hardcodded

  const [getWorkoutArrayData, setGetWorkoutArrayData] =
    useState<IWorkoutInfo | null>(null)

  const findWeightProgression = weightProgression?.find(
    (v) => v.userId === user?.id,
  )

  let daysPassed = 1

  if (findWeightProgression && findWeightProgression.createdAt) {
    const startDate = new Date(findWeightProgression.createdAt)
    const currentDate = new Date()
    daysPassed = differenceInDays(currentDate, startDate)
  }

  const theme = useTheme()
  const firstName = user?.name?.split(' ')

  async function handleNextStep(
    workoutData: IWorkoutsData,
    currentCardIndex: number,
  ) {
    if (!myWorkoutDataArray) return
    if (!myWorkout) return

    const activeWorkout = myWorkoutDataArray.data.find(
      (workout) => workout.id === myWorkout.activeData[0].id,
    )

    if (!activeWorkout) return
    // myWorkoutDataArray
    navigation.navigate('userWorkoutList', {
      activeWorkoutId: activeWorkout.id,
      activeWorkoutCreatedAt: activeWorkout.createdAt,
      activeWorkoutDataLength: activeWorkout.data.workoutsData.length,
      data: workoutData,
      cardIndex: currentCardIndex,
    })
  }

  async function handleNextStepAnnomimousUser(
    data: IWorkoutsData,
    cardIndex: number,
  ) {
    if (!fakeMyWorkoutDataArray) return
    if (!fakeMyWorkout) return

    const findFakeMyWorkoutDataArray = fakeMyWorkoutDataArray.data.find(
      (v) => v.id === fakeMyWorkout.activeData[0].id,
    )
    if (!findFakeMyWorkoutDataArray) return

    navigation.navigate('userWorkoutList', {
      activeWorkoutId: findFakeMyWorkoutDataArray.id,
      activeWorkoutCreatedAt: findFakeMyWorkoutDataArray.createdAt,
      activeWorkoutDataLength:
        findFakeMyWorkoutDataArray.data.workoutsData.length,
      data,
      cardIndex,
    })
  }

  async function handleOpenAllCategories() {
    navigation.navigate('userAllCategories')
  }

  async function handleOpenCamera() {
    navigation.navigate('camera')
  }

  async function handleSignOut() {
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

  function getGreetingMessage() {
    if (!user) return
    const ndate = new Date()

    const hours = ndate.getHours()

    const message =
      hours >= 6 && hours < 12
        ? user.selectedLanguage === 'pt-br'
          ? 'Bom dia'
          : 'Good morning'
        : hours >= 12 && hours < 18
          ? user.selectedLanguage === 'pt-br'
            ? 'Boa tarde'
            : 'Good afternoon'
          : user.selectedLanguage === 'pt-br'
            ? 'Boa noite'
            : 'Good evening'

    return message
  }

  useEffect(() => {
    startContract()
    fetchWeightProgressionData()

    async function startContract() {
      if (!userPersonalTrainerContract) return
      const { personalTrainerContractId, clientId } =
        userPersonalTrainerContract

      if (!personalTrainerContractId || !clientId) return

      const _contract = await loadPersonalTrainerClientContract(
        personalTrainerContractId,
        clientId,
      ).catch((err) => {
        console.log(err)
      })

      if (!_contract) return

      if (_contract.submissionApproved) {
        await startPersonalTrainerData()
      }
    }

    async function fetchWeightProgressionData() {
      if (!user) return

      if (!weightProgression) {
        await loadWeightProgression(user.id).catch((err) => {
          console.log(err)
        })
      }
    }

    async function startPersonalTrainerData() {
      await loadPersonalTrainerData()
        .catch((err) => {
          console.log(err)
        })
        .then(async (_personalData) => {
          if (!_personalData) return

          await savePersonalTrainerData(_personalData)
        })
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  useEffect(() => {
    if (user && user.anonymousUser) {
      renderAnonymousUserFakeData()
    }
    if (user && !user.anonymousUser) {
      renderUserData()
    }
    function renderAnonymousUserFakeData() {
      if (
        user &&
        user.anonymousUser &&
        fakeMyWorkout &&
        fakeMyWorkoutDataArray &&
        fakeMyWorkoutDataArray.data &&
        fakeMyWorkout.data &&
        fakeMyWorkout.activeData &&
        fakeMyWorkout.data[0] &&
        fakeMyWorkout.activeData[0]
      ) {
        const fakeWorkoutData = fakeMyWorkoutDataArray.data.find(
          (v) => v.id === fakeMyWorkout.activeData[0].id,
        )
        if (fakeWorkoutData) {
          setGetWorkoutArrayData(fakeWorkoutData.data)
        }
      }
    }

    function renderUserData() {
      if (
        user &&
        !user.anonymousUser &&
        myWorkout &&
        myWorkoutDataArray &&
        myWorkoutDataArray.data &&
        myWorkout.data &&
        myWorkout.activeData &&
        myWorkout.data[0] &&
        myWorkout.activeData[0]
      ) {
        const workoutData = myWorkoutDataArray.data.find(
          (v) => v.id === myWorkout.activeData[0].id,
        )

        if (workoutData) {
          setGetWorkoutArrayData(workoutData.data)
        }
      }
    }
  }, [myWorkoutDataArray, myWorkout, user])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({
        tabBarStyle: { display: userParQStatus?.data ? 'flex' : 'none' },
      })
      setStatusBarStyle(userParQStatus?.data ? 'light' : 'dark')
    }, [userParQStatus?.data]),
  )

  const svgColor = theme.COLORS.BLUE_STROKE

  useEffect(() => {
    start()

    async function start() {
      const serverLastupdated = await getLastUpdatedAtUserWorkoutCache()
      if (!cachedUserWorkoutsLog) {
        const updatedCache = await fetchworkoutDataCache() // busca noivo
        if (updatedCache) {
          // TODO criar fetch
          console.log(`updated do servidor ta mais atual asd`, updatedCache)
          // esse ta funcionando

          updatedCache.updatedAt = serverLastupdated
          saveCachedUserWorkoutsLog(updatedCache)
          console.log(`asd`, cachedUserWorkoutsLog)

          // salvar no cache
        }
        return
      }

      if (serverLastupdated === null) return

      // BUSCA DO SERVIDOR
      if (serverLastupdated > cachedUserWorkoutsLog.updatedAt) {
        const updatedCache = await fetchworkoutDataCache() // busca noivo
        if (updatedCache) {
          // TODO criar fetch
          console.log(`updated do servidor ta mais atual asd`, updatedCache)
          // esse ta funcionando
          updatedCache.updatedAt = serverLastupdated
          saveCachedUserWorkoutsLog(updatedCache)
          // salvar no cache
        }
      }
      // ENVIA PRO SERVIDOR
      if (cachedUserWorkoutsLog.updatedAt > serverLastupdated) {
        updateUserFirebaseWorkoutCache(cachedUserWorkoutsLog)
      }
    }
  }, [cachedUserWorkoutsLog])

  if (!userParQStatus?.data) {
    return <ParQ />
  }

  return (
    <Container>
      <HeaderImageBackground>
        <BioInfoWrapper>
          <BioInfo>
            <BioInfoGreetings>{getGreetingMessage()},</BioInfoGreetings>
            {firstName && <BioInfoName>{firstName[0]}</BioInfoName>}
            {user?.anonymousUser && (
              <BioInfoName>
                {user?.selectedLanguage === 'pt-br' ? 'Convidado' : 'Guest'}
              </BioInfoName>
            )}
          </BioInfo>

          <LogoutButton style={{ paddingTop: 32 }} onPress={handleSignOut} />
        </BioInfoWrapper>
      </HeaderImageBackground>
      <BodyImageContainer>
        <BodyImageBackground />
        <BodyImageBackgroundContainerSpaceBetween>
          <BodyTopWrapper>
            {myWorkout &&
              myWorkout.data &&
              myWorkout.data[0] &&
              myWorkout.data[0].data?.workoutPeriod.periodNumber && (
                <WarningWrapper>
                  <Warning>
                    {user?.selectedLanguage === 'pt-br' ? 'Dia' : 'Day'}{' '}
                  </Warning>
                  <WarningGreetings>{daysPassed} </WarningGreetings>
                  <Warning>
                    {user?.selectedLanguage === 'pt-br' ? 'de' : 'of'}{' '}
                  </Warning>
                  <WarningGreetings>
                    {myWorkout?.data[0].data?.workoutPeriod.periodNumber * 7}
                  </WarningGreetings>
                </WarningWrapper>
              )}
          </BodyTopWrapper>

          {user && !user.anonymousUser && !myWorkoutDataArray && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                top: -20,
              }}
            >
              <TouchableOpacity
                onPress={handleOpenAllCategories}
                style={{
                  padding: 40,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: theme.COLORS.BLUE_STROKE,
                  borderStyle: 'dashed', // Define a borda como tracejada
                }}
              >
                <SmileySad width={180} height={180} fill={svgColor} />

                <NoWorkoutFoundWrapper>
                  <Warning>
                    {user?.selectedLanguage === 'pt-br'
                      ? 'Ops! Nenhum treino encontrado.'
                      : 'Oops! No workout found.'}
                  </Warning>
                  <WarningGreetings>
                    {user?.selectedLanguage === 'pt-br'
                      ? 'Que tal escolher um treino?'
                      : 'How about choosing a workout?'}
                  </WarningGreetings>
                </NoWorkoutFoundWrapper>
              </TouchableOpacity>
            </View>
          )}
          {/*         {console.log(`JSON.stringify(findWorkoutDataLog)`)}
          {console.log(JSON.stringify(findWorkoutDataLog))} */}
          {isLoadingUserStorageData ? (
            <ActivityIndicator color={theme.COLORS.BLUE_STROKE} />
          ) : (
            user &&
            getWorkoutArrayData &&
            getWorkoutArrayData.workoutsData &&
            getWorkoutArrayData.workoutsData.length > 0 && (
              <WorkoutBlueCardList
                data={getWorkoutArrayData}
                handleNextStep={(data: IWorkoutsData, cardIndex: number) => {
                  user?.anonymousUser
                    ? handleNextStepAnnomimousUser(data, cardIndex)
                    : handleNextStep(data, cardIndex)
                }}
              />
            )
          )}
          <FavoriteIconContainer onPressOut={handleOpenCamera}>
            <LinearGradientButton colors={['#4c669f', '#3b5998', '#192f6a']}>
              <CameraBorder>
                <Camera width={32} height={32} fill={'white'} />
              </CameraBorder>
            </LinearGradientButton>
          </FavoriteIconContainer>
        </BodyImageBackgroundContainerSpaceBetween>
      </BodyImageContainer>
    </Container>
  )
}
