import React from 'react'
import { Image } from 'expo-image'

import { TouchableOpacity } from 'react-native'
import {
  Container,
  InfoAndButtonAndBottomLineWrapper,
  InfoAndButtonWrapper,
  InfoWrapper,
  WorkoutCategoryName,
  WorkoutCategoryTotalWorkouts,
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
  isGuestCategory: boolean
  handleNextStep: (data: IWorkoutCategory) => void
}
export function WorkoutsCategoriesCardItem({
  data,
  handleNextStep,
  isGuestCategory,
}: DataProps) {
  const { user } = useAuth()
  const selectedLanguage = user?.selectedLanguage
  const isAnonymousUser = !!user?.anonymousUser

  console.log(`isAnonymousUser`, isAnonymousUser)
  console.log(`isGuestCategory`, isGuestCategory)

  return (
    <Container>
      <CircleCounterWrapper>
        <CircleCounter>{data?.total}</CircleCounter>
      </CircleCounterWrapper>
      <TouchableOpacity
        disabled={isAnonymousUser && isAnonymousUser !== isGuestCategory}
        onPress={() => handleNextStep(data)}
        style={{
          opacity:
            isAnonymousUser && isAnonymousUser !== isGuestCategory ? 0.3 : 1,
        }}
      >
        <ContainerGradient colors={['#f8caca', '#FFFFFF']}>
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
                  width: 110,
                  height: 104,
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
