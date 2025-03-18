import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native'
import Arrow from '@assets/Arrow-counter-clockwise.svg'

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
  SubTitteTextWrapper,
  ButtonsWrapper,
  BlurIconViewWrapper,
  ActButton,
  SubTitteContainer,
  CancelShareButton,
  CancelShareText,
  QRCodeButton,
} from './styles'
import {
  IMyfitflowWorkoutInUseData,
  IUserWorkoutsLog,
  IWorkoutLog,
} from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'

interface InputProps {
  handleSendSharedWorkout: (id: string) => void
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
  handleSendSharedWorkout,
  handleCancelShareWorkout,
  closeModal,
  isPrimaryWorkout,
  data,
  activeIndex,
  selectedLanguage,
}: InputProps) {
  const tittle = data.data.workoutName?.[selectedLanguage]

  async function onQRcode(id: string) {
    handleQRcodeWorkout(id)
  }
  async function onSend(id: string) {
    handleSendSharedWorkout(id)
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
              </TipsTitleNoteWrapper>
              <SubTitteText>{data.id}</SubTitteText>

              <InputsWrapper>
                <CancelShareButton onPress={() => onCancelShare(data.id)}>
                  <CancelShareText>Cancelar</CancelShareText>
                </CancelShareButton>
                <QRCodeButton onPress={() => onQRcode(data.id)}>
                  <ToggleSwitchText>QRcode</ToggleSwitchText>
                </QRCodeButton>

                <ShareButton onPress={() => onSend(data.id)}>
                  <ShareText>{data.isShared ? 'Enviar' : 'Share'}</ShareText>
                </ShareButton>
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
