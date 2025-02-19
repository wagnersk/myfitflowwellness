import React, { act, useEffect, useState } from 'react'
import {
  ImageBackground,
  BackHandler,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native'

import { useNavigation, useTheme } from '@react-navigation/native'

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
import { IMyfitflowWorkoutInUse, IMyWorkouts, IptBrUs } from '@hooks/authTypes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PlanCard } from './Components/PlanCard'
import Gear from '@assets/Gear.svg'
import { WorkoutUserEditWorkoutModal } from '@components/Modals/WorkoutUserEditWorkoutModal'
import { formatTimestampToDate } from '@utils/formatTimestampToDate'
import { CTAButton } from '@components/Buttons/CTAButton'

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
  const { user, isWaitingApiResponse, myWorkout } = useAuth()
  const [isOpenSettingsMode, setIsOpenSettingsMode] = useState(false)
  const [defaultModalState, setDefaultModalState] =
    useState<IModalStateWorkoutLogData | null>(null)

  console.log(` myWorkout`, myWorkout?.data)
  const navigation = useNavigation()
  const theme = useTheme()
  function handleGoBack() {
    navigation.goBack()
  }
  /*
  unit 4 exercice 2 e 3
  
    TODO: ajustar agora o lance de trocar a posicao dos treinos ,
         - deletar e
         - salvar em cache a nova atualizacao

         

*/
  const [workouts, setWorkouts] = useState<IMyWorkouts | null>(myWorkout)

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
            // hook que salva no cache
            // primeiro ver se os index estao mudando corretamente
            // caso exclua o ultimo para nao travar

            setWorkouts(copyWorkouts)
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

      return copyWorkouts
    })
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
  function saveModal() {
    setIsOpenSettingsMode(false)

    console.log(workouts, 'workouts')
    // enviar os dadso para o cache , minha nova organizacaop
    // ver apenas agora como salvar a data de cada um Modulada
    // is to eh cada item da fila vai ter uma data inicio e fim
    // e a data de inicio do proximo vai ser a data de fim do anterior
    // podendo pular final de semana ou mexer no calendario dps
    // primeiro vou por a data de inicio e fim de cada um
    // apenas rodar a roleta q muda a data de inicio e fim
  }

  const currentWorkout = workouts?.data[0]
  const nextWorkouts = workouts?.data.slice(1)

  useEffect(() => {
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
                            {formatTimestampToDate(
                              currentWorkout?.workoutStartAt ?? 0,
                            )}{' '}
                            -{' '}
                            {formatTimestampToDate(
                              currentWorkout?.workoutEndsAt ?? 0,
                            )}
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
                  {isOpenSettingsMode && (
                    <CTAButton
                      style={{ marginBottom: 54 }}
                      onPress={saveModal}
                      changeColor
                      title="Salvar"
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
