import React, { useState, useRef, useMemo, useCallback } from 'react'
import {
  useWindowDimensions,
  FlatList,
  ViewToken,
  Platform,
  ScrollView,
} from 'react-native'

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
  IosBackgroundBlurViewTipsWrapper,
  AndroidBackgroundTipsWrapper,
  TipsTitleWrapper,
  TipsTextWrapper,
  TipsTitle,
  TipsWrapper,
  TipsText,
  OpacityBackgroundPositionAbsolute,
  ContentWrapper,
} from './styles'

import { setStatusBarStyle } from 'expo-status-bar'
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
  const selectedLanguage = user?.selectedLanguage
  const route = useRoute()
  const {
    workoutId,
    data,
    // workoutLength,
    // selectedWorkoutExerciseIndex,

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
        console.log('item', JSON.stringify(item, null, 2))
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
              keyExtractor={(item) => String(item.workoutExerciseIndex)}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <WorkoutVideoCard
                    item={item} // workoutExerciseId
                    exerciseIndex={index} // Supino reto.... exercicios
                    workoutCardIndex={cardIndex}
                    workoutId={workoutId}
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
              initialNumToRender={3} // TESTE:  Número inicial de itens a serem renderizados
              maxToRenderPerBatch={5} // TESTE:  Número máximo de itens a serem renderizados por lote
              windowSize={10} // TESTE:  Número de itens a serem mantidos na lista virtualizada
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
