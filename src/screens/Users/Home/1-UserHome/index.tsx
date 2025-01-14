import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, ActivityIndicator, Alert } from 'react-native'
import { useTheme } from 'styled-components'

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
} from './styles'

import { LogoutButton } from '@components/Buttons/LogoutButton'
import { IWorkoutsData, IUserWorkoutsLog } from '@hooks/authTypes'

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
  } = useAuth()
  console.log(`weightProgression`)

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
      workoutId: myWorkoutDataArray.workoutId,
      data,
      workoutLength: myWorkoutDataArray.workoutsData
        ? myWorkoutDataArray.workoutsData.length
        : 0,
      cardIndex,
    })
  }
  async function handleOpenCamera(event: GestureResponderEvent) {
    navigation.navigate('camera')
  }
  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair , irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sair',
          onPress: () => firebaseSignOut(),
        },
      ],
    )
  }

  function getGreetingMessage() {
    const ndate = new Date()

    const hours = ndate.getHours()

    const message =
      hours > 6 && hours < 12
        ? 'Bom dia'
        : hours > 12 && hours < 18
          ? 'Boa tarde'
          : 'Boa noite'

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

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
      setStatusBarStyle('light')
    }, []),
  )

  return (
    <Container>
      <HeaderImageBackground>
        <BioInfoWrapper>
          <BioInfo>
            <BioInfoGreetings>{getGreetingMessage()},</BioInfoGreetings>
            <BioInfoName>{firstName && firstName[0]}</BioInfoName>
          </BioInfo>
          <LogoutButton onPress={handleSignOut} />
        </BioInfoWrapper>
      </HeaderImageBackground>

      <BodyImageContainer>
        <BodyImageBackground />
        <BodyImageBackgroundContainerSpaceBetween>
          <BodyTopWrapper>
            {myWorkout?.workoutPeriod.periodNumber && (
              <WarningWrapper>
                <Warning>Dia </Warning>
                <WarningGreetings>{daysPassed} </WarningGreetings>
                <Warning>de </Warning>
                <WarningGreetings>
                  {myWorkout?.workoutPeriod.periodNumber * 7}
                </WarningGreetings>
              </WarningWrapper>
            )}
          </BodyTopWrapper>
          {/*         {console.log(`JSON.stringify(myWorkoutDataArray)`)}
          {console.log(JSON.stringify(myWorkoutDataArray))} */}
          {isLoadingUserStorageData ? (
            <ActivityIndicator color={theme.COLORS.BLUE_STROKE} />
          ) : (
            myWorkoutDataArray &&
            myWorkoutDataArray.workoutsData.length > 0 && (
              <WorkoutBlueCardList
                data={myWorkoutDataArray}
                handleNextStep={handleNextStep}
              />
            )
          )}
          <FavoriteIconContainer onPressOut={handleOpenCamera}>
            <Camera width={42} height={42} fill={'blue'} />
          </FavoriteIconContainer>
        </BodyImageBackgroundContainerSpaceBetween>
      </BodyImageContainer>
    </Container>
  )
}
