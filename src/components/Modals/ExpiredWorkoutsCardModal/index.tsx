import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native'

import {
  Container,
  TipsNoteBodyWrapper,
  TipsNoteWrapper,
  TipsTitleNoteWrapper,
  TitteText,
  InputsWrapper,
  DeleteButton,
  DeleteText,
  OverLayTop,
  OverLayBottom,
  RedButton,
  GreenButton,
  ToggleSwitchText,
  ShareButton,
  ShareText,
  SubTitteText,
} from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'

interface InputProps {
  handleInUseActiveWorkout: (id: string) => void
  handleInUseRemoveFromExpiredWorkout: (id: string) => void
  closeModal: () => void
  data: IMyfitflowWorkoutInUseData
  isPrimaryWorkout: boolean
  activeIndex: number
  selectedLanguage: 'pt-br' | 'us'
}

export function ExpiredWorkoutsCardModal({
  handleInUseActiveWorkout,
  handleInUseRemoveFromExpiredWorkout,
  closeModal,
  isPrimaryWorkout,
  data,
  activeIndex,
  selectedLanguage,
}: InputProps) {
  const tittle = data.data.workoutName?.[selectedLanguage]

  async function onUseWorkout(id: string) {
    handleInUseActiveWorkout(id)
  }
  async function onCancel(id: string) {
    handleInUseRemoveFromExpiredWorkout(id)
  }

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <OverLayTop />
      </TouchableWithoutFeedback>
      <OverLayBottom>
        <Container>
          <TipsNoteBodyWrapper>
            <TipsNoteWrapper>
              <TipsTitleNoteWrapper>
                <TitteText>{tittle}</TitteText>
                {/* buscar updatedAt do dataARray linkado nesse id */}
                <SubTitteText>Atualizado em: 20/10/1991 as 18:38</SubTitteText>
                <SubTitteText>{data.id}</SubTitteText>
              </TipsTitleNoteWrapper>

              <InputsWrapper>
                <RedButton onPress={() => onCancel(data.id)}>
                  <ToggleSwitchText>Deletar</ToggleSwitchText>
                </RedButton>
                <GreenButton onPress={() => onUseWorkout(data.id)}>
                  <ToggleSwitchText>Ativar</ToggleSwitchText>
                </GreenButton>
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
