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
  OverLayTop,
  ToggleSwitch,
  ToggleSwitchText,
  GreenSmallButton,
  ShareText,
  SubTitteText,
  RedButton,
  BlueSmallButton,
  BlueButton,
  OverLayBottom,
} from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'

interface InputProps {
  handleSendActiveWorkout: (id: string) => void
  handleActiveSettingMode: (id: string) => void
  handleInUseRemoveFromActivedWorkout: (id: string) => void
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
  handleActiveSettingMode,
  handleSendActiveWorkout,
  handleInUseRemoveFromActivedWorkout,
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

  async function onSettingModeActived(id: string) {
    handleActiveSettingMode(id)
  }
  async function onSend(id: string) {
    handleSendActiveWorkout(id)
  }
  async function onDeactivateWorkout(id: string) {
    handleInUseRemoveFromActivedWorkout(id)
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
                <SubTitteText>{data.id}</SubTitteText>
              </TipsTitleNoteWrapper>

              <InputsWrapper>
                <RedButton
                  selected={!data.isActive}
                  onPress={() => onDeactivateWorkout(data.id)}
                >
                  <ToggleSwitchText selected={data.isActive}>
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
                        selected={data.isActive}
                        onPress={() => onSettingModeActived(data.id)}
                        disabled={!isMorethenTwoElementsAtQueue}
                      >
                        <ToggleSwitchText selected={data.isActive}>
                          Editar Fila
                        </ToggleSwitchText>
                      </BlueSmallButton>
                    )}
                    <BlueButton
                      selected={data.isActive}
                      onPress={() => onMoveWorkoutFromQueueToPrimary(data.id)}
                    >
                      <ToggleSwitchText selected={data.isActive}>
                        Usar este treino
                      </ToggleSwitchText>
                    </BlueButton>
                  </>
                ) : (
                  <BlueButton
                    selected={data.isActive}
                    onPress={() => onRestartCounter(data.id)}
                  >
                    <ToggleSwitchText selected={data.isActive}>
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
