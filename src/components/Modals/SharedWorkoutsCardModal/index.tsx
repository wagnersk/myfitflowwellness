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
  const {
    updateUserWorkoutCache,
    cachedUserWorkoutsLog,
    getLastUpdatedAtUserWorkoutCache,
  } = useAuth()

  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [workoutData, setWorkoutData] = useState<IWorkoutLog | null>(null)

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
  function syncronizePersonalizedWorkoutData() {
    if (!data.id) return
    if (!lastUpdated) return
    if (!workoutData) return

    if (workoutData.updatedAt >= lastUpdated) {
      console.log(
        `Entrou em minha data eh maior que a do site`,
        workoutData.updatedAt,
      )

      updateUserWorkoutCache(workoutData, workoutData.updatedAt)
      setLastUpdated(workoutData.updatedAt)
    }

    if (workoutData.updatedAt < lastUpdated) {
      console.log(
        `Entrou em minha data eh menor que a do site`,
        workoutData.updatedAt,
      )
    }

    if (workoutData.updatedAt === lastUpdated) {
      console.log(
        `Entrou em minha data eh igual que a do site`,
        workoutData.updatedAt,
      )
    }
  }
  /* 

compartilhar treino whatspp - gerar qrcode

cancelar compartilhamento

*/
  function formatTimestampToDate(timestamp: number | null): string {
    if (!timestamp) return ''
    const date = new Date(timestamp)

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  useEffect(() => {
    start()

    async function start() {
      const lastUpdatedValue = await getLastUpdatedAtUserWorkoutCache(data.id)
      if (!lastUpdatedValue) return

      const timestamp = convertToTimestamp(
        lastUpdatedValue.nanoseconds,
        lastUpdatedValue.seconds,
      )
      setLastUpdated(timestamp)
    }
    function convertToTimestamp(nanoseconds: number, seconds: number): number {
      return seconds * 1000 + Math.floor(nanoseconds / 1000000)
    }
  }, [data.id])

  useEffect(() => {
    if (!cachedUserWorkoutsLog) return
    const getIt = cachedUserWorkoutsLog.workoutsLog.find(
      (v) => v.workoutId === data.id,
    )

    setWorkoutData(getIt || null)

    console.log(`useEffect -> timestamp -> `)
  }, [cachedUserWorkoutsLog])
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
                <ButtonsWrapper>
                  {workoutData && lastUpdated ? (
                    <SubTitteContainer>
                      <SubTitteTextWrapper>
                        <SubTitteText>
                          Local - {formatTimestampToDate(workoutData.updatedAt)}
                        </SubTitteText>
                        <SubTitteText>
                          Servidor - {formatTimestampToDate(lastUpdated)}
                        </SubTitteText>
                      </SubTitteTextWrapper>

                      <BlurIconViewWrapper
                        disabled={false}
                        intensity={50}
                        tint="light"
                      >
                        <ActButton
                          disabled={workoutData?.updatedAt === lastUpdated}
                          onPress={syncronizePersonalizedWorkoutData}
                        >
                          <Arrow width={30} height={30} fill={'white'} />
                        </ActButton>
                      </BlurIconViewWrapper>
                    </SubTitteContainer>
                  ) : (
                    <SubTitteText>Treino ainda não iniciado.</SubTitteText>
                  )}
                </ButtonsWrapper>
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
