import React from 'react'
import Forward from '../../../../assets/Forward.svg'
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
  IconTopWrapper,
  IconBottomWrapper,
} from './styles'

import { getTrimmedName } from '@utils/getTrimmedName'
import { getGenderIcon } from '@utils/getGenderIcon'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { getIcon } from '@utils/getIcon'
import { IMyfitflowWorkoutInUse } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'

interface Props extends TouchableOpacityProps {
  data: IMyfitflowWorkoutInUse
  handleNextStep: (data: IMyfitflowWorkoutInUse) => void
}

export function WorkoutsCardItem({ data, handleNextStep, ...rest }: Props) {
  const size = 100

  const { user } = useAuth()
  const selectedLanguage = user?.selectedLanguage
  return (
    <Container {...rest} onPress={() => handleNextStep(data)}>
      <ContainerGradient colors={[]}>
        <PhotoImageWrapper size={size}>
          <PhotoPreLoadingImageBackground size={size} />
          {data && data.workoutCardPhoto && (
            <Image
              source={{
                uri: data.workoutCardPhoto.photoFilePath,
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
                  data &&
                    selectedLanguage &&
                    data.workoutName &&
                    data.workoutName[selectedLanguage],
                )}
              </Title>

              <SubTitle>
                {data &&
                  data.workoutLevel &&
                  selectedLanguage &&
                  data.workoutLevel[selectedLanguage]}
                {' - '}
                {data &&
                  data.workoutGoal &&
                  selectedLanguage &&
                  data.workoutGoal[selectedLanguage]}
              </SubTitle>

              <SubTitle>
                {data &&
                  data.workoutPeriod &&
                  selectedLanguage &&
                  data.workoutPeriod.period_insensitive[selectedLanguage]}
                {' - '}
                {data && data.workoutDivision && data.workoutDivision.division}
              </SubTitle>
              <SubTitle>
                {data &&
                  data.workoutByWeek &&
                  selectedLanguage &&
                  data.workoutByWeek.sessionsByWeek_insensitive &&
                  data.workoutByWeek.sessionsByWeek_insensitive[
                    selectedLanguage
                  ]}
                {' de '}

                {data &&
                  data.workoutTime &&
                  selectedLanguage &&
                  data.workoutTime.timeBySession_insensitive &&
                  getTrimmedName(
                    20,
                    data.workoutTime.timeBySession_insensitive[
                      selectedLanguage
                    ],
                  )}
              </SubTitle>
            </InfoWrapper>
            <IconTopWrapper>
              {data && data.workoutPlanType && (
                <WorkoutBoxInfo
                  size={20}
                  icon={getIcon(data.workoutPlanType)}
                />
              )}
            </IconTopWrapper>

            <IconBottomWrapper>
              {data && data.workoutGender && selectedLanguage && (
                <WorkoutBoxInfo
                  size={20}
                  icon={getIcon(
                    getGenderIcon(data.workoutGender[selectedLanguage]),
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
