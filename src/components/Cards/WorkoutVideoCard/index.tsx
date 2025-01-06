/* eslint-disable camelcase */
import { View, Modal } from 'react-native'
import React, { useState, memo, useRef, useEffect } from 'react'

import { Image } from 'expo-image'
import { useAuth } from '@hooks/auth'

import { format, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as FileSystem from 'expo-file-system'

import { WorkoutUserNotesModal } from '@components//Modals/WorkoutUserNotesModal'
import { CachedVideoPlayerModal } from '@components/Modals/CachedVideoPlayerModal'
import More from '@assets/More.svg'
import Less from '@assets/Less.svg'
import ExclamationMark from '@assets/ExclamationMark.svg'
import PlayVideo from '@assets/PlayVideo.svg'

import { getTrimmedName } from '@utils/getTrimmedName'

import { useTheme } from 'styled-components'
import {
  ICachedExerciseHistoryData,
  DayData,
  MonthData,
  YearData,
  IWeightDoneLog,
  IFormattedCardExerciseData,
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
} from './styles'
import { WorkoutUserWeightModal } from '@components/Modals/WorkoutUserWeightModal'

interface Props {
  item: IFormattedCardExerciseData
  exerciseIndex: number // Supino reto.... exercicios
  workoutCardIndex: number // A B ou C
  workoutId: string
  isFocused: boolean
}

interface IModalStateWorkoutLogData extends IWeightDoneLog {
  isOpenModalUserNotes: boolean
  isOpenModalVideoPlayer: boolean
  isOpenModalUserWeight: boolean
  workoutCardIndex: number
  activeWeightIndex: number
}

function WorkoutVideoCardComponent({
  item,
  workoutCardIndex,
  exerciseIndex,
  workoutId,
  isFocused,
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

  const getRepetitionNumber = Number(
    item.workoutExerciseRepetition?.replace('x', ''),
  )

  const defaultModalState: IModalStateWorkoutLogData = {
    isOpenModalUserNotes: false,
    isOpenModalVideoPlayer: false,
    isOpenModalUserWeight: false,

    workoutCardIndex: 0,
    exerciseIndex: 0,
    exerciseId: `0`,
    weight: Array(getRepetitionNumber).fill(0), // Array de getRepetitionNumber posições preenchido com 0
    completed: false,
    completedTimestamp: 0,
  }

  let myWeightDateDone: IModalStateWorkoutLogData =
    {} as IModalStateWorkoutLogData

  let weightsDatesDone: IWeightDoneLog = {} as IWeightDoneLog

  myWeightDateDone = {
    ...defaultModalState,
    ...weightsDatesDone,
  }

  if (cachedUserWorkoutsLog && cachedUserWorkoutsLog.workoutsLog) {
    const sessionIndex = cachedUserWorkoutsLog.workoutsLog.findIndex(
      (v) => v.workoutId === workoutId,
    )

    if (sessionIndex !== -1) {
      /* &&
      cachedUserWorkoutsLog.workoutsLog[sessionIndex].workoutCardsLogData[
        workoutCardIndex
      ] */
      const findCachedCard = cachedUserWorkoutsLog.workoutsLog[
        sessionIndex
      ].workoutCardsLogData.find((v) => v.cardIndex === workoutCardIndex)

      if (findCachedCard) {
        weightsDatesDone = findCachedCard.weightDoneLogs[exerciseIndex]
      }

      myWeightDateDone = {
        ...myWeightDateDone,
        ...weightsDatesDone,
      }
    }
  }

  if (weightsDatesDone?.completedTimestamp) {
    // so entra aqui se tiver algum tempo registrado , pq sem eh 0 e ai da false
    const todayDate = new Date()

    const areSameDay = isSameDay(
      todayDate,
      weightsDatesDone?.completedTimestamp,
    )

    // se nao for hoje eu seto como false
    myWeightDateDone.completed = !areSameDay
      ? false
      : myWeightDateDone.completed
  }

  const [modalWeightState, setModalWeightState] =
    useState<IModalStateWorkoutLogData>(myWeightDateDone)

  const [modalNotesState, setModalNotesState] = useState<string>('')

  const [modalVideoLocalPathState, setModalVideoLocalPathState] =
    useState<string>('')

  const [weightProgressionData, setWeightProgressionData] = useState<
    ICachedExerciseHistoryData[] | null
  >(
    /* weightProgression */ [
      {
        userId: 'user123', // ID do usuário ---- TENHO ----
        workoutId: 'Lf7BeUzt3OEShbCVx88J', // ID do card do treino ---- TENHO ----
        createdAt: 1590000000, // Timestamp da criação ---- TENHO ----
        updatedAt: 1590003600, // Timestamp da última atualização ---- TENHO ----
        exerciseHistory: [
          {
            year: 2021,
            createdAt: 1590000000, // Timestamp da criação
            updatedAt: 1590003600, // Timestamp da última atualização
            months: [
              {
                month: 5,
                createdAt: 1590000000, // Timestamp da criação
                updatedAt: 1590003600, // Timestamp da última atualização
                days: [
                  {
                    day: 30,
                    createdAt: 1590000000, // Timestamp da criação
                    updatedAt: 1590003600, // Timestamp da última atualização
                    exerciseTotalTime: '12:00', // Tempo total de exercício no formato 'hh:mm'
                    exerciseIntervals: [
                      {
                        index: 0,
                        startedAt: 15, // primeiro item da lista
                        endAt: 17, // ultimo item da lista
                        periodGroupBetweenStartAndEnd: [15, 16, 17],
                      },
                    ],
                    exercises: [
                      {
                        workoutExerciseId: '2GoOlaJYvEgmiI5scTAI', // IDENTIFICACAO PARA FILTRAR
                        workoutExerciseIndex: 0, // IDENTIFICACAO PARA FILTRAR
                        workoutCardIndex: 1, // IDENTIFICACAO PARA FILTRAR
                        workoutExerciseWeight: 45, // VALOR PARA CALCULO

                        updatedAt: 12123, // CALCULAR TEMPO INTERVALO
                        workoutExerciseRestTimeNumber: 60, // Tempo de descanso total em segundos // MONTAR GRAFICOS FINAIS //---- TENHO ----,
                        workoutExerciseSets: '4', // Número de séries feitas //MONTARGRAFICO FINAL
                        workoutExerciseRepetition: '12', // Número de repetições por série
                        workoutExerciseMuscleGroup: {
                          'pt-br': 'peitoral',
                          us: 'chest',
                        }, // Grupo muscular trabalhado ---- TENHO ----
                        workoutExerciseName_insensitive: {
                          'pt-br': 'supino reto',
                          us: 'bench press',
                        }, // Nome do exercício em minúsculas para pesquisa
                      },
                      // Outros exercícios do dia
                    ],
                  },
                  // Outros dias do mês
                ],
              },
              // Outros meses do ano
            ],
          },
          // Outros anos
        ],
      },
    ],
  )

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

  async function handleUpdateWeight(_weight: string) {
    console.log(`chegando no peso:`, _weight)

    setModalWeightState((prevState) => {
      const newWeight = [...prevState.weight]

      newWeight[modalWeightState.activeWeightIndex] = Number(_weight)

      return {
        ...prevState,
        isOpenModalUserWeight: !prevState.isOpenModalUserWeight,
        weight: newWeight,
      }
    })
  }

  // ok
  function openNotes() {
    // criar hook aqui para salvar o notes e tirar o salva dele indo pelo node se tiver
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserNotes: true,
    }))
  }
  // ok
  function openWeight(index: number) {
    // criar hook aqui para salvar o notes e tirar o salva dele indo pelo node se tiver
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserWeight: true,
      activeWeightIndex: index,
    }))
  }

  function handleShowVideoPlayer() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalVideoPlayer: !prevState.isOpenModalVideoPlayer,
    }))
  }

  function handleDoneWorkout() {
    if (!workoutId) return
    saveFastCachedWorkoutData(workoutId)
    setModalWeightState((prevState) => ({
      ...prevState,
      completed: !prevState.completed,
    }))

    saveCachedHistoricDateWorkoutData()

    // TODO > ver dps q weight tiver pronto

    async function saveFastCachedWorkoutData(_workoutId: string) {
      if (!item.workoutExerciseId) return console.log(`vish`)

      const date = new Date()
      const completedTimestamp = date.getTime()
      const lastCompletedDay = format(date, 'EEEE', { locale: ptBR })
      const lastCompletedDate = format(date, 'dd/MM/yyyy')

      const newExercise: IWeightDoneLog = {
        exerciseIndex,
        exerciseId: item.workoutExerciseId,
        weight: modalWeightState.weight, // salva o novo
        completed: !modalWeightState.completed, // salva o novo
        completedTimestamp, // salva o novo
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
          if (modalWeightState.weight === undefined) return
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
          const { weight } = modalWeightState

          const exerciseData = {
            workoutExerciseId,
            workoutExerciseIndex,
            workoutCardIndex,
            updatedAt,
            workoutExerciseWeight: weight,
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
          exerciseData.workoutExerciseWeight = modalWeightState.weight
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

  function handlePlusWeight(index: number) {
    setModalWeightState((prevState) => {
      const newWeight = [...prevState.weight]
      newWeight[index] += 1
      return {
        ...prevState,
        weight: newWeight,
      }
    })
  }

  function handleLessWeight(index: number) {
    setModalWeightState((prevState) => {
      const newWeight = [...prevState.weight]
      if (newWeight[index] > 0) {
        newWeight[index] -= 1
      }
      return {
        ...prevState,
        weight: newWeight,
      }
    })
  }

  function handleWeightChange(x: string, index: number) {
    const copyWeight = modalWeightState.weight

    copyWeight[index] = Number(x)
    setModalWeightState((prevState) => ({
      ...prevState,
      weight: copyWeight,
    }))
  }

  function handleCloseNotesModal() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserNotes: false,
    }))
  }

  function handleCloseWeightModal() {
    setModalWeightState((prevState) => ({
      ...prevState,
      isOpenModalUserWeight: false,
    }))
  }

  // const openedTimeRef = useRef(new Date().getTime())

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
      console.log(cachedVideoTable)
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
            onPress={handleShowVideoPlayer}
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
          style={{ opacity: isFocused ? 1 : 0.4 }}
        >
          <TableWrapper>
            {item.workoutExerciseSets &&
              item.workoutExerciseSets.map((v, i) => (
                <WorkoutSerieWrapper key={i}>
                  <WorkoutSerieValue>
                    {i + 1}º serie: {v}
                  </WorkoutSerieValue>
                  <ButtonsWrapper>
                    <WorkoutWeightValueAndTextWrapper>
                      <WorkoutWeightValue
                        onPress={() => {
                          openWeight(i)
                        }}
                      >
                        <WorkoutWeightText>
                          {modalWeightState.weight[i]}kg
                        </WorkoutWeightText>
                      </WorkoutWeightValue>
                    </WorkoutWeightValueAndTextWrapper>
                    <WorkoutButton onPress={() => handleLessWeight(i)}>
                      <Less width={36} height={36} stroke="#D92727" />
                    </WorkoutButton>
                    <WorkoutButton onPress={() => handlePlusWeight(i)}>
                      <More width={36} height={36} stroke="#1CAA44" />
                    </WorkoutButton>
                  </ButtonsWrapper>
                </WorkoutSerieWrapper>
              ))}
          </TableWrapper>
        </WorkoutRepetitionAndSerieWrapper>

        <WorkoutUserNotesAndConfirmButtonWrapper>
          <WorkoutUserNotesButton
            onPress={openNotes}
            enabled={isFocused}
            style={{ opacity: isFocused ? 1 : 0.4 }}
          >
            <WorkoutUserNotes
              style={{ opacity: modalNotesState ? 1 : 0.4 }}
              colors={['#000000', '#FFFFFF']}
            >
              <ExclamationMark />
            </WorkoutUserNotes>
          </WorkoutUserNotesButton>

          <WorkoutButtonConfirm
            onPress={handleDoneWorkout}
            workoutExerciseDone={modalWeightState.completed}
          >
            <BlurViewWrapper
              style={{
                backgroundColor: modalWeightState.completed
                  ? theme.COLORS.AUX_GOOGLE_GREEN
                  : undefined,
                opacity: modalWeightState.completed ? 0.7 : 0.4,
              }}
            >
              <WorkoutButtonText>
                {modalWeightState.completed ? 'Feito' : 'Fazer'}
              </WorkoutButtonText>
            </BlurViewWrapper>
          </WorkoutButtonConfirm>
        </WorkoutUserNotesAndConfirmButtonWrapper>
      </WorkoutInfoWrapper>

      {/* esse modal */}
      <Modal
        visible={modalWeightState.isOpenModalUserWeight}
        animationType={`slide`}
        transparent={true}
        onRequestClose={handleCloseWeightModal} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserWeightModal
          closeModal={handleCloseWeightModal} // Método para fechar o modal (iOS, Android)
          handleUpdateWeight={handleUpdateWeight}
          weight={modalWeightState.weight[modalWeightState.activeWeightIndex]}
          weightIndex={modalWeightState.activeWeightIndex + 1}
        />
      </Modal>

      <Modal
        visible={modalWeightState.isOpenModalUserNotes}
        animationType={`slide`}
        transparent={true}
        onRequestClose={handleCloseWeightModal} // Método para fechar o modal (iOS, Android)
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          flex: 1,
        }}
      >
        <WorkoutUserNotesModal
          closeModal={handleCloseNotesModal} // Método para fechar o modal (iOS, Android)
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
            handleShowVideoPlayer={handleShowVideoPlayer}
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
