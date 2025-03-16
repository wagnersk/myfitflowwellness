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
  const isWorkoutActive = data.isInUse
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
                <ToggleSwitch
                  selected={!data.isInUse}
                  onPress={() => onCancel(data.id)}
                >
                  <ToggleSwitchText selected={data.isInUse}>
                    Deletar
                  </ToggleSwitchText>
                </ToggleSwitch>

                <ToggleSwitch
                  selected={data.isInUse}
                  onPress={() => onUseWorkout(data.id)}
                >
                  <ToggleSwitchText selected={data.isInUse}>
                    Ativar
                  </ToggleSwitchText>
                </ToggleSwitch>
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
