import React from 'react'
import {
  ContainerWrapper,
  CardTittle,
  CardsWrapper,
  CardContainer,
} from './styles'
import {
  IMyfitflowWorkoutInUseData,
  IMyInUseActiveData,
  IMyInUseExpiredData,
  IUser,
} from '@hooks/authTypes'
import { InUseExpiredWorkoutCard } from '../InUseExpiredWorkoutCard'
import { InUseActiveWorkoutCard } from '../InUseActiveWorkoutCard'

interface WorkoutContainerProps {
  activeData: IMyInUseActiveData[] | null
  expiredData: IMyInUseExpiredData[] | null

  activeworkouts: IMyfitflowWorkoutInUseData[] | null
  expiredworkouts: IMyfitflowWorkoutInUseData[] | null
  user: IUser | null
  showScreen2: 'Ativos' | 'Expirados'
  isOpenSettingsMode: boolean
  handleOnPressExpiredInUseWorkout: (id: string) => void
  handleOnPressActiveInUseWorkout: (id: string) => void
  handleMoveUp: (id: string) => void
  handleMoveDown: (id: string) => void
}

export default function InUseWorkoutContainer({
  activeData,
  expiredData,
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
            activeData &&
            activeworkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
              <CardContainer key={i}>
                {i === 0 && <CardTittle>Atual:</CardTittle>}
                {i === 1 && <CardTittle>Próximos:</CardTittle>}

                <InUseActiveWorkoutCard
                  activeData={activeData}
                  //  isWorkoutAlreadyStarted={currentWorkout?.workoutStartAt !== 0}
                  data={v || null}
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

      {showScreen2 === 'Expirados' && expiredData && (
        <CardsWrapper>
          {expiredworkouts &&
            expiredworkouts.map((v: IMyfitflowWorkoutInUseData, i: number) => (
              <InUseExpiredWorkoutCard
                expiredData={expiredData}
                //  isWorkoutAlreadyStarted={currentWorkout?.workoutStartAt !== 0}
                key={i}
                data={v || null}
                selectedLanguage={user?.selectedLanguage || 'pt-br'}
                handleOnPressExpiredWorkout={() => onPressExpiredWorkout(v.id)}
              />
            ))}
        </CardsWrapper>
      )}
    </ContainerWrapper>
  )
}
