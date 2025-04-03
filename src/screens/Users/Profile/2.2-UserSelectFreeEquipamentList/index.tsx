/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { ImageBackground, BackHandler } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'
import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'
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
} from './styles'
import { CTAButton } from '@components/Buttons/CTAButton'
import { IUserSelectFreeEquipamentListNavigation } from '@src/@types/navigation'
import { ScrollView } from 'react-native-gesture-handler'

import { IptBrUs } from '@hooks/authTypes'
import { IFreeSelectItem } from '@hooks/selectOptionsDataFirebaseTypes'
import {
  IBarDataSelect,
  IBenchDataSelect,
  IOtherDataSelect,
  IWeightDataSelect,
} from '@hooks/selectOptionsTypes'

export type IAllFreeDataSelect = {
  allFree_insensitive: IptBrUs
  selected: boolean
  index: number
}

export function UserSelectFreeEquipamentList() {
  const {
    user,
    userEquipaments,
    isWaitingApiResponse,
    fetchFreeOptionData,
    updateUserFreePreffer,
  } = useAuth()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()

  const { dataType } = route.params as IUserSelectFreeEquipamentListNavigation

  const [selectedAllFreeData, setSelectedAllFreeData] =
    useState<IAllFreeDataSelect | null>(null)

  const [selectedBench, setSelectedBench] = useState<IBenchDataSelect[] | null>(
    null,
  )
  const [selectedBar, setSelectedBar] = useState<IBarDataSelect[] | null>(null)

  const [selectedWeight, setSelectedWeight] = useState<
    IWeightDataSelect[] | null
  >(null)
  const [selectedOther, setSelectedOther] = useState<IOtherDataSelect[] | null>(
    null,
  )

  const selectedLanguage = user?.selectedLanguage

  async function handleSetAllFreeChecked() {
    chooseAllPulley()
    resetBench()
    resetBar()
    resetWeight()
    resetOther()

    function chooseAllPulley() {
      if (!selectedAllFreeData) return

      const FAllFreeSelectedData: IAllFreeDataSelect = {
        index: selectedAllFreeData.index,
        allFree_insensitive: selectedAllFreeData.allFree_insensitive,
        selected: !selectedAllFreeData.selected,
      }

      setSelectedAllFreeData(FAllFreeSelectedData)
    }

    function resetBench() {
      if (!selectedBench) return
      const copyData = [...selectedBench]

      const resetedFreeData = copyData.map((v, i) => {
        return {
          bench_insensitive: v.bench_insensitive,
          index: i,
          selected: false,
        }
      })
      setSelectedBench(resetedFreeData)
    }

    function resetBar() {
      if (!selectedBar) return
      const copyData = [...selectedBar]

      const resetedBarData = copyData.map((v, i) => {
        return {
          bar_insensitive: v.bar_insensitive,
          index: i,
          selected: false,
        }
      })

      setSelectedBar(resetedBarData)
    }

    function resetWeight() {
      if (!selectedWeight) return
      const copyData = [...selectedWeight]

      const resetedWeightData = copyData.map((v, i) => {
        return {
          weight_insensitive: v.weight_insensitive,
          index: i,
          selected: false,
        }
      })

      setSelectedWeight(resetedWeightData)
    }

    function resetOther() {
      if (!selectedOther) return
      const copyData = [...selectedOther]

      const resetedOtherData = copyData.map((v, i) => {
        return {
          other_insensitive: v.other_insensitive,
          index: i,
          selected: false,
        }
      })

      setSelectedOther(resetedOtherData)
    }
  }

  async function handleSetBenchChecked(index: number) {
    resetAllPulley()
    chooseBench()

    function resetAllPulley() {
      if (!selectedAllFreeData) return

      const FAllFreeSelectedData: IAllFreeDataSelect = {
        index: selectedAllFreeData.index,
        allFree_insensitive: selectedAllFreeData.allFree_insensitive,
        selected: false,
      }

      setSelectedAllFreeData(FAllFreeSelectedData)
    }
    function chooseBench() {
      if (!selectedBench) return
      const copyData = [...selectedBench]

      const indeex = copyData.findIndex((v) => v.index === index)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedBench(copyData)
    }
  }

  async function handleSetBarChecked(index: number) {
    resetAllPulley()
    chooseBar()

    function resetAllPulley() {
      if (!selectedAllFreeData) return

      const FAllFreeSelectedData: IAllFreeDataSelect = {
        index: selectedAllFreeData.index,
        allFree_insensitive: selectedAllFreeData.allFree_insensitive,
        selected: false,
      }

      setSelectedAllFreeData(FAllFreeSelectedData)
    }
    function chooseBar() {
      if (!selectedBar) return

      const copyData = [...selectedBar]

      const indeex = copyData.findIndex((v) => v.index === index)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedBar(copyData)
    }
  }

  async function handleSetWeightChecked(index: number) {
    resetAllPulley()
    chooseWeight()

    function resetAllPulley() {
      if (!selectedAllFreeData) return

      const FAllFreeSelectedData: IAllFreeDataSelect = {
        index: selectedAllFreeData.index,
        allFree_insensitive: selectedAllFreeData.allFree_insensitive,
        selected: false,
      }

      setSelectedAllFreeData(FAllFreeSelectedData)
    }

    function chooseWeight() {
      if (!selectedWeight) return

      const copyData = [...selectedWeight]

      const indeex = copyData.findIndex((v) => v.index === index)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedWeight(copyData)
    }
  }

  async function handleSetOtherChecked(index: number) {
    resetAllPulley()
    chooseOther()

    function resetAllPulley() {
      if (!selectedAllFreeData) return

      const FAllFreeSelectedData: IAllFreeDataSelect = {
        index: selectedAllFreeData.index,
        allFree_insensitive: selectedAllFreeData.allFree_insensitive,
        selected: false,
      }

      setSelectedAllFreeData(FAllFreeSelectedData)
    }

    function chooseOther() {
      if (!selectedOther) return

      const copyData = [...selectedOther]

      const indeex = copyData.findIndex((v) => v.index === index)

      if (indeex === -1) return

      copyData[indeex] = {
        ...copyData[indeex],
        selected: !copyData[indeex].selected,
      }

      setSelectedOther(copyData)
    }
  }

  async function handleUpdateInfo() {
    if (!selectedBench || !selectedBar || !selectedWeight || !selectedOther)
      return
    if (!selectedAllFreeData) return

    const formattedBenchDataa: IBenchDataSelect = {
      index: selectedAllFreeData.index,
      bench_insensitive: selectedAllFreeData.allFree_insensitive,
      selected: selectedAllFreeData.selected,
    }
    const formattedBarDataa: IBarDataSelect = {
      index: selectedAllFreeData.index,
      bar_insensitive: selectedAllFreeData.allFree_insensitive,
      selected: selectedAllFreeData.selected,
    }

    const formattedWeightDataa: IWeightDataSelect = {
      index: selectedAllFreeData.index,
      weight_insensitive: selectedAllFreeData.allFree_insensitive,
      selected: selectedAllFreeData.selected,
    }
    const formattedOtherDataa: IOtherDataSelect = {
      index: selectedAllFreeData.index,
      other_insensitive: selectedAllFreeData.allFree_insensitive,
      selected: selectedAllFreeData.selected,
    }
    const copyBenchSelectedData: IBenchDataSelect[] = [...selectedBench]
    const copyBarSelectedData: IBarDataSelect[] = [...selectedBar]
    const copyWeightSelectedData: IWeightDataSelect[] = [...selectedWeight]
    const copyOtherSelectedData: IOtherDataSelect[] = [...selectedOther]

    copyBenchSelectedData.push(formattedBenchDataa)
    copyBarSelectedData.push(formattedBarDataa)
    copyWeightSelectedData.push(formattedWeightDataa)
    copyOtherSelectedData.push(formattedOtherDataa)

    const formattedBench = copyBenchSelectedData
      .filter((v) => v.selected)
      .map((item) => ({
        bench_insensitive: {
          'pt-br': item.bench_insensitive['pt-br'],
          us: item.bench_insensitive.us,
        },
      }))

    const formattedBar = copyBarSelectedData
      .filter((v) => v.selected)
      .map((item) => ({
        bar_insensitive: {
          'pt-br': item.bar_insensitive['pt-br'],
          us: item.bar_insensitive.us,
        },
      }))

    const formattedWeight = copyWeightSelectedData
      .filter((v) => v.selected)
      .map((item) => ({
        weight_insensitive: {
          'pt-br': item.weight_insensitive['pt-br'],
          us: item.weight_insensitive.us,
        },
      }))

    const formattedOther = copyOtherSelectedData
      .filter((v) => v.selected)
      .map((item) => ({
        other_insensitive: {
          'pt-br': item.other_insensitive['pt-br'],
          us: item.other_insensitive.us,
        },
      }))

    const data: IFreeSelectItem = {
      barSelectData: formattedBar,
      benchSelectData: formattedBench,
      weightSelectData: formattedWeight,
      otherSelectData: formattedOther,
    }
    await updateUserFreePreffer(data).then(() => {
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
      const { freeData } = userEquipaments

      const freeDefaultSelectData = await fetchFreeOptionData()
      if (!freeDefaultSelectData) return
      const { data } = freeDefaultSelectData

      const allFreeData = {
        allFree_insensitive: {
          'pt-br': `todos`,
          us: `all`,
        },
      }

      const userBarData =
        freeData && freeData.data && freeData.data.barSelectData
      const userBenchData =
        freeData && freeData.data && freeData.data.benchSelectData
      const userWeightData =
        freeData && freeData.data && freeData.data.weightSelectData
      const userOtherData =
        freeData && freeData.data && freeData.data.otherSelectData

      let formattedAllFreeData = {} as IAllFreeDataSelect // Ajustado para ser uma lista

      let formattedBarData: IBarDataSelect[] = []
      let formattedBenchData: IBenchDataSelect[] = []
      let formattedWeightData: IWeightDataSelect[] = []
      let formattedOtherData: IOtherDataSelect[] = []

      if (data) {
        if (!userBarData) return
        const findFree = userBarData.find(
          (val) =>
            selectedLanguage &&
            val.bar_insensitive[selectedLanguage] ===
              allFreeData.allFree_insensitive[selectedLanguage],
        )

        formattedAllFreeData = findFree
          ? {
              allFree_insensitive: allFreeData.allFree_insensitive,
              index: 0,
              selected: true,
            }
          : {
              allFree_insensitive: allFreeData.allFree_insensitive,
              index: 0,
              selected: false,
            }

        formattedBarData = data.barSelectData.map((v, index) => {
          let findIt
          if (userBarData && selectedLanguage) {
            findIt = userBarData.find(
              (val) =>
                val.bar_insensitive[selectedLanguage] ===
                v.bar_insensitive[selectedLanguage],
            )
          }

          if (findIt) {
            return {
              bar_insensitive: v.bar_insensitive,
              index,
              selected: true,
            }
          } else {
            return {
              bar_insensitive: v.bar_insensitive,
              index,
              selected: false,
            }
          }
        })

        formattedBenchData = data.benchSelectData.map((v, index) => {
          let findIt
          if (userBenchData && selectedLanguage) {
            findIt = userBenchData.find(
              (val) =>
                val.bench_insensitive[selectedLanguage] ===
                v.bench_insensitive[selectedLanguage],
            )
          }

          if (findIt) {
            return {
              bench_insensitive: v.bench_insensitive,
              index,
              selected: true,
            }
          } else {
            return {
              bench_insensitive: v.bench_insensitive,
              index,
              selected: false,
            }
          }
        })

        formattedWeightData = data.weightSelectData.map((v, index) => {
          let findIt
          if (userWeightData && selectedLanguage) {
            findIt = userWeightData.find(
              (val) =>
                val.weight_insensitive[selectedLanguage] ===
                v.weight_insensitive[selectedLanguage],
            )
          }

          if (findIt) {
            return {
              weight_insensitive: v.weight_insensitive,
              index,
              selected: true,
            }
          } else {
            return {
              weight_insensitive: v.weight_insensitive,
              index,
              selected: false,
            }
          }
        })

        formattedOtherData = data.otherSelectData.map((v, index) => {
          let findIt
          if (userOtherData && selectedLanguage) {
            findIt = userOtherData.find(
              (val) =>
                val.other_insensitive[selectedLanguage] ===
                v.other_insensitive[selectedLanguage],
            )
          }

          if (findIt) {
            return {
              other_insensitive: v.other_insensitive,
              index,
              selected: true,
            }
          } else {
            return {
              other_insensitive: v.other_insensitive,
              index,
              selected: false,
            }
          }
        })
      }

      setSelectedAllFreeData(formattedAllFreeData)

      setSelectedBar(formattedBarData)
      setSelectedBench(formattedBenchData)
      setSelectedWeight(formattedWeightData)
      setSelectedOther(formattedOtherData)
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
            <SettingsWrapper>
              <BackButton
                onPress={handleGoBack}
                changeColor
                disabled={isWaitingApiResponse}
              />
            </SettingsWrapper>
            <ListName>{dataType}</ListName>
            <Body>
              <ScrollView
                contentContainerStyle={{ gap: 64 }}
                showsVerticalScrollIndicator={false}
              >
                {selectedBench && (
                  <ListTitle>Selecionar Tipos de Bancos</ListTitle>
                )}
                <ListWrapper>
                  <ListSubTitle>Tenho tudo</ListSubTitle>

                  {selectedAllFreeData && (
                    <ButtonWrapper
                      key={selectedAllFreeData.index}
                      onPress={() => handleSetAllFreeChecked()}
                    >
                      <ContentWrapper>
                        <ItemTitle>
                          {selectedAllFreeData &&
                            selectedLanguage &&
                            selectedAllFreeData.allFree_insensitive &&
                            selectedAllFreeData.allFree_insensitive[
                              selectedLanguage
                            ]}
                        </ItemTitle>

                        <IconWrapper>
                          {selectedAllFreeData.selected && (
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
                  {selectedBench && (
                    <ListSubTitle>Bancos Disponíveis</ListSubTitle>
                  )}
                  {selectedBench &&
                    selectedBench.map((v) => {
                      return (
                        <ButtonWrapper
                          key={v.index}
                          onPress={() => handleSetBenchChecked(v.index)}
                        >
                          <ContentWrapper>
                            <ItemTitle>
                              {v &&
                                selectedLanguage &&
                                v.bench_insensitive &&
                                v.bench_insensitive[selectedLanguage]}
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
                  {selectedBar && (
                    <ListSubTitle>Barras Disponíveis</ListSubTitle>
                  )}
                  {selectedBar &&
                    selectedBar.map((va) => {
                      return (
                        <ButtonWrapper
                          key={va.index}
                          onPress={() => handleSetBarChecked(va.index)}
                        >
                          <ContentWrapper>
                            <ItemTitle>
                              {va &&
                                selectedLanguage &&
                                va.bar_insensitive &&
                                va.bar_insensitive[selectedLanguage]}
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

                <ListWrapper>
                  {selectedWeight && (
                    <ListSubTitle>Pesos Disponíveis</ListSubTitle>
                  )}
                  {selectedWeight &&
                    selectedWeight.map((va) => {
                      return (
                        <ButtonWrapper
                          key={va.index}
                          onPress={() => handleSetWeightChecked(va.index)}
                        >
                          <ContentWrapper>
                            <ItemTitle>
                              {va &&
                                selectedLanguage &&
                                va.weight_insensitive &&
                                va.weight_insensitive[selectedLanguage]}
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

                <ListWrapper>
                  {selectedOther && (
                    <ListSubTitle>Outros Disponíveis</ListSubTitle>
                  )}

                  {selectedOther &&
                    selectedOther.map((va) => {
                      return (
                        <ButtonWrapper
                          key={va.index}
                          onPress={() => handleSetOtherChecked(va.index)}
                        >
                          <ContentWrapper>
                            <ItemTitle>
                              {va &&
                                selectedLanguage &&
                                va.other_insensitive &&
                                va.other_insensitive[selectedLanguage]}
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
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
