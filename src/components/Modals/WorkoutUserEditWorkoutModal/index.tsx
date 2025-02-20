import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInputProps,
  Platform,
} from 'react-native'

import {
  Container,
  TipsNoteBodyWrapper,
  TipsNoteWrapper,
  TipsTitleNoteWrapper,
  TipsButtonText,
  OverLayTop,
  OverLayBottom,
  InputsWrapper,
  ItensButton,
  TitteText,
  SubTitteText,
  SubTittleWrapper,
  DeleteButton,
  DeleteText,
  UpdateButton,
  UpdateText,
} from './styles'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'
import { formatTimestampToDate } from '@utils/formatTimestampToDate'
interface InputProps extends TextInputProps {
  handleDeleteWorkout: (index: number) => void
  closeModal: () => void
  data: IMyfitflowWorkoutInUseData
  isPrimaryWorkout: boolean
  activeIndex: number
  selectedLanguage: 'pt-br' | 'us'
}
export function WorkoutUserEditWorkoutModal({
  handleDeleteWorkout,
  closeModal,
  isPrimaryWorkout,
  data,
  activeIndex,
  selectedLanguage,
}: InputProps) {
  const tittle = data.data.workoutName?.[selectedLanguage]

  const auxTittle = isPrimaryWorkout
    ? selectedLanguage === 'pt-br'
      ? `Treino Principal`
      : `Main Workout`
    : selectedLanguage === 'pt-br'
      ? `${activeIndex} - Treino Reserva`
      : `${activeIndex} - Reserve Workout`

  async function onDelete(index: number) {
    handleDeleteWorkout(index)
  }

  function handleOverlayPress() {
    Keyboard.dismiss()
    closeModal()
  }

  useEffect(() => {}, [])

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
            <TipsNoteWrapper>
              <TipsTitleNoteWrapper>
                <TitteText>
                  {tittle}
                  {/* ( {sets.map((v) => v.sets_insensitive).join('-')} ) */}
                </TitteText>
                <SubTitteText>{auxTittle}</SubTitteText>
                {/*     <SubTittleWrapper>
                  <SubTitteText>
                    {formatTimestampToDate(data.workoutStartAt)}
                  </SubTitteText>
                  <SubTitteText> - </SubTitteText>

                  <SubTitteText>
                    {formatTimestampToDate(data.workoutEndsAt)}
                  </SubTitteText>
                  <UpdateButton selected={true} onPress={() => {}}>
                    <UpdateText>Atualizar</UpdateText>
                  </UpdateButton>
                </SubTittleWrapper> */}
              </TipsTitleNoteWrapper>
              <InputsWrapper>
                <DeleteButton
                  selected={false}
                  onPress={() => onDelete(activeIndex)}
                >
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
