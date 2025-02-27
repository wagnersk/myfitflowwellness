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
  handleSendWorkout: (id: string) => void
  handleQRcodeWorkout: (id: string) => void
  handleCancelShareWorkout: (id: string) => void
  closeModal: () => void
  data: IMyfitflowWorkoutInUseData
  isPrimaryWorkout: boolean
  activeIndex: number
  selectedLanguage: 'pt-br' | 'us'
}

export function SharedWorkoutsCardModal({
  handleQRcodeWorkout,
  handleSendWorkout,
  handleCancelShareWorkout,
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

  async function onQRcode(id: string) {
    handleQRcodeWorkout(id)
  }
  async function onSend(id: string) {
    handleSendWorkout(id)
  }
  async function onCancelShare(id: string) {
    handleCancelShareWorkout(id)
  }

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }
  /* 

compartilhar treino whatspp - gerar qrcode

cancelar compartilhamento

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
                <SubTitteText>Atualizado em: 20/10/1991 as 18:38</SubTitteText>
              </TipsTitleNoteWrapper>

              <InputsWrapper>
                <ToggleSwitch
                  selected={data.isActive}
                  onPress={() => onCancelShare(data.id)}
                >
                  <ToggleSwitchText selected={data.isActive}>
                    {data.isShared ? 'Cancelar' : 'Share'}
                  </ToggleSwitchText>
                </ToggleSwitch>
                <ToggleSwitch
                  selected={!data.isActive}
                  onPress={() => onQRcode(data.id)}
                >
                  <ToggleSwitchText selected={data.isActive}>
                    QRcode
                  </ToggleSwitchText>
                </ToggleSwitch>
                <ShareButton onPress={() => onSend(data.id)}>
                  <ShareText selected={data.isShared}>
                    {data.isShared ? 'Enviar' : 'Share'}
                  </ShareText>
                </ShareButton>
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
