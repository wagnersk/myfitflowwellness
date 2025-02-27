import React, { useState } from 'react'
import Forward from '@assets/Forward.svg'
import { TouchableOpacityProps } from 'react-native'
import { Image } from 'expo-image'

import {
  Container,
  InfoAndButtonAndBottomLineWrapper,
  InfoAndButtonWrapper,
  InfoWrapper,
  Title,
  WorkoutCardForwardButton,
  ContainerGradient,
  PhotoImageWrapper,
  PhotoPreLoadingImageBackground,
  SubTitle,
  IconBottomWrapper,
  ActiveBall,
} from './styles'

import { getTrimmedName } from '@utils/getTrimmedName'
import { getGenderIcon } from '@utils/getGenderIcon'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { getIcon } from '@utils/getIcon'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'

interface Props extends TouchableOpacityProps {
  data: IMyfitflowWorkoutInUseData | null
  handleNextStep: (index: number) => void
  index: number
  isActive: boolean
}

export function SharedWorkoutsCardItem({
  data,
  handleNextStep,
  index,
  isActive,
  ...rest
}: Props) {
  const size = 100
  const { user, myWorkout } = useAuth()
  const selectedLanguage = user?.selectedLanguage
  /* 

BOTAO SINCRONIZAR NO MODAL
BOTAO VER ALTERACOES DO ANTES E DEPOIS
BOTAO Q PEGA LINK PARA COPIAR OU GERAR QRCODE
ATIVAR PERSONALIZACAO OU NAO




EM ACTIVES EU VOU IDENTIFICAR O TREINO ESTA COM DATA ATIVA OU EXPIRADA
QUANDO EXPIRA VAI PRO FINAL DA FILA DOS EXPIRADOS

DA FILA DOS EXPIRADOS EU SELECIONO A DATA 

POSSO INSERIR NO COMECO DA FILA , NO FINAL
INSERIRR NO MEIO 


*/
  return (
    <Container {...rest} onPress={() => data && handleNextStep(index)}>
      <ContainerGradient colors={['#000000', '#FFFFFF']}>
        <PhotoImageWrapper size={size}>
          <PhotoPreLoadingImageBackground size={size} />
          {data && data.data.workoutCardPhoto && (
            <Image
              source={{
                uri: data.data.workoutCardPhoto.photoFilePath,
              }}
              alt=""
              contentFit="cover"
              style={{
                width: size,
                height: size,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                backgroundColor: `gray`,
              }}
              cachePolicy={'memory-disk'}
            />
          )}
        </PhotoImageWrapper>

        <InfoAndButtonAndBottomLineWrapper>
          <InfoAndButtonWrapper>
            <InfoWrapper>
              <Title>
                {getTrimmedName(
                  20,
                  (data &&
                    selectedLanguage &&
                    data.data.workoutName &&
                    data.data.workoutName[selectedLanguage]) ||
                    undefined,
                )}
              </Title>

              <SubTitle>
                {data &&
                  data.data.workoutLevel &&
                  selectedLanguage &&
                  data.data.workoutLevel[selectedLanguage]}
                {' - '}
                {data &&
                  data.data.workoutGoal &&
                  selectedLanguage &&
                  data.data.workoutGoal[selectedLanguage]}
              </SubTitle>

              <SubTitle>
                {data &&
                  data.data.workoutPeriod &&
                  selectedLanguage &&
                  data.data.workoutPeriod.period_insensitive[selectedLanguage]}
                {' - '}
                {data &&
                  data.data.workoutDivision &&
                  data.data.workoutDivision.division}
              </SubTitle>
              <SubTitle>
                {data &&
                  data.data.workoutByWeek &&
                  selectedLanguage &&
                  data.data.workoutByWeek.sessionsByWeek_insensitive &&
                  data.data.workoutByWeek.sessionsByWeek_insensitive[
                    selectedLanguage
                  ]}
                {' de '}

                {data &&
                  data.data.workoutTime &&
                  selectedLanguage &&
                  data.data.workoutTime.timeBySession_insensitive &&
                  getTrimmedName(
                    20,
                    data.data.workoutTime.timeBySession_insensitive[
                      selectedLanguage
                    ],
                  )}
              </SubTitle>
              <SubTitle>atualizado em FAZER AQUI </SubTitle>
            </InfoWrapper>

            <IconBottomWrapper>
              {data && data.data.workoutGender && selectedLanguage && (
                <WorkoutBoxInfo
                  size={20}
                  icon={getIcon(
                    getGenderIcon(data.data.workoutGender[selectedLanguage]),
                  )}
                />
              )}
            </IconBottomWrapper>
            <WorkoutCardForwardButton>
              <Forward width={36} height={36} stroke="#1B077F" />
            </WorkoutCardForwardButton>
          </InfoAndButtonWrapper>
        </InfoAndButtonAndBottomLineWrapper>
      </ContainerGradient>
    </Container>
  )
}
