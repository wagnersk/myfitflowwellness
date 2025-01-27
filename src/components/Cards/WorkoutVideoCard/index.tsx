/* eslint-disable camelcase */
import { View, Modal, Alert, ScrollView } from 'react-native'
import React, { useState, memo, useEffect, useMemo, useRef } from 'react'
import { useTheme } from 'styled-components/native'

import { Image } from 'expo-image'
import { useAuth } from '@hooks/auth'

import { add, format, isSameDay } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import * as FileSystem from 'expo-file-system'

import { WorkoutUserNotesModal } from '@components//Modals/WorkoutUserNotesModal'
import { CachedVideoPlayerModal } from '@components/Modals/CachedVideoPlayerModal'
import { WorkoutUserWeightModal } from '@components/Modals/WorkoutUserWeightModal'
import More from '@assets/More.svg'
import Check from '@assets/Check.svg'
import Less from '@assets/Less.svg'
import Clock from '@assets/Clock.svg'
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
  WorkoutUserNotes,
  BlurViewWrapper,
  TableWrapper,
  OverLayWrapper,
  BulletsCronometerAndCTAButtonWrapper,
  WorkoutCronometerWrapper,
  BlurViewAddSecondsWrapper,
  WorkoutWeightMetric,
  WorkoutTimerText,
  WorkoutTimerValue,
} from './styles'
import { OverLayWaterMarkButton } from '@components/OverLayWaterMarkButton'
import { WorkoutCronometer } from '@components/WorkoutCronometer'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useTimer } from 'react-timer-hook'
import { WorkoutUserSetsModal } from '@components/Modals/WorkoutUserSetsModal'

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
  workoutCardIndex: number
  activeWeightIndex: number
  isLastIndex: boolean
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
  const {
    updateCachedNotesTable,
    cachedNotesTable,
    updateCachedVideoTable,
    cachedVideoTable,
    cachedUserWorkoutsLog,
    myWorkout,
    updateCachedUserWorkoutsLog,
    saveWeightProgression,
    user,
  } = useAuth()

  const selectedLanguage = user?.selectedLanguage

  /* buscar do cache o ultimo salvo antes  */
  const getRepetitionNumber = Number(
    item.workoutExerciseRepetition?.replace('x', ''),
  )

  const defaultModalState: IModalStateWorkoutLogData = {
    isOpenModalUserNotes: false,
    isOpenModalVideoPlayer: false,
    isOpenModalUserWeight: false,
    isOpenModalUserSets: false,
    isLastIndex: false,
    workoutCardIndex: 0,
    exerciseIndex: 0,
    exerciseId: `0`,
    repetitionData: [
      {
        completed: false,
        completedTimestamp: 0,
        sets: '12',
        weight: '0',
      },
      {
        completed: false,
        completedTimestamp: 0,
        sets: '12',
        weight: '0',
      },
      {
        completed: false,
        completedTimestamp: 0,
        sets: '8-12',
        weight: '0',
      },
      {
        completed: false,
        completedTimestamp: 0,
        sets: '8-12',
        weight: '0',
      },
      {
        completed: false,
        completedTimestamp: 0,
        sets: '8-12',
        weight: '0',
      },
      {
        completed: false,
        completedTimestamp: 0,
        sets: '8-12',
        weight: '0',
      },
    ],
    activeWeightIndex: 0,
  }

  const dfg = item.workoutExerciseSets?.map((v) => ({
    completed: false,
    completedTimestamp: 0,
    sets: v,
    weight: '0',
  })) || [
    {
      completed: false,
      completedTimestamp: 0,
      sets: '0',
      weight: '0',
    },
  ]

  console.log(`chegando no dfg:`, dfg)
  const time = new Date()
  const [restTimeState, setRestTimeState] = useState(restTime)

  const { seconds, minutes, isRunning, pause, restart, resume, totalSeconds } =
    useTimer({
      expiryTimestamp: time,
      onExpire: () => console.log('acabouu'),
      autoStart: false,
    })

  const circularProgressRef = useRef<AnimatedCircularProgress>(null)
  const elapsedTime = restTime - totalSeconds
  const percentage = (elapsedTime / restTime) * 100
  const invertedPercentage = 100 - percentage

  // criar variavel que armazena o restTime que pode ser alterado

  const initialModalState = useMemo(() => {
    let lastCachedDoneDate: IWeightRepetitionData = {} as IWeightRepetitionData

    if (cachedUserWorkoutsLog && cachedUserWorkoutsLog.workoutsLog) {
      const sessionIndex = cachedUserWorkoutsLog.workoutsLog.findIndex(
        (v) => v.workoutId === workoutId,
      )

      if (sessionIndex !== -1) {
        const findCachedCard = cachedUserWorkoutsLog.workoutsLog[
          sessionIndex
        ].workoutCardsLogData.find((v) => v.cardIndex === workoutCardIndex)

        if (findCachedCard && findCachedCard.weightDoneLogs) {
          const weightLog = findCachedCard.weightDoneLogs.find(
            (log) => log.exerciseIndex === exerciseIndex,
          )

          if (weightLog && weightLog.repetitionData) {
            const getLastCompletedTimestamp = weightLog.repetitionData.reduce(
              (latest, current) =>
                current.completedTimestamp > latest.completedTimestamp
                  ? current
                  : latest,
              { completedTimestamp: 0 } as IWeightRepetitionData,
            )
            lastCachedDoneDate = getLastCompletedTimestamp
          }
        }
      }
    }

    const todayDate = new Date()

    const areSameDay = lastCachedDoneDate?.completedTimestamp
      ? isSameDay(todayDate, lastCachedDoneDate.completedTimestamp)
      : false

    console.log(
      `Estou no card : ${workoutCardIndex} , no exercício ${exerciseIndex}achou  weightsDatesDone  ! ! ! ! `,
    )

    const finalData = {
      ...defaultModalState,
      ...lastCachedDoneDate,
      completed: areSameDay ? lastCachedDoneDate.completed : false,
    }

    return finalData
  }, [cachedUserWorkoutsLog, workoutId, workoutCardIndex, exerciseIndex])

  const [modalWeightState, setModalWeightState] =
    useState<IModalStateWorkoutLogData>(initialModalState)

  const [modalNotesState, setModalNotesState] = useState<string>('')

  const [modalVideoLocalPathState, setModalVideoLocalPathState] =
    useState<string>('')

  const [weightProgressionData, setWeightProgressionData] = useState<
    ICachedExerciseHistoryData[] | null
  >(null)

  async function handleUpdateNotes(_notes: string) {
    if (!_notes) return

    if (!item.workoutExerciseId) return

    const { workoutExerciseId } = item

    await updateCachedNotesTable(
      _notes,
      workoutExerciseId,
      workoutCardIndex,
      exerciseIndex,
    )

    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserNotes: !prevState.isOpenModalUserNotes,
    }))

    setModalNotesState(_notes)
  }

  async function handleUpdateSets(rep: string) {
    console.log(`chegando na rep:`, rep)

    const copyProgression = modalWeightState || [] // jogar state aqui

    copyProgression.repetitionData[modalWeightState.activeWeightIndex].sets =
      rep

    setModalWeightState(copyProgression)
    closeSets()
  }

  async function handleUpdateWeight(_weight: string) {
    console.log(`chegando no peso:`, _weight)

    const copyProgression = modalWeightState || [] // jogar state aqui

    copyProgression.repetitionData[modalWeightState.activeWeightIndex].weight =
      _weight

    setModalWeightState(copyProgression)
    closeWeight()
  }

  function handleDoneWorkout() {
    if (modalWeightState.isLastIndex) {
      console.log(`acabou o treino`)
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
    ].completed = true

    copyProgression.repetitionData[
      modalWeightState.activeWeightIndex
    ].completedTimestamp = new Date().getTime()

    const getNextIndex = copyProgression.activeWeightIndex + 1

    if (getNextIndex < copyProgression.repetitionData.length) {
      copyProgression.activeWeightIndex = getNextIndex
    } else {
      copyProgression.isLastIndex = true
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
            },
          },
        ],
        { cancelable: false },
      )
      return
    }

    marcarItem(index, copyModalWeightState)

    function desmarcarItem(index: number, copyModalWeightState: any) {
      const completedTimestamp = new Date().getTime()

      copyModalWeightState.repetitionData[index].completed = false
      copyModalWeightState.repetitionData[index].completedTimestamp =
        completedTimestamp

      const reajustedCompleted = copyModalWeightState.repetitionData.map(
        (v, i) => {
          if (i > index) {
            return {
              ...v,
              completed: false,
              completedTimestamp: 0,
            }
          } else {
            return { ...v }
          }
        },
      )

      copyModalWeightState.repetitionData = reajustedCompleted
      copyModalWeightState.activeWeightIndex = index

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
    setRestTimeState((prev) => prev + 15)
  }

  /* alterar */
  function subtract15Seconds() {
    const time = new Date()
    time.setSeconds(time.getSeconds() + Math.max(totalSeconds - 15, 0))
    restart(time, isRunning)

    setRestTimeState((prev) => prev - 15)
    // habilita botao para salvar o tempo default do exercicio
    // esse botao chama hook que salva
    // ao carregar a tela ele procuar esse cache , se nao tiver ele carrega do default do exercicio mesmo
    // se tiver ele carrega o que ta no cache
    // criar modal para o 8-12
    // ao finalizar o exercicio ele clica em quantos sets ele fez
    // e salva esse , sempre vai pergunta se ele fez mostrando
    // o range
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
      activeWeightIndex: index,
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
      activeWeightIndex: index,
    }))
  }

  function closeSets() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserSets: false,
    }))
  }

  function closeWeight() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserWeight: false,
    }))
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

  function handlePause() {
    pause()
  }

  function onPlay() {
    resume()
  }

  // const openedTimeRef = useRef(new Date().getTime())
  useEffect(() => {
    handlePause()
    const time = new Date()
    time.setSeconds(time.getSeconds() + restTime)
    restart(time, false)
  }, [restTime, 0])

  useEffect(() => {
    const myNote = cachedNotesTable?.find(
      (v) =>
        v.workoutExerciseId === item.workoutExerciseId &&
        v.cardIndex === workoutCardIndex &&
        v.exerciseIndex === exerciseIndex,
    )

    if (myNote) {
      setModalNotesState(myNote.notes)
    }

    // Exemplo de uso do useEffect, se necessário
    // console.log(`App opened at: ${JSON.stringify(openedTimeRef)}`)
    // console.log(openedTimeRef)
  }, [cachedNotesTable])

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
        </WorkoutNameWrapper>
        {item.workoutExerciseThumbnailUrl && (
          <WorkoutVideoPlayerButton
            disabled={exerciseIndex !== 0 && user?.anonymousUser}
            onPress={openVideoPlayer}
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
        <WorkoutRepetitionAndSerieWrapper
          style={{ opacity: isFocused ? 1 : 0.2 }}
        >
          <ScrollView>
            <TableWrapper
            /*       style={{
              opacity: exerciseIndex === 0 && user?.anonymousUser ? 1 : 0.4,
            }} */
            >
              {modalWeightState.repetitionData &&
                modalWeightState.repetitionData.map((v, i) => (
                  <WorkoutSerieWrapper key={i}>
                    <WorkoutWeightValueAndTextWrapper>
                      <WorkoutSerieValue
                        activeWeightIndex={
                          modalWeightState.activeWeightIndex === i
                        }
                      >
                        {selectedLanguage !== 'pt-br'
                          ? `${i + 1}ª`
                          : `${i + 1}th`}
                      </WorkoutSerieValue>
                    </WorkoutWeightValueAndTextWrapper>
                    <WorkoutWeightValueAndTextWrapper>
                      <WorkoutWeightValue
                        /* disabled={exerciseIndex !== 0 && user?.anonymousUser} */
                        disabled={exerciseIndex !== 0}
                        onPress={() => {
                          openSets(i)
                        }}
                      >
                        <WorkoutWeightText>{v.sets}</WorkoutWeightText>
                        <WorkoutWeightMetric>rep</WorkoutWeightMetric>
                      </WorkoutWeightValue>
                    </WorkoutWeightValueAndTextWrapper>
                    <ButtonsWrapper>
                      {/* weight */}
                      <WorkoutWeightValueAndTextWrapper>
                        <WorkoutWeightValue
                          /* disabled={exerciseIndex !== 0 && user?.anonymousUser} */
                          disabled={exerciseIndex !== 0}
                          onPress={() => {
                            openWeight(i)
                          }}
                        >
                          <WorkoutWeightText>{v.weight}</WorkoutWeightText>
                          <WorkoutWeightMetric>kg</WorkoutWeightMetric>
                        </WorkoutWeightValue>
                      </WorkoutWeightValueAndTextWrapper>

                      {/* V weight */}
                      <WorkoutButton onPress={() => handleSetCompletedCheck(i)}>
                        {v.completed ? (
                          <Check
                            width={32}
                            height={32}
                            stroke={theme.COLORS.AUX_GOOGLE_GREEN}
                          />
                        ) : (
                          <Check
                            width={32}
                            height={32}
                            stroke={theme.COLORS.NEUTRA_LETTER_AND_STROKE}
                          />
                        )}
                      </WorkoutButton>
                    </ButtonsWrapper>
                  </WorkoutSerieWrapper>
                ))}
            </TableWrapper>
          </ScrollView>
        </WorkoutRepetitionAndSerieWrapper>
        <WorkoutUserNotesAndConfirmButtonWrapper>
          <WorkoutUserNotesButton
            disabled={exerciseIndex !== 0 && user?.anonymousUser}
            onPress={openNotes}
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
            onPress={handleDoneWorkout}
            workoutExerciseDone={
              modalWeightState.repetitionData[
                modalWeightState.activeWeightIndex
              ].completed
            }
          >
            <BlurViewWrapper intensity={30}>
              <WorkoutButtonText>
                {isRunning
                  ? selectedLanguage === 'pt-br'
                    ? 'Pular cronômetro'
                    : 'Skip cronometer'
                  : selectedLanguage === 'pt-br'
                    ? 'Registrar serie'
                    : 'Register set'}
              </WorkoutButtonText>
            </BlurViewWrapper>
          </WorkoutButtonConfirm>
        </WorkoutUserNotesAndConfirmButtonWrapper>
        {exerciseIndex !== 0 && user?.anonymousUser && (
          <OverLayWaterMarkButton onPress={handlePress} />
        )}
        <BulletsCronometerAndCTAButtonWrapper>
          <WorkoutCronometerWrapper>
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
          </WorkoutCronometerWrapper>
        </BulletsCronometerAndCTAButtonWrapper>
      </WorkoutInfoWrapper>

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
          weight={
            modalWeightState.repetitionData[modalWeightState.activeWeightIndex]
              .weight
          }
          weightIndex={modalWeightState.activeWeightIndex + 1}
          exerciseName={
            item.workoutExerciseName
              ? selectedLanguage && item.workoutExerciseName?.[selectedLanguage]
              : ''
          }
        />
      </Modal>

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
            modalWeightState.repetitionData[modalWeightState.activeWeightIndex]
              .sets
          }
          setsIndex={modalWeightState.activeWeightIndex + 1}
          exerciseName={
            item.workoutExerciseName
              ? selectedLanguage && item.workoutExerciseName?.[selectedLanguage]
              : ''
          }
        />
      </Modal>

      <Modal
        visible={modalWeightState.isOpenModalUserNotes}
        animationType={`slide`}
        transparent={true}
        onRequestClose={closeWeight} // Método para fechar o modal (iOS, Android)
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
          notes={modalNotesState}
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
