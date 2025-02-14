import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
} from 'react-native'

import {
  Container,
  TipsNoteBodyWrapper,
  TipsNoteWrapper,
  TipsTitleNoteWrapper,
  TipsButtonText,
  OverLayTop,
  OverLayBottom,
  InputsWrapper,
  ItensButton,
  TitteText,
  SubTitteText,
  SubTittleWrapper,
  DeleteButton,
  DeleteText,
} from './styles'
import { ICachedCardExerciseData } from '@hooks/authTypes'

interface InputProps extends TextInputProps {
  handleUpdateRangeOfSets: (selecteSet: string) => void
  closeModal: () => void
  handleDeleteRangeOfSets: () => void
  modalCachedCardExerciseData: ICachedCardExerciseData
  activeIndex: number
  selectedLanguage: 'pt-br' | 'us'
}

export function WorkoutUserRangeOfSetsModal({
  closeModal,
  handleUpdateRangeOfSets,
  handleDeleteRangeOfSets,
  selectedLanguage,
  modalCachedCardExerciseData,
  activeIndex,
}: InputProps) {
  const tittle =
    selectedLanguage === 'pt-br'
      ? 'Ótimo trabalho! Quantas repetições você completou?'
      : 'Great job! How many repetitions did you complete?'

  const subTittle =
    selectedLanguage === 'pt-br'
      ? `Repetições da série ${activeIndex + 1}`
      : `Reps of set ${activeIndex + 1}`

  const activeLineSet =
    modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]

  const repetitionData =
    (activeLineSet &&
      activeLineSet.repetitionData
        .map((v) => v.sets_insensitive)
        .sort((a, b) => Number(a) - Number(b))) ||
    []

  const [rangeOfSets, setRangeOfSets] = useState(generateRange(repetitionData))

  async function updateWeight(index: number) {
    if (index === -1) return

    const updatedRangeOfSets = rangeOfSets.map((item, i) => ({
      ...item,
      selected: i === index ? !item.selected : item.selected,
    }))
    setRangeOfSets(updatedRangeOfSets)

    const selecteSet = rangeOfSets[index].value

    handleUpdateRangeOfSets(selecteSet)
    handleOverlayPress()
  }

  async function deleteRangeOfSets() {
    handleDeleteRangeOfSets()
  }

  function generateRange(rangeArray: string[]) {
    const start = Number(rangeArray[0])
    const end = Number(rangeArray[rangeArray.length - 1])

    const rangedData = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    )

    const transformedData = rangedData.map((v) => {
      return {
        value: String(v),
        selected: false,
      }
    })

    return transformedData
  }

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  useEffect(() => {
    const updatedRangeOfSets = rangeOfSets.map((item) => ({
      ...item,
      selected:
        item.value ===
        modalCachedCardExerciseData?.workoutExerciseSets?.[activeIndex]
          ?.selectedRepetitionData.checkedSet,
    }))
    setRangeOfSets(updatedRangeOfSets)
  }, [modalCachedCardExerciseData, activeIndex])
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' para iOS e 'height' para Android
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <OverLayTop />
      </TouchableWithoutFeedback>
      <OverLayBottom>
        <Container>
          <TipsNoteBodyWrapper>
            <TipsNoteWrapper>
              <TipsTitleNoteWrapper>
                <TitteText>
                  {tittle}
                  {/* ( {sets.map((v) => v.sets_insensitive).join('-')} ) */}
                </TitteText>
                <SubTittleWrapper>
                  <SubTitteText>{subTittle}</SubTitteText>
                  <DeleteButton
                    selected={true}
                    onPress={() => deleteRangeOfSets()}
                  >
                    <DeleteText>Deletar</DeleteText>
                  </DeleteButton>
                </SubTittleWrapper>
              </TipsTitleNoteWrapper>
              <InputsWrapper>
                {rangeOfSets.map((v, _i) => {
                  return (
                    <ItensButton
                      selected={v.selected}
                      key={_i}
                      onPress={() => updateWeight(_i)}
                    >
                      <TipsButtonText selected={v.selected}>
                        {v.value}
                      </TipsButtonText>
                    </ItensButton>
                  )
                })}
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
