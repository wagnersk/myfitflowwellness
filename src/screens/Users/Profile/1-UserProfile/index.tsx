import React, { useCallback } from 'react'
import { Alert, ImageBackground, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle, StatusBar } from 'expo-status-bar'

import { SettingsButton } from '@components/Buttons/SettingsButton'
import { Photo } from '@components/Photo'
import Whatsapp from '@assets/Whatsapp.svg'

import backgroundImg from '../../../../../assets/back.png'
import { useAuth } from '@hooks/auth'
import { differenceInYears } from 'date-fns'

import {
  Container,
  BodyImageWrapper,
  ImageBackgroundContainer,
  Body,
  SettingsWrapper,
  ProfileWrapper,
  UserNameWrapper,
  UserName,
  ProfileInfoWrapper,
  Title,
  ProfileInfoText,
  ProfileInfoDivisor,
  PhotoBorderWrapper,
  LabelWrapper,
  Label,
} from './styles'
import { getTranslatedFiltersOfWorkout } from '@utils/getTranslatedFiltersOfWorkout'
import { IEquipamentsFilters } from '@hooks/authTypes'

export interface IptBrUs {
  'pt-br': string
  us: string
}

export function UserProfile() {
  const { user } = useAuth()
  const navigation = useNavigation()
  const selectedLanguage = user?.selectedLanguage

  function handleNextStep() {
    navigation.navigate('userSelectEditHomeProfile')
  }

  function diffInAge(data?: string) {
    if (!data) return
    const [dia, mes, ano] = data.split('/').map(Number)
    const nascimento = new Date(ano, mes - 1, dia) // Meses em JavaScript começam do 0
    const idadeCalculada = differenceInYears(new Date(), nascimento)
    return idadeCalculada
  }

  const userAge = diffInAge(user?.birthdate)
  const experienceTime = diffInAge(user?.whenStartedAtGym)

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
      setStatusBarStyle('dark')
    }, []),
  )

  let equipmentFilters: IEquipamentsFilters | undefined

  if (
    user &&
    user.freeData &&
    user.freeData.data &&
    user.freeData.data.barSelectData &&
    user.pulleyData &&
    user.pulleyData.data &&
    user.machineData &&
    user.machineData.data
  ) {
    equipmentFilters = {
      bar: user.freeData.data.barSelectData.map((item) => item.bar_insensitive),
      bench: user.freeData.data.benchSelectData.map(
        (item) => item.bench_insensitive,
      ),
      machine: user.machineData.data.machineSelectData.map(
        (item) => item.machine_insensitive,
      ),
      other: user.freeData.data.otherSelectData.map(
        (item) => item.other_insensitive,
      ),
      pulley: user.pulleyData.data.pulleySelectData.map(
        (item) => item.pulley_insensitive,
      ),
      pulleyHandles: user.pulleyData.data.pulleyHandlerSelectData.map(
        (item) => item.pulleyHandler_insensitive,
      ),
      weight: user.freeData.data.weightSelectData.map(
        (item) => item.weight_insensitive,
      ),
    }
  }
  const auxDataUnicFiltersText =
    user && selectedLanguage
      ? getTranslatedFiltersOfWorkout(equipmentFilters, selectedLanguage)
      : []

  const formattedMuscleFocus =
    user &&
    selectedLanguage &&
    user.muscleFocus &&
    user.muscleFocus.muscleSelectedData &&
    user.muscleFocus.muscleSelectedData.reduce(
      (acc: string, curr: any, index: number) => {
        const muscleUs = curr?.[selectedLanguage] // Acessando diretamente o SELECTEDLANGUAGE
        return muscleUs ? acc + (index > 0 ? ', ' : '') + muscleUs : acc
      },
      '',
    )

  const formattedGoal =
    user &&
    selectedLanguage &&
    user.goal &&
    user.goal.goalSelectedData &&
    user.goal.goalSelectedData[selectedLanguage]
      ? user.goal.goalSelectedData[selectedLanguage].charAt(0).toUpperCase() +
        user.goal.goalSelectedData[selectedLanguage].slice(1)
      : ''

  const formattedFrequencyByWeek =
    user &&
    selectedLanguage &&
    user.sessionsByWeek &&
    user.sessionsByWeek.sessionsByWeekSelectedData &&
    user.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      ? user.sessionsByWeek.sessionsByWeekSelectedData[selectedLanguage]
      : ''

  const formattedTimeBySession =
    user &&
    selectedLanguage &&
    user.timeBySession &&
    user.timeBySession.timeBySessionSelectedData &&
    user.timeBySession.timeBySessionSelectedData[selectedLanguage] &&
    user.timeBySession.timeBySessionSelectedData[selectedLanguage]
      ? user.timeBySession.timeBySessionSelectedData[selectedLanguage]
      : ''

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        style="dark"
        translucent
        animated
      />

      <BodyImageWrapper>
        <ImageBackground
          source={backgroundImg}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <ImageBackgroundContainer>
            <SettingsWrapper>
              <SettingsButton onPress={handleNextStep} />
            </SettingsWrapper>

            <ProfileWrapper>
              <PhotoBorderWrapper>
                <Photo defaultPhotoBase64={user?.photoBase64} />
              </PhotoBorderWrapper>

              <UserNameWrapper>
                <UserName>
                  {user?.name}, {userAge}
                </UserName>
              </UserNameWrapper>
            </ProfileWrapper>

            <Body>
              <ProfileInfoWrapper>
                <Title>Objetivo:</Title>
                <ProfileInfoText>
                  {formattedGoal}
                  {formattedGoal && ', '}
                  {formattedMuscleFocus && 'foco em: '}
                  {formattedMuscleFocus}
                </ProfileInfoText>
                <ProfileInfoDivisor />

                <Title>Tempo de treino: </Title>
                <ProfileInfoText>
                  {experienceTime} {experienceTime && 'anos'}
                </ProfileInfoText>
                <ProfileInfoDivisor />

                <Title>Academia:</Title>
                <ProfileInfoText>{user && user.gym}</ProfileInfoText>
                <ProfileInfoDivisor />

                <Title>Por semana: </Title>
                <ProfileInfoText>
                  {formattedFrequencyByWeek || ''}
                  {formattedFrequencyByWeek && ' de '}
                  {formattedTimeBySession || ''}
                  {formattedTimeBySession && ' cada'}
                </ProfileInfoText>
                <ProfileInfoDivisor />

                <Title>Anabolizante:</Title>
                <ProfileInfoText>
                  {user && user.anabol ? user.anabol : 'Nenhum'}
                </ProfileInfoText>
                <ProfileInfoDivisor />

                <Title>Restrições:</Title>
                <ProfileInfoText>
                  {user && user.restrictions ? user.restrictions : 'Nenhuma'}
                </ProfileInfoText>
                <ProfileInfoDivisor />
                <Title>Equipamentos disponíveis:</Title>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  {auxDataUnicFiltersText.map((val, i) => {
                    return (
                      <LabelWrapper key={i}>
                        {val.data.length > 0 &&
                          val.data.map((_val, _i) => {
                            if (_val.value) {
                              return (
                                <LabelWrapper key={_i}>
                                  <Label>
                                    {_val.key}: {_val.value}
                                  </Label>
                                </LabelWrapper>
                              )
                            } else {
                              return null
                            }
                          })}
                      </LabelWrapper>
                    )
                  })}
                </View>
              </ProfileInfoWrapper>
            </Body>
          </ImageBackgroundContainer>
        </ImageBackground>
      </BodyImageWrapper>
    </Container>
  )
}
