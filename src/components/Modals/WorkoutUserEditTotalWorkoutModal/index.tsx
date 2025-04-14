import React, { useEffect, useState } from 'react'
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
  SubTitteText,
  BlurIconViewWrapper,
  ButtonsWrapper,
  ActButton,
  SubTitteTextWrapper,
} from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'

interface InputProps {
  handleDeleteWorkout: (id: string) => void
  handleShareWorkout: (id: string) => void
  handleInUseExpiredWorkout: (id: string) => void
  closeModal: () => void
  data: IMyfitflowWorkoutInUseData
  isPrimaryWorkout: boolean
  activeIndex: number
  selectedLanguage: 'pt-br' | 'us'
}

export function WorkoutUserEditTotalWorkoutModal({
  handleDeleteWorkout,
  handleShareWorkout,
  handleInUseExpiredWorkout,
  closeModal,
  isPrimaryWorkout,
  data,
  activeIndex,
  selectedLanguage,
}: InputProps) {
  const { updateUserFirebaseWorkoutCache, cachedUserWorkoutsLog } = useAuth()

  const tittle = data.data.workoutName?.[selectedLanguage]

  async function onDelete(id: string) {
    handleDeleteWorkout(id)
  }
  async function onShare(id: string) {
    handleShareWorkout(id)
  }
  async function onInUse(id: string) {
    handleInUseExpiredWorkout(id)
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
              </TipsTitleNoteWrapper>

              <InputsWrapper>
                <TitteText>
                  {data.isExpired || data.isActive
                    ? 'Treino em uso'
                    : 'Usar Treino'}
                </TitteText>
                <ToggleSwitch
                  selected={data.isExpired || data.isActive}
                  onPress={() => onInUse(data.id)}
                >
                  <ToggleSwitchText selected={data.isExpired || data.isActive}>
                    {data.isExpired || data.isActive ? 'ON' : 'OFF'}
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
