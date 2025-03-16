import React, { useEffect, useState } from 'react'
import {
  ContainerWrapper,
  MonthYearACTMessage,
  CardTittle,
  CardDate,
  CardsWrapper,
  CardContainer,
  ButtonsContainer,
  MoveCardButton,
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
  handleMoveUp: (id: string) => void
  handleMoveDown: (id: string) => void
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
  handleMoveUp,
  handleMoveDown,
}: WorkoutContainerProps) {
  function onPressActiveInUseWorkout(id: string) {
    handleOnPressActiveInUseWorkout(id)
  }

  function onPressExpiredWorkout(id: string) {
    handleOnPressExpiredInUseWorkout(id)
  }

  return (
    <ContainerWrapper>
      {showScreen2 === 'Ativos' && (
        <CardsWrapper>
          {activeworkouts &&
            data &&
            data.activeData &&
            activeworkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
              <CardContainer key={i}>
                {i === 0 && <CardTittle>Atual:</CardTittle>}
                {i === 1 && <CardTittle>Próximos:</CardTittle>}

                <InUseActiveWorkoutCard
                  activeData={data.activeData}
                  //  isWorkoutAlreadyStarted={currentWorkout?.workoutStartAt !== 0}
                  data={v || null}
                  selectedLanguage={user?.selectedLanguage || 'pt-br'}
                  index={i}
                  handleOnPressActiveWorkout={() =>
                    onPressActiveInUseWorkout(v.id)
                  }
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  isOpenSettingsMode={isOpenSettingsMode}
                />
              </CardContainer>
            ))}
        </CardsWrapper>
      )}

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
