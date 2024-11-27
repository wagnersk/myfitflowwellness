import React from 'react'
import Forward from '../../../assets/Forward.svg'

import { TouchableOpacityProps } from 'react-native-gesture-handler'

import { Image } from 'expo-image'

import {
  Container,
  ContentWrapper,
  InfoAndButtonWrapper,
  InfoWrapper,
  Title,
  WorkoutCardForwardButton,
  ContainerGradient,
  PhotoImageWrapper,
  PhotoPreLoadingImageBackground,
  SubTitle,
  TopContent,
  BottomContent,
  SubTittleWrapper,
} from './styles'

import { getTrimmedName } from '@utils/getTrimmedName'
import { SignInProps } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'

interface Props extends TouchableOpacityProps {
  photoBase64?: string
  name: string
  age?: number
  whatsapp: string
  experienceTime?: number
  email: string
  restrictions: string
  handleNextStep: () => void
}

export function UserProfileCard({
  photoBase64,
  name,
  age,
  whatsapp,
  experienceTime,
  email,
  restrictions,
  handleNextStep,
  ...rest
}: Props) {
  const size = 120
  const getFormattedImage = (base64Image?: string) => {
    if (base64Image && !base64Image.startsWith('data:image')) {
      return `data:image/jpeg;base64,${base64Image}`
    }
    return base64Image
  }

  return (
    <Container {...rest} onPress={() => handleNextStep()}>
      <ContainerGradient colors={[]}>
        <PhotoImageWrapper size={size}>
          <PhotoPreLoadingImageBackground size={size} />
          {photoBase64 && (
            <Image
              source={{
                uri: getFormattedImage(photoBase64) || '',
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

        <ContentWrapper>
          <InfoWrapper>
            <TopContent>
              <Title>
                {getTrimmedName(20, name)}, {age}
              </Title>
            </TopContent>
            <BottomContent>
              <SubTittleWrapper>
                <SubTitle>{whatsapp}</SubTitle>
              </SubTittleWrapper>
              <SubTittleWrapper>
                <SubTitle>
                  {experienceTime} {experienceTime && 'anos de experiencia'}
                </SubTitle>
              </SubTittleWrapper>
              <SubTittleWrapper>
                <SubTitle>{getTrimmedName(25, email)}</SubTitle>
              </SubTittleWrapper>
            </BottomContent>
          </InfoWrapper>

          <WorkoutCardForwardButton>
            <Forward width={36} height={36} stroke="#1B077F" />
          </WorkoutCardForwardButton>
        </ContentWrapper>
      </ContainerGradient>
    </Container>
  )
}
