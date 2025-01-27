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
  handleUpdateSets: (set: string) => void
  sets: string
  setsIndex: number
  exerciseName?: string
}

export function WorkoutUserSetsModal({
  closeModal,
  handleUpdateSets,
  sets,
  setsIndex,
  exerciseName,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [newSets, setNewSets] = useState(sets)

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
    handleUpdateSets(String(newSets))
  }

  function handleSetsChange(x: string) {
    if (x === undefined) return

    // Permitir apenas números e pontos, mas garantir que apenas um ponto seja permitido
    const formattedValue = x.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')

    // Permitir que o campo seja apagado completamente
    if (formattedValue === '') {
      setNewSets('')
      return
    }

    // Limitar o valor a 999.0, garantir que não seja negativo e que tenha no máximo duas casas decimais
    const numberValue = Number(formattedValue)
    if (
      numberValue > 999.0 ||
      numberValue < 0 ||
      !/^\d+(\.\d{0,2})?$/.test(formattedValue)
    )
      return

    setNewSets(formattedValue)
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
                <TipsTitleNote>{exerciseName}</TipsTitleNote>
                <TipsTitleNote>Rep da {setsIndex}º série</TipsTitleNote>
              </TipsTitleNoteWrapper>

              <TipsInputNotes
                value={String(newSets)}
                onChangeText={handleSetsChange}
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
