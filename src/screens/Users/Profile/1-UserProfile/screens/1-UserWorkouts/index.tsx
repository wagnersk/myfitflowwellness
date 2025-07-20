import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  BackHandler,
  Alert,
  Modal,
  Dimensions,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { BackButton } from '@components/Buttons/BackButton'
import { useAuth } from '@hooks/auth'
import backgroundImg from '@assetsApp/back.png'

import {
  Container,
  Body,
  BodyImageWrapper,
  ImageBackgroundContainer,
  SettingsWrapper,
  ListWrapper,
  IconWrapper,
  ContainerTittle,
  ContainerTittleWrapper,
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
  IMyInUseActiveData,
  IMyWorkouts,
  IptBrUs,
} from '@hooks/authTypes'

import { SafeAreaView } from 'react-native-safe-area-context'
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
    updateMyWorkoutInCache,
    saveFirebaseMyWorkout,
  } = useAuth()

  const [isOpenSettingsMode, setIsOpenSettingsMode] = useState(false)

  const [defaultModalState, setDefaultModalState] =
    useState<IModalStateWorkoutLogData | null>(null)

  const [isDataOrderChanged, setIsDataOrderChanged] = useState(false)
  const [showScreen, setShowScreen] = useState<
    | 'Em uso'
    | 'Meus treinos'
    /* | 'Compartilhado' */
    | 'In Use'
    | 'My Workouts'
    | 'Shared'
  >(user?.selectedLanguage === 'pt-br' ? 'Em uso' : 'In Use')

  const [showScreen2, setShowScreen2] = useState<
    'Ativos' | 'Expirados' | 'Active' | 'Expired'
  >(user?.selectedLanguage === 'pt-br' ? 'Ativos' : 'Active')
  const [workouts, setWorkouts] = useState<IMyWorkouts | null>(myWorkout)

  const [copiedWorkouts, setCopiedWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)

  const [myTotalWorkouts, setMyTotalWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)

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
  const TAB_WIDTH = (screenWidth - paddingSize) / 2 // mudar para 3 quando ativar shared

  const TABS: (
    | 'Em uso'
    | 'Meus treinos'
    /*    | 'Compartilhado' */
    | 'In Use'
    | 'My Workouts'
    | 'Shared'
  )[] =
    user?.selectedLanguage === 'pt-br'
      ? ['Em uso', 'Meus treinos' /* , 'Compartilhado' */]
      : ['In Use', 'My Workouts' /* , 'Shared' */]

  const TABS2: ('Ativos' | 'Expirados' | 'Active' | 'Expired')[] =
    user?.selectedLanguage === 'pt-br'
      ? ['Ativos', 'Expirados']
      : ['Active', 'Expired']

  const offset = useSharedValue<number>(0)
  const offset2 = useSharedValue<number>(50)
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))
  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [{ translateX: offset2.value }],
  }))

  const navigation = useNavigation()

  function handleMoveUp(id: string) {
    const index = workouts?.activeData.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    if (index === 0) return

    const copyWorkouts: IMyWorkouts = {
      userId: workouts?.userId || '',
      createdAt: workouts?.createdAt || 0,
      updatedAt: workouts?.updatedAt || 0,
      data: workouts?.data || [],
      activeData: workouts?.activeData || [],
      mySharedWorkouts: workouts?.mySharedWorkouts || [],
      copiedWorkouts: workouts?.copiedWorkouts || [],
      expiredData: workouts?.expiredData || [],
    }

    if (!copyWorkouts.activeData || copyWorkouts.activeData.length === 0) return
    ;[copyWorkouts.activeData[index], copyWorkouts.activeData[index - 1]] = [
      copyWorkouts.activeData[index - 1],
      copyWorkouts.activeData[index],
    ]

    const updatedWorkoutsWithNewStartAndEndDate =
      resetAllDatesFromExistingWorkout(copyWorkouts)

    setWorkouts(updatedWorkoutsWithNewStartAndEndDate)

    setIsDataOrderChanged(true)
  }

  function handleMoveDown(id: string) {
    const index = workouts?.activeData.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    const copyWorkouts: IMyWorkouts = {
      userId: workouts?.userId || '',
      createdAt: workouts?.createdAt || 0,
      updatedAt: workouts?.updatedAt || 0,
      data: workouts?.data || [],
      activeData: workouts?.activeData || [],
      mySharedWorkouts: workouts?.mySharedWorkouts || [],
      copiedWorkouts: workouts?.copiedWorkouts || [],
      expiredData: workouts?.expiredData || [],
    }

    if (
      !copyWorkouts.activeData ||
      copyWorkouts.activeData.length === 0 ||
      index === copyWorkouts.activeData.length - 1
    )
      return
    ;[copyWorkouts.activeData[index], copyWorkouts.activeData[index + 1]] = [
      copyWorkouts.activeData[index + 1],
      copyWorkouts.activeData[index],
    ]

    const updatedWorkoutsWithNewStartAndEndDate =
      resetAllDatesFromExistingWorkout(copyWorkouts)

    setWorkouts(updatedWorkoutsWithNewStartAndEndDate)

    setIsDataOrderChanged(true)
  }

  function handleMoveWorkoutFromQueueToPrimary(id: string) {
    if (!workouts) return
    const index = workouts.activeData.findIndex((v) => v.id === id)
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

            closeModal()
          },
        },
      ],
      { cancelable: false },
    )

    function moveWorkoutToPrimary(index: number): IMyWorkouts | null {
      if (!workouts) return null

      const copyWorkouts = { ...workouts }
      console.log(`index`, index)
      console.log(`copyWorkouts.activeData`, copyWorkouts.activeData)

      // Remove o treino da posição atual em dataOrder
      const [orderItem] = copyWorkouts.activeData.splice(index, 1)
      console.log(`orderItem`, orderItem)

      // Adiciona o treino na primeira posição em dataOrder
      copyWorkouts.activeData.unshift(orderItem)

      return copyWorkouts
    }
  }

  function resetAllDatesFromExistingWorkout(workoutData: IMyWorkouts) {
    const copyMyWorkout = { ...workoutData }
    const timeNow = new Date().getTime()

    let prevStartAt = timeNow

    const newOrderedWorkouts = copyMyWorkout.activeData.map((workoutActive) => {
      const findWorkout = copyMyWorkout.data.find(
        (v) => v.id === workoutActive.id,
      )
      if (!findWorkout) return workoutActive

      const periodN = findWorkout.data.workoutPeriod.periodNumber

      const newStartDate = addWeeksToTimestamp(prevStartAt, periodN) // proximo dia livre
      const newStartDateOnNextDay = addDaysToTimestamp(newStartDate, 1)
      /*  const copyWorkouts: IMyWorkouts = {
      userId: workouts?.userId || '',
      createdAt: workouts?.createdAt || 0,
      updatedAt: workouts?.updatedAt || 0,
      data: workouts?.data || [],
      activeData: workouts?.activeData || [],
      mySharedWorkouts: workouts?.mySharedWorkouts || [],
      copiedWorkouts: workouts?.copiedWorkouts || [],
      expiredData: workouts?.expiredData || [],
    } */
      const newWorkout: IMyInUseActiveData = {
        id: workoutActive.id,
        createdAt: workoutActive.createdAt,
        updatedAt: timeNow,
        workoutStartAt: prevStartAt,
        workoutEndsAt: newStartDate,
      }
      prevStartAt = newStartDateOnNextDay

      return newWorkout
    })

    copyMyWorkout.activeData = newOrderedWorkouts
    return copyMyWorkout
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
            updateMyWorkoutInCache(myWorkout)
            closeModal()
            // hook que deleta os dados do treino em uso pelo ID
            // TODO -> Criar hook para deletar os dados do treino em uso
          },
        },
      ],
      { cancelable: false },
    )
    // setIsDataOrderChanged(true)
  }

  async function handleOnPressWorkout(
    id: string,
    modalType:
      | 'totalWorkout'
      | 'expiredWorkout'
      | 'activeWorkout'
      | 'shareWorkout',
  ) {
    let index: number | undefined

    /* 
  const [copiedWorkouts, setCopiedWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)

  const [myTotalWorkouts, setMyTotalWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)

  const [activeworkouts, setActiveWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)
  const [expiredworkouts, setExpiredWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null)
  const [sharedWorkouts, setSharedWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >(null) */
    switch (modalType) {
      case 'totalWorkout':
        index = myTotalWorkouts?.findIndex((v) => v.id === id)
        break
      case 'expiredWorkout':
        index = expiredworkouts?.findIndex((v) => v.id === id)
        break
      case 'activeWorkout':
        index = activeworkouts?.findIndex((v) => v.id === id)
        break
      case 'shareWorkout':
        index = sharedWorkouts?.findIndex((v) => v.id === id)
        break
      default:
        return
    }
    if (index === undefined || index === -1) return
    console.log(`modalType`, modalType)
    console.log(`id`, id)
    console.log(`index`, index)
    setDefaultModalState((prev) => ({
      ...prev,
      isOpenModalEditTotalWorkout: modalType === 'totalWorkout',
      isOpenModalSharedWorkout: modalType === 'shareWorkout',
      isOpenModalActiveWorkout: modalType === 'activeWorkout',
      isOpenModalExpiredWorkout: modalType === 'expiredWorkout',
      activeWeightIndex: index,
    }))
  }
  // fazer daqui pra baixo

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

            const timeNow = new Date().getTime()

            saveFirebaseMyWorkout(copyWorkouts, timeNow)
            updateMyWorkoutInCache(copyWorkouts)
            closeModal()
          },
        },
      ],
      { cancelable: false },
    )
  }
  // total -> ativar treino - OK
  async function handleInUseExpiredWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    const isActivedAndInUse = activeworkouts
      ? !!activeworkouts.find((va) => va.id === id && va.isActive)
      : false

    if (isActivedAndInUse)
      return Alert.alert(
        'Treino ativo , por favor retire o treino da lista de ativos antes de desativa-lo.',
      )

    const isInUse = workouts?.data[index].isActive
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
            if (!workouts) return

            const copyWorkouts = { ...workouts }
            const timeNow = new Date().getTime()

            copyWorkouts.data[index].isActive = false

            copyWorkouts.activeData = copyWorkouts.activeData.filter(
              (activeData) => activeData.id !== copyWorkouts.data[index].id,
            )

            // Adiciona o treino a mySharedWorkouts
            copyWorkouts.data[index].isExpired = true
            copyWorkouts.expiredData.push({
              id: copyWorkouts.data[index].id,
              createdAt: copyWorkouts.data[index].createdAt,
              updatedAt: copyWorkouts.data[index].updatedAt,
            })

            updateMyWorkoutInCache(copyWorkouts)
            saveFirebaseMyWorkout(copyWorkouts, timeNow)
            closeModal()
          },
        },
      ],
      { cancelable: false },
    )
  }

  // total - ativar share  - OK
  async function handleShareWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    console.log(
      ` workouts?.data[index].isShared`,
      workouts?.data[index].isShared,
    )

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
            if (!workouts) return
            const copyWorkouts = { ...workouts }
            const timeNow = new Date().getTime()

            copyWorkouts.data[index].isShared =
              !copyWorkouts.data[index].isShared

            if (copyWorkouts.data[index].isShared) {
              // Adiciona o treino a mySharedWorkouts
              copyWorkouts.mySharedWorkouts.push({
                id: copyWorkouts.data[index].id,
                createdAt: timeNow,
                updatedAt: timeNow,
              })
            } else {
              // Remove o treino de mySharedWorkouts
              copyWorkouts.mySharedWorkouts =
                copyWorkouts.mySharedWorkouts.filter(
                  (sharedWorkout) =>
                    sharedWorkout.id !== copyWorkouts.data[index].id,
                )
            }

            saveFirebaseMyWorkout(copyWorkouts, timeNow)
            closeModal()
          },
        },
      ],
      { cancelable: false },
    )
  }

  // expirados - mover para ativo  OK
  async function handleInUseActiveWorkout(id: string) {
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
            if (!workouts) return
            const copyWorkouts = { ...workouts }
            const timeNow = new Date().getTime()

            let startDate = timeNow

            if (copyWorkouts.activeData.length > 0) {
              const lastWorkout =
                copyWorkouts.activeData[copyWorkouts.activeData.length - 1]

              const nextDayTimestamp = addDaysToTimestamp(
                lastWorkout.workoutEndsAt,
                1,
              )
              startDate = nextDayTimestamp
            }

            copyWorkouts.data[index].isExpired = false
            copyWorkouts.expiredData = copyWorkouts.expiredData.filter(
              (activeData) => activeData.id !== copyWorkouts.data[index].id,
            )

            copyWorkouts.data[index].isActive = true
            copyWorkouts.activeData.push({
              id: copyWorkouts.data[index].id,
              createdAt: timeNow,
              updatedAt: timeNow,
              workoutStartAt: startDate,
              workoutEndsAt: addWeeksToTimestamp(
                startDate,
                copyWorkouts.data[index].data.workoutPeriod.periodNumber,
              ),
            })

            updateMyWorkoutInCache(copyWorkouts)
            saveFirebaseMyWorkout(copyWorkouts, timeNow)
            closeModal()
          },
        },
      ],
      { cancelable: false },
    )
  }

  // expirados - remover da lista do expirados  OK
  async function handleInUseRemoveFromExpiredWorkout(id: string) {
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
            if (!workouts) return
            const copyWorkouts = { ...workouts }
            const timeNow = new Date().getTime()

            console.log(`Desativando treino:`, copyWorkouts.data[index])

            copyWorkouts.data[index].isActive = false
            copyWorkouts.data[index].isExpired = false
            copyWorkouts.expiredData = copyWorkouts.expiredData.filter(
              (_expired) => _expired.id !== copyWorkouts.data[index].id,
            )

            updateMyWorkoutInCache(copyWorkouts)
            saveFirebaseMyWorkout(copyWorkouts, timeNow)
            closeModal()
          },
        },
      ],
      { cancelable: false },
    )
  }

  // active - ok
  async function handleInUseRemoveFromActivedWorkout(id: string) {
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
            if (!workouts) return
            const copyWorkouts = { ...workouts }
            const timeNow = new Date().getTime()

            if (!copyWorkouts) return

            copyWorkouts.data[index].isExpired = true
            copyWorkouts.expiredData.push({
              id: copyWorkouts.data[index].id,
              createdAt: copyWorkouts.data[index].createdAt,
              updatedAt: copyWorkouts.data[index].updatedAt,
            })

            copyWorkouts.data[index].isActive = false
            copyWorkouts.activeData = copyWorkouts.activeData.filter(
              (activeData) => activeData.id !== copyWorkouts.data[index].id,
            )

            // Define o treino como não ativo

            updateMyWorkoutInCache(copyWorkouts)
            saveFirebaseMyWorkout(copyWorkouts, timeNow)
            closeModal()
          },
        },
      ],
      { cancelable: false },
    )
  }

  // active - ok ( falta so implementar)
  async function handleSendActiveWorkout(id: string) {
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

  // active - ok
  async function handleActiveSettingMode(id: string) {
    if (!workouts) return
    const index = workouts.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

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
  // active - nova ordem  ( botao q aparece handleActiveSettingMode() )
  function saveNewOrderModal() {
    if (!workouts) return
    const copyWorkouts = { ...workouts }
    const timeNow = new Date().getTime()

    // Recalcular treinos ativos e expirados
    const filterInUseActiveWorkouts = workouts.data.filter((v) => v.isActive)

    const getActiveWorkouts: IMyfitflowWorkoutInUseData[] = []

    copyWorkouts.activeData.forEach((_active) => {
      const workout = filterInUseActiveWorkouts.find((v) => v.id === _active.id)
      if (workout) {
        getActiveWorkouts.push(workout)
      }
    })

    updateMyWorkoutInCache(copyWorkouts)
    saveFirebaseMyWorkout(copyWorkouts, timeNow)

    setIsDataOrderChanged(false)
    setIsOpenSettingsMode(false)
    setActiveWorkouts(getActiveWorkouts)
  }

  async function handleSendSharedWorkout(id: string) {
    // shared - ok ( falta so implementar)
    if (!workouts) return
    const index = workouts.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    const isAlreadyShared = workouts.data[index].isShared

    if (!isAlreadyShared) {
      Alert.alert(
        'Deseja enviar o treino?',
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

  // shared - ok ( falta so implementar)
  async function handleQRcodeWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return
    if (!workouts) return

    const isAlreadyShared = workouts.data[index].isShared

    if (!isAlreadyShared) {
      Alert.alert(
        'Deseja Criar um QR do treino?',
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
  // shared - ok ( falta so implementar)
  async function handleCancelShareWorkout(id: string) {
    const index = workouts?.data.findIndex((v) => v.id === id)
    if (index === undefined || index === -1) return

    console.log(
      ` workouts?.data[index].isShared`,
      workouts?.data[index].isShared,
    )

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
            if (!workouts) return
            const copyWorkouts = { ...workouts }
            const timeNow = new Date().getTime()

            copyWorkouts.data[index].isShared =
              !copyWorkouts.data[index].isShared

            if (copyWorkouts.data[index].isShared) {
              // Adiciona o treino a mySharedWorkouts
              copyWorkouts.mySharedWorkouts.push({
                id: copyWorkouts.data[index].id,
                createdAt: copyWorkouts.data[index].createdAt,
                updatedAt: copyWorkouts.data[index].updatedAt,
              })
            } else {
              // Remove o treino de mySharedWorkouts
              copyWorkouts.mySharedWorkouts =
                copyWorkouts.mySharedWorkouts.filter(
                  (sharedWorkout) =>
                    sharedWorkout.id !== copyWorkouts.data[index].id,
                )
            }

            updateMyWorkoutInCache(copyWorkouts)
            saveFirebaseMyWorkout(copyWorkouts, timeNow)
            closeModal()
          },
        },
      ],
      { cancelable: false },
    )
  }

  function closeModal() {
    setDefaultModalState((prevState) => ({
      ...prevState,
      isOpenModalEditTotalWorkout: false,
      isOpenModalSharedWorkout: false,
      isOpenModalActiveWorkout: false,
      isOpenModalExpiredWorkout: false,
      activeWeightIndex: prevState?.activeWeightIndex ?? 0,
    }))
  }

  function handlePress(
    tab:
      | 'Em uso'
      | 'Meus treinos'
      | 'Compartilhado'
      | 'In Use'
      | 'My Workouts'
      | 'Shared',
  ) {
    const newOffset = (() => {
      switch (tab) {
        case 'Em uso':
        case 'In Use':
          return 0
        case 'Meus treinos':
        case 'My Workouts':
          return TAB_WIDTH
        case 'Compartilhado':
        case 'Shared':
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

  function handlePress2(tab: 'Ativos' | 'Expirados' | 'Active' | 'Expired') {
    const newOffset = (() => {
      switch (tab) {
        case 'Ativos':
        case 'Active':
          return 50
        case 'Expirados':
        case 'Expired':
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
            onPress: () => [saveNewOrderModal()],
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
    if (workouts && workouts.data && workouts.activeData) {
      const copiedList = workouts.copiedWorkouts.filter((v) => v.id)
      const activeList = workouts.activeData.filter((v) => v.id)
      const expiredList = workouts.expiredData.filter((v) => v.id)
      // const sharedList = workouts.mySharedWorkouts.filter((v) => v.id)

      const copiedWorkouts: IMyfitflowWorkoutInUseData[] = []
      const activeWorkouts: IMyfitflowWorkoutInUseData[] = []
      const expiredWorkouts: IMyfitflowWorkoutInUseData[] = []
      // const sharedWorkouts: IMyfitflowWorkoutInUseData[] = []

      copiedList.forEach((item) => {
        const workout = workouts.data.find((v) => v.id === item.id)
        if (workout) {
          copiedWorkouts.push(workout)
        }
      })

      activeList.forEach((item) => {
        const workout = workouts.data.find((v) => v.id === item.id)
        if (workout) {
          activeWorkouts.push(workout)
        }
      })
      expiredList.forEach((item) => {
        const workout = workouts.data.find((v) => v.id === item.id)
        if (workout) {
          expiredWorkouts.push(workout)
        }
      })

      /*   sharedList.forEach((item) => {
        const workout = workouts.data.find((v) => v.id === item.id)
        if (workout) {
          sharedWorkouts.push(workout)
        }
      }) */
      setMyTotalWorkouts(workouts.data) // ok

      setCopiedWorkouts(copiedWorkouts) // ainda nao feito
      setActiveWorkouts(activeWorkouts) // fazer 1
      setExpiredWorkouts(expiredWorkouts) // fazer 2
      // setSharedWorkouts(sharedWorkouts) // fazer 3
    }
  }, [workouts, workouts?.data, setShowScreen2])

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
            <SafeAreaView style={{ flex: 1, width: '100%' }}>
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
                    <ContainerTittle>
                      {user?.selectedLanguage === 'pt-br'
                        ? 'Treinos'
                        : 'Workouts'}
                    </ContainerTittle>
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
                      <Underline tabWidth={TAB_WIDTH} style={animatedStyles} />
                    </SelectScreenWrapper>

                    {(showScreen === 'Em uso' || showScreen === 'In Use') &&
                      workouts && (
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
                            activeData={workouts.activeData}
                            expiredData={workouts.expiredData}
                            activeworkouts={activeworkouts}
                            expiredworkouts={expiredworkouts}
                            showScreen2={showScreen2}
                            user={user}
                            isOpenSettingsMode={isOpenSettingsMode}
                            handleOnPressExpiredInUseWorkout={(id) =>
                              handleOnPressWorkout(id, 'expiredWorkout')
                            }
                            handleOnPressActiveInUseWorkout={(id) =>
                              handleOnPressWorkout(id, 'activeWorkout')
                            }
                            handleMoveUp={handleMoveUp}
                            handleMoveDown={handleMoveDown}
                          />
                        </>
                      )}

                    {(showScreen === 'Meus treinos' ||
                      showScreen === 'My Workouts') &&
                      workouts && (
                        <TotalWorkoutContainer
                          myTotalWorkouts={myTotalWorkouts}
                          user={user}
                          handleOnPressTotalWorkout={(id) =>
                            handleOnPressWorkout(id, 'totalWorkout')
                          }
                        />
                      )}
                    {/*    {(showScreen === 'Compartilhado' ||
                        showScreen === 'Shared') &&
                        workouts && (
                          <SharedWorkoutContainer
                            data={workouts}
                            sharedWorkouts={sharedWorkouts}
                            user={user}
                            handleOnPressShareWorkout={(id) =>
                              handleOnPressWorkout(id, 'shareWorkout')
                            }
                          />
                        )} */}
                  </ListWrapper>
                </ScrollView>

                {isOpenSettingsMode && isDataOrderChanged && (
                  <CTAButton
                    style={{ marginBottom: 54 }}
                    onPress={saveNewOrderModal}
                    changeColor
                    title={'Salvar nova ordem'}
                    loading={false}
                    enabled={!false}
                  />
                )}
              </Body>
            </SafeAreaView>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>

      {/*  total */}
      <Modal
        visible={defaultModalState?.isOpenModalEditTotalWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {workouts &&
          myTotalWorkouts &&
          myTotalWorkouts[defaultModalState?.activeWeightIndex ?? 0] && (
            <WorkoutUserEditTotalWorkoutModal
              handleDeleteWorkout={handleDeleteWorkout}
              handleShareWorkout={handleShareWorkout}
              handleInUseExpiredWorkout={handleInUseExpiredWorkout}
              closeModal={closeModal}
              data={myTotalWorkouts[defaultModalState?.activeWeightIndex ?? 0]}
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
        onRequestClose={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {workouts &&
          defaultModalState &&
          expiredworkouts &&
          expiredworkouts[defaultModalState.activeWeightIndex] && (
            <ExpiredWorkoutsCardModal
              handleInUseActiveWorkout={handleInUseActiveWorkout}
              handleInUseRemoveFromExpiredWorkout={
                handleInUseRemoveFromExpiredWorkout
              }
              closeModal={closeModal}
              data={expiredworkouts[defaultModalState.activeWeightIndex]}
              activeIndex={defaultModalState.activeWeightIndex}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              isPrimaryWorkout={defaultModalState?.activeWeightIndex === 0}
            />
          )}
      </Modal>

      {/* active */}
      <Modal
        visible={defaultModalState?.isOpenModalActiveWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {defaultModalState &&
          workouts &&
          workouts.data[defaultModalState.activeWeightIndex] &&
          activeworkouts &&
          activeworkouts[defaultModalState.activeWeightIndex] && (
            <WorkoutUserActiveWorkoutModal
              handleInUseRemoveFromActivedWorkout={
                handleInUseRemoveFromActivedWorkout
              }
              handleSendActiveWorkout={handleSendActiveWorkout}
              handleActiveSettingMode={handleActiveSettingMode}
              closeModal={closeModal}
              data={activeworkouts[defaultModalState.activeWeightIndex]}
              activeIndex={defaultModalState.activeWeightIndex}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              isFirstElement={defaultModalState.activeWeightIndex === 0}
              isMorethenTwoElementsAtQueue={workouts.activeData.length > 2}
              onRestartCounter={handleResetTimerUp}
              onMoveWorkoutFromQueueToPrimary={
                handleMoveWorkoutFromQueueToPrimary
              }
            />
          )}
      </Modal>

      {/* shared */}
      <Modal
        visible={defaultModalState?.isOpenModalSharedWorkout || false}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        {workouts &&
          defaultModalState &&
          sharedWorkouts &&
          sharedWorkouts[defaultModalState.activeWeightIndex] && (
            <SharedWorkoutsCardModal
              handleSendSharedWorkout={handleSendSharedWorkout}
              handleQRcodeWorkout={handleQRcodeWorkout}
              handleCancelShareWorkout={handleCancelShareWorkout}
              closeModal={closeModal}
              data={sharedWorkouts[defaultModalState.activeWeightIndex]}
              activeIndex={defaultModalState?.activeWeightIndex ?? 0}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              isPrimaryWorkout={defaultModalState?.activeWeightIndex === 0}
            />
          )}
      </Modal>
    </Container>
  )
}
