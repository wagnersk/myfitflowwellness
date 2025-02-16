import React from 'react'

import {
  BlurViewWrapper,
  BorderWrapper,
  Container,
  ContainerGradient,
  Description,
  DescriptionWrapper,
  MusclesWrapper,
  Title,
  TitleWrapper,
} from './styles'
import { useTheme } from 'styled-components/native'
import PersonSimple from '../../assets/Person-simple.svg'
import { IptBrUs } from '@hooks/selectOptionsDataFirebaseTypes'

interface Props {
  data: IptBrUs[]
  selectedLanguage: 'pt-br' | 'us' | undefined
}

export function WorkoutMuscleComponent({ data, selectedLanguage }: Props) {
  const theme = useTheme()
  return (
    <Container>
      <BorderWrapper>
        <BlurViewWrapper intensity={100} tint="light">
          <Title>{selectedLanguage === 'pt-br' ? `Músculos` : `Muscles`}</Title>
        </BlurViewWrapper>
        <MusclesWrapper>
          {data
            .map((v) => v[selectedLanguage || 'us'])
            .sort((a, b) => a.localeCompare(b))
            .map((item, index) => (
              <DescriptionWrapper key={index}>
                <Description>• {item}</Description>
              </DescriptionWrapper>
            ))}
        </MusclesWrapper>
      </BorderWrapper>
    </Container>
  )
}
