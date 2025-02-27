import React, { useEffect, useState } from 'react'
import {
  ContainerWrapper,
  MonthYearACTMessage,
  CardTittle,
  CardDate,
  CardsWrapper,
} from './styles'
import { PlanCard } from '../PlanCard'
import { formatTimestampToDate } from '@utils/formatTimestampToDate'
import {
  IMyfitflowWorkoutInUseData,
  IMyWorkouts,
  SignInProps,
} from '@hooks/authTypes'

interface WorkoutContainerProps {
  data: IMyWorkouts | null

  user: SignInProps | null
  isOpenSettingsMode: boolean
  handleOnPressActiveWorkout: (id: string) => void
  handleResetTimerUp: (id: string) => void
  handleMoveUp: (id: string) => void
  handleMoveDown: (id: string) => void
}

export default function ActivesWorkoutContainer({
  data,
  user,
  isOpenSettingsMode,
  handleOnPressActiveWorkout,
  handleResetTimerUp,
  handleMoveUp,
  handleMoveDown,
}: WorkoutContainerProps) {
  const [currentWorkout, setCurrentWorkout] =
    useState<IMyfitflowWorkoutInUseData | null>(null)

  const [nextWorkouts, setNextWorkouts] = useState<
    IMyfitflowWorkoutInUseData[] | null
  >([])

  useEffect(() => {
    if (data?.data && data?.dataOrder) {
      const orderedWorkouts = getOrderedWorkouts(data.data, data.dataOrder)
      if (orderedWorkouts.length > 0) {
        setCurrentWorkout(orderedWorkouts[0])
        setNextWorkouts(orderedWorkouts.slice(1))
      }
    }

    function getOrderedWorkouts(
      workouts: IMyfitflowWorkoutInUseData[],
      order: { id: string }[],
    ): IMyfitflowWorkoutInUseData[] {
      return order
        .map((orderItem) => {
          const workout = workouts.find(
            (workout) => workout.id === orderItem.id,
          )
          return workout ? { ...workout, ...orderItem } : undefined
        })
        .filter(
          (workout): workout is IMyfitflowWorkoutInUseData =>
            workout !== undefined,
        )
    }
  }, [data])

  return (
    <ContainerWrapper>
      <MonthYearACTMessage>
        <CardTittle>Treino atual</CardTittle>
        <CardDate>
          {data?.dataOrder[0].workoutStartAt === 0
            ? 'Treino ainda não iniciado'
            : `${formatTimestampToDate(data?.dataOrder[0].workoutStartAt ?? 0)} - ${formatTimestampToDate(currentWorkout?.workoutEndsAt ?? 0)}`}
        </CardDate>
      </MonthYearACTMessage>
      <CardsWrapper>
        {currentWorkout && (
          <PlanCard
            // isWorkoutAlreadyStarted={currentWorkout?.workoutStartAt !== 0}
            data={currentWorkout.data}
            selectedLanguage={user?.selectedLanguage || 'pt-br'}
            onPress={() => handleOnPressActiveWorkout(currentWorkout.id)}
            onReset={() => handleResetTimerUp(currentWorkout.id)}
            onMoveUp={() => handleMoveUp(currentWorkout.id)}
            onMoveDown={() => handleMoveDown(currentWorkout.id)}
            isOpenSettingsMode={isOpenSettingsMode}
            index={0}
            length={0}
          />
        )}
      </CardsWrapper>
      <MonthYearACTMessage>
        <CardTittle>Próximos treinos</CardTittle>
      </MonthYearACTMessage>
      <CardsWrapper>
        {nextWorkouts &&
          nextWorkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
            <PlanCard
              //  isWorkoutAlreadyStarted={currentWorkout?.workoutStartAt !== 0}
              key={i}
              data={v.data || null}
              selectedLanguage={user?.selectedLanguage || 'pt-br'}
              onPress={() => handleOnPressActiveWorkout(v.id)}
              onMoveUp={() => handleMoveUp(v.id)}
              onReset={() => handleResetTimerUp(v.id)}
              onMoveDown={() => handleMoveDown(v.id)}
              index={i}
              isOpenSettingsMode={isOpenSettingsMode}
              length={nextWorkouts.length}
            />
          ))}
      </CardsWrapper>
    </ContainerWrapper>
  )
}
