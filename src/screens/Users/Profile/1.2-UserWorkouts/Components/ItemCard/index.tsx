import React from 'react'
import ShareNetwork from '@assets/Share-network.svg'
import { TouchableOpacityProps } from 'react-native'
import { Image } from 'expo-image'

import {
  Container,
  InfoAndButtonAndBottomLineWrapper,
  InfoAndButtonWrapper,
  InfoWrapper,
  Title,
  ContainerGradient,
  PhotoImageWrapper,
  PhotoPreLoadingImageBackground,
  SubTitle,
  ActiveBall,
  ShareIconWrapper,
  GenderIconWrapper,
  SubTittleWrapper,
  ButtonsContainer,
  MoveCardUpButton,
  MoveCardDownButton,
} from './styles'

import { getTrimmedName } from '@utils/getTrimmedName'
import { getGenderIcon } from '@utils/getGenderIcon'
import { WorkoutBoxInfo } from '@components/WorkoutBoxInfo'
import { getIcon } from '@utils/getIcon'
import { IMyfitflowWorkoutInUseData } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'
import { formatTimestampToDDMMYYYY } from '@utils/calculeEndDateWithWeeks'

import ArrowUp from '@assets/Arrow-fat-up.svg'
import ArrowDown from '@assets/Arrow-fat-down.svg'
/*  
            isActive={data?.isActive}
            isExpired={data?.isExpired}
             */
interface Props extends TouchableOpacityProps {
  data: IMyfitflowWorkoutInUseData | null
  handleNextStep: () => void
  isActive: boolean
  isExpired: boolean
  dateStart?: number
  firstElement?: boolean
  secondElement?: boolean
  lastElement?: boolean
  dateEnd?: number
  handleMoveUp: (id: string) => void
  handleMoveDown: (id: string) => void
  isOpenSettingsMode?: boolean
}
export function ItemCard({
  data,
  handleNextStep,
  isActive,
  isExpired,
  dateStart,
  dateEnd,
  handleMoveUp,
  handleMoveDown,
  isOpenSettingsMode,
  firstElement,
  secondElement,
  lastElement,
  ...rest
}: Props) {
  const size = 80
  const { user } = useAuth()
  const selectedLanguage = user?.selectedLanguage

  function getColor(data: IMyfitflowWorkoutInUseData | null) {
    if (!data) return 'red'
    switch (true) {
      case isActive:
        return 'green'
      case isExpired:
        return 'yellow'
      default:
        return 'red'
    }
  }
  return (
    <Container
      {...rest}
      onPress={() => handleNextStep()}
      disabled={isOpenSettingsMode}
    >
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

        <InfoAndButtonAndBottomLineWrapper
          isOpenSettingsMode={isOpenSettingsMode ?? false}
        >
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
                  {' - '}
                  {data &&
                    data.data.workoutPeriod &&
                    selectedLanguage &&
                    data.data.workoutPeriod.period_insensitive[
                      selectedLanguage
                    ]}
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
                  {' - '}(
                  {data &&
                    data.data.workoutDivision &&
                    data.data.workoutDivision.division}
                  )
                </SubTitle>
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
              {data?.isShared && <ShareNetwork height={12} width={12} />}
            </ShareIconWrapper>
          </InfoAndButtonWrapper>
        </InfoAndButtonAndBottomLineWrapper>

        {isOpenSettingsMode && !firstElement && (
          <ButtonsContainer>
            {!lastElement && (
              <MoveCardDownButton
                disabled={lastElement}
                onPress={() => data && handleMoveDown(data.id)}
              >
                <ArrowDown width={24} height={24} stroke={'white'} />
              </MoveCardDownButton>
            )}

            {!secondElement && (
              <MoveCardUpButton
                disabled={firstElement}
                onPress={() => data && handleMoveUp(data.id)}
              >
                <ArrowUp width={24} height={24} />
              </MoveCardUpButton>
            )}
          </ButtonsContainer>
        )}
      </ContainerGradient>
    </Container>
  )
}
