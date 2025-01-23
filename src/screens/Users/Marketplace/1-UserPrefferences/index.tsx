/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react'
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  SafeAreaView,
} from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { BackButton } from '@components/Buttons/BackButton'

import { useAuth } from '@hooks/auth'

import backgroundImg from '../../../../../assets/back.png'

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
  EquipamentTitle,
  FooterContainer,
  ButtonTitle,
  ButtonWrapper,
} from './styles'
import { setStatusBarStyle } from 'expo-status-bar'
import { SelectButton } from '@components/Buttons/SelectButton'
import { SelectFilterButton } from '@components/Buttons/SelectFilterButton'
import {
  IUserSelectFreeEquipamentListNavigation,
  IUserSelectPulleyEquipamentListNavigation,
  IUserSelectListNavigation,
  IUserSelectMachineEquipamentListNavigation,
} from '@src/@types/navigation'

import {
  ICachedExerciseList,
  IExercise,
  IExerciseItemType,
  IMuscleGroups,
} from '@hooks/authTypes'
import { diffInAge } from '@utils/diffInAge'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export function UserPrefferences() {
  const {
    user,
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

  function handleOpenList({ dataType }: IUserSelectListNavigation) {
    navigation.navigate('userSelectList', { dataType })
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

  const userAge = diffInAge(user?.birthdate)
  const experienceTime = diffInAge(user?.whenStartedAtGym)

  const formattedGoal =
    user &&
    selectedLanguage &&
    user.goal &&
    user.goal.goalSelectedData &&
    user.goal.goalSelectedData[selectedLanguage]
      ? user.goal.goalSelectedData[selectedLanguage].charAt(0).toUpperCase() +
        user.goal.goalSelectedData[selectedLanguage].slice(1)
      : selectedLanguage === 'pt-br'
        ? 'Selecione um objetivo'
        : 'Select a goal'

  const formattedFrequencyByWeek =
    user &&
    selectedLanguage &&
    user.sessionsByWeek &&
    user.sessionsByWeek.sessionsByWeekSelectedData &&
    user.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      ? user.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      : selectedLanguage === 'pt-br'
        ? 'Selecione quantos dias por semana'
        : 'Select how many days per week'

  const formattedTimeBySession =
    user &&
    selectedLanguage &&
    user.timeBySession &&
    user.timeBySession.timeBySessionSelectedData &&
    user.timeBySession.timeBySessionSelectedData[selectedLanguage] &&
    user.timeBySession.timeBySessionSelectedData[selectedLanguage]
      ? user.timeBySession.timeBySessionSelectedData[selectedLanguage]
      : selectedLanguage === 'pt-br'
        ? 'Selecione quanto tempo por treino'
        : 'Select how long per session'

  const formattedMuscleFocus =
    user &&
    user.muscleFocus &&
    user.muscleFocus.muscleSelectedData &&
    selectedLanguage
      ? user.muscleFocus.muscleSelectedData.reduce(
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
        <ImageBackground
          source={backgroundImg}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <ImageBackgroundContainer>
            <SafeAreaProvider style={{ width: `100%` }}>
              <SafeAreaView style={{ flex: 1 }}>
                <SettingsWrapper>
                  <BackButton
                    onPress={handleGoBack}
                    changeColor
                    disabled={isWaitingApiResponse}
                  />
                </SettingsWrapper>
                <EquipamentTitle>Preferencias: </EquipamentTitle>
                <Body>
                  <SelectContentWrapper>
                    <SelectWrapper>
                      <ButtonWrapper>
                        <ButtonTitle>Objetivo: </ButtonTitle>

                        <SelectButton
                          type={`middle`}
                          title={formattedGoal}
                          onPress={() =>
                            handleOpenList({ dataType: 'Objetivo' })
                          }
                          enabled={true}
                          loading={false}
                        />
                      </ButtonWrapper>
                      <ButtonWrapper>
                        <ButtonTitle>Foco em: </ButtonTitle>
                        <SelectButton
                          type={`middle`}
                          title={formattedMuscleFocus}
                          onPress={() =>
                            handleOpenList({ dataType: 'Foco em' })
                          }
                          enabled={true}
                          loading={false}
                        />
                      </ButtonWrapper>
                    </SelectWrapper>

                    <SelectWrapper>
                      <ButtonWrapper>
                        <ButtonTitle>Treinos por semana: </ButtonTitle>

                        <SelectButton
                          type={`middle`}
                          title={formattedFrequencyByWeek}
                          onPress={() =>
                            handleOpenList({ dataType: 'Treinos por semana' })
                          }
                          enabled={true}
                          loading={false}
                        />
                      </ButtonWrapper>
                      <ButtonWrapper>
                        <ButtonTitle>Tempo de cada treino: </ButtonTitle>

                        <SelectButton
                          type={`middle`}
                          title={formattedTimeBySession}
                          onPress={() =>
                            handleOpenList({ dataType: 'Tempo de cada treino' })
                          }
                          enabled={true}
                          loading={false}
                        />
                      </ButtonWrapper>
                    </SelectWrapper>
                  </SelectContentWrapper>
                  {user && user.personalTrainerContractId && (
                    <FooterWrapper>
                      <EquipamentTitle>
                        Equipamentos disponíveis
                      </EquipamentTitle>
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
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
