import React, { useEffect, useState } from 'react'
import { BackHandler, SafeAreaView } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

import { useTheme } from 'styled-components/native'

import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import Check from '@assets/Check.svg'
import { translateMuscleGroupInfo } from '@utils/translateMuscles'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ButtonWrapper,
  UserName,
  ItemTitle,
  ListWrapper,
  ContentWrapper,
  IconWrapper,
  ListTitle,
} from './styles'
import { CTAButton } from '@components/Buttons/CTAButton'
import { IUserSelectListNavigation } from '@src/@types/navigation'
import { ScrollView } from 'react-native-gesture-handler'
import { serverTimestamp } from 'firebase/firestore'
import {
  IptBrUs,
  IUserGoal,
  IUserMuscleFocus,
  IUserSessionsByWeek,
  IUserTimeBySession,
} from '@hooks/authTypes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}

export function UserSelectList() {
  const {
    user,
    isWaitingApiResponse,

    updateUserGoalPreffer,
    updateUserGoalFocusMusclePreffer,
    updateUserFrequencyByWeekPreffer,
    updateUserTimeBySessionPreffer,

    fetchMuscleOptionData,
    fetchGoalOptionData,
    fetchFrequencyByWeekOptionData,
    fetchTimeBySessionOptionData,
  } = useAuth()
  const theme = useTheme()

  const navigation = useNavigation()
  const route = useRoute()

  const { dataType } = route.params as IUserSelectListNavigation

  const [selectedBalData, setSelectedBalData] = useState<IUserSelect | null>(
    null,
  )

  const [selectedData, setSelectedData] = useState<IUserSelect[] | null>(null)
  const selectedLanguage = user?.selectedLanguage

  async function handleSetBalancedChecked() {
    if (!selectedBalData) return

    balancedCheckedChoose()
    resetMuscleFocus()

    function balancedCheckedChoose() {
      if (!selectedBalData) return

      const fselectedData: IUserSelect = {
        id: selectedBalData.id,
        tittle: selectedBalData.tittle,
        selected: !selectedBalData.selected,
      }

      setSelectedBalData(fselectedData)
    }

    function resetMuscleFocus() {
      if (!selectedData) return

      const copySelectedData = [...selectedData]

      const resetedSelectedData = copySelectedData.map((v, i) => {
        return { tittle: v.tittle, id: i, selected: false }
      })
      setSelectedData(resetedSelectedData)
    }
  }

  async function handleSetMusclefocusChecked(id: number) {
    if (!selectedData) return

    muscleFocusChoose()
    resetBalanced()

    function muscleFocusChoose() {
      if (!selectedData) return

      console.log(`${id} selected: ${id}`)
      const copyData = [...selectedData]

      const indeex = copyData.findIndex((v) => v.id === id)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedData(copyData)
    }

    function resetBalanced() {
      if (!selectedBalData) return

      setSelectedBalData({
        id: selectedBalData.id,
        tittle: selectedBalData.tittle,
        selected: false,
      })
    }
  }

  async function handleSelect(id: number) {
    if (!selectedData) return

    const fselectedData = selectedData.map((v) => {
      if (v.id === id)
        return {
          ...v,
          selected: true,
        }
      else {
        return { ...v, selected: false }
      }
    })

    setSelectedData(fselectedData)
  }

  async function handleUpdateInfo() {
    if (!selectedData) return

    if (dataType === `Objetivo`) {
      const formattedData = selectedData.find((v) => v.selected === true)
      const servertimestamp = serverTimestamp()

      if (formattedData) {
        const fdata: IUserGoal = {
          goalSelectedData: formattedData.tittle,
          updatedAt: servertimestamp,
          createdAt: servertimestamp,
        }

        await updateUserGoalPreffer(fdata).then(() => {
          handleGoBack()
        })
      }
    }

    if (dataType === `Foco em`) {
      const copySelectedData: IUserSelect[] = [...selectedData]

      if (selectedBalData) {
        copySelectedData.push(selectedBalData)
      }

      //  const formattedSelectedFocusData = [...selectedData, { ...copy1 }]

      const selectedArray = copySelectedData
        .filter((item) => item.selected) // Filtra os itens com selected true
        .map((item) => ({
          'pt-br': item.tittle['pt-br'],
          us: item.tittle.us,
        }))

      const servertimestamp = serverTimestamp()

      console.log(selectedArray)
      if (selectedArray.length === 0) return
      const fdata: IUserMuscleFocus = {
        muscleSelectedData: selectedArray,
        updatedAt: servertimestamp,
        createdAt: servertimestamp,
      }

      await updateUserGoalFocusMusclePreffer(fdata).then(async () => {
        handleGoBack()
      })
    }

    if (dataType === `Treinos por semana`) {
      const formattedData = selectedData.find((v) => v.selected === true)
      const servertimestamp = serverTimestamp()
      if (!formattedData) return

      const fdata: IUserSessionsByWeek = {
        sessionsByWeekSelectedData: formattedData.tittle,
        sessionsByWeekNumber: formattedData.byWeekNumber,
        updatedAt: servertimestamp,
        createdAt: servertimestamp,
      }

      await updateUserFrequencyByWeekPreffer(fdata).then(async () => {
        handleGoBack()
      })
    }

    if (dataType === `Tempo de cada treino`) {
      const formattedData = selectedData.find((v) => v.selected === true)
      const servertimestamp = serverTimestamp()
      if (!formattedData) return

      const fdata: IUserTimeBySession = {
        timeBySessionSelectedData: formattedData.tittle,
        timeBySessionByWeekRangeNumber: formattedData.bySessionRangeNumber,
        updatedAt: servertimestamp,
        createdAt: servertimestamp,
      }

      await updateUserTimeBySessionPreffer(fdata).then(async () => {
        handleGoBack()
      })
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })

    fetchSelectOptionsData({ dataType })

    if (user === null) return

    async function fetchSelectOptionsData({
      dataType,
    }: IUserSelectListNavigation) {
      if (dataType === `Objetivo`) {
        const goalOptionData = await fetchGoalOptionData()
        if (!goalOptionData) return

        const { data } = goalOptionData

        const userSelectedGoalOption = user?.goal

        let formattedData: IUserSelect[] = [] // Ajustado para ser uma lista

        if (!userSelectedGoalOption) {
          formattedData = data.map((v, i) => {
            return {
              tittle: v.goal_insensitive,
              id: i,
              selected: false,
            }
          })
        } else {
          formattedData = data.map((v, i) => {
            if (
              userSelectedGoalOption.goalSelectedData &&
              selectedLanguage &&
              userSelectedGoalOption.goalSelectedData[
                selectedLanguage
              ].includes(v.goal_insensitive[selectedLanguage])
            ) {
              return { tittle: v.goal_insensitive, id: i, selected: true }
            } else {
              return {
                tittle: v.goal_insensitive,
                id: i,
                selected: false,
              }
            }
          })
        }

        setSelectedData(formattedData)
      }

      if (dataType === `Foco em`) {
        const muscleOptionData = await fetchMuscleOptionData()
        if (!muscleOptionData) return
        if (!user) return
        const { data } = muscleOptionData
        const { muscleFocus } = user

        const balancedData = {
          muscle_insensitive: {
            'pt-br': `equilibrado`,
            us: `balanced`,
          },
        }

        let formattedBalancedData = {} as IUserSelect // Ajustado para ser uma lista
        let formattedMuscleData: IUserSelect[] = [] // Ajustado para ser uma lista
        if (!muscleFocus) {
          muscleDataNotFound()

          function muscleDataNotFound() {
            formattedBalancedData = {
              tittle: balancedData.muscle_insensitive,
              id: 0,
              selected: false,
            }

            formattedMuscleData = data.map((v, i) => {
              return {
                tittle: v.muscle_insensitive,
                id: i,
                selected: false,
              }
            })
          }
        }

        if (muscleFocus) {
          muscleDataFound()

          function muscleDataFound() {
            const { muscleSelectedData } = muscleFocus
            if (!muscleSelectedData) return

            const findIt = muscleSelectedData.find(
              (val) =>
                selectedLanguage &&
                val[selectedLanguage] ===
                  balancedData.muscle_insensitive[selectedLanguage],
            )

            formattedBalancedData = findIt
              ? {
                  tittle: balancedData.muscle_insensitive,
                  id: 0,
                  selected: true,
                }
              : {
                  tittle: balancedData.muscle_insensitive,
                  id: 0,
                  selected: false,
                }

            formattedMuscleData = data.map((v, i) => {
              if (!translateMuscleGroupInfo) return ''
              const findIt = muscleSelectedData.find(
                (val) =>
                  selectedLanguage &&
                  val[selectedLanguage] ===
                    v.muscle_insensitive[selectedLanguage],
              )
              if (findIt) {
                return { tittle: v.muscle_insensitive, id: i, selected: true }
              } else {
                return { tittle: v.muscle_insensitive, id: i, selected: false }
              }
            })
          }
        }

        setSelectedData(formattedMuscleData)
        setSelectedBalData(formattedBalancedData)
      }

      if (dataType === `Treinos por semana`) {
        const frequencyByWeekOptionData = await fetchFrequencyByWeekOptionData()

        if (!frequencyByWeekOptionData) return

        const { data } = frequencyByWeekOptionData

        const userSelectedSessionsByWeekOption = user?.sessionsByWeek

        let formattedData: IUserSelect[] = [] // Ajustado para ser uma lista
        if (!userSelectedSessionsByWeekOption) {
          formattedData = data.map((v, i) => {
            return {
              tittle: v.sessionsByWeek_insensitive,
              byWeekNumber: v.sessionsByWeekNumber,
              id: i,
              selected: false,
            }
          })
        } else {
          formattedData = data.map((v, i) => {
            if (
              userSelectedSessionsByWeekOption.sessionsByWeekSelectedData &&
              selectedLanguage &&
              userSelectedSessionsByWeekOption.sessionsByWeekSelectedData[
                selectedLanguage
              ].includes(v.sessionsByWeek_insensitive[selectedLanguage])
            ) {
              return {
                tittle: v.sessionsByWeek_insensitive,
                byWeekNumber: v.sessionsByWeekNumber,
                id: i,
                selected: true,
              }
            } else {
              return {
                tittle: v.sessionsByWeek_insensitive,
                byWeekNumber: v.sessionsByWeekNumber,
                id: i,
                selected: false,
              }
            }
          })
        }

        setSelectedData(formattedData)
      }

      if (dataType === `Tempo de cada treino`) {
        const timeBySessionOptionData = await fetchTimeBySessionOptionData()

        if (!timeBySessionOptionData) return

        const { data } = timeBySessionOptionData

        const userSelectedTimeBySessionOption = user?.timeBySession

        let formattedData: IUserSelect[] = [] // Ajustado para ser uma lista
        if (!userSelectedTimeBySessionOption) {
          formattedData = data.map((v, i) => {
            return {
              tittle: v.timeBySession_insensitive,
              bySessionRangeNumber: v.timeBySessionRangeNumber,
              id: i,
              selected: false,
            }
          })
        } else {
          formattedData = data.map((v, i) => {
            if (
              userSelectedTimeBySessionOption &&
              selectedLanguage &&
              userSelectedTimeBySessionOption.timeBySessionSelectedData &&
              userSelectedTimeBySessionOption.timeBySessionSelectedData[
                selectedLanguage
              ] &&
              userSelectedTimeBySessionOption.timeBySessionSelectedData[
                selectedLanguage
              ].includes(v.timeBySession_insensitive[selectedLanguage])
            ) {
              return {
                tittle: v.timeBySession_insensitive,
                bySessionRangeNumber: v.timeBySessionRangeNumber,
                id: i,
                selected: true,
              }
            } else {
              return {
                tittle: v.timeBySession_insensitive,
                bySessionRangeNumber: v.timeBySessionRangeNumber,
                id: i,
                selected: false,
              }
            }
          })
        }

        setSelectedData(formattedData)
      }
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  return (
    <Container>
      <BodyImageWrapper>
        <BodyImageBackground />

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
              <UserName>{dataType}</UserName>
              <Body>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <ListWrapper>
                    {dataType === 'Foco em' && (
                      <ListTitle>Quero focar no corpo todo</ListTitle>
                    )}

                    {selectedBalData && (
                      <ButtonWrapper
                        key={selectedBalData.id}
                        onPress={() =>
                          dataType === 'Foco em' && handleSetBalancedChecked()
                        }
                      >
                        <ContentWrapper>
                          <ItemTitle>
                            {selectedBalData &&
                              selectedBalData.tittle &&
                              selectedLanguage &&
                              selectedBalData.tittle[selectedLanguage]}
                          </ItemTitle>

                          <IconWrapper>
                            {selectedBalData.selected && (
                              <Check
                                width={32}
                                height={32}
                                stroke={theme.COLORS.BLUE_STROKE}
                                strokeWidth={2}
                              />
                            )}
                          </IconWrapper>
                        </ContentWrapper>
                      </ButtonWrapper>
                    )}
                  </ListWrapper>
                  <ListWrapper>
                    {dataType === 'Foco em' && (
                      <ListTitle>Quero focar mais em</ListTitle>
                    )}
                    {selectedData &&
                      selectedData.map((v) => {
                        return (
                          <ButtonWrapper
                            key={v.id}
                            onPress={() =>
                              dataType === 'Foco em'
                                ? handleSetMusclefocusChecked(v.id)
                                : handleSelect(v.id)
                            }
                          >
                            <ContentWrapper>
                              <ItemTitle>
                                {v &&
                                  v.tittle &&
                                  selectedLanguage &&
                                  v.tittle[selectedLanguage]}
                              </ItemTitle>

                              <IconWrapper>
                                {v.selected && (
                                  <Check
                                    width={32}
                                    height={32}
                                    stroke={theme.COLORS.BLUE_STROKE}
                                    strokeWidth={2}
                                  />
                                )}
                              </IconWrapper>
                            </ContentWrapper>
                          </ButtonWrapper>
                        )
                      })}
                  </ListWrapper>
                </ScrollView>
                <CTAButton
                  style={{ marginBottom: 54 }}
                  onPress={handleUpdateInfo}
                  changeColor
                  title="Salvar"
                  loading={isWaitingApiResponse}
                  enabled={!isWaitingApiResponse}
                />
              </Body>
            </SafeAreaView>
          </SafeAreaProvider>
        </ImageBackgroundContainer>
      </BodyImageWrapper>
    </Container>
  )
}
