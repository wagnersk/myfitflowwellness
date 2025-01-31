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

interface IModalStateWorkoutLogData extends IWeightDoneLog {
  isOpenModalUserNotes: boolean
  isOpenModalVideoPlayer: boolean
  isOpenModalUserWeight: boolean
  isOpenModalUserSets: boolean
  isOpenModalSetBetweenSets: boolean
  workoutCardIndex: number
  activeWeightIndex: number
}
/* Œ  isActivedRangeOfSets: boolean
    rangeOfSets: string[] */
interface WorkoutRepetitionAndSerieProps {
  isFocused: boolean
  modalWeightState: IModalStateWorkoutLogData
  selectedLanguage: 'pt-br' | 'us' | undefined
  firstIncompleteIndex: number
  lastCompletedIndex: number
  allItensCompleted: boolean
  exerciseIndex: number
  user: any
  handleSetCompletedCheck: (index: number) => void
  handleAddRepetition: () => void
  handleRemoveLastRepetition: () => void
  openSetBetweenSets: (index: number) => void
  openSets: (index: number) => void
  openWeight: (index: number) => void
  updateActiveWeightIndexSets: (index: number) => void
}
const asd = {
  completed: {
    createdAt: 1738289532064,
    isCompleted: false,
    updatedAt: 1738289532064,
  },
  createdAt: 1738289532064,
  sets: {
    createdAt: 1738289532064,
    isActivedRangeOfSets: false,
    rangeOfSets: [],
    updatedAt: 1738289532064,
    value: 0,
  },
  updatedAt: 1738289532064,
  weight: { createdAt: 1738289532064, updatedAt: 1738289532064, value: '0' },
}
export default function WorkoutRepetitionsData({
  isFocused,
  modalWeightState,
  selectedLanguage,
  firstIncompleteIndex,
  lastCompletedIndex,
  allItensCompleted,
  exerciseIndex,
  user,
  handleSetCompletedCheck,
  handleAddRepetition,
  handleRemoveLastRepetition,
  openSetBetweenSets,
  openSets,
  openWeight,
  updateActiveWeightIndexSets,
}: WorkoutRepetitionAndSerieProps) {
  const theme = useTheme()
  return (
    <WorkoutRepetitionAndSerieWrapper style={{ opacity: isFocused ? 1 : 0.2 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TableWrapper>
          {modalWeightState.repetitionData &&
            modalWeightState.repetitionData.map((v, i) => (
              <WorkoutSerieWrapper
                key={i}
                style={{
                  opacity: modalWeightState.activeWeightIndex >= i ? 1 : 0.2,
                }}
              >
                <WorkoutWeightValueAndTextWrapper>
                  <WorkoutIndexButton
                    disabled={
                      firstIncompleteIndex === -1 ||
                      i === modalWeightState.activeWeightIndex
                        ? false
                        : firstIncompleteIndex < i
                    }
                    onPress={() => {
                      isFocused && updateActiveWeightIndexSets(i)
                    }}
                  >
                    <WorkoutSerieValue
                      activeWeightIndex={
                        modalWeightState.activeWeightIndex === i
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
                      isFocused && modalWeightState.repetitionData[i].sets.value
                        ? openSetBetweenSets(i)
                        : openSets(i)
                    }}
                  >
                    {v.sets.isActivedRangeOfSets ? (
                      <WorkoutWeightText activedGreenColor={true}>
                        {v.sets.rangeOfSets.join(' - ')}
                      </WorkoutWeightText>
                    ) : (
                      <WorkoutWeightText
                        activedGreenColor={
                          modalWeightState.activeWeightIndex === i &&
                          modalWeightState.isOpenModalUserSets
                        }
                      >
                        {v.sets.value}
                      </WorkoutWeightText>
                    )}
                    <WorkoutWeightMetric
                      activedGreenColor={
                        modalWeightState.activeWeightIndex === i &&
                        modalWeightState.isOpenModalUserSets
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
                        activedGreenColor={
                          modalWeightState.activeWeightIndex === i &&
                          modalWeightState.isOpenModalUserWeight
                        }
                      >
                        {v.weight.value}
                      </WorkoutWeightText>
                      <WorkoutWeightMetric
                        activedGreenColor={
                          modalWeightState.activeWeightIndex === i &&
                          modalWeightState.isOpenModalUserWeight
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
                    {modalWeightState.activeWeightIndex <= i &&
                    i <= lastCompletedIndex &&
                    !allItensCompleted &&
                    !modalWeightState.isOpenModalUserWeight &&
                    !modalWeightState.isOpenModalUserSets ? (
                      <Close
                        width={26}
                        height={26}
                        fill={theme.COLORS.AUX_GOOGLE_RED}
                      />
                    ) : v.completed ? (
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
                    stroke={theme.COLORS.AUX_GOOGLE_GREEN}
                    strokeWidth={2}
                    strokeLinecap="round"
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
                <WorkoutWeightText activedGreenColor={false}>
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
                  <WorkoutWeightText activedGreenColor={false}>
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
              >
                <Less
                  width={48}
                  height={48}
                  stroke={theme.COLORS.AUX_GOOGLE_RED}
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
