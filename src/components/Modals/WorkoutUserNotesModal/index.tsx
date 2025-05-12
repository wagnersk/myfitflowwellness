import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
  ScrollView,
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
  SubTitle,
  Title,
  TechiesWrapper,
  TitleTechiesWrapper,
  TitleTechies,
  SubTitleTechies,
} from './styles'
import { useAuth } from '@hooks/auth'
import { IFormattedCardExerciseData, IPropsSets } from '@hooks/authTypes'

interface InputProps extends TextInputProps {
  closeModal: () => void
  handleUpdateNotes: (notes: string) => void
  notes: string
  item?: IFormattedCardExerciseData
  selectedLanguage: 'pt-br' | 'us'
}

export function WorkoutUserNotesModal({
  closeModal,
  handleUpdateNotes,
  selectedLanguage,
  notes,
  item,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [newNotes, setNewNotes] = useState(notes)
  const { cachedNotesTable } = useAuth()

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
            {item?.workoutTechiesTittle?.[selectedLanguage] && (
              <TechiesWrapper>
                <TitleTechiesWrapper>
                  <Title>
                    {item?.workoutExerciseName?.[selectedLanguage] || ''}
                  </Title>
                  <TitleTechies>
                    {item?.workoutTechiesTittle?.[selectedLanguage]}
                  </TitleTechies>
                </TitleTechiesWrapper>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                  {item?.workoutExerciseSets?.map((v, i) => {
                    return (
                      <SubTitleTechies key={i}>
                        {i + 1} - {v.techiesData.description[selectedLanguage]}
                      </SubTitleTechies>
                    )
                  })}
                </ScrollView>
              </TechiesWrapper>
            )}
            <TipsNoteWrapper>
              <TipsTitleNoteWrapper>
                <Title>Anotações</Title>
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
