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
  GreenSmallButton,
  ShareText,
  SubTitteText,
  RedButton,
  BlueSmallButton,
  BlueButton,
} from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'

interface InputProps {
  handleSendWorkout: (id: string) => void
  handleEditWorkout: (id: string) => void
  handleDeactivateWorkout: (id: string) => void
  closeModal: () => void
  data: IMyfitflowWorkoutInUseData
  activeIndex: number
  selectedLanguage: 'pt-br' | 'us'
  isFirstElement: boolean
  isMorethenTwoElementsAtQueue: boolean
  onRestartCounter: (id: string) => void
  onMoveWorkoutFromQueueToPrimary: (id: string) => void
}

export function WorkoutUserActiveWorkoutModal({
  handleEditWorkout,
  handleSendWorkout,
  handleDeactivateWorkout,
  closeModal,
  data,
  activeIndex,
  onMoveWorkoutFromQueueToPrimary,
  isFirstElement,
  isMorethenTwoElementsAtQueue,
  selectedLanguage,
  onRestartCounter,
}: InputProps) {
  const tittle = data.data.workoutName?.[selectedLanguage]
  console.log('activeIndex ', activeIndex)
  console.log('isFirstElement ', isFirstElement)
  async function onEdit(id: string) {
    handleEditWorkout(id)
  }
  async function onSend(id: string) {
    handleSendWorkout(id)
  }
  async function onDeactivateWorkout(id: string) {
    handleDeactivateWorkout(id)
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
                <SubTitteText>Atualizado em: 20/10/1991 as 18:38</SubTitteText>
              </TipsTitleNoteWrapper>

              <InputsWrapper>
                <RedButton
                  selected={!data.isInUse}
                  onPress={() => onDeactivateWorkout(data.id)}
                >
                  <ToggleSwitchText selected={data.isInUse}>
                    Desativar
                  </ToggleSwitchText>
                </RedButton>
                <GreenSmallButton onPress={() => onSend(data.id)}>
                  <ShareText selected={data.isShared}>Enviar</ShareText>
                </GreenSmallButton>

                {!isFirstElement ? (
                  <>
                    {isMorethenTwoElementsAtQueue && (
                      <BlueSmallButton
                        selected={data.isInUse}
                        onPress={() => onEdit(data.id)}
                        disabled={!isMorethenTwoElementsAtQueue}
                      >
                        <ToggleSwitchText selected={data.isInUse}>
                          Editar Fila
                        </ToggleSwitchText>
                      </BlueSmallButton>
                    )}
                    <BlueButton
                      selected={data.isInUse}
                      onPress={() => onMoveWorkoutFromQueueToPrimary(data.id)}
                    >
                      <ToggleSwitchText selected={data.isInUse}>
                        Usar este treino
                      </ToggleSwitchText>
                    </BlueButton>
                  </>
                ) : (
                  <BlueButton
                    selected={data.isInUse}
                    onPress={() => onRestartCounter(data.id)}
                  >
                    <ToggleSwitchText selected={data.isInUse}>
                      Reiniciar contagem
                    </ToggleSwitchText>
                  </BlueButton>
                )}
              </InputsWrapper>
            </TipsNoteWrapper>
          </TipsNoteBodyWrapper>
        </Container>
      </OverLayBottom>
    </KeyboardAvoidingView>
  )
}
