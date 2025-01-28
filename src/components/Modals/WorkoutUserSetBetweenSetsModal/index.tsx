import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
  View,
  Button,
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
} from './styles'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateSetBetweenSets: (set: string) => void
  sets: string
  setBetweenSets: string
  tittle: string
  subTittle: string
}

export function WorkoutUserSetBetweenSetsModal({
  closeModal,
  handleUpdateSetBetweenSets,
  sets,
  setBetweenSets,
  tittle,
  subTittle,
}: InputProps) {
  const [start, end] = sets.split('-').map(Number)
  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  const newSet = range.map((v) => ({
    value: v,
    selected: String(v) === setBetweenSets,
  }))

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  async function updateWeight(index: number) {
    if (index === -1) return

    handleUpdateSetBetweenSets(newSet[index].value.toString())
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
                <SubTitteText>{subTittle}</SubTitteText>
              </TipsTitleNoteWrapper>
              <InputsWrapper>
                {newSet.map((v, _i) => {
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
