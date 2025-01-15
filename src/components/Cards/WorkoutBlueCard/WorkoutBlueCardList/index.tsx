import React from 'react'
import { useWindowDimensions, FlatList } from 'react-native'
import { WorkoutBlueCardItem } from '../WorkoutBlueCardItem'

import { ItemSeparatorComponent, ListFooterComponent } from './styles'
import { IWorkoutInfo, IWorkoutsData } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'

interface DataProps {
  data: IWorkoutInfo
  handleNextStep: (data: IWorkoutsData, cardIndex: number) => void
}
// aqui que seria feita a inclusao no cache
export function WorkoutBlueCardList({ data, handleNextStep }: DataProps) {
  const { width } = useWindowDimensions()
  const { user } = useAuth()

  const updatedWorkoutDataWithSequenceData = data.workoutSequence
    .map((val) => {
      const findWorkoutData = data.workoutsData.find(
        (v) => v.cardExerciseLabel === val.label,
      )

      if (findWorkoutData) {
        const newWorkoutData: IWorkoutsData = {
          cardExerciseData: findWorkoutData.cardExerciseData,
          cardExerciseLabel:
            user?.selectedLanguage === 'pt-br'
              ? `Treino ${String.fromCharCode(65 + val.index)}`
              : `Workout ${String.fromCharCode(65 + val.index)}`,
          cardExerciseUniquesMuscles:
            findWorkoutData.cardExerciseUniquesMuscles,
          index: val.index,
        }
        return newWorkoutData
      }
      const findIta: IWorkoutsData | null = findWorkoutData || null

      return findIta
    })
    .filter((v) => v !== null)

  return (
    <FlatList
      style={{
        position: 'absolute',
        width,
        height: '100%',
        top: 96,
      }}
      data={updatedWorkoutDataWithSequenceData}
      // data={data.workoutsData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, i) => i.toString()}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListFooterComponent={ListFooterComponent}
      renderItem={({ item, index }) => (
        <>
          <WorkoutBlueCardItem
            data={item}
            cardIndex={index}
            handleNextStep={handleNextStep}
            workoutId={data.workoutId}
          />
        </>
      )}
    />
  )
}
