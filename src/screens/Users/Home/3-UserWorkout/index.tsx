import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { useWindowDimensions, FlatList, ViewToken } from 'react-native'

import { useNavigation } from '@react-navigation/core'
import { useFocusEffect, useRoute } from '@react-navigation/native'

import { BackButton } from '@components/Buttons/BackButton'
import { WorkoutVideoCard } from '@screens/Users/Home/3-UserWorkout/Components/WorkoutVideoCard'
import { BulletList } from '@components/Bullet/BulletList'

import { HeaderImageBackground } from '@components/ImageBackgrounds/HeaderImageBackground'
import { BodyImageBackground } from '@components/ImageBackgrounds/BodyImageBackground'

import {
  Container,
  BioInfoWrapper,
  BioInfoLetter,
  BioInfo,
  BioInfoName,
  BodyImageContainer,
  BodyImageBackgroundContainerSpaceBetween,
  FlatListWrapper,
} from './styles'

import { setStatusBarStyle, StatusBar } from 'expo-status-bar'
import { WorkoutDataWithSelectedWorkout } from '@src/@types/navigation'
import { getTrimmedName } from '@utils/getTrimmedName'
import { useAuth } from '@hooks/auth'
import { IPropsSets } from '@hooks/authTypes'

interface ChangeWorkoutCardProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function UserWorkout() {
  const { user } = useAuth()

  const route = useRoute()
  const {
    activeWorkoutId,
    activeWorkoutCreatedAt,

    activeWorkoutDataLength,
    data,
    // activeWorkoutDataLength,
    // selectedWorkoutExerciseIndex,
    selectedWorkoutExerciseIndex,
    muscleGroupsLabel,
    letter,
    cardIndex,
  } = route.params as WorkoutDataWithSelectedWorkout

  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  interface IStateCardSets {
    workoutCardIndex: number
    workoutExerciseSets: IPropsSets[]
  }
  const [workoutCardInfo, setWorkoutCardInfo] = useState<IStateCardSets | null>(
    null,
  )

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: ChangeWorkoutCardProps) => {
      viewableItems.forEach((item) => {
        setWorkoutCardInfo({
          workoutCardIndex: item.index ? item.index : 0,
          workoutExerciseSets: item.item.workoutExerciseSets,
        })
      })
    },
  )

  const snapToOffsetsArray = useMemo(() => {
    const CARDWIDTH = width * 0.8
    const MARGINBETWEENELEMENTS = 40

    return [...Array(data.cardExerciseData.length)].map(
      (_, item) =>
        item * (CARDWIDTH - MARGINBETWEENELEMENTS) +
        (item - 1) * MARGINBETWEENELEMENTS,
    )
  }, [])

  const flatListRef = useRef<FlatList>(null)

  function scrollToNextCard() {
    if (flatListRef.current) {
      const nextIndex = workoutCardInfo
        ? workoutCardInfo.workoutCardIndex + 1
        : 0
      if (nextIndex < data.cardExerciseData.length) {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true })
      }
    }
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

  if (workoutCardInfo) {
    //  console.log(workoutCardInfo)
  }

  function scrollToNextCard2(index: number) {
    if (flatListRef.current) {
      if (index >= 0 && index < data.cardExerciseData.length) {
        flatListRef.current.scrollToIndex({ index, animated: true })
      } else {
        console.warn('Índice fora do intervalo válido.')
      }
    }
  }
  useEffect(() => {
    // selectedWorkoutExerciseIndex\
    if (data.cardExerciseData.length > 0) {
      console.log(selectedWorkoutExerciseIndex)

      setTimeout(() => {
        scrollToNextCard2(selectedWorkoutExerciseIndex || 0)
      }, 1000) // Tenta novamente após um pequeno atraso
    }

    //
  }, [])

  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        style="light"
        translucent
        animated
      />
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
                : `Workout ${letter} `}
            </BioInfoLetter>
            <BioInfoName> {getTrimmedName(30, muscleGroupsLabel)}</BioInfoName>
          </BioInfo>
        </BioInfoWrapper>
      </HeaderImageBackground>
      <BodyImageContainer>
        <BodyImageBackground />
        <BodyImageBackgroundContainerSpaceBetween>
          <FlatListWrapper>
            <FlatList
              ref={flatListRef}
              horizontal
              data={data.cardExerciseData}
              keyExtractor={(item, _index) => String(_index)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <WorkoutVideoCard
                    item={item} // workoutExerciseId
                    exerciseIndex={index} // Supino reto.... exercicios
                    workoutCardIndex={cardIndex}
                    activeWorkoutId={activeWorkoutId}
                    activeWorkoutCreatedAt={activeWorkoutCreatedAt}
                    isFocused={workoutCardInfo?.workoutCardIndex === index}
                    scrollToNextCard={scrollToNextCard}
                  />
                )
              }}
              onViewableItemsChanged={onViewableItemsChanged.current}
              snapToAlignment={'start'}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToOffsets={snapToOffsetsArray}
              viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 50,
                minimumViewTime: 0,
              }}
            />
          </FlatListWrapper>
          {workoutCardInfo &&
            workoutCardInfo.workoutCardIndex !== undefined && (
              <BulletList
                data={data.cardExerciseData}
                workoutCardIndex={workoutCardInfo.workoutCardIndex}
              />
            )}
        </BodyImageBackgroundContainerSpaceBetween>
      </BodyImageContainer>
    </Container>
  )
}
