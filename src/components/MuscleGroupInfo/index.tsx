import React from 'react'

import {
  Container,
  Title,
  BorderWrapper,
  TitleWrapper,
  InfoWrapper,
  EquipamentItens,
  EquipamentWrapper,
} from './styles'

interface Props {
  musclGroups?: string
}

export function MuscleGroupInfo({ musclGroups }: Props) {
  return (
    <Container>
      <BorderWrapper>
        <TitleWrapper>
          <Title>Grupos Musculares </Title>
        </TitleWrapper>

        <EquipamentWrapper>
          {/* {weightLabel && ( */}
          <>
            <InfoWrapper>
              <EquipamentItens>{musclGroups}</EquipamentItens>
            </InfoWrapper>
          </>
        </EquipamentWrapper>
      </BorderWrapper>
    </Container>
  )
}
