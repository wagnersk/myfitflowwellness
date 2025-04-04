/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, SafeAreaView } from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { BackButton } from '@components/Buttons/BackButton'

import { useAuth } from '@hooks/auth'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  FooterWrapper,
  SelectFilterButtonWrapper,
  SelectContentWrapper,
  SelectWrapper,
  Title,
  FooterContainer,
  ButtonTitle,
  ButtonWrapper,
  BodyWrapper,
} from './styles'
import { setStatusBarStyle } from 'expo-status-bar'
import { SelectFilterButton } from '@components/Buttons/SelectFilterButton'
import {
  IUserSelectFreeEquipamentListNavigation,
  IUserSelectPulleyEquipamentListNavigation,
  IUserPrefferencesSelectListNavigation,
  IUserSelectMachineEquipamentListNavigation,
} from '@src/@types/navigation'

import {
  ICachedExerciseList,
  IExercise,
  IExerciseItemType,
  IMuscleGroups,
} from '@hooks/authTypes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { WhiteButton } from '@components/Buttons/WhiteButton'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'

export function UserPrefferences() {
  const {
    user,
    userPersonalTrainerContract,
    userGymInfo,
    isWaitingApiResponse,

    fetchCachedWorkoutsExercises,
    cachedWorkoutsExercises,
  } = useAuth()

  const [filteredMachinesExercises, setFilteredMachinesExercises] = useState<
    IExerciseItemType[] | null
  >(null)

  const navigation = useNavigation()
  const selectedLanguage = user?.selectedLanguage

  function handleGoBack() {
    navigation.goBack()
  }

  function handleOpenList({ dataType }: IUserPrefferencesSelectListNavigation) {
    navigation.navigate('userEquipaments', { dataType })
  }

  function handleOpenFilterFreeEquipamentList({
    dataType,
  }: IUserSelectFreeEquipamentListNavigation) {
    navigation.navigate('userSelectFreeEquipamentList', { dataType })
  }
  function handleOpenFilterPulleyEquipamentList({
    dataType,
  }: IUserSelectPulleyEquipamentListNavigation) {
    navigation.navigate('userSelectPulleyEquipamentList', { dataType })
  }
  function handleOpenFilterMachineEquipamentList({
    dataType,
  }: IUserSelectMachineEquipamentListNavigation) {
    navigation.navigate('userSelectMachineEquipamentList', { dataType })
  }
  async function muscleGroupAndEquips() {
    if (!cachedWorkoutsExercises) return
    const [muscleGroupList, exerciseTypesList] =
      await getEquipamentAndMuscleGroupList()

    const updatedFilterTabMuscles = muscleGroupList as IMuscleGroups[]
    const machineFilter = ['machineEquipament'] as IExercise[]
    // "freeEquipament" | "pulleyEquipament" | "machineEquipament"

    const formattedFilteredMachineExercises = getFilteredMachineAndMuscles(
      updatedFilterTabMuscles,
      machineFilter,
      cachedWorkoutsExercises,
    )
    setFilteredMachinesExercises(formattedFilteredMachineExercises)

    function getFilteredMachineAndMuscles(
      selectedMuscleGroupFilter: IMuscleGroups[],
      selectedTypesFilter: IExercise[],
      exercisesList: ICachedExerciseList,
    ) {
      const myExercisesPermitted: IExerciseItemType[] = [] // readicionar aqui apenas os q passarem pelo q quero

      selectedMuscleGroupFilter.forEach((itemFilteredMuscleGroup) => {
        selectedTypesFilter.forEach((itemFilteredType) => {
          const data = exercisesList[itemFilteredMuscleGroup][itemFilteredType]

          if (data) {
            const [dataItem] = data

            const finalDataItem = {
              ...dataItem,
              exerciseType: itemFilteredType,
              exerciseMuscle: itemFilteredMuscleGroup,
            }

            myExercisesPermitted.push(finalDataItem)
          }
        })
      })
      return myExercisesPermitted
    }

    async function getEquipamentAndMuscleGroupList() {
      if (!cachedWorkoutsExercises) return [[''], ['']]

      const muscleGroups = new Set(Object.keys(cachedWorkoutsExercises))

      const exerciseTypes = new Set(
        Object.values(cachedWorkoutsExercises).flatMap((exerciseType) =>
          Object.keys(exerciseType),
        ),
      )

      const formattedMuscleGroups = [...muscleGroups] as IMuscleGroups[]
      const formattedExercisesMuscles = [...exerciseTypes] as IExercise[]

      return [formattedMuscleGroups, formattedExercisesMuscles]
    }
    // ISSO AQUI DEVE SER USADO APENAS QUANDO FOR CRIAR UMA NOVA ABA
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('dark')
    }, []),
  )

  useEffect(() => {
    fetchSelectOptionsData()
    if (user === null) return

    async function fetchSelectOptionsData() {
      if (!muscleGroupAndEquips) {
        await muscleGroupAndEquips()
      }

      if (!cachedWorkoutsExercises) {
        await fetchCachedWorkoutsExercises()
      }
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])
  /*   userEquipaments,
    userGymInfo, */
  const formattedGoal =
    selectedLanguage &&
    userGymInfo &&
    userGymInfo.goal &&
    userGymInfo.goal.goalSelectedData &&
    userGymInfo.goal.goalSelectedData[selectedLanguage]
      ? userGymInfo.goal.goalSelectedData[selectedLanguage]
          .charAt(0)
          .toUpperCase() +
        userGymInfo.goal.goalSelectedData[selectedLanguage].slice(1)
      : selectedLanguage === 'pt-br'
        ? 'Selecione um objetivo'
        : 'Select a goal'

  const formattedFrequencyByWeek =
    userGymInfo &&
    selectedLanguage &&
    userGymInfo.sessionsByWeek &&
    userGymInfo.sessionsByWeek.sessionsByWeekSelectedData &&
    userGymInfo.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      ? userGymInfo.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      : selectedLanguage === 'pt-br'
        ? 'Selecione quantos dias por semana'
        : 'Select how many days per week'

  const formattedTimeBySession =
    userGymInfo &&
    selectedLanguage &&
    userGymInfo.timeBySession &&
    userGymInfo.timeBySession.timeBySessionSelectedData &&
    userGymInfo.timeBySession.timeBySessionSelectedData[selectedLanguage] &&
    userGymInfo.timeBySession.timeBySessionSelectedData[selectedLanguage]
      ? userGymInfo.timeBySession.timeBySessionSelectedData[selectedLanguage]
      : selectedLanguage === 'pt-br'
        ? 'Selecione quanto tempo por treino'
        : 'Select how long per session'

  const formattedMuscleFocus =
    userGymInfo &&
    userGymInfo.muscleFocus &&
    userGymInfo.muscleFocus.muscleSelectedData &&
    selectedLanguage
      ? userGymInfo.muscleFocus.muscleSelectedData.reduce(
          (acc: string, curr: any, index: number) => {
            const muscleUs = curr?.[selectedLanguage]
            return muscleUs ? acc + (index > 0 ? ', ' : '') + muscleUs : acc
          },
          '',
        )
      : 'Selecione o foco muscular'

  return (
    <Container>
      <BodyImageWrapper>
        <BodyImageBackground />

        <ImageBackgroundContainer>
          <SafeAreaProvider style={{ width: `100%` }}>
            <SafeAreaView style={{ flex: 1 }}>
              <BodyWrapper>
                <SettingsWrapper>
                  <BackButton
                    onPress={handleGoBack}
                    changeColor
                    disabled={isWaitingApiResponse}
                  />
                </SettingsWrapper>
                <Title>Preferencias: </Title>
                <Body>
                  <SelectContentWrapper>
                    <SelectWrapper>
                      <ButtonWrapper>
                        <ButtonTitle>Objetivo: </ButtonTitle>
                        <WhiteButton
                          tittle={formattedGoal}
                          onPress={() =>
                            handleOpenList({ dataType: 'Objetivo' })
                          }
                          bordertype="up"
                          iconStyle="crosshair"
                        />
                        <WhiteButton
                          tittle={formattedMuscleFocus}
                          onPress={() =>
                            handleOpenList({ dataType: 'Foco em' })
                          }
                          bordertype="down"
                          iconStyle="person-simple"
                        />
                        <ButtonTitle>Foco em: </ButtonTitle>
                      </ButtonWrapper>
                    </SelectWrapper>

                    <SelectWrapper>
                      <ButtonWrapper>
                        <ButtonTitle>Treinos por semana: </ButtonTitle>
                        <WhiteButton
                          tittle={formattedFrequencyByWeek}
                          onPress={() =>
                            handleOpenList({ dataType: 'Treinos por semana' })
                          }
                          bordertype="up"
                          iconStyle="checkcicle"
                        />
                        <WhiteButton
                          tittle={formattedTimeBySession}
                          onPress={() =>
                            handleOpenList({
                              dataType: 'Tempo de cada treino',
                            })
                          }
                          bordertype="down"
                          iconStyle="clock"
                        />
                        <ButtonTitle>Tempo de cada treino: </ButtonTitle>
                      </ButtonWrapper>
                    </SelectWrapper>
                  </SelectContentWrapper>
                  {!userPersonalTrainerContract && (
                    <FooterWrapper>
                      <Title>Equipamentos disponíveis</Title>
                      <FooterContainer>
                        <SelectFilterButtonWrapper>
                          <SelectFilterButton
                            title={`Livre`}
                            onPress={() => {
                              handleOpenFilterFreeEquipamentList({
                                dataType: 'Livre',
                              })
                            }}
                            enabled={true}
                            loading={false}
                          />
                        </SelectFilterButtonWrapper>
                        <SelectFilterButtonWrapper>
                          <SelectFilterButton
                            title={`Polia`}
                            onPress={() => {
                              handleOpenFilterPulleyEquipamentList({
                                dataType: 'Polia',
                              })
                            }}
                            enabled={true}
                            loading={false}
                          />
                        </SelectFilterButtonWrapper>
                        <SelectFilterButtonWrapper>
                          <SelectFilterButton
                            title={`Máquina`}
                            onPress={() => {
                              handleOpenFilterMachineEquipamentList({
                                dataType: 'Máquina',
                              })
                            }}
                            enabled={true}
                            loading={false}
                          />
                        </SelectFilterButtonWrapper>
                      </FooterContainer>
                    </FooterWrapper>
                  )}
                </Body>
              </BodyWrapper>
            </SafeAreaView>
          </SafeAreaProvider>
        </ImageBackgroundContainer>
      </BodyImageWrapper>
    </Container>
  )
}
