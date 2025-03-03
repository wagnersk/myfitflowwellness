import React, { useState } from 'react'
import ShareNetwork from '@assets/Share-network.svg'
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
  ShareIconWrapper,
  GenderIconWrapper,
  SyncText,
  SubTittleWrapper,
} from './styles'

import { getTrimmedName } from '@utils/getTrimmedName'
import { getGenderIcon } from '@utils/getGenderIcon'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { getIcon } from '@utils/getIcon'
import { IMyfitflowWorkoutInUseData, IMyWorkouts } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'
import { formatTimestampToDDMMYYYY } from '@utils/calculeEndDateWithWeeks'

interface Props extends TouchableOpacityProps {
  data: IMyfitflowWorkoutInUseData | null
  handleNextStep: (index: number) => void
  index: number
  dateStart: number
  dateEnd: number
  isActive: boolean
}
export function ItemCard({
  data,
  handleNextStep,
  index,
  isActive,
  dateStart,
  dateEnd,
  ...rest
}: Props) {
  const size = 80
  const { user, myWorkout } = useAuth()
  const selectedLanguage = user?.selectedLanguage

  function getColor(data) {
    if (!data) return 'red'
    switch (true) {
      case isActive:
        return 'green'
      case data.isInUse:
        return 'yellow'
      default:
        return 'red'
    }
  }
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
              <SubTittleWrapper>
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
                    data.data.workoutPeriod.period_insensitive[
                      selectedLanguage
                    ]}
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

                {/* todo renderizar apenas no active , ver onde melhor no layout  */}
                {dateEnd && dateStart && (
                  <SubTitle>
                    {formatTimestampToDDMMYYYY(dateStart)} -{' '}
                    {formatTimestampToDDMMYYYY(dateEnd)}
                  </SubTitle>
                )}
              </SubTittleWrapper>
            </InfoWrapper>

            <GenderIconWrapper>
              {data && data.data.workoutGender && selectedLanguage && (
                <WorkoutBoxInfo
                  size={12}
                  icon={getIcon(
                    getGenderIcon(data.data.workoutGender[selectedLanguage]),
                  )}
                />
              )}
            </GenderIconWrapper>

            <ActiveBall color={getColor(data)} />
            <ShareIconWrapper>
              <ShareNetwork height={12} width={12} />
            </ShareIconWrapper>

            {/* 
            <WorkoutCardForwardButton>
              <Forward width={36} height={36} stroke="#1B077F" />
            </WorkoutCardForwardButton> */}
          </InfoAndButtonWrapper>
        </InfoAndButtonAndBottomLineWrapper>
      </ContainerGradient>
    </Container>
  )
}
