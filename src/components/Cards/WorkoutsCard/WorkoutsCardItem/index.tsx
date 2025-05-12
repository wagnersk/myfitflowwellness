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
  DateWrapper,
} from './styles'

import { getTrimmedName } from '@utils/getTrimmedName'
import { getGenderIcon } from '@utils/getGenderIcon'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { getIcon } from '@utils/getIcon'
import { IMyfitflowWorkoutInUse } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'
import { formatTimestampToDate } from '@utils/formatTimestampToDate'

interface Props extends TouchableOpacityProps {
  data: IMyfitflowWorkoutInUse | null
  handleNextStep: (data: IMyfitflowWorkoutInUse) => void
  index?: number
}

export function WorkoutsCardItem({
  data,
  handleNextStep,
  index,
  ...rest
}: Props) {
  const size = 100

  const { user, myWorkout } = useAuth()
  const selectedLanguage = user?.selectedLanguage

  let getMyWorkoutOrder
  if (myWorkout && myWorkout.data) {
    getMyWorkoutOrder = myWorkout.activeData.find(
      (workout) => workout.id === data?.workoutId,
    )
  }

  return (
    <Container {...rest} onPress={() => data && handleNextStep(data)}>
      <ContainerGradient colors={['#000000', '#FFFFFF']}>
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
                  (data &&
                    selectedLanguage &&
                    data.workoutName &&
                    data.workoutName[selectedLanguage]) ||
                    undefined,
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
              <DateWrapper>
                {getMyWorkoutOrder?.workoutStartAt === 0 &&
                  'Treino ainda não iniciado'}
                {/* 
                {getMyWorkoutOrder?.workoutStartAt !== 0 &&
                  index !== 0 &&
                  `${formatTimestampToDate(
                    getMyWorkoutOrder?.workoutStartAt ?? 0,
                  )} - ${formatTimestampToDate(
                    getMyWorkoutOrder?.workoutEndsAt ?? 0,
                  )}`} */}
              </DateWrapper>
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
