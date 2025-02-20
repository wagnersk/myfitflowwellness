import React, { useCallback, useEffect, useState } from 'react'
import {
  BackHandler,
  ActivityIndicator,
  Alert,
  View,
  Button,
  GestureResponderEvent,
} from 'react-native'
import { useTheme } from 'styled-components/native'

import { useAuth } from '@hooks/auth'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import { setStatusBarStyle } from 'expo-status-bar'

import { WorkoutBlueCardList } from '@components/Cards/WorkoutBlueCard/WorkoutBlueCardList'
import { HeaderImageBackground } from '@components/ImageBackgrounds/HeaderImageBackground'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { differenceInDays, startOfDay } from 'date-fns'
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
  FavIconCameraButton,
  CameraText,
  CameraBorder,
} from './styles'

import { LogoutButton } from '@components/Buttons/LogoutButton'
import { IMyWorkoutsData, IWorkoutInfo, IWorkoutsData } from '@hooks/authTypes'
import SmileySad from '@assets/SmileySad.svg'

export function UserHome() {
  const navigation = useNavigation()

  const {
    user,
    isLoadingUserStorageData,
    myWorkout,
    myWorkoutDataArray,
    loadWeightProgression,
    weightProgression,
    cachedUserWorkoutsLog,
    firebaseSignOut,
    loadPersonalTrainerClientContract,
    loadPersonalTrainerData,
    savePersonalTrainerData,
    premiumUserContract,
  } = useAuth()

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

  async function handleNextStep(data: IWorkoutsData, cardIndex: number) {
    if (!myWorkoutDataArray) return
    navigation.navigate('userWorkoutList', {
      workoutId: myWorkoutDataArray.data[0].id,
      data,
      workoutLength: myWorkoutDataArray.data[0].data.workoutsData.length,
      cardIndex,
    })
  }

  async function handleOpenCamera(event: GestureResponderEvent) {
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
      if (!user) return
      const { personalTrainerContractId, clientId } = user

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
    if (
      myWorkoutDataArray &&
      myWorkoutDataArray.data &&
      myWorkout &&
      myWorkout.data[0] &&
      user
    ) {
      const workoutData = myWorkoutDataArray.data.find(
        (v) => v.id === myWorkout.data[0].id,
      )
      if (workoutData) {
        setGetWorkoutArrayData(workoutData.data)
        console.log(`getWorkoutArrayData`, JSON.stringify(workoutData.data))
      }
    }
  }, [myWorkoutDataArray, myWorkout, user])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
      setStatusBarStyle('light')
    }, []),
  )

  const svgColor = theme.COLORS.BLUE_STROKE

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

          {!myWorkoutDataArray?.data[0].data && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                top: -20,
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
            </View>
          )}
          {/*         {console.log(`JSON.stringify(findWorkoutDataLog)`)}
          {console.log(JSON.stringify(findWorkoutDataLog))} */}
          {isLoadingUserStorageData ? (
            <ActivityIndicator color={theme.COLORS.BLUE_STROKE} />
          ) : (
            getWorkoutArrayData &&
            getWorkoutArrayData.workoutsData &&
            getWorkoutArrayData.workoutsData.length > 0 && (
              <WorkoutBlueCardList
                data={getWorkoutArrayData}
                handleNextStep={handleNextStep}
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
