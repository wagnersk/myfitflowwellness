import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  BackHandler,
  SafeAreaView,
  Alert,
  Modal,
  Dimensions,
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
  SelectScreenWrapper,
  SelectScreenButton,
  SelectScreenButtonText,
  Underline,
  RowWrapper,
  SelectScreenWrapper2,
  SelectScreenButton2,
  SelectScreenButtonText2,
  Underline2,
  RowWrapper2,
  TittleWrapper,
} from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import {
  IMyfitflowWorkoutInUseData,
  IMyWorkouts,
  IptBrUs,
  IWorkoutOrder,
} from '@hooks/authTypes'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import Gear from '@assets/Gear.svg'
import { CTAButton } from '@components/Buttons/CTAButton'
import { useTheme } from 'styled-components'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import TotalWorkoutContainer from './Components/Total/TotalWorkoutContainer'
import SharedWorkoutContainer from './Components/Shared/SharedWorkoutContainer'
import InUseWorkoutContainer from './Components/InUse/InUseWorkoutContainer'

import { WorkoutUserEditTotalWorkoutModal } from '@components/Modals/WorkoutUserEditTotalWorkoutModal'
import { SharedWorkoutsCardModal } from '@components/Modals/SharedWorkoutsCardModal'
import { ExpiredWorkoutsCardModal } from '@components/Modals/ExpiredWorkoutsCardModal'
import {
  addDaysToTimestamp,
  addWeeksToTimestamp,
} from '@utils/calculeEndDateWithWeeks'
import { WorkoutUserActiveWorkoutModal } from '@components/Modals/WorkoutUserActiveWorkoutModal'

export interface IUserSelect {
  id: number
  tittle: IptBrUs
  byWeekNumber?: number
  bySessionRangeNumber?: number[]
  selected: boolean
}
export interface IModalStateWorkoutLogData {
  isOpenModalEditTotalWorkout: boolean
  isOpenModalSharedWorkout: boolean
  isOpenModalActiveWorkout: boolean
  isOpenModalExpiredWorkout: boolean
  activeWeightIndex: number
}

export function UserWorkouts() {
  const {
    user,
    isWaitingApiResponse,
    myWorkout,
    updateStartAndEndDateFromMyWorkoutInCache,
    updateStartAndEndDateFromMyWorkoutInCacheExcludeMainWorkoutFromList,
    resetAllStartAndEndDateFromMyWorkoutInCache,
    updateMyWorkoutInCache,
  } = useAuth()

  const [isOpenSettingsMode, setIsOpenSettingsMode] = useState(false)

  const [defaultModalState, setDefaultModalState] =
    useState<IModalStateWorkoutLogData | null>(null)

  const [isDataOrderChanged, setIsDataOrderChanged] = useState(false)
  const [showScreen, setShowScreen] = useState<
    'Em uso' | 'Meus treinos' | 'Compartilhado'
  >('Em uso')
  const [showScreen2, setShowScreen2] = useState<'Ativos' | 'Expirados'>(
    'Ativos',
  )

  const [workouts, setWorkouts] = useState<IMyWorkouts | null>(myWorkout)
  const [activeworkouts, setActiveWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)
  const [expiredworkouts, setExpiredWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)
  const [sharedWorkouts, setSharedWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)

  const theme = useTheme()

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
            onPress: () => [saveNewOrderModal(workouts)],
          },
        ],
        { cancelable: false },
      )
    } else {
      navigation.goBack()
    }
  }

  async function handleOnPressTotalWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    setDefaultModalState((prev) => ({
      ...prev,
      isOpenModalEditTotalWorkout: true,
      isOpenModalSharedWorkout: false,
      isOpenModalActiveWorkout: false,
      isOpenModalExpiredWorkout: false,
      activeWeightIndex: index,
    }))
  }

  async function handleOnPressExpiredInUseWorkout(id: string) {
    console.log(`handleOnPressExpiredInUseWorkout`, id)
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    setDefaultModalState((prev) => ({
      ...prev,
      isOpenModalEditTotalWorkout: false,
      isOpenModalSharedWorkout: false,
      isOpenModalActiveWorkout: false,
      isOpenModalExpiredWorkout: true,

      activeWeightIndex: index,
    }))
  }

  async function handleOnPressActiveWorkout(id: string) {
    console.log(`handleOnPressActiveWorkout`, id)

    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    setDefaultModalState((prev) => ({
      ...prev,
      isOpenModalEditTotalWorkout: false,
      isOpenModalSharedWorkout: false,
      isOpenModalActiveWorkout: true,
      isOpenModalExpiredWorkout: false,

      activeWeightIndex: index,
    }))
  }

  async function handleOnPressSendWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    setDefaultModalState((prev) => ({
      ...prev,
      isOpenModalEditTotalWorkout: false,
      isOpenModalSharedWorkout: true,
      isOpenModalActiveWorkout: false,
      isOpenModalExpiredWorkout: false,
      activeWeightIndex: index,
    }))
  }

  async function handleStartWorkoutCounterDate(index: number) {
    if (index !== 0) return

    startWorkoutCounterDate()
  }

  async function handleUseWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    Alert.alert(
      'Deseja usar o treino?',
      'Será adicionado ao final da lista de treinos em uso.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ativar',
          onPress: () => {
            const copyWorkouts = {
              userId: workouts?.userId || '',
              createdAt: workouts?.createdAt || 0,
              updatedAt: workouts?.updatedAt || 0,
              data: workouts?.data || [],
              dataOrder: workouts?.dataOrder || [],
            }
            if (!copyWorkouts) return
            if (!copyWorkouts.data) return
            if (!copyWorkouts.dataOrder) return

            const dateNow = new Date().getTime()
            let startDate = dateNow

            if (copyWorkouts.dataOrder.length > 0) {
              const lastWorkout =
                copyWorkouts.dataOrder[copyWorkouts.dataOrder.length - 1]

              const nextDayTimestamp = addDaysToTimestamp(
                lastWorkout.workoutEndsAt,
                1,
              )
              startDate = nextDayTimestamp
            }
            copyWorkouts.dataOrder.push({
              id: copyWorkouts.data[index].id,
              createdAt: dateNow,
              updatedAt: dateNow,
              workoutStartAt: startDate,
              workoutEndsAt: addWeeksToTimestamp(
                startDate,
                copyWorkouts.data[index].data.workoutPeriod.periodNumber,
              ),
            })

            setWorkouts(copyWorkouts)

            setDefaultModalState((prev) => ({
              ...prev,
              isOpenModalSharedWorkout: false,
              isOpenModalEditTotalWorkout: false,
              isOpenModalActiveWorkout: false,
              isOpenModalExpiredWorkout: false,
              activeWeightIndex: 0,
            }))
          },
        },
      ],
      { cancelable: false },
    )
  }

  async function handleShareWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    Alert.alert(
      workouts?.data[index].isShared
        ? 'Deseja parar o compartilhamento do treino?'
        : 'Deseja compartilhar o treino?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Compartilhar',
          onPress: () => {
            const copyWorkouts = {
              userId: workouts?.userId || '',
              createdAt: workouts?.createdAt || 0,
              updatedAt: workouts?.updatedAt || 0,
              data: workouts?.data || [],
              dataOrder: workouts?.dataOrder || [],
            }
            if (!copyWorkouts) return

            console.log(`Ativando treino:`, copyWorkouts.data[index])

            copyWorkouts.data[index].isShared =
              !copyWorkouts.data[index].isShared

            setWorkouts(copyWorkouts)
          },
        },
      ],
      { cancelable: false },
    )
  }

  async function handleCancelShareWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    Alert.alert(
      'Deseja parar o compartilhamento do treino?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Compartilhar',
          onPress: () => {
            const copyWorkouts = {
              userId: workouts?.userId || '',
              createdAt: workouts?.createdAt || 0,
              updatedAt: workouts?.updatedAt || 0,
              data: workouts?.data || [],
              dataOrder: workouts?.dataOrder || [],
            }
            if (!copyWorkouts) return

            console.log(`Ativando treino:`, copyWorkouts.data[index])

            copyWorkouts.data[index].isShared = false

            setWorkouts(copyWorkouts)

            setDefaultModalState((prev) => ({
              ...prev,
              isOpenModalSharedWorkout: false,
              isOpenModalEditTotalWorkout: false,
              isOpenModalActiveWorkout: false,
              isOpenModalExpiredWorkout: false,
              activeWeightIndex: 0,
            }))
          },
        },
      ],
      { cancelable: false },
    )
  }

  async function handleQRcodeWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    console.log(`usar lib do expo para criar qrcode handleQRcodeWorkout`, id)
  }

  async function handleSendWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    /* TODO 1 - verificar se o treino esta com compartilhhamento ativo , se nao estiver
chamar alerta que apenas dando ok eu consigo ir pra tela de escolher pra onde quero compartrilhar o link
( whatsapp ) ...
 
esse link leva pro meu perfil e ao abrir ele deve chamar o app com a confirmacao de aceitar o treino copiado


*/

    console.log(`handleSendWorkout , fazer Todo send e edit  e cancel`)

    const isAlreadyShared = workouts?.data[index].isShared

    if (!isAlreadyShared) {
      Alert.alert(
        'Deseja ativar o treino?',
        '',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Deletar',
            onPress: () => {
              // TODO 2 logiaca que ativa o treino
              /*   if (!workouts) return
              const copyWorkouts = { ...workouts }
              copyWorkouts.data.splice(index, 1)

              setDefaultModalState((prev) => ({
                ...prev,
                isOpenModalEditTotalWorkout: false,
                isOpenModalSharedWorkout: false,
                isOpenModalActiveWorkout: false,
                isOpenModalExpiredWorkout: false,
                activeWeightIndex: 0,
              }))

              if (index === 0) {
                const getWorkoutInUse = copyWorkouts.data[0].data
                console.log(`getWorkoutInUse`, getWorkoutInUse)
                updateStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse, 0)
              }

              updateMyWorkoutInCache(copyWorkouts) */
            },
          },
        ],
        { cancelable: false },
      )
    }
  }

  async function handleDeleteWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

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
              isOpenModalEditTotalWorkout: false,
              isOpenModalSharedWorkout: false,
              isOpenModalActiveWorkout: false,
              isOpenModalExpiredWorkout: false,
              activeWeightIndex: 0,
            }))

            if (index === 0) {
              const getWorkoutInUse = copyWorkouts.data[0].data
              console.log(`getWorkoutInUse`, getWorkoutInUse)
              updateStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse, 0)
            }

            updateMyWorkoutInCache(copyWorkouts)
          },
        },
      ],
      { cancelable: false },
    )
  }

  function handleMoveUp(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    const isWorkoutAlreadyStarted = myWorkout?.data[0].workoutStartAt !== 0
    if (isWorkoutAlreadyStarted && index === 1) return
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

  function handleResetTimerUp(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    Alert.alert(
      'Reiniciar Contador',
      'Tem certeza que deseja reiniciar o contador do treino atual?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Reiniciar',
          onPress: () => {
            if (!myWorkout) return
            const getWorkoutInUse = myWorkout.data[0].data
            resetAllStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse)
            console.log(`Contador reiniciado para o treino no índice`, index)
          },
        },
      ],
      { cancelable: false },
    )
    // setIsDataOrderChanged(true)
  }

  function handleMoveDown(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
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

  async function handleActiveWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    const isActivedAndInUse = activeworkouts
      ? !!activeworkouts.find((va) => va.id === id && va.isInUse)
      : false

    if (isActivedAndInUse) return

    const isInUse = workouts?.data[index].isInUse
    Alert.alert(
      isInUse ? 'Deseja desativar o treino?' : 'Deseja ativar o treino?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ativar',
          onPress: () => {
            const copyWorkouts = {
              userId: workouts?.userId || '',
              createdAt: workouts?.createdAt || 0,
              updatedAt: workouts?.updatedAt || 0,
              data: workouts?.data || [],
              dataOrder: workouts?.dataOrder || [],
            }
            if (!copyWorkouts) return

            console.log(`Ativando treino:`, copyWorkouts.data[index])

            /* 
            logica que adicionar em dataOrder
            */

            copyWorkouts.data[index].isInUse = true

            setWorkouts(copyWorkouts)

            setDefaultModalState((prev) => ({
              ...prev,
              isOpenModalSharedWorkout: false,
              isOpenModalEditTotalWorkout: false,
              isOpenModalActiveWorkout: false,
              isOpenModalExpiredWorkout: false,
              activeWeightIndex: 0,
            }))
          },
        },
      ],
      { cancelable: false },
    )
  }

  async function handleCancelActiveWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    Alert.alert(
      'Deseja desativar o treino?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Desativar',
          onPress: () => {
            const copyWorkouts = {
              userId: workouts?.userId || '',
              createdAt: workouts?.createdAt || 0,
              updatedAt: workouts?.updatedAt || 0,
              data: workouts?.data || [],
              dataOrder: workouts?.dataOrder || [],
            }
            if (!copyWorkouts) return

            console.log(`Desativando treino:`, copyWorkouts.data[index])

            copyWorkouts.data[index].isInUse = false

            setWorkouts(copyWorkouts)

            setDefaultModalState((prev) => ({
              ...prev,
              isOpenModalSharedWorkout: false,
              isOpenModalEditTotalWorkout: false,
              isOpenModalActiveWorkout: false,
              isOpenModalExpiredWorkout: false,
              activeWeightIndex: 0,
            }))
          },
        },
      ],
      { cancelable: false },
    )
  }

  function closeModal(
    type: 'Em uso' | 'Meus treinos' | 'Compartilhado' | 'Expired' | 'Active',
  ) {
    if (type === 'Em uso') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalEditTotalWorkout: false,
        isOpenModalSharedWorkout: false,
        isOpenModalActiveWorkout: false,
        isOpenModalExpiredWorkout: false,
        activeWeightIndex: prevState?.activeWeightIndex ?? 0,
      }))
    }

    if (type === 'Meus treinos') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalEditTotalWorkout: false,
        isOpenModalSharedWorkout: false,
        isOpenModalActiveWorkout: false,
        isOpenModalExpiredWorkout: false,
        activeWeightIndex: prevState?.activeWeightIndex ?? 0,
      }))
    }
    if (type === 'Compartilhado') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalEditTotalWorkout: false,
        isOpenModalSharedWorkout: false,
        isOpenModalActiveWorkout: false,
        isOpenModalExpiredWorkout: false,
        activeWeightIndex: prevState?.activeWeightIndex ?? 0,
      }))
    }
    if (type === 'Expired') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalEditTotalWorkout: false,
        isOpenModalSharedWorkout: false,
        isOpenModalActiveWorkout: false,
        isOpenModalExpiredWorkout: false,
        activeWeightIndex: prevState?.activeWeightIndex ?? 0,
      }))
    }
    if (type === 'Active') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalEditTotalWorkout: false,
        isOpenModalSharedWorkout: false,
        isOpenModalActiveWorkout: false,
        isOpenModalExpiredWorkout: false,
        activeWeightIndex: prevState?.activeWeightIndex ?? 0,
      }))
    }
  }

  function deleteWorkoutCounterDate() {
    if (!myWorkout) return

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
            const getWorkoutInUse = myWorkout.data[0].data
            console.log(`getWorkoutInUse`, getWorkoutInUse)
            resetAllStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse)
          },
        },
      ],
      { cancelable: false },
    )
  }

  function startWorkoutCounterDate() {
    if (!myWorkout) return

    const dateNow = new Date().getTime()

    const getWorkoutInUse = myWorkout.data[0].data
    console.log(`getWorkoutInUse`, getWorkoutInUse)
    console.log(`dateNow`, dateNow)
    updateStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse, dateNow)
  }

  function saveNewOrderModal(data: IMyWorkouts | null) {
    if (!data) return
    if (!myWorkout) return
    const copyWorkouts = { ...myWorkout }
    setIsDataOrderChanged(false)
    setIsOpenSettingsMode(false)
    updateMyWorkoutInCache(copyWorkouts)

    const getWorkoutInUse = copyWorkouts.data[0].data
    updateStartAndEndDateFromMyWorkoutInCacheExcludeMainWorkoutFromList(
      getWorkoutInUse,
    )

    // updateStartAndEndDateFromMyWorkoutInCache(data?.data[0].data, 0)
    return
    /* 
    temos duas situacoes aqui

    1 treino ja comecou?
    quando deleta eu preciso se tiver o primario ja iniciado , zerar ele */
    /*    Alert.alert('Treino', 'Treino selecionado')
    if (!myWorkout) return
    const copyWorkouts = { ...myWorkout }
    updateMyWorkoutInCache(copyWorkouts) */
    const firstWorkoutAlreadyStarted = data?.data[0].workoutStartAt !== 0
    if (firstWorkoutAlreadyStarted) {
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
            onPress: () => [onDeleteIfAlreadyStarted(data)],
          },
        ],
        { cancelable: false },
      )
    } else {
      setIsDataOrderChanged(false)
      setIsOpenSettingsMode(false)
      if (!myWorkout) return
      const copyWorkouts = { ...myWorkout }
      updateMyWorkoutInCache(copyWorkouts)
    }

    function onDeleteIfAlreadyStarted(data: IMyWorkouts | null) {
      if (!data) return
      const getWorkoutInUse = data.data[0].data
      resetAllStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse)
      setIsDataOrderChanged(false)
      setIsOpenSettingsMode(false)
    }
  }

  useEffect(() => {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  useEffect(() => {
    if (workouts) {
      setWorkouts(myWorkout)

      const filterSharedWorkouts = workouts.data.filter((v) => v.isShared)
      setSharedWorkouts(filterSharedWorkouts)

      const filterInUseWorkouts = workouts.data.filter((v) => v.isInUse)

      console.log(`workouts.dataOrder`, workouts.dataOrder)

      // busca o q ta contido dentro do order
      const getActiveWorkouts: IMyfitflowWorkoutInUseData[] = []
      const getExpiredWorkouts: IMyfitflowWorkoutInUseData[] = []

      filterInUseWorkouts.forEach((workout) => {
        const active = workouts.dataOrder.find(
          (order) => order.id === workout.id,
        )

        if (active) return getActiveWorkouts.push(workout)
        if (!active) return getExpiredWorkouts.push(workout)
      })

      setActiveWorkouts(getActiveWorkouts) // ou o treino para aqui inUse true + estar no dataOrder
      setExpiredWorkouts(getExpiredWorkouts) // ou ele para aqui , inUse true + nao estar no dataOrder
    }
  }, [workouts, myWorkout, setShowScreen2])

  const screenWidth = Dimensions.get('window').width

  const paddingSize = 36
  const TAB_WIDTH = (screenWidth - paddingSize) / 3 // screenWidth / 2

  const paddingSize2 = 2
  const TAB_WIDTH2 = (screenWidth - paddingSize2) / 3 // screenWidth / 2
  const TABS: ('Em uso' | 'Meus treinos' | 'Compartilhado')[] = [
    'Em uso',
    'Meus treinos',
    'Compartilhado',
  ]
  const TABS2: ('Ativos' | 'Expirados')[] = ['Ativos', 'Expirados']

  const offset = useSharedValue<number>(0)
  const offset2 = useSharedValue<number>(50)
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))
  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [{ translateX: offset2.value }],
  }))

  function handlePress(tab: 'Em uso' | 'Meus treinos' | 'Compartilhado') {
    const newOffset = (() => {
      switch (tab) {
        case 'Em uso':
          return 0
        case 'Meus treinos':
          return TAB_WIDTH
        case 'Compartilhado':
          return TAB_WIDTH + TAB_WIDTH
        default:
          return 0
      }
    })()

    setShowScreen(tab)

    console.log(`newOffset`)
    console.log(newOffset)

    offset.value = withTiming(newOffset)
  }

  function handlePress2(tab: 'Ativos' | 'Expirados') {
    const newOffset = (() => {
      switch (tab) {
        case 'Ativos':
          return 50
        case 'Expirados':
          return screenWidth / 2 - 16

        default:
          return 0
      }
    })()

    setShowScreen2(tab)

    offset2.value = withTiming(newOffset)
  }

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
                <Body>
                  <ContainerTittleWrapper>
                    <SettingsWrapper>
                      <BackButton
                        onPress={handleGoBack}
                        changeColor
                        disabled={isWaitingApiResponse}
                      />
                    </SettingsWrapper>
                    <TittleWrapper>
                      <ContainerTittle>Treinos</ContainerTittle>
                    </TittleWrapper>
                    <IconWrapper>
                      <OpenSettingsButton onPress={handleOpenSettingsMode}>
                        <Gear
                          fill={theme.COLORS.BLUE_STROKE}
                          height={32}
                          width={32}
                        />
                      </OpenSettingsButton>
                    </IconWrapper>
                  </ContainerTittleWrapper>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <ListWrapper>
                      <SelectScreenWrapper>
                        <RowWrapper>
                          {TABS.map((tab) => (
                            <SelectScreenButton
                              key={tab}
                              onPress={() => handlePress(tab)}
                            >
                              <SelectScreenButtonText
                                isSelected={showScreen === tab}
                              >
                                {tab}
                              </SelectScreenButtonText>
                            </SelectScreenButton>
                          ))}
                        </RowWrapper>
                        <Underline
                          tabWidth={TAB_WIDTH}
                          style={animatedStyles}
                        />
                      </SelectScreenWrapper>
                      {showScreen === 'Em uso' && (
                        <>
                          <SelectScreenWrapper2>
                            <Underline2
                              tabWidth={screenWidth / 3}
                              style={animatedStyles2}
                            />
                            <RowWrapper2>
                              {TABS2.map((tab) => (
                                <SelectScreenButton2
                                  tabWidth={screenWidth / 3}
                                  key={tab}
                                  onPress={() => handlePress2(tab)}
                                >
                                  <SelectScreenButtonText2
                                    isSelected={showScreen2 === tab}
                                  >
                                    {tab}
                                  </SelectScreenButtonText2>
                                </SelectScreenButton2>
                              ))}
                            </RowWrapper2>
                          </SelectScreenWrapper2>

                          <InUseWorkoutContainer
                            data={workouts}
                            activeworkouts={activeworkouts}
                            expiredworkouts={expiredworkouts}
                            showScreen2={showScreen2}
                            user={user}
                            isOpenSettingsMode={isOpenSettingsMode}
                            handleOnPressExpiredInUseWorkout={
                              handleOnPressExpiredInUseWorkout
                            }
                            handleOnPressActiveInUseWorkout={
                              handleOnPressActiveWorkout
                            }
                          />
                        </>
                      )}
                      {showScreen === 'Meus treinos' && workouts && (
                        <TotalWorkoutContainer
                          data={workouts}
                          user={user}
                          handleOnPressTotalWorkout={handleOnPressTotalWorkout}
                        />
                      )}
                      {showScreen === 'Compartilhado' && workouts && (
                        <SharedWorkoutContainer
                          data={workouts}
                          sharedData={sharedWorkouts}
                          user={user}
                          handleOnPressSendWorkout={handleOnPressSendWorkout}
                        />
                      )}
                    </ListWrapper>
                  </ScrollView>
                  {/*        {!isOpenSettingsMode &&
                    showScreen === 'Em uso' &&
                    showScreen2 === 'Ativos' &&
                    workouts &&
                    workouts.dataOrder &&
                    workouts.dataOrder[0] &&
                    workouts.dataOrder[0].workoutStartAt === 0 && (
                      <CTAButton
                        changeColor={workouts.dataOrder[0].workoutStartAt === 0}
                        style={{ marginBottom: 54 }}
                        onPress={startWorkoutCounterDate}
                        title={'Iniciar contagem do treino'}
                        loading={false}
                        enabled={!false}
                      />
                    )}
                  {isOpenSettingsMode && isDataOrderChanged && (
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
                  )} */}
                </Body>
              </SafeAreaView>
            </SafeAreaProvider>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>

      {/* active */}
      <Modal
        visible={defaultModalState?.isOpenModalActiveWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('Em uso')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0] && (
          <WorkoutUserActiveWorkoutModal
            handleCancelShareWorkout={handleCancelShareWorkout}
            handleQRcodeWorkout={handleQRcodeWorkout}
            handleSendWorkout={handleSendWorkout}
            closeModal={() => closeModal('Em uso')}
            data={myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0]}
            activeIndex={defaultModalState?.activeWeightIndex ?? 0}
            selectedLanguage={user?.selectedLanguage || 'pt-br'}
            isPrimaryWorkout={defaultModalState?.activeWeightIndex === 0}
          />
        )}
      </Modal>

      {/* expired  */}
      <Modal
        visible={defaultModalState?.isOpenModalExpiredWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('Compartilhado')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0] && (
          <ExpiredWorkoutsCardModal
            handleUseWorkout={handleUseWorkout}
            handleCancelActiveWorkout={handleCancelActiveWorkout}
            closeModal={() => closeModal('Expired')}
            data={myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0]}
            activeIndex={defaultModalState?.activeWeightIndex ?? 0}
            selectedLanguage={user?.selectedLanguage || 'pt-br'}
            isPrimaryWorkout={defaultModalState?.activeWeightIndex === 0}
          />
        )}
      </Modal>

      {/* edit total */}
      <Modal
        visible={defaultModalState?.isOpenModalEditTotalWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('Meus treinos')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0] && (
          <WorkoutUserEditTotalWorkoutModal
            handleDeleteWorkout={handleDeleteWorkout}
            handleShareWorkout={handleShareWorkout}
            handleActiveWorkout={handleActiveWorkout}
            closeModal={() => closeModal('Meus treinos')}
            data={myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0]}
            activeIndex={defaultModalState?.activeWeightIndex ?? 0}
            selectedLanguage={user?.selectedLanguage || 'pt-br'}
            isPrimaryWorkout={defaultModalState?.activeWeightIndex === 0}
          />
        )}
      </Modal>

      {/* shared */}
      <Modal
        visible={defaultModalState?.isOpenModalSharedWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('Compartilhado')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {myWorkout?.data[defaultModalState?.activeWeightIndex ?? 0] && (
          <SharedWorkoutsCardModal
            handleCancelShareWorkout={handleCancelShareWorkout}
            handleQRcodeWorkout={handleQRcodeWorkout}
            handleSendWorkout={handleSendWorkout}
            closeModal={() => closeModal('Compartilhado')}
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
