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
  ToggleSwitch,
  ToggleSwitchText,
} from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'

interface InputProps {
  handleDeleteWorkout: (id: string) => void
  handleShareWorkout: (id: string) => void
  handleActiveWorkout: (id: string) => void
  closeModal: () => void
  data: IMyfitflowWorkoutInUseData
  isPrimaryWorkout: boolean
  activeIndex: number
  selectedLanguage: 'pt-br' | 'us'
}

export function WorkoutUserEditTotalWorkoutModal({
  handleDeleteWorkout,
  handleShareWorkout,
  handleActiveWorkout,
  closeModal,
  isPrimaryWorkout,
  data,
  activeIndex,
  selectedLanguage,
}: InputProps) {
  const isWorkoutActive = data.isActive
  const isSharingActive = data.isShared

  const tittle = data.data.workoutName?.[selectedLanguage]

  const mainWorkoutTitle =
    selectedLanguage === 'pt-br' ? 'Treino Principal' : 'Main Workout'

  const reserveWorkoutTitle =
    selectedLanguage === 'pt-br'
      ? `${activeIndex} - Treino Reserva`
      : `${activeIndex} - Reserve Workout`

  const auxTittle = isPrimaryWorkout ? mainWorkoutTitle : reserveWorkoutTitle

  const sharingTitle =
    selectedLanguage === 'pt-br' ? 'Compartilhamento' : 'Sharing'
  const onText = selectedLanguage === 'pt-br' ? 'Ligar' : 'ON'
  const offText = selectedLanguage === 'pt-br' ? 'Desligar' : 'OFF'

  async function onDelete(id: string) {
    handleDeleteWorkout(id)
  }
  async function onShare(id: string) {
    handleShareWorkout(id)
  }
  async function onActive(id: string) {
    handleActiveWorkout(id)
  }

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }
  /* 

compartilhar treino whatspp
gerar qrcode

*/
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
              </TipsTitleNoteWrapper>

              <InputsWrapper>
                <TitteText>
                  {data.isActive ? 'Desativar Treino' : 'Ativar Treino'}
                </TitteText>
                <ToggleSwitch
                  selected={data.isActive}
                  onPress={() => onActive(data.id)}
                >
                  <ToggleSwitchText selected={data.isActive}>
                    {data.isActive ? 'ON' : 'OFF'}
                  </ToggleSwitchText>
                </ToggleSwitch>
              </InputsWrapper>

              <InputsWrapper>
                <TitteText>
                  {data.isShared
                    ? 'Compartilhamento Ativo'
                    : 'Compartilhar Treino'}
                </TitteText>
                <ToggleSwitch
                  selected={data.isShared}
                  onPress={() => onShare(data.id)}
                >
                  <ToggleSwitchText selected={data.isShared}>
                    {data.isShared ? 'ON' : 'OFF'}
                  </ToggleSwitchText>
                </ToggleSwitch>
              </InputsWrapper>

              <InputsWrapper>
                <DeleteButton onPress={() => onDelete(data.id)}>
                  <DeleteText>Deletar</DeleteText>
                </DeleteButton>
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
