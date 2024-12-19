import React, { useEffect } from 'react'
import Forward from '../../../../assets/Forward.svg'
import { isSameDay, getHours, getMinutes } from 'date-fns'

import { StyleSheet, TouchableOpacityProps } from 'react-native'
import { useAuth } from '@hooks/auth'

import {
  Container,
  ContainerGradient,
  WorkoutCircleOfLetterSequence,
  GradientText,
  WorkoutCardInfoWrapper,
  WorkoutCardName,
  WorkoutCardDateWrapper,
  WorkoutCardDateWrapperWithLine,
  WorkoutCardDay,
  WorkoutCardDateSeparator,
  WorkoutCardLineSeparator,
  WorkoutCardBulletsWrapper,
  WorkoutCardBullets,
  WorkoutCardForwardButton,
} from './styles'
import { getTrimmedName } from '@utils/getTrimmedName'
import { IWorkoutLog, IWorkoutsData } from '@hooks/authTypes'
import { translateMuscleGroupInfo } from '@utils/translateMuscles'
interface WorkoutsInfoProps extends TouchableOpacityProps {
  cardIndex: number
  handleNextStep: (data: IWorkoutsData, cardIndex: number) => void
  data: IWorkoutsData
  workoutId: string
}
export function WorkoutBlueCardItem({
  cardIndex,
  handleNextStep,
  data,
  workoutId,
}: WorkoutsInfoProps) {
  const { cachedUserWorkoutsLog, user } = useAuth()

  const getLetter = String.fromCharCode(65 + cardIndex)

  const arrayOfTotalExercisesBullet = Array.from(
    { length: data.cardExerciseData.length },
    (_, index) => index,
  )

  let copyWorkoutsLog: IWorkoutLog = {
    nextWorkoutIndex: 0,
    workoutCardsLogData: [],
    workoutId: '',
  }

  let workoutsLogIndex = 9999

  if (cachedUserWorkoutsLog && cachedUserWorkoutsLog.workoutsLog) {
    workoutsLogIndex = cachedUserWorkoutsLog.workoutsLog.findIndex(
      (va) => va.workoutId === workoutId,
    )
    copyWorkoutsLog = { ...cachedUserWorkoutsLog.workoutsLog[workoutsLogIndex] }
  }

  let totalSessionsCompleted = 0

  if (
    cachedUserWorkoutsLog &&
    cachedUserWorkoutsLog.workoutsLog &&
    cachedUserWorkoutsLog.workoutsLog[workoutsLogIndex] &&
    cachedUserWorkoutsLog.workoutsLog[workoutsLogIndex].workoutCardsLogData
  ) {
    const findCachedCard = cachedUserWorkoutsLog.workoutsLog[
      workoutsLogIndex
    ].workoutCardsLogData.find((v) => v.cardIndex === cardIndex)

    totalSessionsCompleted = findCachedCard
      ? findCachedCard.totalSessionsCompleted
      : 0
  }

  const { hours, minutes, sameDay } = checkIfIsSameDay()

  let muscleGroupsLabel = ''

  getFormattedNames(data.cardExerciseUniquesMuscles)

  function getFormattedNames(muscles: string[]) {
    const translattedMuscleGroupUStoPTBR = muscles.map((englishMuscle) => {
      if (!translateMuscleGroupInfo) return ''
      const findIt = translateMuscleGroupInfo.find(
        (translatedUSandPTBRItem) =>
          translatedUSandPTBRItem.us === englishMuscle,
      )
      if (!findIt) return ''
      if (!user) return ''

      const translated = findIt[user.selectedLanguage]

      return translated
    })

    if (!translattedMuscleGroupUStoPTBR) return

    muscleGroupsLabel = translattedMuscleGroupUStoPTBR.reduce(
      (acc, item, index) => {
        return acc + (index > 0 ? ', ' : '') + item
      },
      '',
    )
  }

  function checkIfIsSameDay() {
    let sameDay = false
    let hours = '0'
    let minutes = '0'
    if (
      copyWorkoutsLog &&
      copyWorkoutsLog.workoutCardsLogData &&
      copyWorkoutsLog.workoutCardsLogData[cardIndex] &&
      copyWorkoutsLog.workoutCardsLogData[cardIndex].lastCompletedTimestamp
    ) {
      hours = String(
        getHours(
          copyWorkoutsLog.workoutCardsLogData[cardIndex].lastCompletedTimestamp,
        ),
      ).padStart(2, '0')
      minutes = String(
        getMinutes(
          copyWorkoutsLog.workoutCardsLogData[cardIndex].lastCompletedTimestamp,
        ),
      ).padStart(2, '0')

      const today = new Date().getTime()

      sameDay = isSameDay(
        copyWorkoutsLog.workoutCardsLogData[cardIndex].lastCompletedTimestamp,
        today,
      )
    }

    return { sameDay, hours, minutes }
  }

  return (
    <Container
      onPress={() => handleNextStep(data, cardIndex)}
      style={styles.containerShadow}
      activeOpacity={0.7}
    >
      <ContainerGradient colors={['#000000', '#FFFFFF']}>
        <WorkoutCircleOfLetterSequence>
          <GradientText>{getLetter}</GradientText>
        </WorkoutCircleOfLetterSequence>
        <WorkoutCardInfoWrapper>
          <WorkoutCardName>
            {getTrimmedName(30, muscleGroupsLabel)}
          </WorkoutCardName>

          <WorkoutCardDateWrapperWithLine>
            {copyWorkoutsLog &&
              copyWorkoutsLog.workoutCardsLogData &&
              copyWorkoutsLog.workoutCardsLogData[cardIndex] &&
              copyWorkoutsLog.workoutCardsLogData[cardIndex]
                .lastCompletedFormattedDay &&
              copyWorkoutsLog.workoutCardsLogData[cardIndex]
                .lastCompletedFormattedDate &&
              (!sameDay ? (
                <WorkoutCardDateWrapper>
                  <WorkoutCardDay>{'Hoje'}</WorkoutCardDay>
                  <WorkoutCardDateSeparator>
                    {copyWorkoutsLog.workoutCardsLogData[cardIndex]
                      .lastCompletedFormattedDay && '  -  '}
                  </WorkoutCardDateSeparator>
                  <WorkoutCardDay>{`${hours}:${minutes}`}</WorkoutCardDay>
                </WorkoutCardDateWrapper>
              ) : (
                <WorkoutCardDateWrapper>
                  <WorkoutCardDay>
                    {
                      copyWorkoutsLog.workoutCardsLogData[cardIndex]
                        .lastCompletedFormattedDay
                    }
                  </WorkoutCardDay>
                  {console.log(
                    copyWorkoutsLog.workoutCardsLogData[cardIndex]
                      .lastCompletedFormattedDay,
                  )}
                  <WorkoutCardDateSeparator>
                    {copyWorkoutsLog.workoutCardsLogData[cardIndex]
                      .lastCompletedFormattedDay && '  -  '}
                  </WorkoutCardDateSeparator>
                  <WorkoutCardDay>
                    {
                      copyWorkoutsLog.workoutCardsLogData[cardIndex]
                        .lastCompletedFormattedDate
                    }
                  </WorkoutCardDay>
                </WorkoutCardDateWrapper>
              ))}

            {copyWorkoutsLog &&
              copyWorkoutsLog.workoutCardsLogData &&
              copyWorkoutsLog.workoutCardsLogData[cardIndex] === undefined && (
                <WorkoutCardDay>Treino ainda não iniciado</WorkoutCardDay>
              )}

            <WorkoutCardLineSeparator />
          </WorkoutCardDateWrapperWithLine>
          <WorkoutCardBulletsWrapper>
            {arrayOfTotalExercisesBullet.map((_, _index) => (
              <WorkoutCardBullets
                key={`${_index}`}
                style={{
                  opacity: _index < totalSessionsCompleted ? 1 : 0.4,
                }}
              />
            ))}
          </WorkoutCardBulletsWrapper>
        </WorkoutCardInfoWrapper>

        <WorkoutCardForwardButton>
          <Forward width={36} height={36} stroke="#EFEFFF" />
        </WorkoutCardForwardButton>
      </ContainerGradient>
    </Container>
  )
}

const styles = StyleSheet.create({
  containerShadow: {
    backgroundColor: 'white', // <==== HERE
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
})
