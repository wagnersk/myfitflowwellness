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
  TipsTitleNote,
  TipsInputNotes,
  TipsButton,
  TipsButtonText,
  TipsButtonLinearGradientSave,
  OverLayTop,
  OverLayBottom,
  InputsWrapper,
  TipsButtonWrapper,
  ItensButton,
  TitteText,
  SubTitteText,
  SubTittleWrapper,
  DeleteButton,
  DeleteText,
} from './styles'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateRangeOfSets: (
    set: number,
    rangeOfSets: number[],
    isActivedRangeOfSets: boolean,
  ) => void
  handleDeleteRangeOfSets: () => void
  sets: number
  rangeOfSets: number[]
  tittle: string
  subTittle: string
  isActivedRangeOfSets: boolean
}

export function WorkoutUserRangeOfSetsModal({
  closeModal,
  handleUpdateRangeOfSets,
  handleDeleteRangeOfSets,
  tittle,
  subTittle,
  sets,
  rangeOfSets,
  isActivedRangeOfSets,
}: InputProps) {
  console.log(`sets`, sets)
  console.log(`rangeOfSets`, rangeOfSets)
  console.log(`isActivedRangeOfSets`, isActivedRangeOfSets)
  function generateRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }
  const rangeOfSet = generateRange(rangeOfSets[0], rangeOfSets[1]).map((v) => ({
    value: v,
    selected: sets === v,
  }))

  // const rangeOfSet = rangeOfSets.map((v) => ({ value: v, selected: false }))
  console.log(`rangeOfSet`, rangeOfSet)

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  async function updateWeight(index: number) {
    if (index === -1) return

    const selecteSet = rangeOfSet[index].value
    handleUpdateRangeOfSets(selecteSet, rangeOfSets, true)
    handleOverlayPress()
  }
  async function deleteRangeOfSets() {
    handleDeleteRangeOfSets()
    handleOverlayPress()
  }

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
                  {tittle} ( {sets} )
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
                {rangeOfSet.map((v, _i) => {
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
