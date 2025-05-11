import React from 'react'
import { Image } from 'expo-image'

import { TouchableOpacity } from 'react-native'
import {
  Container,
  InfoAndButtonAndBottomLineWrapper,
  InfoAndButtonWrapper,
  InfoWrapper,
  WorkoutCategoryName,
  ContainerGradient,
  PhotoImageWrapper,
  PhotoPreLoadingImageBackground,
  WorkoutCategoryNameWrapper,
  CircleCounterWrapper,
  CircleCounter,
} from './styles'
import { useAuth } from '@hooks/auth'
import { IWorkoutCategory } from '@src/@types/navigation'

interface DataProps {
  data: IWorkoutCategory
  handleNextStep: (data: IWorkoutCategory) => void
}
export function WorkoutsCategoriesCardItem({
  data,
  handleNextStep,
}: DataProps) {
  const { user } = useAuth()
  const selectedLanguage = user?.selectedLanguage
  const isAnonymousUser = !!user?.anonymousUser

  return (
    <Container>
      <CircleCounterWrapper>
        <CircleCounter>{data?.total}</CircleCounter>
      </CircleCounterWrapper>
      <TouchableOpacity
        disabled={isAnonymousUser}
        onPress={() => handleNextStep(data)}
        style={{
          opacity: isAnonymousUser ? 0.3 : 1,
        }}
      >
        <ContainerGradient>
          <PhotoImageWrapper>
            <PhotoPreLoadingImageBackground />
            {data.workoutCategoryPhoto.workoutCategoryPhotoUrlDownload && (
              <Image
                source={{
                  uri: data.workoutCategoryPhoto
                    .workoutCategoryPhotoUrlDownload,
                }}
                alt=""
                contentFit="cover"
                style={{
                  width: 98,
                  height: 80,
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                  backgroundColor: `gray`,
                }}
                cachePolicy={'memory-disk'}
              />
            )}
          </PhotoImageWrapper>

          <InfoAndButtonAndBottomLineWrapper>
            <InfoAndButtonWrapper>
              <InfoWrapper>
                <WorkoutCategoryNameWrapper>
                  <WorkoutCategoryName>
                    {data &&
                      selectedLanguage &&
                      data.workoutCategoryName[selectedLanguage]}
                  </WorkoutCategoryName>
                </WorkoutCategoryNameWrapper>
              </InfoWrapper>
            </InfoAndButtonWrapper>
          </InfoAndButtonAndBottomLineWrapper>
        </ContainerGradient>
      </TouchableOpacity>
    </Container>
  )
}
