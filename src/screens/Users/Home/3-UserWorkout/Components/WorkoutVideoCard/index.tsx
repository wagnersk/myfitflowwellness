/* eslint-disable camelcase */
import { View, Modal, Alert, ScrollView } from 'react-native'
import React, {
  useState,
  memo,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react'
import { useTheme } from 'styled-components/native'

import { Image } from 'expo-image'
import { useAuth } from '@hooks/auth'

import { format, isSameDay } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import * as FileSystem from 'expo-file-system'

import { WorkoutUserNotesModal } from '@components//Modals/WorkoutUserNotesModal'
import { CachedVideoPlayerModal } from '@components/Modals/CachedVideoPlayerModal'
import { WorkoutUserWeightModal } from '@components/Modals/WorkoutUserWeightModal'

import Check from '@assets/Check.svg'
import Close from '@assets/Close.svg'
import More from '@assets/More.svg'
import Less from '@assets/Less.svg'
import FileText from '@assets/FileText.svg'
import PlayVideo from '@assets/PlayVideo.svg'

import { getTrimmedName } from '@utils/getTrimmedName'

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

import {
  ContainerGradient,
  WorkoutNameAndVideoWrapper,
  WorkoutNameWrapper,
  WorkoutName,
  WorkoutVideoPlayerButton,
  WorkoutInfoWrapper,
  WorkoutRepetitionAndSerieWrapper,
  ButtonsWrapper,
  WorkoutButton,
  WorkoutWeightValueAndTextWrapper,
  WorkoutWeightValue,
  WorkoutWeightText,
  WorkoutSerieWrapper,
  WorkoutUserNotesButton,
  WorkoutSerieValue,
  WorkoutButtonConfirm,
  WorkoutButtonText,
  WorkoutUserNotesAndConfirmButtonWrapper,
  BlurViewWrapper,
  TableWrapper,
  BulletsCronometerAndCTAButtonWrapper,
  WorkoutCronometerWrapper,
  BlurViewAddSecondsWrapper,
  WorkoutWeightMetric,
  WorkoutIndexButton,
} from './styles'
import { OverLayWaterMarkButton } from '@components/OverLayWaterMarkButton'
import { WorkoutCronometer } from '@components/WorkoutCronometer'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useTimer } from 'react-timer-hook'
import { WorkoutUserSetsModal } from '@components/Modals/WorkoutUserSetsModal'
import { WorkoutUserRangeOfSetsModal } from '@components/Modals/WorkoutUserRangeOfSetsModal'
import WorkoutRepetitionsData from './Components/WorkoutRepetitionsData'

interface Props {
  item: IFormattedCardExerciseData
  exerciseIndex: number // Supino reto.... exercicios
  workoutCardIndex: number // A B ou C
  workoutId: string
  isFocused: boolean
  restTime: number
}

interface IModalStateWorkoutLogData extends IWeightDoneLog {
  isOpenModalUserNotes: boolean
  isOpenModalVideoPlayer: boolean
  isOpenModalUserWeight: boolean
  isOpenModalUserSets: boolean
  isOpenModalSetBetweenSets: boolean
  workoutCardIndex: number
  activeWeightIndex: number
}

function WorkoutVideoCardComponent({
  item,
  workoutCardIndex,
  exerciseIndex,
  workoutId,
  isFocused,
  restTime,
}: Props) {
  const circularProgressRef = useRef<AnimatedCircularProgress>(null)
  const theme = useTheme()
  const time = new Date()
  const {
    updateCachedVideoTable,
    cachedVideoTable,

    cachedUserWorkoutsLog, // log do peso pessoal do usuario, é o cache que carrega com os cards
    myWorkout, // CACHE DO TREINO DIRETO DO FIREBASE

    updateCachedUserWorkoutsLog,
    saveWeightProgression,
    user,
  } = useAuth()

  const selectedLanguage = user?.selectedLanguage

  const { seconds, minutes, isRunning, pause, restart, resume, totalSeconds } =
    useTimer({
      expiryTimestamp: time,
      onExpire: () => console.log('acabouu'),
      autoStart: false,
    })
  const [restTimeState, setRestTimeState] = useState<number | null>(null)
  const elapsedTime = (restTimeState ?? 0) - totalSeconds
  const percentage = restTimeState ? (elapsedTime / restTimeState) * 100 : 0
  // const invertedPercentage = 100 - percentage

  useEffect(() => {
    setRestTimeState(restTime)
  }, [restTime])

  // criar variavel que armazena o restTime que pode ser alterado
  const cachedDefaultModalState: IModalStateWorkoutLogData = {
    isOpenModalUserNotes: false,
    isOpenModalVideoPlayer: false,
    isOpenModalUserWeight: false,
    isOpenModalUserSets: false,
    isOpenModalSetBetweenSets: false,
    activeWeightIndex: 0,
    workoutCardIndex: 0,
    exerciseIndex: 0,
    exerciseId: item.workoutExerciseId || '',
    repetitionData: [
      {
        completed: { isCompleted: false, createdAt: 0, updatedAt: 0 },
        sets: {
          value: 0,
          isActivedRangeOfSets: false,
          rangeOfSets: [],
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
        weight: {
          value: `0`,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    ],
    notes: {
      value: '',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
    time: {
      value: `0`,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    },
  }

  const initialModalState = useMemo(() => {
    let cachedCardWeightLog = cachedDefaultModalState

    if (cachedUserWorkoutsLog && cachedUserWorkoutsLog.workoutsLog) {
      if (cachedUserWorkoutsLog?.userId !== user?.id) return
      const sessionIndex = cachedUserWorkoutsLog.workoutsLog.findIndex(
        (v) => v.workoutId === workoutId,
      )
      if (sessionIndex === -1) return

      const findCachedCard = cachedUserWorkoutsLog.workoutsLog[
        sessionIndex
      ].workoutCardsLogData.find((v) => v.cardIndex === workoutCardIndex)

      if (findCachedCard && findCachedCard.weightDoneLogs) {
        const weightLog = findCachedCard.weightDoneLogs.find(
          (log) => log.exerciseIndex === exerciseIndex,
        )

        if (weightLog) {
          cachedCardWeightLog = {
            ...cachedDefaultModalState,
            ...weightLog,
          }
        }
      }
    }

    const getLastCompletedTimestamp = cachedCardWeightLog.repetitionData.reduce(
      (latest, current) =>
        current.updatedAt > latest.updatedAt ? current : latest,
      { updatedAt: 0 } as IWeightRepetitionData,
    )
    const todayDate = new Date()

    const areSameDay = getLastCompletedTimestamp?.updatedAt
      ? isSameDay(todayDate, getLastCompletedTimestamp.updatedAt)
      : false

    if (areSameDay) {
      const cleanCompletedDones = cachedCardWeightLog.repetitionData.map(
        (v) => {
          return {
            ...v,
            completed: {
              isCompleted: areSameDay ? v.completed.isCompleted : false,
              createdAt: new Date().getTime(),
              updatedAt: new Date().getTime(),
            },
          }
        },
      )
      cachedCardWeightLog.repetitionData = cleanCompletedDones
    }

    return cachedCardWeightLog
  }, [cachedUserWorkoutsLog, workoutId, workoutCardIndex, exerciseIndex])

  const [modalWeightState, setModalWeightState] =
    useState<IModalStateWorkoutLogData>(
      initialModalState || cachedDefaultModalState,
    )

  const allItensCompleted = modalWeightState.repetitionData.every(
    (v) => v.completed,
  )

  const [modalVideoLocalPathState, setModalVideoLocalPathState] =
    useState<string>('')

  const [weightProgressionData, setWeightProgressionData] = useState<
    ICachedExerciseHistoryData[] | null
  >(null)

  const firstIncompleteIndex = modalWeightState.repetitionData.findIndex(
    (v) => !v.completed,
  )

  const lastCompletedIndex = modalWeightState.repetitionData.reduceRight(
    (lastIndex, v, i) => (v.completed && lastIndex === -1 ? i : lastIndex),
    -1,
  )

  const closeSets = useCallback(() => {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserSets: false,
      activeWeightIndex: lastCompletedIndex === -1 ? 0 : lastCompletedIndex + 1,
    }))
  }, [lastCompletedIndex])

  const closeWeight = useCallback(() => {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserWeight: false,
    }))
  }, [lastCompletedIndex])

  const closeSetBetweenSets = useCallback(() => {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalSetBetweenSets: false,
      activeWeightIndex: lastCompletedIndex === -1 ? 0 : lastCompletedIndex + 1,
    }))
  }, [lastCompletedIndex])

  const handleUpdateWeight = useCallback(
    async (_weight: string) => {
      console.log(`chegando no peso:`, _weight)
      setModalWeightState((prevState) => ({
        ...prevState,
        isOpenModalUserNotes: !prevState.isOpenModalUserNotes,
        weight: {
          value: _weight,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        },
      }))

      closeWeight()
    },
    [modalWeightState, closeWeight],
  )

  const handleUpdateNotes = useCallback(
    async (_notes: string) => {
      if (!_notes) return

      setModalWeightState((prevState) => ({
        ...prevState,
        isOpenModalUserNotes: !prevState.isOpenModalUserNotes,
        notes: {
          ...prevState.notes,
          value: _notes,
          updatedAt: new Date().getTime(),
        },
      }))

      closeNotes()
    },
    [item],
  )

  const handleUpdateSets = useCallback(
    async (
      value: number,
      rangeOfSets: number[],
      isActivedRangeOfSets: boolean,
    ) => {
      /* 
      setBetweenSets: 0,
      */
      console.log(`chegando handleUpdateSets value:`, value)
      const copyProgression = modalWeightState || {} // jogar state aqui

      copyProgression.repetitionData[modalWeightState.activeWeightIndex].sets =
        {
          value,
          rangeOfSets,
          isActivedRangeOfSets,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        }

      setModalWeightState(copyProgression)
      closeSets()
    },
    [modalWeightState, closeSets],
  )

  const handleUpdateRangeOfSets = useCallback(
    async (
      value: number,
      rangeOfSets: number[],
      isActivedRangeOfSets: boolean,
    ) => {
      console.log(`chegando na rangeOfSets:`, rangeOfSets)
      const copyProgression = modalWeightState || {} // jogar state aqui

      copyProgression.repetitionData[modalWeightState.activeWeightIndex].sets =
        {
          isActivedRangeOfSets,
          rangeOfSets,
          value,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        }

      setModalWeightState(copyProgression)
      closeSets()
    },
    [modalWeightState, closeSets],
  )

  function handleUpdateAllWeightValidate(weight: string) {
    // se todos forem igual ao weight eu nao pergunto

    const allWeightsAreEqual = modalWeightState.repetitionData.every(
      (v) => v.weight === weight,
    )
    if (!allWeightsAreEqual) {
      handleUpdateAllWeight(weight)
    }
    if (allWeightsAreEqual) {
      onUpdateAll(weight)
      closeWeight()
    }
  }

  function handleUpdateAllWeight(_weight: string) {
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
            onUpdateAll(_weight)
            closeWeight()
          },
        },
      ],
      { cancelable: false },
    )
  }

  function onUpdateAll(_weight: string) {
    const copyProgression = { ...modalWeightState }

    const copyProgressionRep =
      modalWeightState?.repetitionData.map((v) => ({
        ...v,
        weight: _weight,
      })) || []

    copyProgression.repetitionData = copyProgressionRep
    setModalWeightState(copyProgression)
  }

  function handleAddRepetition() {
    Alert.alert(
      selectedLanguage === 'pt-br' ? 'Adicionar Repetição' : 'Add Repetition',
      selectedLanguage === 'pt-br'
        ? 'Você realmente quer adicionar mais uma repetição?'
        : 'Do you really want to add another repetition?',
      [
        {
          text: selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
          style: 'cancel',
        },
        {
          text: selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
          onPress: () => {
            onAddRepetition()
            closeWeight()
          },
        },
      ],
      { cancelable: false },
    )

    function onAddRepetition() {
      if (modalWeightState.repetitionData.length > 7) {
        Alert.alert(
          selectedLanguage === 'pt-br' ? 'Ops' : 'Oops',
          selectedLanguage === 'pt-br'
            ? 'Você atingiu o limite de repetições'
            : 'You have reached the repetition limit',
        )
        return
      }

      const copyProgression = { ...modalWeightState }

      const doNotCopyCompleted = copyProgression.repetitionData.map((v) => {
        return {
          completed: false,
          completedTimestamp: 0,
          setBetweenSets: '0',
          sets: v.sets,
          weight: v.weight,
        }
      })

      const newRepetitionToAdd = {
        ...copyProgression.repetitionData[
          copyProgression.repetitionData.length - 1
        ],
        setBetweenSets: '0',
        completed: false,
        completedTimestamp: 0,
      }
      console.log(`lastCompletedIndex`, lastCompletedIndex)
      console.log(
        `copyProgression.activeWeightIndex`,
        copyProgression.activeWeightIndex,
      )

      if (copyProgression.activeWeightIndex === lastCompletedIndex) {
        console.log(`primeiro`)
        copyProgression.activeWeightIndex =
          lastCompletedIndex === -1 ? 0 : lastCompletedIndex + 1
      } else {
        console.log(`segundo`)
      }

      copyProgression.repetitionData.push(newRepetitionToAdd)

      setModalWeightState(copyProgression)
    }
  }

  function handleRemoveLastRepetition() {
    Alert.alert(
      selectedLanguage === 'pt-br' ? 'Remover Repetição' : 'Remove Repetition',
      selectedLanguage === 'pt-br'
        ? 'Você realmente quer remover a última repetição?'
        : 'Do you really want to remove the last repetition?',
      [
        {
          text: selectedLanguage === 'pt-br' ? 'Cancelar' : 'Cancel',
          style: 'cancel',
        },
        {
          text: selectedLanguage === 'pt-br' ? 'Confirmar' : 'Confirm',
          onPress: () => {
            onRemoveRepetition()
            closeWeight()
          },
        },
      ],
      { cancelable: false },
    )

    function onRemoveRepetition() {
      if (modalWeightState.repetitionData.length <= 1) {
        Alert.alert(
          selectedLanguage === 'pt-br' ? 'Ops' : 'Oops',
          selectedLanguage === 'pt-br'
            ? 'Você não pode remover todas as repetições'
            : 'You cannot remove all repetitions',
        )
        return
      }
      const copyProgression = { ...modalWeightState }

      console.log(`lastCompletedIndex`, lastCompletedIndex)
      console.log(
        `copyProgression.repetitionData.length`,
        copyProgression.repetitionData.length,
      )
      console.log(`lastCompletedIndex`, lastCompletedIndex)
      /* 

*/
      copyProgression.repetitionData.pop()
      const updatedRepLenght = copyProgression.repetitionData.length - 1
      console.log(`updatedRepLenght`, updatedRepLenght)

      copyProgression.activeWeightIndex =
        firstIncompleteIndex === -1 ? updatedRepLenght : lastCompletedIndex

      const finalData: IModalStateWorkoutLogData = {
        ...copyProgression,
      }

      setModalWeightState(finalData)
    }
  }

  function handleDoneWorkout() {
    if (isRunning) {
      handleSkipRestTime()
      return
    }

    if (allItensCompleted) {
      alert('Todos os itens foram completados')
      // criar hook para  para proximo exercicio
      return
    }
    const isActivedRangeOfSets =
      modalWeightState.repetitionData[modalWeightState.activeWeightIndex].sets
        .isActivedRangeOfSets

    const value =
      modalWeightState.repetitionData[modalWeightState.activeWeightIndex].sets
        .value

    if (isActivedRangeOfSets && !value) {
      openSetBetweenSets(modalWeightState.activeWeightIndex)
      return
    }

    if (!workoutId) return
    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }
    if (isRunning) {
      handleSkipRestTime()
      return
    }

    onPlay()

    const copyProgression = { ...modalWeightState } // Copiar o estado atual

    copyProgression.repetitionData[
      modalWeightState.activeWeightIndex
    ].completed = {
      isCompleted: true,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }

    setModalWeightState(copyProgression)
    saveFastCachedWorkoutData(workoutId)

    async function saveFastCachedWorkoutData(_workoutId: string) {
      if (!item.workoutExerciseId) return console.log(`vish`)

      const date = new Date()
      const completedTimestamp = date.getTime()
      const lastCompletedDay = {
        'pt-br': format(date, 'EEEE', { locale: ptBR }),
        us: format(date, 'EEEE', { locale: enUS }),
      }
      const lastCompletedDate = format(date, 'dd/MM/yyyy')

      console.log(`lastCompletedDay!!!!!!!!`)
      console.log(lastCompletedDay)

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
      console.log(` retornando final `)
      console.log(JSON.stringify(newExercise))

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
            workoutExerciseWeight: repetitionData.map((v) => v.weight),
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
          if (modalWeightState.weight === undefined) return
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
            modalWeightState.repetitionData.map((v) => v.weight)
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

  function handleSetCompletedCheck(index: number) {
    if (isRunning) {
      pause()
      return
    }
    const copyModalWeightState = { ...modalWeightState }

    if (copyModalWeightState.repetitionData[index].completed) {
      const hasFollowingCompleted = copyModalWeightState.repetitionData
        .slice(index + 1)
        .some((item) => item.completed)

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
              desmarcarItem(index, copyModalWeightState)
              handleSkipRestTime()
            },
          },
        ],
        { cancelable: false },
      )
      return
    }

    marcarItem(index, copyModalWeightState)
    setModalWeightState((prevState) => {
      const nextIndex = prevState.activeWeightIndex + 1
      const isLastIndex = nextIndex >= prevState.repetitionData.length

      return {
        ...prevState,
        activeWeightIndex: isLastIndex
          ? prevState.activeWeightIndex
          : nextIndex,
      }
    })
    function desmarcarItem(
      index: number,
      copyModalWeightState: IModalStateWorkoutLogData,
    ) {
      const reajustedCompleted = copyModalWeightState.repetitionData.map(
        (v, i) => {
          const indexLimit = index - 1
          if (i > indexLimit) {
            return {
              ...v,
              completed: false,
              completedTimestamp: 0,
              setBetweenSets: '0',
            }
          }
          return v
        },
      )

      copyModalWeightState.repetitionData = reajustedCompleted
      copyModalWeightState.activeWeightIndex = index
      console.log(`copyModalWeightState`)
      console.log(copyModalWeightState)
      setModalWeightState(copyModalWeightState)
    }

    function marcarItem(index: number, copyModalWeightState: any) {
      const completedTimestamp = new Date().getTime()

      copyModalWeightState.repetitionData[index].completed = true
      copyModalWeightState.repetitionData[index].completedTimestamp =
        completedTimestamp

      copyModalWeightState.activeWeightIndex = index

      setModalWeightState(copyModalWeightState)
    }
  }

  function handleSkipRestTime() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + restTime)
    setRestTimeState(restTime) // Resetar o estado para o tempo inicial
    restart(time, false)
  }

  /* alterar */
  function add15Seconds() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + totalSeconds + 15)
    restart(time, isRunning)
    setRestTimeState((prev) => (prev !== null ? prev + 15 : 15))
  }

  /* alterar */
  function subtract15Seconds() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + Math.max(totalSeconds - 15, 0))
    restart(time, isRunning)

    setRestTimeState((prev) => (prev !== null ? prev - 15 : 0))
  }

  function openVideoPlayer() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalVideoPlayer: true,
    }))
  }

  function closeVideoPlayer() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalVideoPlayer: false,
    }))
  }

  function openNotes() {
    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }
    // criar hook aqui para salvar o notes e tirar o salva dele indo pelo node se tiver
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserNotes: true,
    }))
  }

  function closeNotes() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserNotes: false,
    }))
  }

  function openWeight(index: number) {
    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }
    // criar hook aqui para salvar o notes e tirar o salva dele indo pelo node se tiver
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserWeight: true,
      activeWeightIndex: index === -1 ? 0 : index,
    }))
  }

  function openSets(index: number) {
    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }
    // criar hook aqui para salvar o notes e tirar o salva dele indo pelo node se tiver
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserSets: true,
      activeWeightIndex: index === -1 ? 0 : index,
    }))
  }

  function openSetBetweenSets(index: number) {
    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }
    console.log(`aeaeaea`)
    // criar hook aqui para salvar o notes e tirar o salva dele indo pelo node se tiver
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalSetBetweenSets: true,
      activeWeightIndex: index === -1 ? 0 : index,
    }))
  }

  function updateActiveWeightIndexSets(index: number) {
    if (exerciseIndex !== 0 && user?.anonymousUser) {
      return
    }
    if (!modalWeightState) return
    /* 
    se clicar em algo diferente do que estava , se ele for menor que o ultimo completado e nao for o ultimo
    */
    if (index !== modalWeightState.activeWeightIndex) {
      setModalWeightState((prevState) => ({
        ...prevState,
        activeWeightIndex: index,
      }))
    }

    if (allItensCompleted) {
      console.log(`allItensCompleted `)

      setModalWeightState((prevState) => ({
        ...prevState,
        activeWeightIndex: prevState.activeWeightIndex,
      }))
    } /* else {
      setModalWeightState((prevState) => ({
        ...prevState,
        activeWeightIndex: index,
      }))
    } */
  }

  function handlePress() {
    Alert.alert(
      selectedLanguage === 'pt-br' ? 'Alerta' : 'Alert',
      selectedLanguage === 'pt-br'
        ? 'Disponível apenas para usuários cadastrados'
        : 'Available only for registered users',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    )
  }

  const handlePause = useCallback(() => {
    pause()
  }, [pause])

  function onPlay() {
    resume()
  }

  const buttonText = useMemo(
    () => getButtonText(),
    [modalWeightState, isRunning, selectedLanguage],
  )

  function getButtonText() {
    if (!modalWeightState.repetitionData) return

    const activeWeightIndex = modalWeightState.activeWeightIndex
    const repetitionData = modalWeightState.repetitionData[activeWeightIndex]

    const completed = repetitionData ? repetitionData.completed : false

    if (isRunning) {
      return selectedLanguage === 'pt-br' ? 'Pular descanso' : 'Skip rest'
    }
    if (completed && !allItensCompleted) {
      return selectedLanguage === 'pt-br' ? 'Desmarcar série' : 'Unmark set'
    }

    if (allItensCompleted) {
      return selectedLanguage === 'pt-br' ? 'Próximo exercício' : 'Next xercise'
    }
    return selectedLanguage === 'pt-br'
      ? 'Registrar repetição'
      : 'Register repetition'
  }

  useEffect(() => {
    handlePause()
    const time = new Date()
    time.setSeconds(time.getSeconds() + restTime)
    restart(time, false)
  }, [restTime, handlePause, restart])

  useEffect(() => {
    if (!cachedVideoTable) {
      startDownload(
        item.workoutExerciseVideoUrl,
        item.workoutExerciseVideoFileName,
        item.workoutExerciseVideoMIME,
        item.workoutExerciseId,
      )
    }

    const mySelectedCachedWorkoutIndex = cachedVideoTable?.findIndex(
      (v) => v.workoutExerciseId === item.workoutExerciseId,
    )

    const isNewCachedVideo = mySelectedCachedWorkoutIndex === -1

    const {
      workoutExerciseVideoUrl,
      workoutExerciseVideoFileName,
      workoutExerciseVideoMIME,
      workoutExerciseId,
    } = item

    if (isNewCachedVideo) {
      startDownload(
        workoutExerciseVideoUrl,
        workoutExerciseVideoFileName,
        workoutExerciseVideoMIME,
        workoutExerciseId,
      )
    }

    if (
      !isNewCachedVideo &&
      !!cachedVideoTable &&
      mySelectedCachedWorkoutIndex !== undefined
    ) {
      const getPath =
        cachedVideoTable[mySelectedCachedWorkoutIndex].cachedLocalPathVideo

      checkIfPathIsValidAndDownloadAgainIfNothandleCheckFileExists()

      async function checkIfPathIsValidAndDownloadAgainIfNothandleCheckFileExists() {
        const fileExists = await checkFileExists(getPath)

        if (!fileExists) {
          startDownload(
            workoutExerciseVideoUrl,
            workoutExerciseVideoFileName,
            workoutExerciseVideoMIME,
            workoutExerciseId,
          )
        }

        async function checkFileExists(path: string) {
          try {
            const fileInfo = await FileSystem.getInfoAsync(path)
            return fileInfo.exists
          } catch (error) {
            console.error('Erro ao verificar arquivo:', error)
            return false
          }
        }
      }

      setModalVideoLocalPathState(getPath)
    }

    async function startDownload(
      url?: string,
      name?: string,
      mime?: string,
      id?: string,
    ) {
      if (!url || !name || !mime || !id) return
      const cachedVideo = await downloadAndCacheVideo(name, mime, url, id)

      if (cachedVideo) {
        setModalVideoLocalPathState(cachedVideo)
      }
    }

    async function downloadAndCacheVideo(
      _exerciseFileName: string,
      _exerciseMIME: string,
      _exerciseUrlDownload: string,
      _exerciseId: string,
    ) {
      try {
        const fileUri = `${FileSystem.documentDirectory}${_exerciseFileName}${_exerciseMIME}`

        const downloadResumable = FileSystem.createDownloadResumable(
          _exerciseUrlDownload,
          fileUri,
          {},
        )

        const downloadResult = await downloadResumable.downloadAsync()
        if (!downloadResult?.uri) return
        const cachedLocalPathVideo = downloadResult.uri
        await updateCachedVideoTable(cachedLocalPathVideo, _exerciseId)

        return cachedLocalPathVideo
      } catch (error) {
        console.error('Erro ao baixar o vídeo:', error)

        return null
      }
    }
  }, [cachedVideoTable, cachedVideoTable?.length])

  return (
    <ContainerGradient colors={['#000000', '#FFFFFF']} isFocused={isFocused}>
      <WorkoutNameAndVideoWrapper>
        <WorkoutNameWrapper style={{ opacity: isFocused ? 1 : 0.4 }}>
          <WorkoutName>
            {getTrimmedName(
              23,
              item &&
                selectedLanguage &&
                item.workoutExerciseName &&
                item.workoutExerciseName[selectedLanguage],
            )}
          </WorkoutName>
          <WorkoutName>{modalWeightState.activeWeightIndex}</WorkoutName>
        </WorkoutNameWrapper>
        {item.workoutExerciseThumbnailUrl && (
          <WorkoutVideoPlayerButton
            disabled={exerciseIndex !== 0 && user?.anonymousUser}
            onPress={isFocused ? openVideoPlayer : () => {}}
            enabled={isFocused}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                  borderWidth: 2,
                  backgroundColor: `gray`,
                  opacity: isFocused ? 0.6 : 0.3,
                }}
                source={{ uri: item.workoutExerciseThumbnailUrl }} // TODO aplicar cachedImage Aqui
                contentFit="cover"
                cachePolicy={'memory-disk'}
                alt=""
              />
            </View>

            <PlayVideo
              width={88}
              height={88}
              strokeWidth={2}
              style={{ position: 'absolute', opacity: isFocused ? 1 : 0.4 }}
              stroke={theme.COLORS.NEUTRA_LETTER_AND_STROKE}
            />
          </WorkoutVideoPlayerButton>
        )}
      </WorkoutNameAndVideoWrapper>

      <WorkoutInfoWrapper>
        <WorkoutRepetitionsData
          isFocused={isFocused}
          modalWeightState={modalWeightState}
          selectedLanguage={selectedLanguage}
          firstIncompleteIndex={firstIncompleteIndex}
          lastCompletedIndex={lastCompletedIndex}
          handleSetCompletedCheck={handleSetCompletedCheck}
          openSets={openSets}
          openWeight={openWeight}
          updateActiveWeightIndexSets={updateActiveWeightIndexSets}
          handleAddRepetition={handleAddRepetition}
          handleRemoveLastRepetition={handleRemoveLastRepetition}
          allItensCompleted={allItensCompleted}
          exerciseIndex={exerciseIndex}
          user={user}
          openSetBetweenSets={openSetBetweenSets}
        />
        {isFocused && (
          <WorkoutUserNotesAndConfirmButtonWrapper>
            <WorkoutUserNotesButton
              disabled={exerciseIndex !== 0 && user?.anonymousUser}
              onPress={isFocused && openNotes}
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
                  modalWeightState.activeWeightIndex
                ] &&
                modalWeightState.repetitionData[
                  modalWeightState.activeWeightIndex
                ].completed &&
                !allItensCompleted
                  ? handleSetCompletedCheck(modalWeightState.activeWeightIndex)
                  : handleDoneWorkout()
              }
              workoutExerciseDone={
                modalWeightState &&
                modalWeightState.repetitionData &&
                modalWeightState.repetitionData[
                  modalWeightState.activeWeightIndex
                ] &&
                modalWeightState.repetitionData[
                  modalWeightState.activeWeightIndex
                ].completed.isCompleted
              }
            >
              <BlurViewWrapper intensity={30}>
                <WorkoutButtonText>{buttonText}</WorkoutButtonText>
              </BlurViewWrapper>
            </WorkoutButtonConfirm>
          </WorkoutUserNotesAndConfirmButtonWrapper>
        )}

        {exerciseIndex !== 0 && user?.anonymousUser && (
          <OverLayWaterMarkButton onPress={handlePress} />
        )}

        <BulletsCronometerAndCTAButtonWrapper>
          <WorkoutCronometerWrapper>
            {isFocused && (
              <WorkoutCronometer
                percentage={percentage}
                circularProgressRef={circularProgressRef}
                onRestart={handleSkipRestTime}
                onAdd15Seconds={add15Seconds}
                onPause={handlePause}
                onPlay={onPlay}
                onSubtract15Seconds={subtract15Seconds}
                minutes={minutes}
                seconds={seconds}
                isRunning={isRunning}
              />
            )}
          </WorkoutCronometerWrapper>
        </BulletsCronometerAndCTAButtonWrapper>
      </WorkoutInfoWrapper>

      {/*  peso */}
      <Modal
        visible={modalWeightState.isOpenModalUserWeight}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeWeight} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserWeightModal
          closeModal={closeWeight} // Método para fechar o modal (iOS, Android)
          handleUpdateWeight={handleUpdateWeight}
          handleUpdateAllWeight={handleUpdateAllWeightValidate}
          weight={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].weight.value) ||
            ''
          }
          weightIndex={modalWeightState.activeWeightIndex}
          exerciseName={
            item.workoutExerciseName
              ? selectedLanguage && item.workoutExerciseName?.[selectedLanguage]
              : ''
          }
        />
      </Modal>

      {/*  set */}
      <Modal
        visible={modalWeightState.isOpenModalUserSets}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeWeight} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserSetsModal
          closeModal={closeSets} // Método para fechar o modal (iOS, Android)
          handleUpdateSets={handleUpdateSets}
          sets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ] &&
              modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].sets &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].sets.value) ||
            0
          }
          setsIndex={modalWeightState.activeWeightIndex + 1}
          exerciseName={
            item.workoutExerciseName
              ? selectedLanguage && item.workoutExerciseName?.[selectedLanguage]
              : ''
          }
          isActivedRangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].sets.isActivedRangeOfSets) ||
            false
          }
          rangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].sets.rangeOfSets) ||
            []
          }
        />
      </Modal>

      {/*  Choose Sets Value Between */}
      <Modal
        visible={modalWeightState.isOpenModalSetBetweenSets}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeSetBetweenSets} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserRangeOfSetsModal
          tittle={
            selectedLanguage === 'pt-br'
              ? 'Ótimo trabalho! Quantas repetições você completou?'
              : 'Great job! How many repetitions did you complete?'
          }
          subTittle={
            selectedLanguage === 'pt-br'
              ? `Repetições da série ${modalWeightState.activeWeightIndex + 1}`
              : `Reps of set ${modalWeightState.activeWeightIndex + 1}`
          }
          closeModal={closeSetBetweenSets} // Método para fechar o modal (iOS, Android)
          handleUpdateRangeOfSets={handleUpdateRangeOfSets}
          sets={Number(
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].sets.value) ||
              0,
          )}
          rangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].sets.rangeOfSets) ||
            []
          }
          isActivedRangeOfSets={
            (modalWeightState &&
              modalWeightState.repetitionData &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ] &&
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].sets.isActivedRangeOfSets) ||
            false
          }
        />
      </Modal>

      <Modal
        visible={modalWeightState.isOpenModalUserNotes}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeNotes} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserNotesModal
          closeModal={closeNotes} // Método para fechar o modal (iOS, Android)
          handleUpdateNotes={handleUpdateNotes}
          workoutExerciseId={item.workoutExerciseId}
          notes={modalWeightState.notes.value}
          exerciseName={
            item.workoutExerciseName
              ? selectedLanguage && item.workoutExerciseName?.[selectedLanguage]
              : ''
          }
        />
      </Modal>

      <Modal visible={modalWeightState.isOpenModalVideoPlayer}>
        {modalVideoLocalPathState && (
          <CachedVideoPlayerModal
            closeVideoPlayer={closeVideoPlayer}
            localPath={modalVideoLocalPathState}
          />
        )}
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
