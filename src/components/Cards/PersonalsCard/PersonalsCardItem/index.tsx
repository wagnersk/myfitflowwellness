import React from 'react'
import Forward from '../../../../assets/Forward.svg'
import { TouchableOpacityProps, View } from 'react-native'
import { Image } from 'expo-image'

import {
  Container,
  ContentWrapper,
  InfoWrapper,
  Title,
  WorkoutCardForwardButton,
  ContainerGradient,
  PhotoImageWrapper,
  PhotoPreLoadingImageBackground,
  SubTitle,
  SubTitle2,
  TopContent,
  BottomContent,
} from './styles'

import { getTrimmedName } from '@utils/getTrimmedName'
import { IPersonal } from '@hooks/authTypes'
import { useAuth } from '@hooks/auth'
import { reduceJoinArray } from '@utils/reduceJoinArray'

interface Props extends TouchableOpacityProps {
  data: IPersonal
  handleNextStep: (data: IPersonal) => void
}

export function PersonalsCardItem({ data, handleNextStep, ...rest }: Props) {
  const size = 120

  const formattedKeywords = reduceJoinArray(data.keywords)

  const { user, contract } = useAuth()
  return (
    <Container {...rest} onPress={() => handleNextStep(data)}>
      <ContainerGradient colors={[]}>
        <PhotoImageWrapper size={size}>
          <PhotoPreLoadingImageBackground size={size} />
          {data && data.photo && (
            <Image
              source={{
                uri: data.photo,
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
                {getTrimmedName(20, data && data.name && data.name)}, {data.age}
              </Title>

              <SubTitle2>Personal Trainer</SubTitle2>
            </TopContent>
            <BottomContent>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingTop: 8,
                }}
              >
                <SubTitle>{formattedKeywords}</SubTitle>
              </View>
            </BottomContent>
          </InfoWrapper>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingTop: 8,
              bottom: 2,
              left: 6,
              position: 'absolute',
              width: '100%',
            }}
          >
            <View>
              <SubTitle>
                {contract?.submissionPending &&
                  data.personalTrainerContractId ===
                    user?.personalTrainerContractId &&
                  'Convite enviado'}
              </SubTitle>
            </View>
          </View>

          <WorkoutCardForwardButton>
            <Forward width={36} height={36} stroke="#1B077F" />
          </WorkoutCardForwardButton>
        </ContentWrapper>
      </ContainerGradient>
    </Container>
  )
}
