import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

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
  OverLay,
  OverLayTop,
  OverLayBottom,
} from './styles'
import { useAuth } from '@hooks/auth'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateNotes: (notes: string) => void
  notes: string
  workoutExerciseId?: string
}

export function WorkoutUserNotesModal({
  closeModal,
  handleUpdateNotes,
  workoutExerciseId,
  notes,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [newNotes, setNewNotes] = useState(notes)
  const { cachedNotesTable } = useAuth()

  console.log(`chegando no Notes:`, notes)

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

  async function changeNotes(data: string) {
    setNewNotes(data)
  }
  async function updateNotes() {
    console.log(`asd`)
    handleUpdateNotes(newNotes)
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
            <KeyboardAvoidingView
              style={{ gap: 80 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              enabled
            >
              <TipsNoteWrapper>
                <TipsTitleNoteWrapper>
                  <TipsTitleNote>Anotações</TipsTitleNote>
                </TipsTitleNoteWrapper>

                <TipsInputNotes
                  value={newNotes}
                  onChangeText={changeNotes}
                  textAlignVertical="top"
                  multiline={true}
                  isFocused={isFocused}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  {...rest}
                />
              </TipsNoteWrapper>

              <TipsButtonWrapper>
                <TipsButton onPress={updateNotes}>
                  <TipsButtonLinearGradientSave colors={[``]}>
                    <TipsButtonText>Salvar</TipsButtonText>
                  </TipsButtonLinearGradientSave>
                </TipsButton>
              </TipsButtonWrapper>
            </KeyboardAvoidingView>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
