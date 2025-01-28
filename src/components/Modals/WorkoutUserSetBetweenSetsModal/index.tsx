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
  handleUpdateSets: (set: string) => void
  sets: string
  exerciseName?: string
  tittle: string
  subTittle: string
}

export function WorkoutUserSetBetweenSetsModal({
  closeModal,
  handleUpdateSets,
  sets,
  exerciseName,
  tittle,
  subTittle,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const [newSets, setNewSets] = useState(() => {
    const [start, end] = sets.split('-').map(Number)
    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    return range.map((v) => ({
      value: v,
      selected: false,
    }))
  })

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
  }

  async function updateWeight(index: number) {
    if (index === -1) return

    handleUpdateSets(newSets[index].value.toString())
  }

  function handleSetsFirstChange(x: string) {
    if (x === undefined) return

    const formattedValue = x.replace(/[^0-9]/g, '').slice(0, 2)

    // Permitir que o campo seja apagado completamente
    if (formattedValue === '') {
      setNewSets(['', newSets[1] || ''])
      return
    }

    setNewSets([formattedValue, newSets[1] || ''])
  }

  function handleSetsSecondChange(x: string) {
    if (x === undefined) return

    const formattedValue = x.replace(/[^0-9]/g, '').slice(0, 2)

    // Permitir que o campo seja apagado completamente
    if (formattedValue === '') {
      setNewSets([newSets[0], ''])
      return
    }

    setNewSets([newSets[0], formattedValue])
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
                {newSets.map((v, _i) => {
                  return (
                    <ItensButton key={_i} onPress={() => updateWeight(_i)}>
                      <TipsButtonText>{v.value}</TipsButtonText>
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
