import React from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  WorkoutRepetitionAndSerieWrapper,
  TableWrapper,
  WorkoutSerieWrapper,
  WorkoutWeightValueAndTextWrapper,
  WorkoutIndexButton,
  WorkoutSerieValue,
  WorkoutWeightValue,
  WorkoutWeightText,
  WorkoutWeightMetric,
  ButtonsWrapper,
  WorkoutButton,
} from './styles'
import More from '@assets/More.svg'
import Less from '@assets/Less.svg'
import Close from '@assets/Close.svg'
import Check from '@assets/Check.svg'
import { IModalStateWorkoutLogData } from '../..'
import { ICachedCardExerciseData } from '@hooks/authTypes'

interface WorkoutRepetitionAndSerieProps {
  isFocused: boolean
  modalCachedCardExerciseData: ICachedCardExerciseData
  defaultModalState: IModalStateWorkoutLogData
  selectedLanguage: 'pt-br' | 'us' | undefined
  firstIncompleteIndex: number
  lastCompletedIndex: number
  allItensCompleted: boolean
  disabled: boolean
  exerciseIndex: number
  handleSetCompletedCheck: (index: number) => void
  handleAddRepetition: () => void
  handleRemoveLastRepetition: () => void
  openSetBetweenSets: (index: number) => void
  openSets: (index: number) => void
  openWeight: (index: number) => void
  handleChangeRepetitionFocus: (index: number) => void
}

export default function WorkoutRepetitionsData({
  isFocused,
  modalCachedCardExerciseData,
  defaultModalState,
  selectedLanguage,
  firstIncompleteIndex,
  lastCompletedIndex,
  allItensCompleted,
  disabled,
  exerciseIndex,
  handleSetCompletedCheck,
  handleAddRepetition,
  handleRemoveLastRepetition,
  openSetBetweenSets,
  openSets,
  openWeight,
  handleChangeRepetitionFocus,
}: WorkoutRepetitionAndSerieProps) {
  const theme = useTheme()

  const repetitionText =
    modalCachedCardExerciseData.workoutExerciseSets?.reduce(
      (acc, set, index) => {
        return (
          acc +
          (index > 0 ? ', ' : '') +
          set.repetitionData.map((rep) => rep.sets_insensitive).join('-')
        )
      },
      '',
    )

  return (
    <WorkoutRepetitionAndSerieWrapper
      pointerEvents={isFocused && !disabled ? 'auto' : 'none'}
      style={{ opacity: isFocused ? 1 : 0.2 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TableWrapper>
          {modalCachedCardExerciseData.workoutExerciseSets &&
            modalCachedCardExerciseData.workoutExerciseSets.map((v, i) => (
              <WorkoutSerieWrapper
                activeWeightIndex={defaultModalState.activeWeightIndex === i}
                key={i}
                style={{
                  opacity:
                    defaultModalState.activeWeightIndex + 1 >= i &&
                    i <= lastCompletedIndex + 1 &&
                    (modalCachedCardExerciseData.workoutExerciseSets ?? [])
                      .length > 0
                      ? 1
                      : 0.5,
                }}
              >
                <WorkoutWeightValueAndTextWrapper>
                  <WorkoutIndexButton
                    disabled={
                      firstIncompleteIndex === -1 ||
                      i === defaultModalState.activeWeightIndex
                        ? false
                        : firstIncompleteIndex < i
                    }
                    onPress={() => {
                      isFocused && handleChangeRepetitionFocus(i)
                    }}
                  >
                    <WorkoutSerieValue
                      activeWeightIndex={
                        defaultModalState.activeWeightIndex === i
                      }
                    >
                      {selectedLanguage !== 'pt-br'
                        ? `${i + 1}ª`
                        : `${i + 1}th`}
                    </WorkoutSerieValue>
                  </WorkoutIndexButton>
                </WorkoutWeightValueAndTextWrapper>
                <WorkoutWeightValueAndTextWrapper>
                  <WorkoutWeightValue
                    disabled={exerciseIndex !== 0}
                    onPress={() => {
                      isFocused && // card
                      v.repetitionData &&
                      v.repetitionData.length > 0 &&
                      v.selectedRepetitionData.checkedSet
                        ? openSetBetweenSets(i)
                        : openSets(i)
                    }}
                  >
                    <WorkoutWeightText
                      activeWeightIndex={
                        defaultModalState.activeWeightIndex === i
                      }
                      alreadySelected={
                        defaultModalState.activeWeightIndex === i && isFocused
                      }
                      activedGreenColor={
                        v.repetitionData[0] &&
                        v.repetitionData[1] &&
                        v.repetitionData[0].isReps &&
                        v.repetitionData[1].isReps
                      }
                    >
                      {v.repetitionData[0]?.isReps
                        ? v.repetitionData
                            .map((rep, i) => {
                              if (rep.isReps) {
                                return `${rep.sets_insensitive}x` // Exibe repetições com "x"
                              } else if (rep.isTime) {
                                return `${rep.timeInSeconds}s` // Exibe tempo com "s"
                              }
                              return ''
                            })
                            .filter((text) => text !== '') // Remove valores vazios
                            .join(
                              v.repetitionData[0]?.isReps &&
                                v.repetitionData[1]?.isReps
                                ? ' a ' // Usa "a" se ambos forem repetições
                                : ' + ', // Usa "+" se forem diferentes
                            )
                        : v.repetitionData.map((rep, i) => {
                            return `${rep.sets_insensitive}` // Exibe tempo com "s"
                          })}
                    </WorkoutWeightText>
                  </WorkoutWeightValue>
                </WorkoutWeightValueAndTextWrapper>
                <ButtonsWrapper>
                  <WorkoutWeightValueAndTextWrapper>
                    {v.repetitionData[0].isReps && (
                      <WorkoutWeightValue
                        disabled={exerciseIndex !== 0}
                        onPress={() => {
                          isFocused && openWeight(i)
                        }}
                      >
                        <WorkoutWeightText
                          activeWeightIndex={
                            defaultModalState.activeWeightIndex === i
                          }
                          alreadySelected={
                            defaultModalState.activeWeightIndex === i &&
                            isFocused
                          }
                          activedGreenColor={
                            defaultModalState.activeWeightIndex === i &&
                            defaultModalState.isOpenModalUserWeight
                          }
                        >
                          {v.weightData.value}
                        </WorkoutWeightText>
                        <WorkoutWeightMetric
                          activeWeightIndex={
                            defaultModalState.activeWeightIndex === i
                          }
                          activedGreenColor={
                            defaultModalState.activeWeightIndex === i &&
                            defaultModalState.isOpenModalUserWeight
                          }
                        >
                          {' '}
                          kg
                        </WorkoutWeightMetric>
                      </WorkoutWeightValue>
                    )}
                  </WorkoutWeightValueAndTextWrapper>
                  <WorkoutButton
                    disabled={
                      firstIncompleteIndex === -1
                        ? false
                        : firstIncompleteIndex < i
                    }
                    onPress={() => isFocused && handleSetCompletedCheck(i)}
                  >
                    {defaultModalState.activeWeightIndex <= i &&
                    i <= lastCompletedIndex &&
                    !modalCachedCardExerciseData.workoutExerciseSets?.[i]
                      .completedData.isCompleted &&
                    !allItensCompleted &&
                    !defaultModalState.isOpenModalUserWeight &&
                    !defaultModalState.isOpenModalUserSets ? (
                      <Close
                        width={26}
                        height={26}
                        fill={theme.COLORS.AUX_GOOGLE_RED}
                      />
                    ) : v.completedData.isCompleted ? (
                      <Check
                        width={34}
                        height={34}
                        stroke={theme.COLORS.AUX_GOOGLE_GREEN}
                      />
                    ) : (
                      <Check
                        width={34}
                        height={34}
                        stroke={theme.COLORS.NEUTRA_LETTER_AND_STROKE}
                      />
                    )}
                  </WorkoutButton>
                </ButtonsWrapper>
              </WorkoutSerieWrapper>
            ))}
          <WorkoutSerieWrapper activeWeightIndex={false}>
            <WorkoutWeightValueAndTextWrapper>
              <WorkoutIndexButton
                disabled={
                  (modalCachedCardExerciseData.workoutExerciseSets?.length ??
                    0) > 7
                }
                onPress={
                  (modalCachedCardExerciseData.workoutExerciseSets?.length ??
                    0) <= 6
                    ? handleAddRepetition
                    : () => {}
                }
                style={{ opacity: 0.7 }}
              >
                <WorkoutSerieValue activeWeightIndex={false}>
                  <More
                    width={48}
                    height={48}
                    stroke={theme.COLORS.NEUTRA_LETTER_AND_STROKE}
                    strokeWidth={2}
                    strokeLinecap="round"
                    style={{ opacity: 0.6 }}
                  />
                </WorkoutSerieValue>
              </WorkoutIndexButton>
            </WorkoutWeightValueAndTextWrapper>

            <ButtonsWrapper>
              <WorkoutButton
                disabled={
                  (modalCachedCardExerciseData?.workoutExerciseSets?.length ??
                    0) <= 1
                }
                onPress={() => handleRemoveLastRepetition()}
                style={{ opacity: 0.5 }}
              >
                <Less
                  width={48}
                  height={48}
                  stroke={theme.COLORS.NEUTRA_LETTER_AND_STROKE}
                  strokeWidth={1}
                  strokeLinecap="round"
                />
              </WorkoutButton>
            </ButtonsWrapper>
          </WorkoutSerieWrapper>
        </TableWrapper>
      </ScrollView>
    </WorkoutRepetitionAndSerieWrapper>
  )
}
