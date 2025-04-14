import React, { useEffect, useState } from 'react'
import { ImageBackground, BackHandler, SafeAreaView } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../../../assets/back.png'
import Check from '@assets/Check.svg'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ButtonWrapper,
  ListName,
  ItemTitle,
  ListWrapper,
  ContentWrapper,
  IconWrapper,
  ListTitle,
  ListSubTitle,
  Header,
} from './styles'

import { CTAButton } from '@components/Buttons/CTAButton'
import { IUserSelectMachineEquipamentListNavigation } from '@src/@types/navigation'
import { ScrollView } from 'react-native-gesture-handler'

import { IMachineDataSelect } from '@hooks/selectOptionsTypes'
import {
  IMachineSelectItem,
  IptBrUs,
} from '@hooks/selectOptionsDataFirebaseTypes'

export type IAllMAchineDataSelect = {
  allMachine_insensitive: IptBrUs
  selected: boolean
  index: number
}

export function UserSelectMachineEquipamentList() {
  const {
    user,
    userEquipaments,

    isWaitingApiResponse,
    fetchMachineOptionData,
    updateUserMachinePreffer,
  } = useAuth()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()

  const { dataType } =
    route.params as IUserSelectMachineEquipamentListNavigation

  const [selectedAllMachines, setSelectedAllMachines] =
    useState<IAllMAchineDataSelect | null>(null)

  const [selectedMachines, setSelectedMachines] = useState<
    IMachineDataSelect[] | null
  >(null)

  const selectedLanguage = user?.selectedLanguage

  async function handleSetAllMachineChecked() {
    if (!selectedMachines) return

    chooseAllMachine()
    resetMachine()

    function chooseAllMachine() {
      if (!selectedAllMachines) return

      const fselectedData: IAllMAchineDataSelect = {
        index: selectedAllMachines.index,
        allMachine_insensitive: selectedAllMachines.allMachine_insensitive,
        selected: !selectedAllMachines.selected,
      }

      setSelectedAllMachines(fselectedData)
    }

    function resetMachine() {
      if (!selectedMachines) return
      const copyData = [...selectedMachines]

      const resetedMachineData = copyData.map((v, i) => {
        return {
          machine_insensitive: v.machine_insensitive,
          index: i,
          selected: false,
        }
      })

      setSelectedMachines(resetedMachineData)
    }
  }

  async function handleSetMachineChecked(index: number) {
    if (!selectedMachines) return

    chooseMachine()
    resetAllMachine()

    function chooseMachine() {
      if (!selectedMachines) return
      const copyData = [...selectedMachines]

      const indeex = copyData.findIndex((v) => v.index === index)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedMachines(copyData)
    }

    function resetAllMachine() {
      if (!selectedAllMachines) return

      setSelectedAllMachines({
        index: selectedAllMachines.index,
        allMachine_insensitive: selectedAllMachines.allMachine_insensitive,
        selected: false,
      })
    }
  }

  async function handleUpdateInfo() {
    if (!selectedMachines) return
    if (!selectedAllMachines) return

    const formattedMachineDataa: IMachineDataSelect = {
      index: selectedAllMachines.index,
      machine_insensitive: selectedAllMachines.allMachine_insensitive,
      selected: selectedAllMachines.selected,
    }

    const copyMachineSelectedData: IMachineDataSelect[] = [...selectedMachines]

    if (selectedAllMachines) {
      copyMachineSelectedData.push(formattedMachineDataa)
    }

    const formattedMachine = copyMachineSelectedData
      .filter((v) => v.selected)
      .map((item) => ({
        machine_insensitive: {
          'pt-br': item.machine_insensitive['pt-br'],
          us: item.machine_insensitive.us,
        },
      }))

    const data: IMachineSelectItem = {
      machineSelectData: formattedMachine,
    }

    await updateUserMachinePreffer(data).then(() => {
      handleGoBack()
    })
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    if (!user) return

    fetchSelectOptionsData()

    async function fetchSelectOptionsData() {
      if (!userEquipaments) return
      const { machineData } = userEquipaments

      const machineDefaultSelectData = await fetchMachineOptionData()
      if (!machineDefaultSelectData) return
      const { data } = machineDefaultSelectData

      const allMachineData = {
        allMachine_insensitive: {
          'pt-br': `todos`,
          us: `all`,
        },
      }

      const userMachineData =
        machineData && machineData.data && machineData.data.machineSelectData

      let formattedAllMachineData = {} as IAllMAchineDataSelect // Ajustado para ser uma lista
      let formattedMachineData: IMachineDataSelect[] = []

      if (data) {
        if (!userMachineData) return

        const findIt = userMachineData.find(
          (val) =>
            selectedLanguage &&
            val.machine_insensitive[selectedLanguage] ===
              allMachineData.allMachine_insensitive[selectedLanguage],
        )

        formattedAllMachineData = findIt
          ? {
              allMachine_insensitive: allMachineData.allMachine_insensitive,
              index: 0,
              selected: true,
            }
          : {
              allMachine_insensitive: allMachineData.allMachine_insensitive,
              index: 0,
              selected: false,
            }

        formattedMachineData = data.machineSelectData.map((v, index) => {
          const findIt = userMachineData.find(
            (val) =>
              selectedLanguage &&
              val.machine_insensitive[selectedLanguage] ===
                v.machine_insensitive[selectedLanguage],
          )

          if (findIt) {
            return {
              machine_insensitive: v.machine_insensitive,
              index,
              selected: true,
            }
          } else {
            return {
              machine_insensitive: v.machine_insensitive,
              index,
              selected: false,
            }
          }
        })

        setSelectedAllMachines(formattedAllMachineData)
        setSelectedMachines(formattedMachineData)
      }
    }
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

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
                <Header>
                  <SettingsWrapper>
                    <BackButton
                      onPress={handleGoBack}
                      changeColor
                      disabled={isWaitingApiResponse}
                    />
                  </SettingsWrapper>
                  <ListName>{dataType}</ListName>
                </Header>
                <Body>
                  <ScrollView
                    contentContainerStyle={{ gap: 64 }}
                    showsVerticalScrollIndicator={false}
                  >
                    <ListWrapper>
                      <ListSubTitle>Marque aqui caso tenha todas</ListSubTitle>
                      {selectedAllMachines && (
                        <ButtonWrapper
                          key={selectedAllMachines.index}
                          onPress={() => handleSetAllMachineChecked()}
                        >
                          <ContentWrapper>
                            <ItemTitle>
                              {selectedAllMachines &&
                                selectedLanguage &&
                                selectedAllMachines.allMachine_insensitive &&
                                selectedAllMachines.allMachine_insensitive[
                                  selectedLanguage
                                ]}
                            </ItemTitle>

                            <IconWrapper>
                              {selectedAllMachines.selected && (
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
                      {selectedMachines && (
                        <ListSubTitle>Ou selecione quais você tem</ListSubTitle>
                      )}

                      {selectedMachines &&
                        selectedMachines.map((v) => {
                          return (
                            <ButtonWrapper
                              key={v.index}
                              onPress={() => handleSetMachineChecked(v.index)}
                            >
                              <ContentWrapper>
                                <ItemTitle>
                                  {v &&
                                    selectedLanguage &&
                                    v.machine_insensitive &&
                                    v.machine_insensitive[selectedLanguage]}
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
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
