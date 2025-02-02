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
  handleUpdateAllWeight: (weight: string) => void
  weight: string
  weightIndex: number
  exerciseName?: string
}

export function WorkoutUserWeightModal({
  closeModal,
  handleUpdateWeight,
  handleUpdateAllWeight,
  weight,
  weightIndex,
  exerciseName,
  ...rest
}: InputProps) {
  useEffect(() => {
    setNewWeight(weight)
  }, [weight])
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

  function handleWeightChange(x: string) {
    if (x === undefined) return

    // Permitir apenas números e pontos, mas garantir que apenas um ponto seja permitido
    let formattedValue = x.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')

    // Remover zeros à esquerda
    formattedValue = formattedValue.replace(/^0+(?!$)/, '')

    // Permitir que o campo seja apagado completamente
    if (formattedValue === '') {
      setNewWeight('')
      return
    }

    // Garantir que o valor não comece com ponto ou tenha múltiplos pontos
    if (formattedValue.startsWith('.') || formattedValue.includes('..')) {
      return
    }
    if (Number(formattedValue) > 999) {
      return
    }
    const decimalIndex = formattedValue.indexOf('.')
    if (decimalIndex !== -1 && formattedValue.length - decimalIndex - 1 > 2) {
      formattedValue = formattedValue.slice(0, decimalIndex + 3)
    }

    setNewWeight(formattedValue)
  }

  async function updateWeight() {
    const formattedValue = newWeight.replace(/^0+(?!$)/, '')

    // Garantir que o valor não comece com ponto ou tenha múltiplos pontos
    if (formattedValue.startsWith('.') || formattedValue.includes('..')) {
      return
    }

    handleUpdateWeight(formattedValue)
  }
  async function updateAllWeight() {
    const formattedValue = newWeight.replace(/^0+(?!$)/, '')

    // Garantir que o valor não comece com ponto ou tenha múltiplos pontos
    if (formattedValue.startsWith('.') || formattedValue.includes('..')) {
      return
    }

    handleUpdateAllWeight(formattedValue)
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
                <TipsTitleNote>Peso da {weightIndex + 1}º série</TipsTitleNote>
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

              {weightIndex === 0 && (
                <TipsButton onPress={updateAllWeight}>
                  <TipsButtonLinearGradientSave colors={['#000000', '#FFFFFF']}>
                    <TipsButtonText>Salvar para todos</TipsButtonText>
                  </TipsButtonLinearGradientSave>
                </TipsButton>
              )}
            </TipsButtonWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
