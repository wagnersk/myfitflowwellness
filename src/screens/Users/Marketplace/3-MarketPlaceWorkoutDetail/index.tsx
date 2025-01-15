import React, { useCallback, useEffect } from 'react'
import { BackHandler } from 'react-native'
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
  InfoDescriptionText,
  InfoDescriptionWrapper,
  TitleWrapper,
  LockIconWrapper,
  InfoGenderTitle,
  BodyBottomWrapper,
  BlurViewWrapper,
  SubTitle,
  IconWrapper,
  WorkoutBoxInfoWrapper,
  Wrapper,
  TitleDivision,
  TitleWorkout,
} from './styles'
import { useAuth } from '@hooks/auth'
import { EquipamentsInfo } from '@components/EquipamentsInfo'
import { Plan } from '@components/Plan'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { getIcon } from '@utils/getIcon'
import { WorkoutMuscleComponent } from '@components/WorkoutMuscleComponent'
import { IMarketPlaceWorkoutDetailNavigation } from '@src/@types/navigation'
import { getGenderIcon } from '@utils/getGenderIcon'
import { translateMuscleGroupInfo } from '@utils/translateMuscles'
import { IptBrUs } from '@hooks/selectOptionsDataFirebaseTypes'

export function MarketPlaceWorkoutDetail() {
  const { user, isWaitingApiResponse } = useAuth()
  const selectedLanguage = user?.selectedLanguage
  const navigation = useNavigation()
  const route = useRoute()

  const dataParam = route.params as IMarketPlaceWorkoutDetailNavigation

  const { loadMyWorkoutAndmyWorkoutDataArrayAndReturnExercises } = useAuth()

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  let barLabel = ''
  let benchLabel = ''
  let machineLabel = ''
  let otherLabel = ''
  let pulleyLabel = ''
  let pulleyHandlesLabel = ''
  let weightLabel = ''
  let muscleGroupsLabel = ''

  loadEquipamentInfoValues()
  loadMuscleGroupInfoValues()
  console.log(
    `dataParam.data.workoutsUniquesMuscles`,
    dataParam.data.workoutsUniquesMuscles,
  )
  function loadEquipamentInfoValues() {
    const data = dataParam.data
    if (!user) return
    const selectedLanguage = user.selectedLanguage
    if (data) {
      barLabel = data.workoutsUniquesFilters.bar.reduce((acc, item, index) => {
        return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
      }, '')
      benchLabel = data.workoutsUniquesFilters.bench.reduce(
        (acc, item, index) => {
          return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
        },
        '',
      )

      machineLabel = data.workoutsUniquesFilters.machine.reduce(
        (acc, item, index) => {
          return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
        },
        '',
      )

      otherLabel = data.workoutsUniquesFilters.other.reduce(
        (acc, item, index) => {
          return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
        },
        '',
      )
      pulleyLabel = data.workoutsUniquesFilters.pulley.reduce(
        (acc, item, index) => {
          return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
        },
        '',
      )
      pulleyHandlesLabel = data.workoutsUniquesFilters.pulleyHandles.reduce(
        (acc, item, index) => {
          return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
        },
        '',
      )
      weightLabel = data.workoutsUniquesFilters.weight.reduce(
        (acc, item, index) => {
          return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
        },
        '',
      )
    }
  }
  function loadMuscleGroupInfoValues() {
    if (dataParam.data) {
      if (!translateMuscleGroupInfo) return

      const translattedMuscleGroupUStoPTBR =
        dataParam.data.workoutsUniquesMuscles.map(
          (muscleName: { 'pt-br': string; us: string }) => {
            if (!translateMuscleGroupInfo) return { 'pt-br': '', us: '' }

            return muscleName
          },
        )

      if (!translattedMuscleGroupUStoPTBR) return
      if (selectedLanguage === undefined) return
      muscleGroupsLabel = translattedMuscleGroupUStoPTBR.reduce(
        (acc: string, item: IptBrUs, index: number) => {
          return (
            acc +
            (index > 0 ? ', ' : '') +
            item[selectedLanguage as 'pt-br' | 'us']
          )
        },
        '',
      )
    }
  }

  return (
    <Container>
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
                  height: '100%',
                  borderRadius: 8,
                  backgroundColor: `gray`,
                }}
                cachePolicy={'memory-disk'}
              />
            )}
            <BackButtonWrapper>
              <BackCircleButton onPress={handleGoBack} changeColor />
            </BackButtonWrapper>
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
                  description={dataParam.data.workoutLevel[selectedLanguage]}
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
            <EquipamentsInfo
              pulley={pulleyLabel}
              pulleyHandles={pulleyHandlesLabel}
              barLabel={barLabel}
              benchLabel={benchLabel}
              machineLabel={machineLabel}
              otherLabel={otherLabel}
              weightLabel={weightLabel}
              selectedLanguage={user?.selectedLanguage}
            />
            {muscleGroupsLabel && (
              <WorkoutMuscleComponent description={muscleGroupsLabel} />
            )}
          </BodyInfo>
        </BodyImageContainer>
      </ScrollView>

      <BodyBottomWrapper>
        <BlurViewWrapper
          intensity={30}
          tint="light"
          style={{ paddingLeft: 32, paddingRight: 32 }}
        >
          <CTAButton
            enabled={!isWaitingApiResponse}
            loading={isWaitingApiResponse}
            style={{
              marginBottom: 52,
              width: '100%',
            }}
            onPress={() => {
              handleChoose()
            }}
            /* bigSize={true} */
            changeColor
            title={
              selectedLanguage === 'pt-br'
                ? 'Selecionar este treino'
                : 'Select this workout'
            }
          />
        </BlurViewWrapper>
      </BodyBottomWrapper>
    </Container>
  )
}
