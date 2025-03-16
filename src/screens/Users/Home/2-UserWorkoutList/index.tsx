import React, { useCallback } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from 'styled-components/native'
import { useAuth } from '@hooks/auth'

import { setStatusBarStyle } from 'expo-status-bar'

import { useNavigation } from '@react-navigation/core'
import { useFocusEffect, useRoute } from '@react-navigation/native'

import { CTAButton } from '@components/Buttons/CTAButton'
import { BackButton } from '@components/Buttons/BackButton'
import { HeaderImageBackground } from '@components/ImageBackgrounds/HeaderImageBackground'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'
import { WorkoutCardList } from '@components/WorkoutCard/WorkoutCardList'

import {
  Container,
  BioInfoWrapper,
  BioInfoLetter,
  BioInfo,
  BioInfoName,
  BodyImageContainer,
  Warning,
  WarningWrapper,
  BodyImageBackgroundContainerSpaceBetween,
  BlurViewWrapper,
} from './styles'
import {
  NavigationUserWorkoutListProps,
  WorkoutDataWithSelectedWorkout,
} from '@src/@types/navigation'
import { getTrimmedName } from '@utils/getTrimmedName'
import { ICardExerciseData, IptBrUs } from '@hooks/authTypes'

export function UserWorkoutList() {
  const { isWaitingApiResponse, user } = useAuth()

  const selectedLanguage = user?.selectedLanguage
  const navigation = useNavigation()
  const theme = useTheme()
  const route = useRoute()

  const { workoutId, data, workoutLength, cardIndex } =
    route.params as NavigationUserWorkoutListProps

  let muscleGroupsLabel = ''

  const letter = String.fromCharCode(65 + cardIndex)
  getFormattedNames(data.cardExerciseUniquesMuscles)

  function getFormattedNames(muscles: IptBrUs[]) {
    const selectedLanguage = user?.selectedLanguage
    if (selectedLanguage === undefined) return

    muscleGroupsLabel = muscles.reduce((acc, item, index) => {
      return acc + (index > 0 ? ', ' : '') + item[selectedLanguage]
    }, '')
  }

  function handleNextScreen(selectedData?: ICardExerciseData) {
    if (!selectedData) return

    const workoutDataWithSelectedWorkout: WorkoutDataWithSelectedWorkout = {
      workoutId,
      data,
      workoutLength,
      selectedWorkoutExerciseIndex: selectedData?.workoutExerciseIndex,
      muscleGroupsLabel,
      letter,
      cardIndex,
    }

    navigation.navigate('userWorkout', workoutDataWithSelectedWorkout)
  }

  function handleGoBack() {
    navigation.getParent()!.setOptions({ tabBarStyle: { display: 'flex' } })
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()!.setOptions({ tabBarStyle: { display: 'none' } })
      setStatusBarStyle('light')
    }, []),
  )

  return (
    <Container>
      <HeaderImageBackground>
        <BioInfoWrapper>
          <BackButton
            onPress={handleGoBack}
            style={{ position: 'absolute', left: 32, bottom: 32 }}
          />
          <BioInfo>
            <BioInfoLetter>
              {user?.selectedLanguage === 'pt-br'
                ? `Treino ${letter}`
                : `Workout ${letter}`}
            </BioInfoLetter>

            <BioInfoName>{getTrimmedName(26, muscleGroupsLabel)}</BioInfoName>
          </BioInfo>
        </BioInfoWrapper>
      </HeaderImageBackground>
      <BodyImageContainer>
        <BodyImageBackground />
        <BodyImageBackgroundContainerSpaceBetween>
          <WarningWrapper>
            <Warning></Warning>
          </WarningWrapper>
          {isWaitingApiResponse ? (
            <ActivityIndicator color={theme.COLORS.BLUE_STROKE} />
          ) : (
            data &&
            data.cardExerciseData && (
              <WorkoutCardList
                data={data.cardExerciseData}
                handleNextStep={handleNextScreen}
              />
            )
          )}
          <View
            style={{
              width: '100%',
              marginTop: 12,
              marginBottom: 32,
              paddingLeft: 32,
              paddingRight: 32,
            }}
          >
            <CTAButton
              onPress={handleNextScreen}
              changeColor={true}
              title={
                user?.selectedLanguage === 'pt-br'
                  ? 'Começar Treino'
                  : 'Start Workout'
              }
            />
          </View>
        </BodyImageBackgroundContainerSpaceBetween>
      </BodyImageContainer>
    </Container>
  )
}
