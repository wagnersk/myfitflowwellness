import React, { useState } from 'react'
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
  TipsButtonWrapper,
  TipsButton,
  TipsButtonText,
  TipsButtonLinearGradientSave,
  OverLayTop,
  OverLayBottom,
} from './styles'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateWeight: (weight: string) => void
  weight: number
  weightIndex: number
}

export function WorkoutUserWeightModal({
  closeModal,
  handleUpdateWeight,
  weight,
  weightIndex,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [newWeight, setNewWeight] = useState(weight)

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

  async function updateWeight() {
    handleUpdateWeight(String(newWeight))
  }

  function handleWeightChange(x: string) {
    if (x === undefined) return
    const formattedValue = Number(x.replace(/[^0-9]/g, ''))
    if (formattedValue > 999) return
    setNewWeight(formattedValue)
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
                <TipsTitleNote>Peso da {weightIndex}º série</TipsTitleNote>
              </TipsTitleNoteWrapper>

              <TipsInputNotes
                value={String(newWeight)}
                onChangeText={handleWeightChange}
                textAlignVertical="top"
                multiline={true}
                isFocused={isFocused}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                {...rest}
              />
            </TipsNoteWrapper>

            <TipsButtonWrapper>
              <TipsButton onPress={updateWeight}>
                <TipsButtonLinearGradientSave colors={['#000000', '#FFFFFF']}>
                  <TipsButtonText>Salvar</TipsButtonText>
                </TipsButtonLinearGradientSave>
              </TipsButton>
            </TipsButtonWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
