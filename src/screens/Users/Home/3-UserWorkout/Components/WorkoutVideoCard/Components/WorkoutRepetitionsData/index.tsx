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
import { IWeightDoneLog } from '@hooks/authTypes'
import { IModalStateWorkoutLogData } from '../..'

/* Œ  isActivedRangeOfSets: boolean
    rangeOfSets: string[] */
interface WorkoutRepetitionAndSerieProps {
  isFocused: boolean
  modalWeightState: IWeightDoneLog
  defaultModalState: IModalStateWorkoutLogData
  selectedLanguage: 'pt-br' | 'us' | undefined
  firstIncompleteIndex: number
  lastCompletedIndex: number
  allItensCompleted: boolean
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
  modalWeightState,
  defaultModalState,
  selectedLanguage,
  firstIncompleteIndex,
  lastCompletedIndex,
  allItensCompleted,
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
  return (
    <WorkoutRepetitionAndSerieWrapper
      pointerEvents={isFocused ? 'auto' : 'none'}
      style={{ opacity: isFocused ? 1 : 0.2 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TableWrapper>
          {modalWeightState.repetitionData &&
            modalWeightState.repetitionData.map((v, i) => (
              <WorkoutSerieWrapper
                key={i}
                style={{
                  opacity:
                    defaultModalState.activeWeightIndex + 1 >= i &&
                    i <= lastCompletedIndex + 1 &&
                    modalWeightState.repetitionData.length > 1
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
                      isFocused &&
                      v.sets.isActivedRangeOfSets &&
                      v.sets.rangeOfSets.length > 0 &&
                      v.sets.value !== 0
                        ? openSetBetweenSets(i)
                        : openSets(i)
                    }}
                  >
                    {v.sets.isActivedRangeOfSets &&
                    !v.sets.value &&
                    v.sets.rangeOfSets.length !== 0 ? (
                      <WorkoutWeightText
                        alreadySelected={
                          v.sets.isActivedRangeOfSets &&
                          v.sets.rangeOfSets.length > 0 &&
                          v.sets.value !== 0
                        }
                        activedGreenColor={true}
                      >
                        {v.sets.rangeOfSets.join(' - ')}
                      </WorkoutWeightText>
                    ) : (
                      <WorkoutWeightText
                        activedGreenColor={
                          defaultModalState.activeWeightIndex === i &&
                          defaultModalState.isOpenModalUserSets
                        }
                        alreadySelected={
                          v.sets.isActivedRangeOfSets &&
                          v.sets.value !== 0 &&
                          v.sets.rangeOfSets.length > 0
                        }
                      >
                        {v.sets.value}
                      </WorkoutWeightText>
                    )}

                    <WorkoutWeightMetric
                      activedGreenColor={
                        defaultModalState.activeWeightIndex === i &&
                        defaultModalState.isOpenModalUserSets
                      }
                    >
                      {' '}
                      rep
                    </WorkoutWeightMetric>
                  </WorkoutWeightValue>
                </WorkoutWeightValueAndTextWrapper>
                <ButtonsWrapper>
                  <WorkoutWeightValueAndTextWrapper>
                    <WorkoutWeightValue
                      disabled={exerciseIndex !== 0}
                      onPress={() => {
                        isFocused && openWeight(i)
                      }}
                    >
                      <WorkoutWeightText
                        alreadySelected={
                          v.sets.isActivedRangeOfSets &&
                          v.sets.rangeOfSets.length > 0 &&
                          v.sets.value !== 0
                        }
                        activedGreenColor={
                          defaultModalState.activeWeightIndex === i &&
                          defaultModalState.isOpenModalUserWeight
                        }
                      >
                        {v.weight.value}
                      </WorkoutWeightText>
                      <WorkoutWeightMetric
                        activedGreenColor={
                          defaultModalState.activeWeightIndex === i &&
                          defaultModalState.isOpenModalUserWeight
                        }
                      >
                        {' '}
                        kg
                      </WorkoutWeightMetric>
                    </WorkoutWeightValue>
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
                    !modalWeightState.repetitionData[i].completed.isCompleted &&
                    !allItensCompleted &&
                    !defaultModalState.isOpenModalUserWeight &&
                    !defaultModalState.isOpenModalUserSets ? (
                      <Close
                        width={26}
                        height={26}
                        fill={theme.COLORS.AUX_GOOGLE_RED}
                      />
                    ) : v.completed.isCompleted ? (
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
          <WorkoutSerieWrapper>
            <WorkoutWeightValueAndTextWrapper>
              <WorkoutIndexButton
                disabled={modalWeightState.repetitionData.length > 7}
                onPress={
                  modalWeightState.repetitionData.length < 7
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
                    style={{ opacity: 0.4 }}
                  />
                </WorkoutSerieValue>
              </WorkoutIndexButton>
            </WorkoutWeightValueAndTextWrapper>

            <WorkoutWeightValueAndTextWrapper>
              <WorkoutWeightValue
                disabled={true}
                onPress={() => {}}
                style={{ opacity: 0.1 }}
              >
                <WorkoutWeightText
                  alreadySelected={false}
                  activedGreenColor={false}
                >
                  {
                    modalWeightState.repetitionData[
                      modalWeightState.repetitionData.length - 1
                    ].sets.value
                  }
                </WorkoutWeightText>
                <WorkoutWeightMetric activedGreenColor={false}>
                  {' '}
                  rep{' '}
                </WorkoutWeightMetric>
              </WorkoutWeightValue>
            </WorkoutWeightValueAndTextWrapper>

            <ButtonsWrapper>
              <WorkoutWeightValueAndTextWrapper>
                <WorkoutWeightValue
                  disabled={true}
                  onPress={() => {}}
                  style={{ opacity: 0.1 }}
                >
                  <WorkoutWeightText
                    alreadySelected={false}
                    activedGreenColor={false}
                  >
                    {
                      modalWeightState.repetitionData[
                        modalWeightState.repetitionData.length - 1
                      ].weight.value
                    }
                  </WorkoutWeightText>
                  <WorkoutWeightMetric activedGreenColor={false}>
                    {' '}
                    kg{' '}
                  </WorkoutWeightMetric>
                </WorkoutWeightValue>
              </WorkoutWeightValueAndTextWrapper>
              <WorkoutButton
                disabled={modalWeightState.repetitionData.length <= 1}
                onPress={() => handleRemoveLastRepetition()}
                style={{ opacity: 0.3 }}
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
