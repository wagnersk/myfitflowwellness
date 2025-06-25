import React from 'react'
import Forward from '../../../assets/Forward.svg'

import { TouchableOpacityProps, View } from 'react-native'
import { Image } from 'expo-image'

import {
  Container,
  ContainerGradient,
  ImageWrapper,
  InfoWrapper,
  WorkoutCardName,
  WorkoutCardRepeatAndQuantityWrapper,
  WorkoutCardRepeatAndQuantity,
  WorkoutMuscleGroupWrapper,
  WorkoutMuscleGroup,
  WorkoutCardForwardButton,
  WorkoutMuscleGroupRowWrapper,
} from './styles'
import { getTrimmedName } from '@utils/getTrimmedName'
import { IFormattedCardExerciseData } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'

interface Props extends TouchableOpacityProps {
  item: IFormattedCardExerciseData

  index: number
  isEnd: boolean
}

export function WorkoutCardItem({ item, index, isEnd, ...rest }: Props) {
  const { user } = useAuth()

  const selectedLanguage = user?.selectedLanguage
  return (
    <Container index={index} isEnd={isEnd} activeOpacity={1} {...rest}>
      <ContainerGradient
        colors={['#000000', '#FFFFFF']}
        index={index}
        isEnd={isEnd}
      >
        <ImageWrapper>
          {item.workoutExerciseThumbnailUrl && (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 6,
                  }}
                  source={{ uri: item.workoutExerciseThumbnailUrl }}
                  contentFit="cover"
                  cachePolicy={'memory-disk'}
                  alt=""
                />
              </View>
            </>
          )}
        </ImageWrapper>
        <InfoWrapper>
          <WorkoutCardName>
            {item &&
              selectedLanguage &&
              item.workoutExerciseName &&
              getTrimmedName(27, item.workoutExerciseName[selectedLanguage])}
          </WorkoutCardName>
          <WorkoutCardRepeatAndQuantityWrapper>
            <WorkoutCardRepeatAndQuantity>
              {item?.workoutExerciseSets &&
                `${item.workoutExerciseSets.length}x -> ${item.workoutExerciseSets
                  .map((set) =>
                    set.repetitionData
                      ?.map((rep) => rep.sets_insensitive)
                      .join('-'),
                  )
                  .join(', ')}`}
              {/*  
              
              {item &&
                selectedLanguage &&
                !item.workoutExerciseSets &&
                item.workoutExerciseInfo &&
                getTrimmedName(23, item.workoutExerciseInfo[selectedLanguage])} */}
            </WorkoutCardRepeatAndQuantity>
            <WorkoutMuscleGroupRowWrapper>
              <WorkoutMuscleGroupWrapper>
                <WorkoutMuscleGroup>
                  {item &&
                    selectedLanguage &&
                    item.workoutExerciseMuscleGroup &&
                    item.workoutExerciseMuscleGroup[selectedLanguage]}
                </WorkoutMuscleGroup>
              </WorkoutMuscleGroupWrapper>
            </WorkoutMuscleGroupRowWrapper>
          </WorkoutCardRepeatAndQuantityWrapper>
        </InfoWrapper>
        <WorkoutCardForwardButton>
          <Forward width={36} height={36} stroke="#1B077F" />
        </WorkoutCardForwardButton>
      </ContainerGradient>
    </Container>
  )
}
