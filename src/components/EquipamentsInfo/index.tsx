import React from 'react'

import {
  Container,
  Title,
  Description,
  BorderWrapper,
  TitleWrapper,
  InfoWrapper,
  EquipamentTitle,
  EquipamentItens,
  FreeStyleWrapper,
  PoliaStyleWrapper,
  MachineStyleWrapper,
} from './styles'

interface Props {
  pulley?: string
  pulleyHandles?: string
  barLabel?: string
  benchLabel?: string
  machineLabel?: string
  otherLabel?: string
  weightLabel?: string
}

export function EquipamentsInfo({
  pulley,
  pulleyHandles,
  barLabel,
  benchLabel,
  machineLabel,
  otherLabel,
  weightLabel,
}: Props) {
  return (
    <Container>
      <BorderWrapper>
        <TitleWrapper>
          <Title>Equipamentos</Title>
        </TitleWrapper>

        <FreeStyleWrapper>
          {weightLabel && (
            <InfoWrapper>
              <EquipamentTitle>Pesos: </EquipamentTitle>
              <EquipamentItens>{weightLabel}</EquipamentItens>
            </InfoWrapper>
          )}
          {barLabel && (
            <InfoWrapper>
              <EquipamentTitle>Barras: </EquipamentTitle>
              <EquipamentItens>{barLabel}</EquipamentItens>
            </InfoWrapper>
          )}

          {benchLabel && (
            <InfoWrapper>
              <EquipamentTitle>Bancos: </EquipamentTitle>
              <EquipamentItens>{benchLabel}</EquipamentItens>
            </InfoWrapper>
          )}
          {otherLabel && (
            <InfoWrapper>
              <EquipamentTitle>Outros: </EquipamentTitle>
              <EquipamentItens>{otherLabel}</EquipamentItens>
            </InfoWrapper>
          )}
        </FreeStyleWrapper>

        <PoliaStyleWrapper>
          {pulley && (
            <InfoWrapper>
              <EquipamentTitle>Pulley: </EquipamentTitle>
              <EquipamentItens>{pulley}</EquipamentItens>
            </InfoWrapper>
          )}
          {pulleyHandles && (
            <InfoWrapper>
              <EquipamentTitle>Puxadores do pulley: </EquipamentTitle>
              <EquipamentItens>{pulleyHandles}</EquipamentItens>
            </InfoWrapper>
          )}
        </PoliaStyleWrapper>
        <MachineStyleWrapper>
          {machineLabel && (
            <InfoWrapper>
              <EquipamentTitle>Máquinas: </EquipamentTitle>
              <EquipamentItens>{machineLabel}</EquipamentItens>
            </InfoWrapper>
          )}
        </MachineStyleWrapper>
      </BorderWrapper>
    </Container>
  )
}
