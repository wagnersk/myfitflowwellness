/* eslint-disable camelcase */
import { Modal, Alert } from 'react-native'
import React, { useState, memo, useEffect, useMemo, useCallback } from 'react'

import { useTheme } from 'styled-components/native'

import { useAuth } from '@hooks/auth'

import { format } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import { useTimer } from 'react-timer-hook'

import FileText from '@assets/FileText.svg'

import {
  ICachedExerciseHistoryData,
  DayData,
  MonthData,
  YearData,
  IWeightDoneLog,
  IFormattedCardExerciseData,
  IWeightRepetitionData,
  Exercise,
} from '@hooks/authTypes'

import { OverLayWaterMarkButton } from '@components/OverLayWaterMarkButton'
import { WorkoutCronometer } from '@components/WorkoutCronometer'
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
  workoutId: string
  isFocused: boolean
  restTime: number
}
function WorkoutVideoCardComponent({
  item,
  workoutCardIndex,
  exerciseIndex,
  workoutId,
  isFocused,
  restTime,
}: Props) {
  const theme = useTheme()
  const time = new Date()

  const {
    cachedUserWorkoutsLog, // log do peso pessoal do usuario, é o cache que carrega com os cards
    myWorkout, // CACHE DO TREINO DIRETO DO FIREBASE

    updateCachedUserWorkoutsLog,
    saveWeightProgression,
    user,
  } = useAuth()

  const { seconds, minutes, isRunning, pause, restart, resume, totalSeconds } =
    useTimer({
      expiryTimestamp: time,
      onExpire: () => console.log('acabouu'),
      autoStart: false,
    })

  const defaultWeightDoneLog: IWeightDoneLog = useMemo(() => {
    const workoutExerciseRestTimeNumber =
      item?.workoutExerciseRestTimeNumber || 0
    const workoutExerciseSets = item?.workoutExerciseSets || [`0`]
    const workoutExerciseId = item.workoutExerciseId || ''
    const timeNow = new Date().getTime()

    const cachedInfo = cachedUserWorkoutsLog?.workoutsLog
      .find((v) => v.workoutId === workoutId)
      ?.workoutCardsLogData.find((v) => v.cardIndex === workoutCardIndex)
      ?.weightDoneLogs[exerciseIndex]

    const formattedTime = {
      value: String(workoutExerciseRestTimeNumber),
      createdAt: timeNow,
      updatedAt: timeNow,
    }

    const formattedNotes = {
      value: '',
      createdAt: timeNow,
      updatedAt: timeNow,
    }

    const formattedRepetition: IWeightRepetitionData[] =
      workoutExerciseSets.map((v) => {
        const rangeMatch = v.match(/^(\d+)-(\d+)$/)

        let setsValue = 0
        let rangeOfSets: number[] = []
        let isActivedRangeOfSets = false

        if (rangeMatch) {
          const start = Number(rangeMatch[1])
          const end = Number(rangeMatch[2])
          rangeOfSets = [start, end]
          isActivedRangeOfSets = true
        } else {
          setsValue = Number(v)
        }

        return {
          weight: {
            value: `0`,
            createdAt: timeNow,
            updatedAt: timeNow,
          },
          sets: {
            value: setsValue,
            isActivedRangeOfSets,
            rangeOfSets,
            createdAt: timeNow,
            updatedAt: timeNow,
          },
          completed: {
            isCompleted: false,
            createdAt: timeNow,
            updatedAt: timeNow,
          },
          createdAt: timeNow,
          updatedAt: timeNow,
        }
      })

    const cachedCardWeightLog: IWeightDoneLog = {
      exerciseIndex,
      exerciseId: workoutExerciseId,
      notes: cachedInfo?.notes || formattedNotes,
      time: cachedInfo?.time || formattedTime,
      repetitionData: cachedInfo?.repetitionData || formattedRepetition,
    }

    return cachedCardWeightLog
  }, [])

  const defaultModalStateValues = {
    isOpenModalUserNotes: false,
    isOpenModalVideoPlayer: false,
    isOpenModalUserWeight: false,
    isOpenModalUserSets: false,
    isOpenModalSetBetweenSets: false,
    activeWeightIndex: 0,
    lastActiveWeightIndex: 0,
  }

  const [modalWeightState, setModalWeightState] =
    useState<IWeightDoneLog>(defaultWeightDoneLog)

  const [defaultModalState, setDefaultModalState] =
    useState<IModalStateWorkoutLogData>(defaultModalStateValues)

  const [weightProgressionData, setWeightProgressionData] = useState<
    ICachedExerciseHistoryData[] | null
  >(null)

  const allItensCompleted = modalWeightState?.repetitionData.every(
    (v) => v.completed.isCompleted,
  )

  const firstIncompleteIndex = modalWeightState?.repetitionData.findIndex(
    (v) => !v.completed.isCompleted,
  )

  const lastCompletedIndex = modalWeightState?.repetitionData.reduceRight(
    (lastIndex, v, i) =>
      v.completed.isCompleted && lastIndex === -1 ? i : lastIndex,
    -1,
  )

  function handleUpdateWeight(_weight: string, type: 'all' | 'single') {
    if (type === 'single') {
      onUpdateSingleWeight(_weight)
    }

    if (type === 'all') {
      const allWeightsAreEqual = modalWeightState.repetitionData.every(
        (v) => v.weight.value === _weight,
      )

      if (allWeightsAreEqual) {
        onUpdateAllWeight(_weight)
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
                onUpdateAllWeight(_weight)
                closeModal('weight')
              },
            },
          ],
          { cancelable: false },
        )
      }
    }

    function onUpdateSingleWeight(_weight: string) {
      const copyProgression = { ...modalWeightState }
      const timeNow = new Date().getTime()
      const activeIndex = defaultModalState.activeWeightIndex

      copyProgression.repetitionData[activeIndex] = {
        ...copyProgression.repetitionData[activeIndex],
        weight: {
          value: _weight,
          createdAt: timeNow,
          updatedAt: timeNow,
        },
      }

      setModalWeightState(copyProgression)
      closeModal('weight')
    }

    function onUpdateAllWeight(_weight: string) {
      const copyProgression = { ...modalWeightState }
      const timeNow = new Date().getTime()

      const copyProgressionRep = modalWeightState.repetitionData.map((v) => ({
        ...v,
        weight: {
          value: _weight,
          createdAt: timeNow,
          updatedAt: timeNow,
        },
      }))

      copyProgression.repetitionData = copyProgressionRep
      setModalWeightState(copyProgression)
      closeModal('weight')
    }
  }

  function handleUpdateNotes(_notes: string) {
    if (!_notes) return

    setModalWeightState((prevState) => ({
      ...prevState,
      notes: {
        ...prevState.notes,
        value: _notes,
        updatedAt: new Date().getTime(),
      },
    }))
    setDefaultModalState((prevState) => ({
      ...prevState,
      isOpenModalUserNotes: !prevState.isOpenModalUserNotes,
    }))

    closeModal('notes')
  }

  function handleUpdateSets(
    type: 'update' | 'delete',
    value?: number,
    rangeOfSets?: number[],
    isActivedRangeOfSets?: boolean,
  ) {
    if (
      type === 'update' &&
      value !== undefined &&
      rangeOfSets !== undefined &&
      isActivedRangeOfSets !== undefined
    ) {
      const copyProgression = modalWeightState || {} // jogar state aqui

      copyProgression.repetitionData[defaultModalState.activeWeightIndex].sets =
        {
          rangeOfSets,
          value,
          isActivedRangeOfSets,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        }

      setModalWeightState(copyProgression)
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
              closeModal('weight')
            },
          },
        ],
        { cancelable: false },
      )

      function onRemoveRangeOfSets() {
        const copyProgression = modalWeightState || {} // jogar state aqui
        const copyValue =
          copyProgression.repetitionData[defaultModalState.activeWeightIndex]
            .sets.value
        copyProgression.repetitionData[
          defaultModalState.activeWeightIndex
        ].sets = {
          rangeOfSets: [],
          value: copyValue,
          isActivedRangeOfSets: false,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        }

        setModalWeightState(copyProgression)
        closeModal('sets')
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
              closeModal('weight')
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
              closeModal('weight')
            },
          },
        ],
        { cancelable: false },
      )
    }

    function onAddRepetition() {
      if (modalWeightState.repetitionData.length > 7) {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Ops' : 'Oops',
          user?.selectedLanguage === 'pt-br'
            ? 'Você atingiu o limite de repetições'
            : 'You have reached the repetition limit',
        )
        return
      }

      const copyProgression = { ...modalWeightState }
      const getTime = new Date().getTime()

      const newRepetitionToAdd = {
        ...copyProgression.repetitionData[
          copyProgression.repetitionData.length - 1
        ],
        setBetweenSets: '0',
        completed: {
          isCompleted: false,
          createdAt: getTime,
          updatedAt: getTime,
        },
        completedTimestamp: 0,
      }

      if (defaultModalState.activeWeightIndex === lastCompletedIndex) {
        console.log(`primeiro`)
        defaultModalState.activeWeightIndex =
          lastCompletedIndex === -1 ? 0 : lastCompletedIndex + 1
      } else {
        console.log(`segundo`)
      }

      copyProgression.repetitionData.push(newRepetitionToAdd)

      setModalWeightState(copyProgression)
    }

    function onRemoveRepetition() {
      if (modalWeightState.repetitionData.length <= 1) {
        Alert.alert(
          user?.selectedLanguage === 'pt-br' ? 'Ops' : 'Oops',
          user?.selectedLanguage === 'pt-br'
            ? 'Você não pode remover todas as repetições'
            : 'You cannot remove all repetitions',
        )
        return
      }
      const copyProgression = { ...modalWeightState }

      /* 

*/
      copyProgression.repetitionData.pop()

      const updatedRepLenght = copyProgression.repetitionData.length - 1

      defaultModalState.activeWeightIndex =
        firstIncompleteIndex === -1 ? updatedRepLenght : lastCompletedIndex

      const finalData: IWeightDoneLog = {
        ...copyProgression,
      }

      setModalWeightState(finalData)
    }
  }

  function handleDoneWorkout() {
    if (isRunning) {
      onTimerManage('skip')
      return
    }

    const getIsActivedRangeOfSets =
      modalWeightState.repetitionData[defaultModalState.activeWeightIndex].sets
        .isActivedRangeOfSets

    const getSetValue =
      modalWeightState.repetitionData[defaultModalState.activeWeightIndex].sets
        .value
    const getWeightValue =
      modalWeightState.repetitionData[defaultModalState.activeWeightIndex]
        .weight.value

    const getRangeOfSets =
      modalWeightState.repetitionData[defaultModalState.activeWeightIndex].sets
        .rangeOfSets

    if (!getIsActivedRangeOfSets && !getSetValue) {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserSets: true,
      }))
      return
    }

    if (getIsActivedRangeOfSets && !getSetValue) {
      openModal('rangeOfSets', defaultModalState.activeWeightIndex)
      return
    }

    if (
      getIsActivedRangeOfSets &&
      !getSetValue &&
      getRangeOfSets.length !== 0
    ) {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalSetBetweenSets: true,
      }))
      return
    }

    if (getWeightValue === `0`) {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserWeight: true,
      }))
      return
    }

    if (allItensCompleted) {
      alert('Todos os itens foram completados')
      return
    }

    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }

    onTimerManage('play')

    const date = new Date()
    const getTime = date.getTime()

    const copyProgression = { ...modalWeightState } // Copiar o estado atual

    copyProgression.repetitionData[
      defaultModalState.activeWeightIndex
    ].completed = {
      isCompleted: true,
      createdAt: getTime,
      updatedAt: getTime,
    }

    copyProgression.repetitionData[
      defaultModalState.activeWeightIndex
    ].updatedAt = getTime
    /* verificar o q ta aqui */
    const getActiveWeightIndex =
      defaultModalState.activeWeightIndex + 1 <
      modalWeightState.repetitionData.length
        ? defaultModalState.activeWeightIndex + 1
        : defaultModalState.activeWeightIndex
    /*  verificar esse trecho pois ao dar ok ele nao  */
    console.log(
      `getActiveWeightIndex ->>>>>>> ->>>>>>> ->>>>>>> ->>>>>>> ->>>>>>>`,
      modalWeightState.repetitionData.length,
    )

    setModalWeightState(copyProgression)
    setDefaultModalState((prev) => {
      return {
        ...prev,
        lastActiveWeightIndex: defaultModalState.activeWeightIndex,
        activeWeightIndex: getActiveWeightIndex,
      }
    })
    saveFastCachedWorkoutData(workoutId, date)

    async function saveFastCachedWorkoutData(_workoutId: string, date: Date) {
      if (!item.workoutExerciseId) return console.log(`vish`)

      const completedTimestamp = date.getTime()
      const lastCompletedDay = {
        'pt-br': format(date, 'EEEE', { locale: ptBR }),
        us: format(date, 'EEEE', { locale: enUS }),
      }
      const lastCompletedDate = format(date, 'dd/MM/yyyy')

      const newExercise: IWeightDoneLog = {
        exerciseIndex,
        exerciseId: item.workoutExerciseId,
        repetitionData: modalWeightState.repetitionData, // salva o novo
        notes: modalWeightState.notes,
        time: modalWeightState.time, // tempo do cronometro setado como selecionado +15 ou -15
      }

      const lastCompletedTimestamp = completedTimestamp

      const responseWeightDoneLogs = await updateCachedUserWorkoutsLog(
        newExercise,
        _workoutId,
        lastCompletedTimestamp,
        lastCompletedDay,
        lastCompletedDate,
        workoutCardIndex,
      )

      setModalWeightState((prev) => {
        return {
          ...prev,
          ...responseWeightDoneLogs,
        }
      })
    }

    function saveCachedHistoricDateWorkoutData() {
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
        /*   
            userId: 'user123', // ID do usuário 
            workoutId: 'Lf7BeUzt3OEShbCVx88J', // ID do card do treino   */
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
                  copyProgression[_dataIndex].exerciseHistory[_yearIndex]
                    .months[_monthIndex].days[_dayIndex].exercises

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
    }
  }

  function handleUncheckOrCheckRepetion(index: number) {
    if (isRunning) {
      pause()
      return
    }

    if (modalWeightState.repetitionData[index].completed.isCompleted) {
      const hasFollowingCompleted = modalWeightState.repetitionData
        .slice(index + 1)
        .some((item) => item.completed.isCompleted)

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
      marcarItem(index)
    }

    function desmarcarItem(index: number) {
      const copyModalWeightState = { ...modalWeightState }
      const completedTimestamp = new Date().getTime()

      copyModalWeightState.repetitionData =
        copyModalWeightState.repetitionData.map((item, i) => {
          if (i >= index) {
            const isExistingItem = item.completed.createdAt !== 0
            return {
              ...item,
              updatedAt: completedTimestamp,
              completed: {
                ...item.completed,
                isCompleted: false,
                updatedAt: completedTimestamp,
                createdAt: isExistingItem
                  ? item.completed.createdAt
                  : completedTimestamp,
              },
            }
          }
          return item
        })
      copyModalWeightState.repetitionData[index].updatedAt = completedTimestamp

      setModalWeightState(copyModalWeightState)
      setDefaultModalState((prev) => {
        return {
          ...prev,
          lastActiveWeightIndex: defaultModalState.activeWeightIndex,
          activeWeightIndex: index,
        }
      })
    }

    function marcarItem(index: number) {
      const copyModalWeightState = { ...modalWeightState }

      const completedTimestamp = new Date().getTime()
      const hasFollowingCompleted =
        copyModalWeightState.repetitionData[index].completed

      // se ja existir ele nao vai recriar mas sso atualizar udpatredAt e o isCOmpl.,eted , preveservando o created AT

      copyModalWeightState.repetitionData[index].updatedAt = completedTimestamp

      if (!hasFollowingCompleted) {
        copyModalWeightState.repetitionData[index].completed = {
          isCompleted: true,
          createdAt: completedTimestamp,
          updatedAt: completedTimestamp,
        }
      } else {
        copyModalWeightState.repetitionData[index].completed.isCompleted = true
        copyModalWeightState.repetitionData[index].completed.updatedAt =
          completedTimestamp
      }

      copyModalWeightState.repetitionData[index].updatedAt = completedTimestamp

      setModalWeightState(copyModalWeightState)
      setDefaultModalState((prev) => {
        return {
          ...prev,
          lastActiveWeightIndex: defaultModalState.activeWeightIndex,
          activeWeightIndex: index,
        }
      })
    }
  }

  function handleChangeRepetitionFocus(index: number) {
    console.log(`index`, index)
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
      console.log(`asdasd`, type)

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
        //        activeWeightIndex: prevState.lastActiveWeightIndex,
      }))
    }
    if (type === 'weight') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserWeight: false,
        //        activeWeightIndex: prevState.lastActiveWeightIndex,
      }))
    }
    if (type === 'sets') {
      setDefaultModalState((prevState) => ({
        ...prevState,
        isOpenModalUserSets: false,
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

        setModalWeightState((prev) => {
          return {
            ...prev,
            time: {
              ...prev.time,
              value: String(restTime),
              updatedAt: time.getTime(),
            },
          }
        })
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

      setModalWeightState((prev) => {
        return {
          ...prev,
          time: {
            ...prev.time,
            value: String(Number(prev.time.value) + 15),
            updatedAt: time.getTime(),
          },
        }
      })
    }

    function subtract15Seconds() {
      const time = new Date()
      time.setSeconds(time.getSeconds() + Math.max(totalSeconds - 15, 0))
      restart(time, isRunning)

      setModalWeightState((prev) => {
        return {
          ...prev,
          time: {
            ...prev.time,
            value: String(Number(prev.time.value) - 15),
            updatedAt: time.getTime(),
          },
        }
      })
    }
  }

  function handlePressGuessUser() {
    Alert.alert(
      user?.selectedLanguage === 'pt-br' ? 'Alerta' : 'Alert',
      user?.selectedLanguage === 'pt-br'
        ? 'Disponível apenas para usuários cadastrados'
        : 'Available only for registered users',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    )
  }

  function buttonText() {
    if (!modalWeightState.repetitionData) return

    const activeWeightIndex = defaultModalState.activeWeightIndex
    const repetitionData = modalWeightState.repetitionData[activeWeightIndex]

    const completed = repetitionData
      ? repetitionData.completed.isCompleted
      : false
    if (allItensCompleted) {
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

  const startCronometer = useCallback(() => {
    onTimerManage('pause')
    const time = new Date()
    time.setSeconds(time.getSeconds() + restTime)
    restart(time, false)
  }, [restTime, restart])

  useEffect(() => {
    startCronometer()
  }, [startCronometer])
  return (
    <ContainerGradient colors={['#000000', '#FFFFFF']} isFocused={isFocused}>
      {user?.selectedLanguage && modalWeightState && (
        <WorkoutNameAndVideo
          closeModal={closeModal}
          isOpenModalVideoPlayer={defaultModalState.isOpenModalVideoPlayer}
          isFocused={isFocused}
          item={item}
          selectedLanguage={user?.selectedLanguage}
          exerciseIndex={exerciseIndex}
          user={user}
          openVideoPlayer={() => openModal('videoplayer')}
        />
      )}

      <WorkoutInfoWrapper>
        {user?.selectedLanguage &&
          modalWeightState &&
          firstIncompleteIndex !== undefined &&
          lastCompletedIndex !== undefined &&
          allItensCompleted !== undefined && (
            <WorkoutRepetitionsData
              isFocused={isFocused}
              modalWeightState={modalWeightState}
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
            />
          )}
        <WorkoutUserNotesAndConfirmButtonWrapper
          pointerEvents={isFocused ? 'auto' : 'none'}
        >
          <WorkoutUserNotesButton
            disabled={exerciseIndex !== 0 && user?.anonymousUser}
            onPress={() => isFocused && openModal('notes')}
            enabled={isFocused}
            style={{ opacity: isFocused ? 1 : 0.4 }}
          >
            <BlurViewAddSecondsWrapper intensity={30}>
              <FileText
                width={28}
                height={28}
                fill={theme.COLORS.NEUTRA_LETTER_AND_STROKE}
              />
            </BlurViewAddSecondsWrapper>
          </WorkoutUserNotesButton>

          <WorkoutButtonConfirm
            disabled={exerciseIndex !== 0 && user?.anonymousUser}
            onPress={() =>
              modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].completed &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].completed.isCompleted &&
              !allItensCompleted
                ? handleUncheckOrCheckRepetion(
                    defaultModalState.activeWeightIndex,
                  )
                : handleDoneWorkout()
            }
            workoutExerciseDone={
              modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].completed.isCompleted
            }
          >
            <BlurViewWrapper intensity={30}>
              <WorkoutButtonText>{buttonText()}</WorkoutButtonText>
            </BlurViewWrapper>
          </WorkoutButtonConfirm>
        </WorkoutUserNotesAndConfirmButtonWrapper>
        {exerciseIndex !== 0 && user?.anonymousUser && (
          <OverLayWaterMarkButton onPress={handlePressGuessUser} />
        )}
        <BulletsCronometerAndCTAButtonWrapper>
          <WorkoutCronometerWrapper>
            <WorkoutCronometer
              totalSeconds={totalSeconds}
              getModalTimer={Number(modalWeightState.time.value)}
              enabled={isFocused}
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
            />
          </WorkoutCronometerWrapper>
        </BulletsCronometerAndCTAButtonWrapper>
      </WorkoutInfoWrapper>

      {/*  peso */}
      <Modal
        visible={defaultModalState.isOpenModalUserWeight}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('weight')} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserWeightModal
          closeModal={() => closeModal('weight')} // Método para fechar o modal (iOS, Android)
          handleUpdateWeight={(_weight) =>
            handleUpdateWeight(_weight, 'single')
          }
          handleUpdateAllWeight={(_weight) =>
            handleUpdateWeight(_weight, 'all')
          }
          weight={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].weight &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].weight.value) ||
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
        onRequestClose={() => closeModal('sets')} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserSetsModal
          closeModal={() => closeModal('sets')} // Método para fechar o modal (iOS, Android)
          handleUpdateSets={(
            set: number,
            rangeOfSets: number[],
            isActivedRangeOfSets: boolean,
          ) =>
            handleUpdateSets('update', set, rangeOfSets, isActivedRangeOfSets)
          }
          sets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].sets &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].sets.value) ||
            0
          }
          setsIndex={defaultModalState.activeWeightIndex + 1}
          exerciseName={
            item.workoutExerciseName
              ? user?.selectedLanguage &&
                item.workoutExerciseName?.[user?.selectedLanguage]
              : ''
          }
          isActivedRangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].sets.isActivedRangeOfSets) ||
            false
          }
          rangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].sets.rangeOfSets) ||
            []
          }
        />
      </Modal>

      {/*  Choose Sets Value Between */}
      <Modal
        visible={defaultModalState.isOpenModalSetBetweenSets}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => {
          closeModal('rangeOfSets')
        }} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserRangeOfSetsModal
          tittle={
            user?.selectedLanguage === 'pt-br'
              ? 'Ótimo trabalho! Quantas repetições você completou?'
              : 'Great job! How many repetitions did you complete?'
          }
          subTittle={
            user?.selectedLanguage === 'pt-br'
              ? `Repetições da série ${defaultModalState.activeWeightIndex + 1}`
              : `Reps of set ${defaultModalState.activeWeightIndex + 1}`
          }
          closeModal={() => closeModal('rangeOfSets')} // Método para fechar o modal (iOS, Android)
          handleUpdateRangeOfSets={(
            set: number,
            rangeOfSets: number[],
            isActivedRangeOfSets: boolean,
          ) =>
            handleUpdateSets('update', set, rangeOfSets, isActivedRangeOfSets)
          }
          handleDeleteRangeOfSets={() => handleUpdateSets('delete')}
          sets={Number(
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].sets.value) ||
              0,
          )}
          rangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].sets.rangeOfSets) ||
            []
          }
          isActivedRangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                defaultModalState.activeWeightIndex
              ].sets.isActivedRangeOfSets) ||
            false
          }
        />
      </Modal>

      <Modal
        visible={defaultModalState.isOpenModalUserNotes}
        animationType={`slide`}
        transparent={true}
        onRequestClose={() => closeModal('notes')} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserNotesModal
          closeModal={() => closeModal('notes')}
          handleUpdateNotes={handleUpdateNotes}
          workoutExerciseId={item.workoutExerciseId}
          notes={modalWeightState.notes.value}
          exerciseName={
            item.workoutExerciseName
              ? user?.selectedLanguage &&
                item.workoutExerciseName?.[user?.selectedLanguage]
              : ''
          }
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
