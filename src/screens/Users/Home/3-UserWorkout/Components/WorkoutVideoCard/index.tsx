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
  IFormattedCardExerciseData,
  Exercise,
  ICachedUsingWorkoutData,
  ICachedCardExerciseData,
  IPropsSets,
} from '@hooks/authTypes'

import { OverLayWaterMarkButton } from '@components/OverLayWaterMarkButton'
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

  const mergedData: ICachedCardExerciseData = useMemo(() => {
    const timeNow = new Date().getTime()

    const workoutExerciseId = item.workoutExerciseId || ''
    const defaultSets = item?.workoutExerciseSets || [] // cada repeticcao

    /* 
  -> Recuperar o cached quando eu savlar

  const cachedInfo = cachedUserWorkoutsLog?.workoutsLog
      .find((v) => v.workoutId === workoutId)
      ?.workoutCardsLogData.find((v) => v.cardIndex === workoutCardIndex)
      ?.weightDoneLogs[exerciseIndex] */

    const initialWorkoutData = transformInitialData(defaultSets, timeNow)
    const initialDataWithCachedProgress = initialWorkoutData

    return initialDataWithCachedProgress

    function transformInitialData(
      _defaultSets: IPropsSets[],
      timeNow: number,
    ): ICachedCardExerciseData {
      const transformedDataSets = _defaultSets.map((v) => {
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
          techiesData: {
            title: v.techiesData.title,
            description: v.techiesData.description,
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
      const fdata: ICachedCardExerciseData = {
        isEnabled: true,
        workoutExerciseId,
        workoutExerciseSets: transformedDataSets,
        workoutExerciseName: item.workoutExerciseName,
        workoutExerciseName_insensitive: item.workoutExerciseName_insensitive,
        workoutExercisePrimaryMuscleGroup:
          item.workoutExercisePrimaryMuscleGroup,
        workoutExerciseTypes: item.workoutExerciseTypes,
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

  const [modalCachedCardExerciseData, setModalCachedCardExerciseData] =
    useState<ICachedCardExerciseData>(mergedData)

  const [defaultModalState, setDefaultModalState] =
    useState<IModalStateWorkoutLogData>(defaultModalStateValues)

  const [weightProgressionData, setWeightProgressionData] = useState<
    ICachedExerciseHistoryData[] | null
  >(null)

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

  // ok
  function handleUpdateWeight(_weight: string, type: 'all' | 'single') {
    if (type === 'single') {
      onUpdateSingleWeight(_weight)
    }

    if (type === 'all') {
      const allWeightsAreEqual =
        modalCachedCardExerciseData?.workoutExerciseSets?.every(
          (v) => v.weightData.value === _weight,
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
      const copyProgression = { ...modalCachedCardExerciseData }
      const timeNow = new Date().getTime()
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
    function onUpdateAllWeight(_weight: string) {
      const copyProgression = { ...modalCachedCardExerciseData }
      const timeNow = new Date().getTime()

      const copyProgressionRep =
        modalCachedCardExerciseData.workoutExerciseSets?.map((v) => ({
          ...v,
          weightData: {
            value: _weight,
            createdAt: timeNow,
            updatedAt: timeNow,
          },
        }))

      copyProgression.workoutExerciseSets = copyProgressionRep
      setModalCachedCardExerciseData(copyProgression)
      closeModal('weight')
    }
  }

  // ok
  function handleUpdateNotes(_notes: string) {
    if (!_notes) return

    setModalCachedCardExerciseData((prevState) => ({
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

  // DONE
  function handleUpdateSets(type: 'update' | 'delete', value?: number) {
    console.log(`type -> `, type)
    console.log(`value -> `, value)

    const getTime = new Date().getTime()

    if (type === 'update' && value !== undefined) {
      const copyProgression = { ...modalCachedCardExerciseData }

      if (copyProgression.workoutExerciseSets === undefined) return

      copyProgression.workoutExerciseSets[
        defaultModalState.activeWeightIndex
      ].selectedRepetitionData = {
        checkedSet: value.toString(),
        createdAt:
          copyProgression.workoutExerciseSets[
            defaultModalState.activeWeightIndex
          ].selectedRepetitionData.createdAt || getTime,
        updatedAt: getTime,
      }

      setModalCachedCardExerciseData(copyProgression)
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
        const copyProgression = { ...modalCachedCardExerciseData }
        if (copyProgression.workoutExerciseSets === undefined) return

        copyProgression.workoutExerciseSets[
          defaultModalState.activeWeightIndex
        ].selectedRepetitionData = {
          checkedSet: '',
          createdAt:
            copyProgression.workoutExerciseSets[
              defaultModalState.activeWeightIndex
            ].selectedRepetitionData.createdAt || getTime,
          updatedAt: getTime,
        }

        setModalCachedCardExerciseData(copyProgression)
        closeModal('sets')
      }
    }
  }

  // adicionar ou remover repeticao exta 4x..5x..6x
  function handlePushOrPopRepetition(type: 'push' | 'pop') {
    return
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
      return
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
      const getTime = new Date().getTime()

      const newRepetitionToAdd = {
        ...copyProgression.workoutExerciseSets[
          copyProgression.workoutExerciseSets.length - 1
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

      copyProgression.workoutExerciseSets.push(newRepetitionToAdd)

      setModalCachedCardExerciseData(copyProgression)
    }

    function onRemoveRepetition() {
      if (modalWeightState.workoutExerciseSets.length <= 1) {
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
      copyProgression.workoutExerciseSets.pop()

      const updatedRepLenght = copyProgression.workoutExerciseSets.length - 1

      defaultModalState.activeWeightIndex =
        firstIncompleteIndex === -1 ? updatedRepLenght : lastCompletedIndex

      const finalData: ICachedUsingWorkoutData = {
        ...copyProgression,
      }

      setModalCachedCardExerciseData(finalData)
    }
  }

  // ok , falta so cronometro
  function handleDoneWorkout() {
    if (isRunning) {
      onTimerManage('skip')
      return
    }
    const activeIndex = defaultModalState.activeWeightIndex

    const getIsActivedRangeOfSets =
      (modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
        ?.repetitionData?.length ?? 0) > 1

    const checkedSet =
      modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
        ?.selectedRepetitionData.checkedSet

    const getWeightValue =
      modalCachedCardExerciseData.workoutExerciseSets?.[activeIndex].weightData
        .value
    const firstRep =
      modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
        ?.repetitionData?.[0].isReps

    const secondRep =
      modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
        ?.repetitionData?.[1].isReps

    if (getIsActivedRangeOfSets && !checkedSet && firstRep && secondRep) {
      console.log(`getIsActivedRangeOfSets ATIVO`)
      // abrir modal para escolher o range
      openModal('rangeOfSets', activeIndex)
      return
    }
    if (getWeightValue === `0`) {
      openModal('weight', activeIndex)
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

    const copyProgression = { ...modalCachedCardExerciseData } // Copiar o estado atual
    if (copyProgression.workoutExerciseSets === undefined) return
    copyProgression.workoutExerciseSets[
      defaultModalState.activeWeightIndex
    ].completedData = {
      isCompleted: true,
      createdAt: getTime,
      updatedAt: getTime,
    }

    copyProgression.workoutExerciseSets[
      defaultModalState.activeWeightIndex
    ].updatedAt = getTime
    /* verificar o q ta aqui */
    const getActiveWeightIndex =
      defaultModalState.activeWeightIndex + 1 <
      copyProgression.workoutExerciseSets.length
        ? defaultModalState.activeWeightIndex + 1
        : defaultModalState.activeWeightIndex

    setModalCachedCardExerciseData(copyProgression)
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

      const newExercise: ICachedUsingWorkoutData = {
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

      setModalCachedCardExerciseData((prev) => {
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

  // DONE
  function handleUncheckOrCheckRepetion(index: number) {
    const getIsActivedRangeOfSets =
      (modalCachedCardExerciseData?.workoutExerciseSets?.[index]?.repetitionData
        ?.length ?? 0) > 1

    const firstRep =
      modalCachedCardExerciseData?.workoutExerciseSets?.[index]
        ?.repetitionData?.[0].isReps

    const secondRep =
      modalCachedCardExerciseData?.workoutExerciseSets?.[index]
        ?.repetitionData?.[1].isReps

    const checkedSet =
      modalCachedCardExerciseData?.workoutExerciseSets?.[index]
        ?.selectedRepetitionData.checkedSet

    const getWeightValue =
      modalCachedCardExerciseData.workoutExerciseSets?.[index].weightData.value

    if (modalCachedCardExerciseData === undefined) return
    if (modalCachedCardExerciseData.workoutExerciseSets === undefined) return
    if (isRunning) {
      pause()
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
        console.log(`getIsActivedRangeOfSets ATIVO`)
        // abrir modal para escolher o range
        openModal('rangeOfSets', index)
        return
      }

      if (getWeightValue === `0`) {
        openModal('weight', index)
        return
      }

      marcarItem(index)
    }

    function desmarcarItem(index: number) {
      if (modalCachedCardExerciseData === undefined) return

      const copyModalWeightState = { ...modalCachedCardExerciseData }

      if (copyModalWeightState.workoutExerciseSets === undefined) return

      const completedTimestamp = new Date().getTime()

      copyModalWeightState.workoutExerciseSets =
        copyModalWeightState.workoutExerciseSets.map((item, i) => {
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
      copyModalWeightState.workoutExerciseSets[index].updatedAt =
        completedTimestamp

      setModalCachedCardExerciseData(copyModalWeightState)
      setDefaultModalState((prev) => {
        return {
          ...prev,
          lastActiveWeightIndex: defaultModalState.activeWeightIndex,
          activeWeightIndex: index,
        }
      })
    }

    function marcarItem(index: number) {
      console.log(`index`, index)
      console.log(
        `defaultModalState.activeWeightIndex`,
        defaultModalState.activeWeightIndex,
      )
      const copyModalWeightState = { ...modalCachedCardExerciseData }
      if (copyModalWeightState.workoutExerciseSets === undefined) return

      const completedTimestamp = new Date().getTime()

      copyModalWeightState.workoutExerciseSets =
        copyModalWeightState.workoutExerciseSets.map((item, i) => {
          if (i <= index) {
            const isExistingItem = item.completedData.createdAt !== 0
            return {
              ...item,
              updatedAt: completedTimestamp,
              completedData: {
                ...item.completedData,
                isCompleted: true,
                updatedAt: completedTimestamp,
                createdAt: isExistingItem
                  ? item.completedData.createdAt
                  : completedTimestamp,
              },
            }
          }
          return item
        })
      copyModalWeightState.workoutExerciseSets[index].updatedAt =
        completedTimestamp

      setModalCachedCardExerciseData(copyModalWeightState)
      setDefaultModalState((prev) => {
        if (copyModalWeightState.workoutExerciseSets === undefined) return prev
        return {
          ...prev,
          lastActiveWeightIndex: defaultModalState.activeWeightIndex,
          activeWeightIndex:
            index + 1 < copyModalWeightState.workoutExerciseSets.length
              ? index + 1
              : index,
        }
      })
    }
  }

  // DONE
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

        setModalCachedCardExerciseData((prev) => {
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

      setModalCachedCardExerciseData((prev) => {
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

      setModalCachedCardExerciseData((prev) => {
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
    if (!modalCachedCardExerciseData.workoutExerciseSets) return

    const activeWeightIndex = defaultModalState.activeWeightIndex
    const repetitionData =
      modalCachedCardExerciseData.workoutExerciseSets[activeWeightIndex]

    const completed = repetitionData
      ? repetitionData.completedData.isCompleted
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
      {user?.selectedLanguage && modalCachedCardExerciseData && (
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
          modalCachedCardExerciseData &&
          firstIncompleteIndex !== undefined &&
          lastCompletedIndex !== undefined &&
          allItensCompleted !== undefined && (
            <WorkoutRepetitionsData
              isFocused={isFocused}
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
        {exerciseIndex !== 0 && user?.anonymousUser && (
          <OverLayWaterMarkButton onPress={handlePressGuessUser} />
        )}
        <BulletsCronometerAndCTAButtonWrapper>
          <WorkoutCronometerWrapper>
            <WorkoutCronometer
              totalSeconds={totalSeconds}
              getModalTimer={Number(
                modalCachedCardExerciseData?.workoutExerciseSets?.[
                  defaultModalState.activeWeightIndex
                ].restTimeData.restTimeNumber,
              )}
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
            (modalCachedCardExerciseData &&
              modalCachedCardExerciseData.workoutExerciseSets &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ] &&
              modalCachedCardExerciseData &&
              modalCachedCardExerciseData.workoutExerciseSets &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].repetitionData &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].repetitionData) ||
            []
          }
          setsIndex={defaultModalState.activeWeightIndex + 1}
          exerciseName={
            item.workoutExerciseName
              ? user?.selectedLanguage &&
                item.workoutExerciseName?.[user?.selectedLanguage]
              : ''
          }
          isActivedRangeOfSets={
            /*     (modalCachedCardExerciseData &&
              modalCachedCardExerciseData.workoutExerciseSets &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ] &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].repetitionData.isActivedRangeOfSets) || */
            false
          }
          rangeOfSets={
            /*    (modalCachedCardExerciseData &&
              modalCachedCardExerciseData.workoutExerciseSets &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ] &&
              modalCachedCardExerciseData.workoutExerciseSets[
                defaultModalState.activeWeightIndex
              ].sets.rangeOfSets) || */
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
          handleUpdateRangeOfSets={(selecteSet: number) =>
            handleUpdateSets('update', selecteSet)
          }
          closeModal={() => closeModal('rangeOfSets')} // Método para fechar o modal (iOS, Android)
          handleDeleteRangeOfSets={() => handleUpdateSets('delete')}
          modalCachedCardExerciseData={modalCachedCardExerciseData}
          activeIndex={defaultModalState.activeWeightIndex}
          selectedLanguage={user?.selectedLanguage || 'pt-br'}
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
          notes={modalCachedCardExerciseData.notes.value}
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
