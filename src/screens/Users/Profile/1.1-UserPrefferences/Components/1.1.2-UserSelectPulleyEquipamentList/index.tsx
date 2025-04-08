import React, { useEffect, useState } from 'react'
import { ImageBackground, BackHandler, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../../../assets/back.png'
import Check from '@assets/Check.svg'

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
import { IUserSelectPulleyEquipamentListNavigation } from '@src/@types/navigation'
import { ScrollView } from 'react-native-gesture-handler'

import { IPulleySelectItem } from '@hooks/selectOptionsDataFirebaseTypes'
import { IptBrUs } from '@hooks/authTypes'

import {
  IPulleyDataSelect,
  IPulleyHandlerDataSelect,
} from '@hooks/selectOptionsTypes'

export type IAllPulleyDataSelect = {
  allPulley_insensitive: IptBrUs
  selected: boolean
  index: number
}

export function UserSelectPulleyEquipamentList() {
  const {
    user,
    userEquipaments,
    isWaitingApiResponse,
    fetchPulleyOptionData,
    updateUserPulleyPreffer,
  } = useAuth()

  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()

  const { dataType } = route.params as IUserSelectPulleyEquipamentListNavigation

  const [selectedAllPulleyData, setSelectedAllPulleyData] =
    useState<IAllPulleyDataSelect | null>(null)

  const [selectedPulley, setSelectedPulley] = useState<
    IPulleyDataSelect[] | null
  >(null)
  const [selectedPulleyHandles, setSelectedPulleyHandles] = useState<
    IPulleyHandlerDataSelect[] | null
  >(null)

  const selectedLanguage = user?.selectedLanguage

  async function handleSetAllPulleyChecked() {
    chooseAllPulley()
    resetPulley()
    resetPulleyHandler()

    function chooseAllPulley() {
      if (!selectedAllPulleyData) return

      const FAllPulleySelectedData: IAllPulleyDataSelect = {
        index: selectedAllPulleyData.index,
        allPulley_insensitive: selectedAllPulleyData.allPulley_insensitive,
        selected: !selectedAllPulleyData.selected,
      }

      setSelectedAllPulleyData(FAllPulleySelectedData)
    }

    function resetPulley() {
      if (!selectedPulley) return
      const copyData = [...selectedPulley]

      const resetedPulleyData = copyData.map((v, i) => {
        return {
          pulley_insensitive: v.pulley_insensitive,
          index: i,
          selected: false,
        }
      })

      setSelectedPulley(resetedPulleyData)
    }
    function resetPulleyHandler() {
      if (!selectedPulleyHandles) return
      const copyData = [...selectedPulleyHandles]

      const resetedPulleyHandlerData = copyData.map((v, i) => {
        return {
          pulleyHandler_insensitive: v.pulleyHandler_insensitive,
          index: i,
          selected: false,
        }
      })

      setSelectedPulleyHandles(resetedPulleyHandlerData)
    }
  }

  async function handleSetPulleyChecked(index: number) {
    resetAllPulley()
    choosePulley()

    function choosePulley() {
      if (!selectedPulley) return

      const copyData = [...selectedPulley]

      const indeex = copyData.findIndex((v) => v.index === index)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedPulley(copyData)
    }
    function resetAllPulley() {
      if (!selectedAllPulleyData) return

      const FAllPulleySelectedData: IAllPulleyDataSelect = {
        index: selectedAllPulleyData.index,
        allPulley_insensitive: selectedAllPulleyData.allPulley_insensitive,
        selected: false,
      }

      setSelectedAllPulleyData(FAllPulleySelectedData)
    }
  }
  // handleSetMachineChecked
  async function handleSetPulleyHandlerChecked(index: number) {
    resetAllPulley()
    choosePulleyHandler()

    function choosePulleyHandler() {
      if (!selectedPulleyHandles) return

      const copyData = [...selectedPulleyHandles]

      const indeex = copyData.findIndex((v) => v.index === index)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedPulleyHandles(copyData)
    }

    function resetAllPulley() {
      if (!selectedAllPulleyData) return

      const FAllPulleySelectedData: IAllPulleyDataSelect = {
        index: selectedAllPulleyData.index,
        allPulley_insensitive: selectedAllPulleyData.allPulley_insensitive,
        selected: false,
      }

      setSelectedAllPulleyData(FAllPulleySelectedData)
    }
  }

  async function handleUpdateInfo() {
    if (!selectedPulley || !selectedPulleyHandles) return
    if (!selectedAllPulleyData) return

    const formattedPulleyDataa: IPulleyDataSelect = {
      index: selectedAllPulleyData.index,
      pulley_insensitive: selectedAllPulleyData.allPulley_insensitive,
      selected: selectedAllPulleyData.selected,
    }
    const formattedPulleyHandlerDataa: IPulleyHandlerDataSelect = {
      index: selectedAllPulleyData.index,
      pulleyHandler_insensitive: selectedAllPulleyData.allPulley_insensitive,
      selected: selectedAllPulleyData.selected,
    }

    const copyPulleySelectedData: IPulleyDataSelect[] = [...selectedPulley]
    const copyPulleyHandlerSelectedData: IPulleyHandlerDataSelect[] = [
      ...selectedPulleyHandles,
    ]

    copyPulleySelectedData.push(formattedPulleyDataa)
    copyPulleyHandlerSelectedData.push(formattedPulleyHandlerDataa)

    const formattedPulley = copyPulleySelectedData
      .filter((v) => v.selected)
      .map((item) => ({
        pulley_insensitive: {
          'pt-br': item.pulley_insensitive['pt-br'],
          us: item.pulley_insensitive.us,
        },
      }))

    const formattedPulleyHandler = copyPulleyHandlerSelectedData
      .filter((v) => v.selected)
      .map((item) => ({
        pulleyHandler_insensitive: {
          'pt-br': item.pulleyHandler_insensitive['pt-br'],
          us: item.pulleyHandler_insensitive.us,
        },
      }))

    const data: IPulleySelectItem = {
      pulleySelectData: formattedPulley,
      pulleyHandlerSelectData: formattedPulleyHandler,
    }

    await updateUserPulleyPreffer(data).then(() => {
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
      const { pulleyData } = userEquipaments

      const pulleyDefaultSelectData = await fetchPulleyOptionData()
      if (!pulleyDefaultSelectData) return
      const { data } = pulleyDefaultSelectData

      const allPulleyData = {
        allPulley_insensitive: {
          'pt-br': `todos`,
          us: `all`,
        },
      }

      const userPulleyData =
        pulleyData && pulleyData.data && pulleyData.data.pulleySelectData

      const userPulleyHandlerData =
        pulleyData && pulleyData.data && pulleyData.data.pulleyHandlerSelectData

      let formattedAllPulleyData = {} as IAllPulleyDataSelect // Ajustado para ser uma lista
      let formattedPulleyData: IPulleyDataSelect[] = []
      let formattedPulleyHandlesData: IPulleyHandlerDataSelect[] = []

      if (data) {
        if (!userPulleyData) return
        const findPulley = userPulleyData.find(
          (val) =>
            selectedLanguage &&
            val.pulley_insensitive[selectedLanguage] ===
              allPulleyData.allPulley_insensitive[selectedLanguage],
        )

        formattedAllPulleyData = findPulley
          ? {
              allPulley_insensitive: allPulleyData.allPulley_insensitive,
              index: 0,
              selected: true,
            }
          : {
              allPulley_insensitive: allPulleyData.allPulley_insensitive,
              index: 0,
              selected: false,
            }

        formattedPulleyData = data.pulleySelectData.map((v, index) => {
          let findIt
          if (userPulleyData && selectedLanguage) {
            findIt = userPulleyData.find(
              (val) =>
                val.pulley_insensitive[selectedLanguage] ===
                v.pulley_insensitive[selectedLanguage],
            )
          }

          if (findIt) {
            return {
              pulley_insensitive: v.pulley_insensitive,
              index,
              selected: true,
            }
          } else {
            return {
              pulley_insensitive: v.pulley_insensitive,
              index,
              selected: false,
            }
          }
        })

        formattedPulleyHandlesData = data.pulleyHandlerSelectData.map(
          (v, index) => {
            let findIt
            if (userPulleyHandlerData && selectedLanguage) {
              findIt = userPulleyHandlerData.find(
                (val) =>
                  val.pulleyHandler_insensitive[selectedLanguage] ===
                  v.pulleyHandler_insensitive[selectedLanguage],
              )
            }

            if (findIt) {
              return {
                pulleyHandler_insensitive: v.pulleyHandler_insensitive,
                index,
                selected: true,
              }
            } else {
              return {
                pulleyHandler_insensitive: v.pulleyHandler_insensitive,
                index,
                selected: false,
              }
            }
          },
        )
      }

      setSelectedAllPulleyData(formattedAllPulleyData)

      setSelectedPulley(formattedPulleyData)
      setSelectedPulleyHandles(formattedPulleyHandlesData)
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
                    {selectedPulley && (
                      <ListSubTitle>Marque aqui caso tenha todas</ListSubTitle>
                    )}
                    <ListWrapper>
                      <ListSubTitle>Tenho tudo</ListSubTitle>

                      {selectedAllPulleyData && (
                        <ButtonWrapper
                          key={selectedAllPulleyData.index}
                          onPress={() => handleSetAllPulleyChecked()}
                        >
                          <ContentWrapper>
                            <ItemTitle>
                              {selectedAllPulleyData &&
                                selectedLanguage &&
                                selectedAllPulleyData.allPulley_insensitive &&
                                selectedAllPulleyData.allPulley_insensitive[
                                  selectedLanguage
                                ]}
                            </ItemTitle>

                            <IconWrapper>
                              {selectedAllPulleyData.selected && (
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
                      {selectedPulley && (
                        <ListSubTitle>Ou selecione quais você tem</ListSubTitle>
                      )}

                      {selectedPulley &&
                        selectedPulley.map((v) => {
                          return (
                            <ButtonWrapper
                              key={v.index}
                              onPress={() => handleSetPulleyChecked(v.index)}
                            >
                              <ContentWrapper>
                                <ItemTitle>
                                  {v &&
                                    selectedLanguage &&
                                    v.pulley_insensitive &&
                                    v.pulley_insensitive[selectedLanguage]}
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
                    <ListWrapper>
                      {selectedPulleyHandles && (
                        <ListSubTitle>
                          Puxadores de Polia Disponíveis{' '}
                        </ListSubTitle>
                      )}

                      {selectedPulleyHandles &&
                        selectedPulleyHandles.map((va) => {
                          return (
                            <ButtonWrapper
                              key={va.index}
                              onPress={() =>
                                handleSetPulleyHandlerChecked(va.index)
                              }
                            >
                              <ContentWrapper>
                                <ItemTitle>
                                  {va &&
                                    selectedLanguage &&
                                    va.pulleyHandler_insensitive &&
                                    va.pulleyHandler_insensitive[
                                      selectedLanguage
                                    ]}
                                </ItemTitle>

                                <IconWrapper>
                                  {va.selected && (
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
