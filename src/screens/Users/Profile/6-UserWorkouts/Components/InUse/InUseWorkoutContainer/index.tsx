import React, { useEffect, useState } from 'react'
import {
  ContainerWrapper,
  MonthYearACTMessage,
  CardTittle,
  CardDate,
  CardsWrapper,
} from './styles'
import {
  IMyfitflowWorkoutInUseData,
  IMyWorkouts,
  SignInProps,
} from '@hooks/authTypes'
import { InUseExpiredWorkoutCard } from '../InUseExpiredWorkoutCard'
import { InUseActiveWorkoutCard } from '../InUseActiveWorkoutCard'

interface WorkoutContainerProps {
  data: IMyWorkouts | null
  activeworkouts: IMyfitflowWorkoutInUseData[] | null
  expiredworkouts: IMyfitflowWorkoutInUseData[] | null
  user: SignInProps | null
  showScreen2: 'Ativos' | 'Expirados'
  isOpenSettingsMode: boolean
  handleOnPressExpiredInUseWorkout: (id: string) => void
  handleOnPressActiveInUseWorkout: (id: string) => void
}

export default function InUseWorkoutContainer({
  data,
  activeworkouts,
  expiredworkouts,
  showScreen2,
  user,
  isOpenSettingsMode,
  handleOnPressExpiredInUseWorkout,
  handleOnPressActiveInUseWorkout,
}: WorkoutContainerProps) {
  function onPressActiveInUseWorkout(id: string) {
    handleOnPressActiveInUseWorkout(id)
  }
  function onPressExpiredWorkout(id: string) {
    handleOnPressExpiredInUseWorkout(id)
  }
  /* 
  TODO  MOSTARR A DATA DO INICIO E FIM DOS ACTIVOS

  
  */

  return (
    <ContainerWrapper>
      {showScreen2 === 'Ativos' && (
        <CardsWrapper>
          {activeworkouts &&
            data &&
            activeworkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
              <InUseActiveWorkoutCard
                dataOrder={data.dataOrder}
                //  isWorkoutAlreadyStarted={currentWorkout?.workoutStartAt !== 0}
                key={i}
                data={v || null}
                selectedLanguage={user?.selectedLanguage || 'pt-br'}
                index={i}
                handleOnPressActiveWorkout={() =>
                  onPressActiveInUseWorkout(v.id)
                }
              />
            ))}
        </CardsWrapper>
      )}

      {/* 
           handleOnPressExpiredInUseWorkout={
                              handleOnPressExpiredInUseWorkout
                            }
                            handleOnPressActiveInUseWorkout={
                              handleOnPressActiveWorkout
                            }
      */}
      {showScreen2 === 'Expirados' && (
        <CardsWrapper>
          {expiredworkouts &&
            expiredworkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
              <InUseExpiredWorkoutCard
                //  isWorkoutAlreadyStarted={currentWorkout?.workoutStartAt !== 0}
                key={i}
                data={v || null}
                selectedLanguage={user?.selectedLanguage || 'pt-br'}
                index={i}
                handleOnPressExpiredWorkout={() => onPressExpiredWorkout(v.id)}
              />
            ))}
        </CardsWrapper>
      )}
    </ContainerWrapper>
  )
}
