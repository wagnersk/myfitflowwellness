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
} from '@hooks/authTypes'

import { SafeAreaProvider } from 'react-native-safe-area-context'
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
import { CTAButton } from '@components/Buttons/CTAButton'

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
    resetAllStartAndEndDateFromMyWorkoutInCache,
    updateMyWorkoutInCache,
    saveExerciseDataInCache,
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

  const screenWidth = Dimensions.get('window').width
  const paddingSize = 36
  const TAB_WIDTH = (screenWidth - paddingSize) / 3 // screenWidth / 2
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

  // console.log(` myWorkout`, myWorkout?.data)
  const navigation = useNavigation()

  function handleMoveUp(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

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

  function handleMoveWorkoutFromQueueToPrimary(id: string) {
    if (!workouts) return
    const index = workouts.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    /* fazer a logica  */
    Alert.alert(
      'Mover Treino para Primário',
      'Tem certeza que deseja mover este treino para o primário? Isso fará com que toda a contagem do treino atual seja perdida e uma nova contagem será iniciada.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Mover e Reiniciar',
          onPress: async () => {
            if (!workouts) return

            const updatedWorkouts = moveWorkoutToPrimary(index) // AQUI TA OK

            if (!updatedWorkouts) return

            const updatedWorkoutsWithNewStartAndEndDate =
              resetAllDatesFromExistingWorkout(updatedWorkouts)

            if (!updatedWorkoutsWithNewStartAndEndDate) return

            await updateMyWorkoutInCache(updatedWorkoutsWithNewStartAndEndDate)

            closeModal('Em uso')
          },
        },
      ],
      { cancelable: false },
    )

    function moveWorkoutToPrimary(index: number): IMyWorkouts | null {
      if (!workouts) return null
      /*   // Criar um novo array com o item movido para a primeira posição
      copyWorkouts.dataOrder = [
        orderItem,
        ...copyWorkouts.dataOrder.filter((_, i) => i !== index),
      ] */
      const copyWorkouts = { ...workouts }

      // Remove o treino da posição atual em dataOrder
      const [orderItem] = copyWorkouts.dataOrder.splice(index, 1)

      // Adiciona o treino na primeira posição em dataOrder
      copyWorkouts.dataOrder.unshift(orderItem)

      return copyWorkouts
    }

    function resetAllDatesFromExistingWorkout(workoutData: IMyWorkouts) {
      const copyMyWorkout = { ...workoutData }
      const timeNow = new Date().getTime()

      let prevStartAt = timeNow

      const newOrderedWorkouts = copyMyWorkout.dataOrder.map((workoutOrder) => {
        const findWorkout = copyMyWorkout.data.find(
          (v) => v.id === workoutOrder.id,
        )
        if (!findWorkout) return workoutOrder

        const periodN = findWorkout.data.workoutPeriod.periodNumber

        const newStartDate = addWeeksToTimestamp(prevStartAt, periodN) // proximo dia livre
        const newStartDateOnNextDay = addDaysToTimestamp(newStartDate, 1)

        const newWorkout = {
          ...findWorkout,
          updatedAt: timeNow,
          workoutStartAt: prevStartAt,
          workoutEndsAt: newStartDate,
        }
        prevStartAt = newStartDateOnNextDay

        return newWorkout
      })

      copyMyWorkout.dataOrder = newOrderedWorkouts
      return copyMyWorkout
    }
  }

  function handleResetTimerUp(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    Alert.alert(
      'Reiniciar Contador',
      'Tem certeza que deseja reiniciar o contador de dias do treino atual? Isso fará com que o treino comece a contar a partir de hoje, todos os dados antigos serão perdidos e uma nova contagem será iniciada.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Reiniciar',
          onPress: () => {
            if (!myWorkout) return
            resetAllStartAndEndDateFromMyWorkoutInCache(myWorkout)
            closeModal('Em uso')
            // hook que deleta os dados do treino em uso pelo ID
            // TODO -> Criar hook para deletar os dados do treino em uso
          },
        },
      ],
      { cancelable: false },
    )
    // setIsDataOrderChanged(true)
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
    const index = workouts?.dataOrder.findIndex((v) => v.id === id)

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

            updateMyWorkoutInCache(copyWorkouts)

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

  async function handleDeactivateWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    Alert.alert(
      'Deseja mover para "Expirados"?',
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

            console.log(`Desativando treino:`, copyWorkouts.data[index].id)
            console.log(`copyWorkouts: -> `, copyWorkouts.dataOrder.length)

            // Remove o treino de dataOrder
            copyWorkouts.dataOrder = copyWorkouts.dataOrder.filter(
              (v) => v.id !== id,
            )
            console.log(`copyWorkouts: -> `, copyWorkouts.dataOrder.length)

            // Define o treino como não ativo
            setWorkouts(copyWorkouts)

            updateMyWorkoutInCache(copyWorkouts)

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
    if (!workouts) return

    const isAlreadyShared = workouts.data[index].isShared

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
            text: 'Ok',
            onPress: () => {
              activeShareWorkout()
              openShareOptions()
            },
          },
        ],
        { cancelable: false },
      )
    }

    openShareOptions()
    function activeShareWorkout() {
      console.log(`activeShareWorkout`)
    }

    function openShareOptions() {
      console.log(`openShareOptions`)
    }
  }

  async function handleSendWorkout(id: string) {
    if (!workouts) return
    const index = workouts.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    const isAlreadyShared = workouts.data[index].isShared

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
            text: 'Ok',
            onPress: () => {
              activeShareWorkout()
              openShareOptions()
            },
          },
        ],
        { cancelable: false },
      )
    } else {
      openShareOptions()
    }
    function activeShareWorkout() {
      if (!workouts) return
      const copyWorkouts = { ...workouts }
      copyWorkouts.data[index].isShared = true
      setWorkouts(copyWorkouts)
    }

    function openShareOptions() {
      console.log(`com o treino ativo, abrir opções de compartilhamento`)
    }
  }

  async function handleEditWorkout(id: string) {
    if (!workouts) return
    const index = workouts.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    console.log(`handleSendWorkout , fazer Todo send e edit  e cancel`)

    const isAlreadyShared = workouts.data[index].isShared

    if (!isAlreadyShared) {
      Alert.alert(
        'Deseja reorganizar a fila de treino?',
        '',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: () => {
              handleOpenSettingsMode()

              closeModal()
            },
          },
        ],
        { cancelable: false },
      )
    }
    function handleOpenSettingsMode() {
      setIsOpenSettingsMode((prev) => !prev)
    }
    function closeModal() {
      setDefaultModalState((prev) => ({
        ...prev,
        isOpenModalEditTotalWorkout: false,
        isOpenModalSharedWorkout: false,
        isOpenModalActiveWorkout: false,
        isOpenModalExpiredWorkout: false,
        activeWeightIndex: 0,
      }))
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

            updateMyWorkoutInCache(copyWorkouts)
          },
        },
      ],
      { cancelable: false },
    )
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
  useEffect(() => {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  }, [])

  useEffect(() => {
    if (workouts && workouts.data && workouts.dataOrder) {
      const filterSharedWorkouts = workouts.data.filter((v) => v.isShared)
      setSharedWorkouts(filterSharedWorkouts)

      const filterInUseWorkouts = workouts.data.filter((v) => v.isInUse)

      const getActiveWorkouts: IMyfitflowWorkoutInUseData[] = []
      const getExpiredWorkouts: IMyfitflowWorkoutInUseData[] = []

      workouts.dataOrder.forEach((order) => {
        const workout = filterInUseWorkouts.find((v) => v.id === order.id)
        if (workout) {
          getActiveWorkouts.push(workout)
        }
      })

      filterInUseWorkouts.forEach((workout) => {
        const active = workouts.dataOrder.find(
          (order) => order.id === workout.id,
        )
        if (!active) {
          getExpiredWorkouts.push(workout)
        }
      })

      console.log(`recalculando... `)

      setActiveWorkouts(getActiveWorkouts)
      setExpiredWorkouts(getExpiredWorkouts)
    }
  }, [workouts, setShowScreen2])

  function saveNewOrderModal(data: IMyWorkouts | null) {
    if (!data) return

    // Recalcular treinos ativos e expirados
    const filterInUseWorkouts = data.data.filter((v) => v.isInUse)

    const getActiveWorkouts: IMyfitflowWorkoutInUseData[] = []
    const getExpiredWorkouts: IMyfitflowWorkoutInUseData[] = []

    data.dataOrder.forEach((order) => {
      const workout = filterInUseWorkouts.find((v) => v.id === order.id)
      if (workout) {
        getActiveWorkouts.push(workout)
      }
    })

    filterInUseWorkouts.forEach((workout) => {
      const active = data.dataOrder.find((order) => order.id === workout.id)
      if (!active) {
        getExpiredWorkouts.push(workout)
      }
    })

    updateMyWorkoutInCache(data)
    setIsDataOrderChanged(false)
    setIsOpenSettingsMode(false)
    setActiveWorkouts(getActiveWorkouts)
    setExpiredWorkouts(getExpiredWorkouts)
  }
  useEffect(() => {
    setWorkouts(myWorkout)
  }, [myWorkout])

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
                    <IconWrapper></IconWrapper>
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
                            handleMoveUp={handleMoveUp}
                            handleMoveDown={handleMoveDown}
                            handleResetTimerUp={handleResetTimerUp}
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

                  {isOpenSettingsMode && isDataOrderChanged && (
                    <CTAButton
                      style={{ marginBottom: 54 }}
                      onPress={() => saveNewOrderModal(workouts)}
                      changeColor
                      title={'Salvar nova ordem'}
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
        {workouts &&
          workouts.data &&
          defaultModalState &&
          workouts.data[defaultModalState.activeWeightIndex] && (
            <WorkoutUserActiveWorkoutModal
              handleDeactivateWorkout={handleDeactivateWorkout}
              handleSendWorkout={handleSendWorkout}
              handleEditWorkout={handleEditWorkout}
              closeModal={() => closeModal('Em uso')}
              data={workouts?.data[defaultModalState?.activeWeightIndex]}
              activeIndex={defaultModalState.activeWeightIndex}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              isFirstElement={defaultModalState.activeWeightIndex === 0}
              isMorethenTwoElementsAtQueue={workouts.dataOrder.length > 2}
              onRestartCounter={handleResetTimerUp}
              onMoveWorkoutFromQueueToPrimary={
                handleMoveWorkoutFromQueueToPrimary
              }
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
        {workouts &&
          workouts.data &&
          defaultModalState &&
          workouts.data[defaultModalState?.activeWeightIndex] && (
            <ExpiredWorkoutsCardModal
              handleUseWorkout={handleUseWorkout}
              handleCancelActiveWorkout={handleCancelActiveWorkout}
              closeModal={() => closeModal('Expired')}
              data={workouts.data[defaultModalState.activeWeightIndex]}
              activeIndex={defaultModalState.activeWeightIndex}
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
        {workouts &&
          workouts.data &&
          workouts.data[defaultModalState?.activeWeightIndex ?? 0] && (
            <WorkoutUserEditTotalWorkoutModal
              handleDeleteWorkout={handleDeleteWorkout}
              handleShareWorkout={handleShareWorkout}
              handleActiveWorkout={handleActiveWorkout}
              closeModal={() => closeModal('Meus treinos')}
              data={workouts.data[defaultModalState?.activeWeightIndex ?? 0]}
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
        {workouts &&
          workouts.data &&
          workouts.data[defaultModalState?.activeWeightIndex ?? 0] && (
            <SharedWorkoutsCardModal
              handleCancelShareWorkout={handleCancelShareWorkout}
              handleQRcodeWorkout={handleQRcodeWorkout}
              handleSendWorkout={handleSendWorkout}
              closeModal={() => closeModal('Compartilhado')}
              data={workouts.data[defaultModalState?.activeWeightIndex ?? 0]}
              activeIndex={defaultModalState?.activeWeightIndex ?? 0}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              isPrimaryWorkout={defaultModalState?.activeWeightIndex === 0}
            />
          )}
      </Modal>
    </Container>
  )
}
