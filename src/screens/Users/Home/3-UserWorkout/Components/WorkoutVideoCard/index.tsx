/* eslint-disable camelcase */
import { Modal, Alert } from 'react-native'
import React, { useState, memo, useEffect, useMemo, useCallback } from 'react'

import { useTheme } from 'styled-components/native'

import { useAuth } from '@hooks/auth'

import { format } from 'date-fns'
import { ptBR, enUS, fi } from 'date-fns/locale'
import { useTimer } from 'react-timer-hook'

import FileText from '@assets/FileText.svg'

import {
  IFormattedCardExerciseData,
  ICachedUsingWorkoutData,
  ICachedCardExerciseData,
  IPropsSets,
  ICachedSetsProps,
} from '@hooks/authTypes'

import { WorkoutUserSetsModal } from '@components/Modals/WorkoutUserSetsModal'
import { WorkoutUserRangeOfSetsModal } from '@components/Modals/WorkoutUserRangeOfSetsModal'
import { WorkoutUserNotesModal } from '@components//Modals/WorkoutUserNotesModal'
import { WorkoutUserWeightModal } from '@components/Modals/WorkoutUserWeightModal'
import WorkoutRepetitionsData from './Components/WorkoutRepetitionsData'
import WorkoutNameAndVideo from './Components/WorkoutNameAndVideo'

import {
  ContainerGradient,
  WorkoutInfoWrapper,
  WorkoutUserNotesButton,
  WorkoutButtonConfirm,
  WorkoutButtonText,
  WorkoutUserNotesAndConfirmButtonWrapper,
  BlurViewWrapper,
  BulletsCronometerAndCTAButtonWrapper,
  WorkoutCronometerWrapper,
  BlurViewAddSecondsWrapper,
} from './styles'
import { WorkoutCronometer } from '@components/WorkoutCronometer'
import { addWeeksToTimestamp } from '@utils/calculeEndDateWithWeeks'

export interface IModalStateWorkoutLogData {
  isOpenModalUserNotes: boolean
  isOpenModalVideoPlayer: boolean
  isOpenModalUserWeight: boolean
  isOpenModalUserSets: boolean
  isOpenModalSetBetweenSets: boolean
  activeWeightIndex: number
  lastActiveWeightIndex: number
}
interface Props {
  item: IFormattedCardExerciseData
  exerciseIndex: number // Supino reto.... exercicios
  workoutCardIndex: number // A B ou C
  activeWorkoutId: string
  activeWorkoutCreatedAt: number
  isFocused: boolean | null
  scrollToNextCard: () => void
}
function WorkoutVideoCardComponent({
  item,
  workoutCardIndex,
  exerciseIndex,
  activeWorkoutId,
  activeWorkoutCreatedAt,
  isFocused,
  scrollToNextCard,
}: Props) {
  const theme = useTheme()
  const {
    updateUserFirebaseWorkoutCache,
    updateCachedUserWorkoutsLog, // TODO -> ver como eu manipulo -> Buscar pelo createdAt + workoutId
    cachedUserWorkoutsLog,
    myWorkout,
    updateStartAndEndDateFromMyWorkoutInCache, // TODO -> ver como eu manipulo -> Buscar pelo createdAt + workoutId
    user,
  } = useAuth()
  const time = new Date()
  // time.setSeconds(time.getSeconds() + 123)

  const { seconds, minutes, isRunning, pause, restart, resume, totalSeconds } =
    useTimer({
      expiryTimestamp: time,
      onExpire: () => {
        timerOnExpire()
      },
      autoStart: false,
    })

  const mergedData: ICachedCardExerciseData = useMemo(() => {
    const timeNow = new Date().getTime()

    const workoutExerciseId = item.workoutExerciseId || ''
    const defaultSets = item?.workoutExerciseSets || [] // cada repeticcao

    const cachedInfo = cachedUserWorkoutsLog?.workoutsLog
      .find((v) => v.workoutId === activeWorkoutId)
      ?.workoutCardsLogData.find((v) => v.cardIndex === workoutCardIndex)
      ?.weightDoneLogs.find((v) => v.workoutExerciseId === workoutExerciseId)

    if (cachedInfo) {
      return cachedInfo
    } else {
      const initialWorkoutData = transformInitialData(defaultSets, timeNow)
      const initialDataWithCachedProgress = initialWorkoutData

      return initialDataWithCachedProgress

      function transformInitialData(
        _defaultSets: IPropsSets[],
        timeNow: number,
      ): ICachedCardExerciseData {
        const transformedDataSets = _defaultSets
          .map((v) => {
            if (!v.repetitionData) return null
            const transformedData: ICachedUsingWorkoutData = {
              repetitionData: v.repetitionData.map((va) => {
                return {
                  isReps: va.isReps,
                  isTime: va.isTime,
                  sets_insensitive: va.sets_insensitive,
                  timeInSeconds: va.timeInSeconds,
                  createdAt: timeNow,
                  updatedAt: timeNow,
                }
              }),
              selectedRepetitionData: {
                checkedSet: '',
                createdAt: timeNow,
                updatedAt: timeNow,
              },
              restTimeData: {
                restTimeNumber: v.restTimeData.restTimeNumber,
                restTime_insensitive: v.restTimeData.restTime_insensitive,
                createdAt: timeNow,
                updatedAt: timeNow,
              },
              weightData: {
                value: '0',
                createdAt: timeNow,
                updatedAt: timeNow,
              },
              completedData: {
                isCompleted: false,
                createdAt: timeNow,
                updatedAt: timeNow,
              },
              createdAt: timeNow,
              updatedAt: timeNow,
            }

            return transformedData
          })
          .filter((v) => v !== null)

        const fdata: ICachedCardExerciseData = {
          workoutExerciseId,
          workoutExerciseSets: transformedDataSets,
          workoutExerciseIndex: item.workoutExerciseIndex,
          createdAt: timeNow,
          updatedAt: timeNow,
          notes: {
            value: '',
            createdAt: timeNow,
            updatedAt: timeNow,
          },
        }

        return fdata
      }
    }
  }, [])

  const [modalCachedCardExerciseData, setModalCachedCardExerciseData] =
    useState<ICachedCardExerciseData>(mergedData)

  const allItensCompleted =
    modalCachedCardExerciseData?.workoutExerciseSets?.every(
      (v) => v.completedData.isCompleted,
    )

  const firstIncompleteIndex =
    modalCachedCardExerciseData?.workoutExerciseSets?.findIndex(
      (v) => !v.completedData.isCompleted,
    )

  const lastCompletedIndex =
    modalCachedCardExerciseData?.workoutExerciseSets?.reduceRight(
      (lastIndex, v, i) =>
        v.completedData.isCompleted && lastIndex === -1 ? i : lastIndex,
      -1,
    )
  const length = modalCachedCardExerciseData?.workoutExerciseSets?.length || 0

  const activeWeightIndex =
    firstIncompleteIndex !== -1 && firstIncompleteIndex !== undefined
      ? firstIncompleteIndex
      : length > 0
        ? length - 1
        : 0

  const defaultModalStateValues = {
    isOpenModalUserNotes: false,
    isOpenModalVideoPlayer: false,
    isOpenModalUserWeight: false,
    isOpenModalUserSets: false,
    isOpenModalSetBetweenSets: false,
    activeWeightIndex,
    lastActiveWeightIndex: 0,
  }
  const [defaultModalState, setDefaultModalState] =
    useState<IModalStateWorkoutLogData>(defaultModalStateValues)

  /*   const [weightProgressionData, setWeightProgressionData] = useState<
    ICachedExerciseHistoryData[] | null
  >(null)
 */

  function handleUpdateWeight(
    type: 'all' | 'single',
    tNow: Date,
    _weight: string,
  ) {
    if (type === 'single') {
      onUpdateSingleWeight(_weight, tNow)
    }

    if (type === 'all') {
      const allWeightsAreEqual =
        modalCachedCardExerciseData?.workoutExerciseSets?.every(
          (v) => v.weightData.value === _weight,
        )

      if (allWeightsAreEqual) {
        onUpdateAllWeight(_weight, tNow)
        closeModal('weight')
      } else {
        Alert.alert(
          'Confirmação',
          'Você realmente quer sobrescrever todos os pesos?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Confirmar',
              onPress: () => {
                onUpdateAllWeight(_weight, tNow)
                closeModal('weight')
              },
            },
          ],
          { cancelable: false },
        )
      }
    }

    function onUpdateSingleWeight(_weight: string, tNow: Date) {
      const copyProgression = { ...modalCachedCardExerciseData }
      const timeNow = tNow.getTime()
      const activeIndex = defaultModalState.activeWeightIndex

      if (copyProgression.workoutExerciseSets) {
        copyProgression.workoutExerciseSets[activeIndex] = {
          ...copyProgression.workoutExerciseSets[activeIndex],
          weightData: {
            value: _weight,
            createdAt: timeNow,
            updatedAt: timeNow,
          },
        }

        setModalCachedCardExerciseData(copyProgression)
        closeModal('weight')
      }
    }

    function onUpdateAllWeight(_weight: string, tNow: Date) {
      const copyProgression = { ...modalCachedCardExerciseData }
      const timeNow = tNow.getTime()

      const copyProgressionRep =
        modalCachedCardExerciseData.workoutExerciseSets?.map((v) => ({
          ...v,
          weightData: {
            value: _weight,
            createdAt: v.weightData?.createdAt || timeNow, // Preserva o createdAt existente, se houver
            updatedAt: timeNow,
          },
        }))

      copyProgression.workoutExerciseSets = copyProgressionRep
      setModalCachedCardExerciseData(copyProgression)
      closeModal('weight')
    }
  }

  function handleUpdateNotes(value: string) {
    if (!value) return
    const date = new Date()
    const completedTimestamp = date.getTime()

    const copyProgression = { ...modalCachedCardExerciseData }

    copyProgression.notes = {
      value,
      createdAt:
        modalCachedCardExerciseData.notes.createdAt || completedTimestamp,
      updatedAt: completedTimestamp,
    }

    setModalCachedCardExerciseData(copyProgression)
    setDefaultModalState((prevState) => ({
      ...prevState,
      isOpenModalUserNotes: !prevState.isOpenModalUserNotes,
    }))
    // notes - ok REAL
    saveFastCachedWorkoutData(
      copyProgression,
      activeWorkoutId,
      activeWorkoutCreatedAt,
      date,
      completedTimestamp,
      workoutCardIndex,
    )

    closeModal('notes')
  }

  function handleUpdateSets(
    type: 'update' | 'delete',
    dateNow: Date,
    value?: ICachedSetsProps[],
  ) {
    const completedTimestamp = dateNow.getTime()

    if (type === 'update' && value !== undefined) {
      const copyProgression = { ...modalCachedCardExerciseData }

      if (copyProgression.workoutExerciseSets === undefined) return

      copyProgression.workoutExerciseSets[
        defaultModalState.activeWeightIndex
      ].repetitionData = value

      copyProgression.workoutExerciseSets[
        defaultModalState.activeWeightIndex
      ].updatedAt = completedTimestamp

      setModalCachedCardExerciseData(copyProgression)
      // handleUpdateSets -ok REAL
      saveFastCachedWorkoutData(
        copyProgression,
        activeWorkoutId,
        activeWorkoutCreatedAt,
        dateNow,
        completedTimestamp,
        workoutCardIndex,
      )
      closeModal('sets')
    }

    if (type === 'delete') {
      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Remover Repetição'
          : 'Remove Repetition',
        user?.selectedLanguage === 'pt-br'
          ? 'Você realmente quer remover?'
          : 'Do you really want to remove?',
        [
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
            style: 'cancel',
          },
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
            onPress: () => {
              onRemoveRangeOfSets()
            },
          },
        ],
        { cancelable: false },
      )

      function onRemoveRangeOfSets() {
        const copyProgression = { ...modalCachedCardExerciseData }
        if (copyProgression.workoutExerciseSets === undefined) return

        copyProgression.workoutExerciseSets[
          defaultModalState.activeWeightIndex
        ].selectedRepetitionData = {
          checkedSet: '',
          createdAt:
            copyProgression.workoutExerciseSets[
              defaultModalState.activeWeightIndex
            ].selectedRepetitionData.createdAt || completedTimestamp,
          updatedAt: completedTimestamp,
        }

        setModalCachedCardExerciseData(copyProgression)
        closeModal('rangeOfSets')
      }
    }
  }

  function handleUpdateRangeSelect(
    type: 'update' | 'delete',
    dateNow: Date,
    value: string,
  ) {
    const completedTimestamp = new Date().getTime()

    if (type === 'update' && value !== undefined) {
      const copyProgression = { ...modalCachedCardExerciseData }

      if (copyProgression.workoutExerciseSets === undefined) return

      copyProgression.workoutExerciseSets[
        defaultModalState.activeWeightIndex
      ].selectedRepetitionData = {
        checkedSet: value,
        createdAt:
          copyProgression.workoutExerciseSets[
            defaultModalState.activeWeightIndex
          ].selectedRepetitionData.createdAt || completedTimestamp,
        updatedAt: completedTimestamp,
      }

      setModalCachedCardExerciseData(copyProgression)
      closeModal('rangeOfSets')
    }

    if (type === 'delete') {
      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Remover Repetição'
          : 'Remove Repetition',
        user?.selectedLanguage === 'pt-br'
          ? 'Você realmente quer remover?'
          : 'Do you really want to remove?',
        [
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
            style: 'cancel',
          },
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
            onPress: () => {
              onRemoveRangeOfSets()
            },
          },
        ],
        { cancelable: false },
      )

      function onRemoveRangeOfSets() {
        const copyProgression = { ...modalCachedCardExerciseData }
        if (copyProgression.workoutExerciseSets === undefined) return

        copyProgression.workoutExerciseSets[
          defaultModalState.activeWeightIndex
        ].selectedRepetitionData = {
          checkedSet: '',
          createdAt:
            copyProgression.workoutExerciseSets[
              defaultModalState.activeWeightIndex
            ].selectedRepetitionData.createdAt || completedTimestamp,
          updatedAt: completedTimestamp,
        }

        setModalCachedCardExerciseData(copyProgression)
        closeModal('rangeOfSets')
      }
    }
  }

  function handlePushOrPopRepetition(type: 'push' | 'pop') {
    if (type === 'push') {
      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Adicionar Repetição'
          : 'Add Repetition',
        user?.selectedLanguage === 'pt-br'
          ? 'Você realmente quer adicionar mais uma repetição?'
          : 'Do you really want to add another repetition?',
        [
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
            style: 'cancel',
          },
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
            onPress: () => {
              onAddRepetition()
            },
          },
        ],
        { cancelable: false },
      )
    }

    if (type === 'pop') {
      Alert.alert(
        user?.selectedLanguage === 'pt-br'
          ? 'Remover Repetição'
          : 'Remove Repetition',
        user?.selectedLanguage === 'pt-br'
          ? 'Você realmente quer remover a última repetição?'
          : 'Do you really want to remove the last repetition?',
        [
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
            style: 'cancel',
          },
          {
            text: user?.selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
            onPress: () => {
              onRemoveRepetition()
            },
          },
        ],
        { cancelable: false },
      )
    }

    function onAddRepetition() {
      if (
        modalCachedCardExerciseData.workoutExerciseSets &&
        modalCachedCardExerciseData.workoutExerciseSets.length > 7
      ) {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Ops' : 'Oops',
          user?.selectedLanguage === 'pt-br'
            ? 'Você atingiu o limite de repetições'
            : 'You have reached the repetition limit',
        )
        return
      }

      const copyProgression = { ...modalCachedCardExerciseData }

      console.log(`onAddRepetition ->> Antes de alterar ->`)
      console.log(JSON.stringify(copyProgression, null, 2))

      if (copyProgression.workoutExerciseSets === undefined) return

      const date = new Date()
      const completedTimestamp = date.getTime()

      const lastSet =
        copyProgression.workoutExerciseSets[
          copyProgression.workoutExerciseSets.length - 1
        ]

      const newRepetitionToAdd: ICachedUsingWorkoutData = {
        selectedRepetitionData: {
          checkedSet: '',
          createdAt: completedTimestamp,
          updatedAt: completedTimestamp,
        },
        repetitionData: [...(lastSet.repetitionData || [])],
        restTimeData: {
          restTimeNumber: lastSet.restTimeData?.restTimeNumber || 0,
          restTime_insensitive:
            lastSet.restTimeData?.restTime_insensitive || '',
          createdAt: lastSet.restTimeData?.createdAt || completedTimestamp,
          updatedAt: completedTimestamp,
        },
        weightData: {
          value: '0',
          createdAt: lastSet.weightData?.createdAt || completedTimestamp,
          updatedAt: completedTimestamp,
        },
        completedData: {
          isCompleted: false,
          createdAt: completedTimestamp,
          updatedAt: completedTimestamp,
        },
        updatedAt: completedTimestamp,
        createdAt: completedTimestamp,
      }

      copyProgression.workoutExerciseSets.push(newRepetitionToAdd)
      setModalCachedCardExerciseData(copyProgression)

      // onAddRepetition - ok REAL
      saveFastCachedWorkoutData(
        copyProgression,
        activeWorkoutId,
        activeWorkoutCreatedAt,
        date,
        completedTimestamp,
        workoutCardIndex,
      )
    }

    function onRemoveRepetition() {
      if (
        modalCachedCardExerciseData.workoutExerciseSets &&
        modalCachedCardExerciseData.workoutExerciseSets.length <= 1
      ) {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Ops' : 'Oops',
          user?.selectedLanguage === 'pt-br'
            ? 'Você não pode remover todas as repetições'
            : 'You cannot remove all repetitions',
        )
        return
      }
      const copyProgression = { ...modalCachedCardExerciseData }

      if (copyProgression.workoutExerciseSets === undefined) return

      const date = new Date()
      const completedTimestamp = date.getTime()

      copyProgression.workoutExerciseSets.pop()

      if (
        defaultModalState.activeWeightIndex ===
        copyProgression.workoutExerciseSets.length
      ) {
        const updatedRepLenght = copyProgression.workoutExerciseSets.length - 1

        setDefaultModalState((prev) => {
          return { ...prev, activeWeightIndex: updatedRepLenght }
        })
      }

      setModalCachedCardExerciseData(copyProgression)
      // onRemoveRepetition - ok REAL
      saveFastCachedWorkoutData(
        copyProgression,
        activeWorkoutId,
        activeWorkoutCreatedAt,
        date,
        completedTimestamp,
        workoutCardIndex,
      )
    }
  }

  function handleDoneWorkout() {
    if (verifyIfCronometerIsRunning()) return
    if (verifyAndProceed()) return
    if (veryfyAndProceedToNextCard()) return

    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }
    markAsCompletedGreenCheckAndCacheSave()
    onTimerManage('play')

    const find = myWorkout?.activeData.find((va) => va.id === activeWorkoutId)

    if (find && find.workoutStartAt === 0) {
      startWorkoutCounterDate()
    }

    function markAsCompletedGreenCheckAndCacheSave() {
      const date = new Date()
      const completedTimestamp = date.getTime()

      const copyProgression = { ...modalCachedCardExerciseData } // Copiar o estado atual
      if (copyProgression.workoutExerciseSets === undefined) return

      copyProgression.workoutExerciseSets[
        defaultModalState.activeWeightIndex
      ].completedData = {
        isCompleted: true,
        createdAt:
          copyProgression.workoutExerciseSets[
            defaultModalState.activeWeightIndex
          ].createdAt || completedTimestamp, // Preserva o createdAt existente, se houver
        updatedAt: completedTimestamp,
      }

      copyProgression.workoutExerciseSets[
        defaultModalState.activeWeightIndex
      ].updatedAt = completedTimestamp

      setModalCachedCardExerciseData(copyProgression)
      // handleDoneWorkout - ok REAL
      saveFastCachedWorkoutData(
        copyProgression,
        activeWorkoutId,
        activeWorkoutCreatedAt,
        date,
        completedTimestamp,
        workoutCardIndex,
      )
    }

    function verifyAndProceed() {
      const activeIndex = defaultModalState.activeWeightIndex

      const getIsActivedRangeOfSets =
        (modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
          ?.repetitionData?.length ?? 0) > 1

      const checkedSet =
        modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
          ?.selectedRepetitionData.checkedSet

      const getWeightValue =
        modalCachedCardExerciseData.workoutExerciseSets?.[activeIndex]
          .weightData.value

      const firstRep =
        modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
          ?.repetitionData?.[0].isReps

      const firstTime =
        modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
          ?.repetitionData?.[0].isTime

      let secondRep = false

      if (getIsActivedRangeOfSets) {
        secondRep =
          modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
            ?.repetitionData?.[1].isReps || false
      }

      if (getIsActivedRangeOfSets && !checkedSet && firstRep && secondRep) {
        openModal('rangeOfSets', activeIndex)
        return true
      }

      if (getWeightValue === `0` && !firstTime) {
        openModal('weight', activeIndex)
        return true
      }

      return false
    }

    function veryfyAndProceedToNextCard() {
      if (allItensCompleted) {
        scrollToNextCard()
        return true
      }
      return false
    }

    function verifyIfCronometerIsRunning() {
      if (isRunning) {
        onTimerManage('skip')
        return true
      }
      return false
    }
  }

  function startWorkoutCounterDate() {
    if (!myWorkout) return

    const dateNow = new Date().getTime()

    const periodInWeekNumber =
      myWorkout?.data[workoutCardIndex].data.workoutPeriod.periodNumber || 0

    const dateEnd = addWeeksToTimestamp(dateNow, periodInWeekNumber)

    const getWorkoutInUse = myWorkout.data[0].data

    console.log(`getWorkoutInUse`, getWorkoutInUse)
    console.log(`dateNow`, dateNow)
    console.log(`dateEnd`, dateEnd)

    updateStartAndEndDateFromMyWorkoutInCache(getWorkoutInUse, dateNow)
  }

  async function saveFastCachedWorkoutData(
    copyProgression: ICachedCardExerciseData,
    _activeWorkoutId: string,
    _activeWorkoutCreatedAt: number,
    date: Date,
    completedTimestamp: number,
    _workoutCardIndex: number,
  ) {
    const lastCompletedDay = {
      'pt-br': format(date, 'EEEE', { locale: ptBR }),
      us: format(date, 'EEEE', { locale: enUS }),
    }

    const lastCompletedDate = format(date, 'dd/MM/yyyy')
    copyProgression.updatedAt = completedTimestamp

    // map em todos createdAt e updatedAt
    const responseupdatedCache = await updateCachedUserWorkoutsLog(
      copyProgression,
      _activeWorkoutId,
      _activeWorkoutCreatedAt,
      completedTimestamp,
      lastCompletedDay,
      lastCompletedDate,
      _workoutCardIndex,
    )

    if (!responseupdatedCache) return
    await updateUserFirebaseWorkoutCache(responseupdatedCache)
  }

  /*  function saveCachedHistoricDateWorkoutData() {
    if (user === null) return
    if (myWorkout === null) return
    if (item === null) return
    // updateHistoricDateData()

    updateCachedExerciseHistoryData()

    function updateCachedExerciseHistoryData() {
      if (user === null) return
      if (myWorkout === null) return

      const { id: userId } = user

      const date = new Date()
      const year = date.getFullYear() // Extrai o ano
      const month = date.getMonth() + 1 // Extrai o mês (vale ressaltar que o mês em JavaScript começa do zero, então é necessário adicionar 1)
      const day = date.getDate() // Extrai o dia

      const {
        workoutExerciseRestTimeNumber, // tempo descanso
        workoutExerciseSets, // multiplicador de X series feitas com Musculo Tal
        workoutExerciseRepetition, // multiplicador de X series feitas com Musculo Tal
        workoutExerciseMuscleGroup,
        workoutExerciseName_insensitive,
        workoutExerciseId,
        workoutExerciseIndex,
      } = item

      const { workoutId } = myWorkout

      // modalWeightState.completed

      const copyProgression = weightProgressionData || [] // jogar state aqui

      const _dataIndex = copyProgression.findIndex(
        (item) => item.userId === userId && item.workoutId === workoutId,
      )
      // achar o id do usuario e o treino q to cacheando

      if (_dataIndex !== -1) {
        const _yearIndex = copyProgression[
          _dataIndex
        ].exerciseHistory.findIndex((item) => item.year === year)

        if (_yearIndex !== -1) {
          const _monthIndex = copyProgression[_dataIndex].exerciseHistory[
            _yearIndex
          ].months.findIndex((item) => item.month === month)

          if (_monthIndex !== -1) {
            const _dayIndex = copyProgression[_dataIndex].exerciseHistory[
              _yearIndex
            ].months[_monthIndex].days.findIndex((item) => item.day === day)

            if (_dayIndex !== -1) {
              const exercisesData =
                copyProgression[_dataIndex].exerciseHistory[_yearIndex].months[
                  _monthIndex
                ].days[_dayIndex].exercises

              const _exerciseIndex = exercisesData.findIndex(
                (item) =>
                  item.workoutExerciseId === workoutExerciseId &&
                  item.workoutExerciseIndex === workoutExerciseIndex &&
                  item.workoutCardIndex === workoutCardIndex,
              )

              if (_exerciseIndex !== -1) {
                updateExercise(
                  _yearIndex,
                  _monthIndex,
                  _dayIndex,
                  _exerciseIndex,
                )
              } else {
                console.log('Entrou em createExercise()')
                createExercise(_yearIndex, _monthIndex, _dayIndex)
              }
            } else {
              console.log('Entrou em dayDoesNotExists()')
              dayDoesNotExists()
            }
          } else {
            console.log('Entrou em monthDoesNotExists()')
            monthDoesNotExists()
          }
        } else {
          console.log('Entrou em yearDoesNotExists()')
          yearDoesNotExists()
        }
      } else {
        console.log('Entrou em dataDoesNotExists()')
        dataDoesNotExists()
      }

      function dayDoesNotExists() {
        createDayData()
      }
      function monthDoesNotExists() {
        createMonthDayData()
      }
      function yearDoesNotExists() {
        createYearMonthDayData()
      }
      function dataDoesNotExists() {
        createDataYearMonthDayData()
      }
      function createDataYearMonthDayData() {
        const _dataData: ICachedExerciseHistoryData = {
          workoutId: workoutId || '',
          userId,
          createdAt: date.getTime(),
          updatedAt: date.getTime(),
          exerciseHistory: [
            {
              year,
              createdAt: date.getTime(),
              updatedAt: date.getTime(),
              months: [
                {
                  month,
                  createdAt: date.getTime(),
                  updatedAt: date.getTime(),
                  days: [
                    {
                      day,
                      createdAt: date.getTime(),
                      updatedAt: date.getTime(),
                      exerciseIntervals: [],
                      exercises: [],
                      exerciseTotalTime: '0',
                    },
                  ],
                },
              ],
            },
          ],
        }

        copyProgression.push(_dataData)

        updateProgressionData(copyProgression)
      }
      function createYearMonthDayData() {
        const _yearData: YearData = {
          year,
          createdAt: date.getTime(),
          months: [
            {
              month,
              createdAt: date.getTime(),
              days: [
                {
                  day,
                  createdAt: date.getTime(),
                  exerciseIntervals: [],
                  exercises: [],
                  exerciseTotalTime: '0',
                  updatedAt: date.getTime(),
                },
              ],
              updatedAt: date.getTime(),
            },
          ],
          updatedAt: date.getTime(),
        }
        copyProgression[_dataIndex].exerciseHistory.push(_yearData)

        updateProgressionData(copyProgression)
      }
      function createMonthDayData() {
        const _yearIndex = copyProgression[
          _dataIndex
        ].exerciseHistory.findIndex((item) => item.year === year)

        const _monthData: MonthData = {
          month,
          createdAt: date.getTime(),
          days: [
            {
              day,
              createdAt: date.getTime(),
              exerciseIntervals: [],
              exercises: [],
              exerciseTotalTime: '0',
              updatedAt: date.getTime(),
            },
          ],
          updatedAt: date.getTime(),
        }
        copyProgression[_dataIndex].exerciseHistory[_yearIndex].months.push(
          _monthData,
        )

        updateProgressionData(copyProgression)
      }
      function createDayData() {
        const _yearIndex = copyProgression[
          _dataIndex
        ].exerciseHistory.findIndex((item) => item.year === year)

        const _monthIndex = copyProgression[_dataIndex].exerciseHistory[
          _yearIndex
        ].months.findIndex((item) => item.month === month)

        const exercisesData: DayData = {
          day,
          createdAt: date.getTime(),
          exerciseIntervals: [],
          exercises: [],
          exerciseTotalTime: '0',
          updatedAt: date.getTime(),
        }

        copyProgression[_dataIndex].exerciseHistory[_yearIndex].months[
          _monthIndex
        ].days.push(exercisesData)

        updateProgressionData(copyProgression)
      }
      function updateProgressionData(data: ICachedExerciseHistoryData[]) {
        setWeightProgressionData(data)
        saveWeightProgression(data)
      }
      function createExercise(
        _yearIndex: number,
        _monthIndex: number,
        _dayIndex: number,
      ) {
        if (modalWeightState.repetitionData === undefined) return
        if (workoutExerciseRestTimeNumber === undefined) return
        if (workoutExerciseSets === undefined) return
        if (workoutExerciseRepetition === undefined) return
        if (workoutExerciseMuscleGroup === undefined) return
        if (workoutExerciseName_insensitive === undefined) return
        if (workoutExerciseId === undefined) return
        if (workoutExerciseIndex === undefined) return
        if (workoutCardIndex === undefined) return
        if (
          !workoutExerciseMuscleGroup ||
          workoutExerciseMuscleGroup['pt-br'] === undefined ||
          workoutExerciseMuscleGroup.us === undefined
        ) {
          return
        }
        const updatedAt = new Date().getTime()
        const { repetitionData } = modalWeightState

        const exerciseData: Exercise = {
          workoutExerciseId,
          workoutExerciseIndex,
          workoutCardIndex,
          updatedAt,
          workoutExerciseWeight: repetitionData.map((v) => v.weight.value),
          workoutExerciseRestTimeNumber,
          workoutExerciseSets,
          workoutExerciseRepetition,
          workoutExerciseMuscleGroup: {
            'pt-br': workoutExerciseMuscleGroup['pt-br'] || '',
            us: workoutExerciseMuscleGroup.us || '',
          },
          workoutExerciseName_insensitive,
        }

        copyProgression[_dataIndex].exerciseHistory[_yearIndex].months[
          _monthIndex
        ].days[_dayIndex].exercises.push(exerciseData)

        updateProgressionData(copyProgression)
        setWeightProgressionData(copyProgression)
      }
      function updateExercise(
        _yearIndex: number,
        _monthIndex: number,
        _dayIndex: number,
        _exerciseIndex: number,
      ) {
        if (workoutExerciseRestTimeNumber === undefined) return
        if (workoutExerciseSets === undefined) return
        if (workoutExerciseRepetition === undefined) return
        if (workoutExerciseMuscleGroup === undefined) return
        if (workoutExerciseName_insensitive === undefined) return
        if (
          !workoutExerciseMuscleGroup ||
          workoutExerciseMuscleGroup['pt-br'] === undefined ||
          workoutExerciseMuscleGroup.us === undefined
        ) {
          return
        }
        const updatedAt = new Date().getTime()

        const exerciseData =
          copyProgression[_dataIndex].exerciseHistory[_yearIndex].months[
            _monthIndex
          ].days[_dayIndex].exercises[_exerciseIndex]
        exerciseData.updatedAt = updatedAt
        exerciseData.workoutExerciseWeight =
          modalWeightState.repetitionData.map((v) => v.weight.value)
        exerciseData.workoutExerciseRestTimeNumber =
          workoutExerciseRestTimeNumber
        exerciseData.workoutExerciseSets = workoutExerciseSets
        exerciseData.workoutExerciseRepetition = workoutExerciseRepetition
        exerciseData.workoutExerciseMuscleGroup = {
          'pt-br': workoutExerciseMuscleGroup['pt-br'] || '',
          us: workoutExerciseMuscleGroup.us || '',
        }
        exerciseData.workoutExerciseName_insensitive =
          workoutExerciseName_insensitive

        copyProgression[_dataIndex].exerciseHistory[_yearIndex].months[
          _monthIndex
        ].days[_dayIndex].exercises[_exerciseIndex] = exerciseData

        updateProgressionData(copyProgression)
        setWeightProgressionData(copyProgression)
      }
    }
  } */

  // ok
  function handleUncheckOrCheckRepetion(index: number) {
    const getIsActivedRangeOfSets =
      (modalCachedCardExerciseData?.workoutExerciseSets?.[index]?.repetitionData
        ?.length ?? 0) > 1

    const firstRep =
      modalCachedCardExerciseData?.workoutExerciseSets?.[index]
        ?.repetitionData?.[0].isReps

    const firstTime =
      modalCachedCardExerciseData?.workoutExerciseSets?.[index]
        ?.repetitionData?.[0].isTime

    let secondRep = false

    if (getIsActivedRangeOfSets) {
      secondRep =
        modalCachedCardExerciseData?.workoutExerciseSets?.[index]
          ?.repetitionData?.[1].isReps || false
    }

    const checkedSet =
      modalCachedCardExerciseData?.workoutExerciseSets?.[index]
        ?.selectedRepetitionData.checkedSet

    const getWeightValue =
      modalCachedCardExerciseData.workoutExerciseSets?.[index].weightData.value

    if (modalCachedCardExerciseData === undefined) return
    if (modalCachedCardExerciseData.workoutExerciseSets === undefined) return

    if (isRunning) {
      onTimerManage('skip')
      timerOnExpire()
      return
    }
    if (
      modalCachedCardExerciseData.workoutExerciseSets[index].completedData
        .isCompleted
    ) {
      const hasFollowingCompleted =
        modalCachedCardExerciseData.workoutExerciseSets
          .slice(index + 1)
          .some((item) => item.completedData.isCompleted)

      const message = hasFollowingCompleted
        ? 'Você realmente quer desmarcar este item? Isso irá desmarcar todos os itens seguintes.'
        : 'Você realmente quer desmarcar este item?'
      Alert.alert(
        'Confirmação',
        message,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              desmarcarItem(index)
              onTimerManage('skip')
            },
          },
        ],
        { cancelable: false },
      )
    } else {
      if (getIsActivedRangeOfSets && !checkedSet && firstRep && secondRep) {
        /*  */
        // abrir modal para escolher o range
        openModal('rangeOfSets', index)
        return
      }

      if (getWeightValue === `0` && !firstTime) {
        openModal('weight', index)
        return
      }

      marcarItem(index)
    }
    // ok VALIDADO
    function marcarItem(index: number) {
      const copyProgression = { ...modalCachedCardExerciseData }
      if (copyProgression.workoutExerciseSets === undefined) return

      const date = new Date()
      const completedTimestamp = date.getTime()
      console.log(`antes `, copyProgression.workoutExerciseSets.length)

      //  copyProgression.workoutExerciseSets[1].completedData.isCompleted

      const formattedSets = copyProgression.workoutExerciseSets.map(
        (item, i) => {
          const shouldUpdate = i <= index // Define se o item deve ser atualizado

          return shouldUpdate
            ? {
                ...item,
                updatedAt: completedTimestamp,
                completedData: {
                  ...item.completedData,
                  isCompleted: true,
                  updatedAt: completedTimestamp,
                  createdAt:
                    item.completedData?.createdAt || completedTimestamp, // Preserva o createdAt existente
                },
              }
            : item // Retorna o item original se não precisar ser atualizado
        },
      )

      console.log(`depois `, formattedSets.length)
      copyProgression.workoutExerciseSets = formattedSets

      setModalCachedCardExerciseData(copyProgression)
      setDefaultModalState((prev) => {
        if (formattedSets === undefined) return prev
        return {
          ...prev,
          lastActiveWeightIndex: defaultModalState.activeWeightIndex,
          activeWeightIndex:
            index + 1 < formattedSets.length ? index + 1 : index,
        }
      })

      // marcarItem - ok REAL
      saveFastCachedWorkoutData(
        copyProgression,
        activeWorkoutId,
        activeWorkoutCreatedAt,
        date,
        completedTimestamp,
        workoutCardIndex,
      )

      const find = myWorkout?.activeData.find((va) => va.id === activeWorkoutId)

      if (find && find.workoutStartAt === 0) {
        startWorkoutCounterDate()
      }
    }
    console.log(`modalCachedCardExerciseData`, modalCachedCardExerciseData)
    // ok VALIDADO
    function desmarcarItem(index: number) {
      if (modalCachedCardExerciseData === undefined) return

      const copyProgression = { ...modalCachedCardExerciseData }

      if (copyProgression.workoutExerciseSets === undefined) return

      const date = new Date()
      const completedTimestamp = date.getTime()

      copyProgression.workoutExerciseSets =
        copyProgression.workoutExerciseSets.map((item, i) => {
          if (i >= index) {
            const isExistingItem = item.completedData.createdAt !== 0
            return {
              ...item,
              updatedAt: completedTimestamp,
              completedData: {
                ...item.completedData,
                isCompleted: false,
                updatedAt: completedTimestamp,
                createdAt: isExistingItem
                  ? item.completedData.createdAt
                  : completedTimestamp,
              },
            }
          }
          return item
        })

      setModalCachedCardExerciseData(copyProgression)
      setDefaultModalState((prev) => {
        return {
          ...prev,
          lastActiveWeightIndex: defaultModalState.activeWeightIndex,
          activeWeightIndex: index,
        }
      })

      // desmarcarItem  - ok REAL
      saveFastCachedWorkoutData(
        copyProgression,
        activeWorkoutId,
        activeWorkoutCreatedAt,
        date,
        completedTimestamp,
        workoutCardIndex,
      )
    }
  }

  function focusOnNextRepetititonLine() {
    if (modalCachedCardExerciseData === undefined) return
    if (modalCachedCardExerciseData.workoutExerciseSets === undefined) return

    const getActiveWeightIndex =
      defaultModalState.activeWeightIndex + 1 <
      modalCachedCardExerciseData.workoutExerciseSets.length
        ? defaultModalState.activeWeightIndex + 1
        : defaultModalState.activeWeightIndex

    setDefaultModalState((prev) => {
      return {
        ...prev,
        lastActiveWeightIndex: defaultModalState.activeWeightIndex,
        activeWeightIndex: getActiveWeightIndex,
      }
    })
  }

  function timerOnExpire() {
    focusOnNextRepetititonLine()
  }

  function handleChangeRepetitionFocus(index: number) {
    if (index !== defaultModalState.activeWeightIndex) {
      setDefaultModalState((prevState) => ({
        ...prevState,
        activeWeightIndex: index,
      }))
    } else {
      setDefaultModalState((prevState) => ({
        ...prevState,
        activeWeightIndex: index,
        lastActiveWeightIndex: defaultModalState.activeWeightIndex,
      }))
    }
  }

  function openModal(
    type: 'videoplayer' | 'weight' | 'sets' | 'notes' | 'rangeOfSets',
    index?: number,
  ) {
    if (type === 'videoplayer') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalVideoPlayer: true,
      }))
    }
    if (type === 'rangeOfSets' && index !== undefined) {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalSetBetweenSets: true,
        activeWeightIndex: index === -1 ? 0 : index,
        lastActiveWeightIndex: defaultModalState.activeWeightIndex,
      }))
    }
    if (type === 'weight' && index !== undefined) {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserWeight: true,
        activeWeightIndex: index === -1 ? 0 : index,
        lastActiveWeightIndex: defaultModalState.activeWeightIndex,
      }))
    }
    if (type === 'sets' && index !== undefined) {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserSets: true,
        activeWeightIndex: index === -1 ? 0 : index,
        lastActiveWeightIndex: defaultModalState.activeWeightIndex,
      }))
    }
    if (type === 'notes') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserNotes: true,
        //        activeWeightIndex: prevState.lastActiveWeightIndex,
      }))
    }
  }

  function closeModal(
    type: 'videoplayer' | 'weight' | 'sets' | 'notes' | 'rangeOfSets',
  ) {
    if (type === 'videoplayer') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalVideoPlayer: false,
      }))
    }
    if (type === 'rangeOfSets') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalSetBetweenSets: false,
        activeWeightIndex: prevState.lastActiveWeightIndex,
        //        activeWeightIndex: prevState.lastActiveWeightIndex,
      }))
    }
    if (type === 'weight') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserWeight: false,
        activeWeightIndex: prevState.lastActiveWeightIndex,
        //        activeWeightIndex: prevState.lastActiveWeightIndex,
      }))
    }
    if (type === 'sets') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserSets: false,
        activeWeightIndex: prevState.lastActiveWeightIndex,
        //        activeWeightIndex: prevState.lastActiveWeightIndex,
      }))
    }
    if (type === 'notes') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserNotes: false,
        //        activeWeightIndex: prevState.lastActiveWeightIndex,
      }))
    }
  }

  function buttonText() {
    if (!modalCachedCardExerciseData.workoutExerciseSets) return

    const activeWeightIndex = defaultModalState.activeWeightIndex
    const repetitionData =
      modalCachedCardExerciseData.workoutExerciseSets[activeWeightIndex]

    const completed = repetitionData
      ? repetitionData.completedData.isCompleted
      : false
    if (allItensCompleted && !isRunning) {
      return user?.selectedLanguage === 'pt-br' ? 'Próximo' : 'Next xercise'
    }
    if (isRunning) {
      return user?.selectedLanguage === 'pt-br' ? 'Pular descanso' : 'Skip rest'
    }
    if (completed && !allItensCompleted) {
      return user?.selectedLanguage === 'pt-br'
        ? 'Desmarcar série'
        : 'Unmark set'
    }

    return user?.selectedLanguage === 'pt-br'
      ? 'Registrar repetição'
      : 'Register repetition'
  }

  function onTimerManage(type: 'pause' | 'play' | 'skip' | 'add' | 'subtract') {
    if (type === 'pause') {
      pause()
    }
    if (type === 'play') {
      resume()
    }
    if (type === 'skip') {
      handleSkipRestTime()

      function handleSkipRestTime() {
        const time = new Date()
        time.setSeconds(time.getSeconds() + restTime)

        restart(time, false)
      }
    }

    if (type === 'add') {
      add15Seconds()
    }
    if (type === 'subtract') {
      subtract15Seconds()
    }

    function add15Seconds() {
      const time = new Date()
      time.setSeconds(time.getSeconds() + totalSeconds + 15)
      restart(time, isRunning)
    }

    function subtract15Seconds() {
      const time = new Date()
      time.setSeconds(time.getSeconds() + Math.max(totalSeconds - 15, 0))
      restart(time, isRunning)
    }
  }

  function onSaveNewTimer() {
    if (time === null) return
    const copyProgression = { ...modalCachedCardExerciseData }

    const date = new Date()
    const completedTimestamp = date.getTime()

    if (copyProgression.workoutExerciseSets === undefined) return

    copyProgression.workoutExerciseSets[
      defaultModalState.activeWeightIndex
    ].restTimeData = {
      ...copyProgression.workoutExerciseSets[
        defaultModalState.activeWeightIndex
      ].restTimeData,
      restTimeNumber: totalSeconds,
      updatedAt: completedTimestamp,
    }

    copyProgression.workoutExerciseSets[
      defaultModalState.activeWeightIndex
    ].updatedAt = completedTimestamp

    setModalCachedCardExerciseData(copyProgression)
    // onSaveNewTimer - ok REAL
    saveFastCachedWorkoutData(
      copyProgression,
      activeWorkoutId,
      activeWorkoutCreatedAt,
      date,
      completedTimestamp,
      workoutCardIndex,
    )
    console.log(`savou`)
  }

  const restTime =
    modalCachedCardExerciseData?.workoutExerciseSets?.[
      defaultModalState.activeWeightIndex
    ].restTimeData.restTimeNumber || 0

  const startCronometer = useCallback(() => {
    onTimerManage('pause')
    const time = new Date()
    time.setSeconds(time.getSeconds() + restTime)
    restart(time, false)
  }, [restart, restTime])

  useEffect(() => {
    startCronometer()
  }, [startCronometer])

  return (
    <ContainerGradient
      colors={['#000000', '#FFFFFF']}
      isFocused={isFocused || false}
    >
      {user?.selectedLanguage && modalCachedCardExerciseData && (
        <WorkoutNameAndVideo
          closeModal={closeModal}
          isOpenModalVideoPlayer={defaultModalState.isOpenModalVideoPlayer}
          isFocused={isFocused || false}
          item={item}
          selectedLanguage={user?.selectedLanguage}
          exerciseIndex={exerciseIndex}
          user={user}
          openVideoPlayer={() => openModal('videoplayer')}
          disabled={isRunning}
        />
      )}
      <WorkoutInfoWrapper pointerEvents={user?.anonymousUser ? 'none' : 'auto'}>
        {user?.selectedLanguage &&
          modalCachedCardExerciseData &&
          firstIncompleteIndex !== undefined &&
          lastCompletedIndex !== undefined &&
          allItensCompleted !== undefined && (
            <WorkoutRepetitionsData
              isFocused={isFocused || false}
              modalCachedCardExerciseData={modalCachedCardExerciseData}
              defaultModalState={defaultModalState}
              selectedLanguage={user?.selectedLanguage}
              firstIncompleteIndex={firstIncompleteIndex}
              lastCompletedIndex={lastCompletedIndex}
              handleSetCompletedCheck={handleUncheckOrCheckRepetion}
              openSets={(index) => openModal('sets', index)}
              openWeight={(index) => openModal('weight', index)}
              handleChangeRepetitionFocus={handleChangeRepetitionFocus}
              handleAddRepetition={() => handlePushOrPopRepetition('push')}
              handleRemoveLastRepetition={() =>
                handlePushOrPopRepetition('pop')
              }
              allItensCompleted={allItensCompleted}
              exerciseIndex={exerciseIndex}
              openSetBetweenSets={(index) => openModal('rangeOfSets', index)}
              disabled={isRunning}
            />
          )}
        <WorkoutUserNotesAndConfirmButtonWrapper
          pointerEvents={isFocused ? 'auto' : 'none'}
        >
          <WorkoutUserNotesButton
            disabled={exerciseIndex !== 0 && user?.anonymousUser}
            onPress={() => isFocused && openModal('notes')}
            enabled={isFocused || false}
            style={{ opacity: isFocused ? 1 : 0.4 }}
          >
            <BlurViewAddSecondsWrapper intensity={30}>
              <FileText
                width={28}
                height={28}
                fill={
                  item.workoutTechiesTittle?.['pt-br'] ||
                  item.workoutTechiesTittle?.us
                    ? theme.COLORS.AUX_GOOGLE_YELLOW
                    : theme.COLORS.NEUTRA_LETTER_AND_STROKE
                }
              />
            </BlurViewAddSecondsWrapper>
          </WorkoutUserNotesButton>

          <WorkoutButtonConfirm
            disabled={exerciseIndex !== 0 && user?.anonymousUser}
            onPress={() =>
              modalCachedCardExerciseData &&
              modalCachedCardExerciseData.workoutExerciseSets &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ] &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].completedData &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].completedData.isCompleted &&
              !allItensCompleted
                ? handleUncheckOrCheckRepetion(
                    defaultModalState.activeWeightIndex,
                  )
                : handleDoneWorkout()
            }
            workoutExerciseDone={
              modalCachedCardExerciseData &&
              modalCachedCardExerciseData.workoutExerciseSets &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ] &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].completedData.isCompleted
            }
          >
            <BlurViewWrapper intensity={30}>
              <WorkoutButtonText>{buttonText()}</WorkoutButtonText>
            </BlurViewWrapper>
          </WorkoutButtonConfirm>
        </WorkoutUserNotesAndConfirmButtonWrapper>

        <BulletsCronometerAndCTAButtonWrapper>
          <WorkoutCronometerWrapper>
            <WorkoutCronometer
              totalSeconds={totalSeconds}
              getModalTimer={Number(
                modalCachedCardExerciseData?.workoutExerciseSets?.[
                  defaultModalState.activeWeightIndex
                ].restTimeData.restTimeNumber,
              )}
              enabled={isFocused || false}
              onRestart={() => {
                onTimerManage('skip')
              }}
              onAdd15Seconds={() => onTimerManage('add')}
              onPause={() => onTimerManage('pause')}
              onPlay={() => onTimerManage('play')}
              onSubtract15Seconds={() => onTimerManage('subtract')}
              minutes={minutes}
              seconds={seconds}
              isRunning={isRunning}
              onSaveNewTimer={onSaveNewTimer}
            />
          </WorkoutCronometerWrapper>
        </BulletsCronometerAndCTAButtonWrapper>
      </WorkoutInfoWrapper>

      {/*  peso */}
      <Modal
        visible={defaultModalState.isOpenModalUserWeight}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('weight')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserWeightModal
          closeModal={() => closeModal('weight')}
          handleUpdateWeight={(_weight, tNow) =>
            handleUpdateWeight('single', tNow, _weight)
          }
          handleUpdateAllWeight={(_weight, tNow) =>
            handleUpdateWeight('all', tNow, _weight)
          }
          weight={
            (modalCachedCardExerciseData &&
              modalCachedCardExerciseData.workoutExerciseSets &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ] &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].weightData &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].weightData.value) ||
            ''
          }
          weightIndex={defaultModalState?.activeWeightIndex ?? 0}
          exerciseName={
            item.workoutExerciseName
              ? user?.selectedLanguage &&
                item.workoutExerciseName?.[user?.selectedLanguage]
              : ''
          }
        />
      </Modal>

      <Modal
        visible={defaultModalState.isOpenModalUserSets}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('sets')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserSetsModal
          visible={defaultModalState.isOpenModalUserSets}
          handleUpdateSets={(set, dateNow) =>
            handleUpdateSets('update', dateNow, set)
          }
          closeModal={() => closeModal('sets')}
          modalCachedCardExerciseData={modalCachedCardExerciseData}
          activeIndex={defaultModalState.activeWeightIndex}
          selectedLanguage={user?.selectedLanguage || 'pt-br'}
          item={item}
        />
      </Modal>

      {/*  Choose Sets Value Between */}
      <Modal
        visible={defaultModalState.isOpenModalSetBetweenSets}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => {
          closeModal('rangeOfSets')
        }}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserRangeOfSetsModal
          handleUpdateRangeOfSets={(selecteSet, dateNow) =>
            handleUpdateRangeSelect('update', dateNow, selecteSet)
          }
          closeModal={() => closeModal('rangeOfSets')}
          handleDeleteRangeOfSets={(dateNow) =>
            handleUpdateSets('delete', dateNow)
          }
          modalCachedCardExerciseData={modalCachedCardExerciseData}
          activeIndex={defaultModalState.activeWeightIndex}
          selectedLanguage={user?.selectedLanguage || 'pt-br'}
        />
      </Modal>

      <Modal
        visible={defaultModalState.isOpenModalUserNotes}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('notes')}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserNotesModal
          closeModal={() => closeModal('notes')}
          handleUpdateNotes={handleUpdateNotes}
          notes={modalCachedCardExerciseData.notes.value}
          item={item}
          selectedLanguage={user?.selectedLanguage || 'pt-br'}
        />
      </Modal>
    </ContainerGradient>
  )
}

export const WorkoutVideoCard = memo(
  WorkoutVideoCardComponent,
  (prevProps, nextProps) => {
    return prevProps === nextProps
  },
)
