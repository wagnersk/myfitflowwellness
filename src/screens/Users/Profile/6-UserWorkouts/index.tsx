import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  BackHandler,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '../../../../../assets/back.png'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ListWrapper,
  IconWrapper,
  ContainerWrapper,
  ContainerTittle,
  MonthYearACTMessage,
  CardsWrapper,
  ContainerTittleWrapper,
  CardTittle,
  OpenSettingsButton,
  CardDate,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import {
  IMyfitflowWorkoutInUseData,
  IMyWorkouts,
  IptBrUs,
} from '@hooks/authTypes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PlanCard } from './Components/PlanCard'
import Gear from '@assets/Gear.svg'
import { WorkoutUserEditWorkoutModal } from '@components/Modals/WorkoutUserEditWorkoutModal'
import { formatTimestampToDate } from '@utils/formatTimestampToDate'
import { CTAButton } from '@components/Buttons/CTAButton'
import { addWeeksToTimestamp } from '@utils/calculeEndDateWithWeeks'

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}
export interface IModalStateWorkoutLogData {
  isOpenModalEditWorkout: boolean
  activeWeightIndex: number
}

export function UserWorkouts() {
  const {
    user,
    isWaitingApiResponse,
    myWorkout,
    updateStartAndEndDateFromMyWorkoutInCache,
    resetAllStartAndEndDateFromMyWorkoutInCache,
    updateMyWorkoutInCache,
  } = useAuth()
  const [isOpenSettingsMode, setIsOpenSettingsMode] = useState(false)
  const [defaultModalState, setDefaultModalState] =
    useState<IModalStateWorkoutLogData | null>(null)

  const [currentWorkout, setCurrentWorkout] =
    useState<IMyfitflowWorkoutInUseData | null>(null)

  const [nextWorkouts, setNextWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >([])
  const [isDataOrderChanged, setIsDataOrderChanged] = useState(false)
  const [workouts, setWorkouts] = useState<IMyWorkouts | null>(myWorkout)

  // console.log(` myWorkout`, myWorkout?.data)
  const navigation = useNavigation()
  function handleGoBack() {
    if (isDataOrderChanged) {
      Alert.alert(
        'Alterações não salvas',
        'Você tem alterações não salvas. Deseja realmente voltar e perder a nova organização?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Salvar',
            onPress: () => [saveNewOrderModal(workouts), navigation.goBack()],
          },
        ],
        { cancelable: false },
      )
    } else {
      navigation.goBack()
    }
  }

  async function handleOnPressWorkout(index: number) {
    console.log(`in`)
    setDefaultModalState((prev) => ({
      ...prev,
      isOpenModalEditWorkout: true,
      activeWeightIndex: index,
    }))
  }

  async function handleDeleteWorkout(index: number) {
    Alert.alert(
      'Deseja deletar o treino?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            if (!workouts) return
            const copyWorkouts = { ...workouts }
            copyWorkouts.data.splice(index, 1)

            setDefaultModalState((prev) => ({
              ...prev,
              isOpenModalEditWorkout: false,
              activeWeightIndex: 0,
            }))

            if (index === 0) {
              const getWorkoutInUse = copyWorkouts.data[0].data
              console.log(`getWorkoutInUse`, getWorkoutInUse)
              updateStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse, 0)
              // recomecar a contagem do treino
            }

            // se o q eu deletei foi o primeiro
            // entao eu recomeco a contagem do trein otbm

            // hook que salva no cache
            // primeiro ver se os index estao mudando corretamente
            // caso exclua o ultimo para nao travar

            updateMyWorkoutInCache(copyWorkouts)
          },
        },
      ],
      { cancelable: false },
    )
  }

  function handleMoveUp(index: number) {
    if (index === 0) return
    setWorkouts((prevWorkouts) => {
      if (!prevWorkouts) return null
      const copyWorkouts = { ...prevWorkouts }
      const { data } = copyWorkouts

      if (!data || data.length === 0)
        return prevWorkouts

        // Troca as posições dos itens
      ;[data[index], data[index - 1]] = [data[index - 1], data[index]]

      console.log(`copyWorkouts`, workouts)

      return copyWorkouts
    })

    setIsDataOrderChanged(true)
  }

  function handleMoveDown(index: number) {
    setWorkouts((prevWorkouts) => {
      if (!prevWorkouts) return null
      const copyWorkouts = { ...prevWorkouts }
      const { data } = copyWorkouts

      if (!data || data.length === 0 || index === data.length - 1)
        return prevWorkouts

        // Troca as posições dos itens
      ;[data[index], data[index + 1]] = [data[index + 1], data[index]]

      return copyWorkouts
    })
    setIsDataOrderChanged(true)
  }

  function handleOpenSettingsMode() {
    setIsOpenSettingsMode((prev) => !prev)
  }

  function closeModal() {
    setDefaultModalState((prevState) => ({
      ...prevState,
      isOpenModalEditWorkout: false,
      activeWeightIndex: prevState?.activeWeightIndex ?? 0,
    }))
  }

  function deleteWorkoutCounterDate(data: IMyWorkouts | null) {
    if (!data) return

    Alert.alert(
      'Aviso',
      'Todos os dados serão perdidos. Deseja continuar?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            const getWorkoutInUse = data.data[0].data
            console.log(`getWorkoutInUse`, getWorkoutInUse)
            resetAllStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse)
          },
        },
      ],
      { cancelable: false },
    )
  }

  function startWorkoutCounterDate(data: IMyWorkouts | null) {
    // apenas reorganizar a ordem dos treinos
    // hook que starta o primeiro
    if (!data) return

    const dateNow = new Date().getTime()

    const getWorkoutInUse = data.data[0].data
    console.log(`getWorkoutInUse`, getWorkoutInUse)
    console.log(`dateNow`, dateNow)
    updateStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse, dateNow)
  }

  function saveNewOrderModal(data: IMyWorkouts | null) {
    /* 
    
    quando deleta eu preciso se tiver o primario ja iniciado , zerar ele */
    Alert.alert(
      'Aviso',
      'Você não pode alterar a ordem dos treinos antes de iniciar a contagem. Deseja iniciar a contagem do treino?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Iniciar',
          onPress: () => [
            startWorkoutCounterDate(data),
            setIsDataOrderChanged(false),
            setIsOpenSettingsMode(false),
            data?.data[0].workoutStartAt !== 0 &&
              onDeleteIfAlreadyStarted(data),
          ],
        },
      ],
      { cancelable: false },
    )
    function onDeleteIfAlreadyStarted(data: IMyWorkouts | null) {
      if (!data) return
      const getWorkoutInUse = data.data[0].data
      resetAllStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse)
    }
    setIsDataOrderChanged(false)
    setIsOpenSettingsMode(false)
    // updateMyWorkoutInCache(data)

    // apenas reorganizar a ordem dos treinos
  }

  useEffect(() => {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  useEffect(() => {
    if (workouts?.data) {
      setCurrentWorkout(workouts.data[0])
      setNextWorkouts(workouts.data.slice(1))
    }
  }, [workouts, myWorkout])

  useEffect(() => {
    if (workouts) {
      setWorkouts(myWorkout)
    }
  }, [workouts, myWorkout])

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

                <Body>
                  <ContainerTittleWrapper>
                    <ContainerTittle>Meus Treinos</ContainerTittle>
                    <IconWrapper>
                      <OpenSettingsButton onPress={handleOpenSettingsMode}>
                        <Gear fill={'blue'} height={32} width={32} />
                      </OpenSettingsButton>
                    </IconWrapper>
                  </ContainerTittleWrapper>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      <ContainerWrapper>
                        <MonthYearACTMessage>
                          <CardTittle>Treino atual</CardTittle>
                          <CardDate>
                            {currentWorkout?.workoutStartAt === 0
                              ? 'Treino ainda não iniciado'
                              : `${formatTimestampToDate(
                                  currentWorkout?.workoutStartAt ?? 0,
                                )} - ${formatTimestampToDate(
                                  currentWorkout?.workoutEndsAt ?? 0,
                                )}`}
                          </CardDate>
                        </MonthYearACTMessage>
                        <CardsWrapper>
                          {currentWorkout && currentWorkout.data && (
                            <PlanCard
                              data={currentWorkout.data}
                              selectedLanguage={
                                user?.selectedLanguage || 'pt-br'
                              }
                              onPress={() => handleOnPressWorkout(0)}
                              onMoveUp={() => handleMoveUp(0)}
                              onMoveDown={() => handleMoveDown(0)}
                              isOpenSettingsMode={isOpenSettingsMode}
                              index={0}
                              length={0}
                            />
                          )}
                        </CardsWrapper>
                        <MonthYearACTMessage>
                          <CardTittle>Próximos treinos</CardTittle>
                        </MonthYearACTMessage>
                        <CardsWrapper>
                          {nextWorkouts &&
                            myWorkout &&
                            nextWorkouts.map((v, i) => (
                              <PlanCard
                                key={i + 1}
                                data={v.data || null}
                                selectedLanguage={
                                  user?.selectedLanguage || 'pt-br'
                                }
                                onPress={() => handleOnPressWorkout(i + 1)}
                                onMoveUp={() => handleMoveUp(i + 1)}
                                onMoveDown={() => handleMoveDown(i + 1)}
                                index={i + 1}
                                isOpenSettingsMode={isOpenSettingsMode}
                                length={myWorkout.data.length}
                              />
                            ))}
                        </CardsWrapper>
                      </ContainerWrapper>
                    </ListWrapper>
                  </ScrollView>
                  {/*    {currentWorkout?.workoutStartAt === 0
                              ? 'Treino ainda não iniciado'
                              : `${formatTimestampToDate(
                                  currentWorkout?.workoutStartAt ?? 0,
                                )} - ${formatTimestampToDate(
                                  currentWorkout?.workoutEndsAt ?? 0,
                                )}`} */}
                  {!isOpenSettingsMode && (
                    <CTAButton
                      changeColor={currentWorkout?.workoutStartAt === 0}
                      style={{ marginBottom: 54 }}
                      onPress={() =>
                        currentWorkout?.workoutStartAt === 0
                          ? startWorkoutCounterDate(workouts)
                          : deleteWorkoutCounterDate(workouts)
                      }
                      title={
                        currentWorkout?.workoutStartAt === 0
                          ? 'Iniciar contagem do treino'
                          : 'Recomeçar contagem do treino'
                      }
                      loading={false}
                      enabled={!false}
                    />
                  )}

                  {isOpenSettingsMode && (
                    <CTAButton
                      style={{ marginBottom: 54 }}
                      onPress={() => saveNewOrderModal(workouts)}
                      changeColor
                      title={
                        isOpenSettingsMode
                          ? 'Salvar nova ordem'
                          : 'Começar treino'
                      }
                      loading={false}
                      enabled={!false}
                    />
                  )}
                </Body>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
      <Modal
        visible={defaultModalState?.isOpenModalEditWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal()}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0] && (
          <WorkoutUserEditWorkoutModal
            handleDeleteWorkout={handleDeleteWorkout}
            closeModal={() => closeModal()}
            data={myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0]}
            activeIndex={defaultModalState?.activeWeightIndex ?? 0}
            selectedLanguage={user?.selectedLanguage || 'pt-br'}
            isPrimaryWorkout={defaultModalState?.activeWeightIndex === 0}
          />
        )}
      </Modal>
    </Container>
  )
}
