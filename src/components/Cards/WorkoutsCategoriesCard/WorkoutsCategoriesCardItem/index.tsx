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
  return (
    <Container>
      <TouchableOpacity onPress={() => handleNextStep(data)}>
        <ContainerGradient colors={[]}>
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
                  width: 144,
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
                {/*     <WorkoutCategoryTotalWorkouts>
                    {data?.workoutCategoryTotalWorkouts}
                  </WorkoutCategoryTotalWorkouts> */}
              </InfoWrapper>
            </InfoAndButtonWrapper>
          </InfoAndButtonAndBottomLineWrapper>
        </ContainerGradient>
      </TouchableOpacity>
    </Container>
  )
}
