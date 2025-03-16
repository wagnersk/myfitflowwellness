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

import { Plan } from '@components/Plan'
import { EquipamentsInfo } from '@components/EquipamentsInfo'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { WorkoutMuscleComponent } from '@components/WorkoutMuscleComponent'

import { getIcon } from '@utils/getIcon'

import { IMarketPlaceWorkoutDetailNavigation } from '@src/@types/navigation'
import { getGenderIcon } from '@utils/getGenderIcon'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'

export function MarketPlaceWorkoutDetail() {
  const {
    user,
    isWaitingApiResponse,
    myWorkout,
    loadMyWorkoutAndmyWorkoutDataArrayAndReturnExercises,
    deleteMyWorkoutAndmyWorkoutDataArray,
  } = useAuth()
  const selectedLanguage = user?.selectedLanguage
  const navigation = useNavigation()
  const route = useRoute()
  const dataParam = route.params as IMarketPlaceWorkoutDetailNavigation

  const selectedWorkoutId = dataParam.data.workoutId

  let cachedWorkout: IMyfitflowWorkoutInUseData | null = null
  let workoutAlreadySelected: boolean = false

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  console.log(`=>`, JSON.stringify(myWorkout))

  if (myWorkout && myWorkout.data) {
    const fcachedWorkout = myWorkout.data.find(
      (v) => v.id === selectedWorkoutId,
    )

    if (fcachedWorkout) {
      cachedWorkout = fcachedWorkout
    }

    workoutAlreadySelected = !!cachedWorkout
  }

  const tittle = cachedWorkout
    ? workoutAlreadySelected
      ? selectedLanguage === 'pt-br'
        ? 'Cancelar treino'
        : 'Cancel workout'
      : selectedLanguage === 'pt-br'
        ? 'Cancelar outro treino antes'
        : 'Cancel another workout first'
    : selectedLanguage === 'pt-br'
      ? myWorkout && myWorkout.data && myWorkout.data.length >= 1
        ? `Adicionar na fila  ${myWorkout.data.length - 1} / 2`
        : 'Escolher treino'
      : myWorkout && myWorkout.data.length >= 1
        ? 'Add to queue'
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

  async function handleDeleteWorkout(workoutId?: string) {
    if (!workoutId) return
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
            await deleteMyWorkoutAndmyWorkoutDataArray(workoutId)
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
                workoutAlreadySelected={!!cachedWorkout}
                style={{
                  marginBottom: 52,
                  width: '100%',
                }}
                onPress={() => {
                  cachedWorkout
                    ? handleDeleteWorkout(dataParam.data.workoutId)
                    : handleChoose()
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
