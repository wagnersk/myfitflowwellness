import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
  View,
  Button,
  Alert,
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
  const [newSets, setNewSets] = useState(sets.split('-'))
  const [showSecondInput, setShowSecondInput] = useState(newSets.length > 1)

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
    // a diferenca entre os numeros naop pode ser maior que 4
    const diff = Math.abs(Number(newSets[0]) - Number(newSets[1]))
    if (diff > 4) {
      return Alert.alert(
        'Erro',
        'A diferença entre os números não pode ser maior que 4',
      )
    }
    const joinedSets = newSets.join('-')
    handleUpdateSets(joinedSets)
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

  function addSecondInput() {
    const defaultSecondValue = sets.split('-')
    setShowSecondInput(true)
    setNewSets([...newSets, defaultSecondValue[1] || ''])
  }

  function removeSecondInput() {
    setShowSecondInput(false)
    setNewSets([newSets[0]])
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
              <InputsWrapper>
                <TipsInputNotes
                  value={newSets[0]}
                  onChangeText={handleSetsFirstChange}
                  textAlignVertical="top"
                  multiline={true}
                  isFocused={isFocused}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  keyboardType="numeric"
                  {...rest}
                />
                {showSecondInput && <TipsTitleNote>-</TipsTitleNote>}
                <View>
                  {showSecondInput ? (
                    <TipsInputNotes
                      value={newSets[1]}
                      onChangeText={handleSetsSecondChange}
                      textAlignVertical="top"
                      multiline={true}
                      isFocused={isFocused}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      keyboardType="numeric"
                      {...rest}
                    />
                  ) : (
                    <Button title="Adicionar" onPress={addSecondInput} />
                  )}
                </View>
                {showSecondInput && (
                  <Button title="Remover" onPress={removeSecondInput} />
                )}
              </InputsWrapper>
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
