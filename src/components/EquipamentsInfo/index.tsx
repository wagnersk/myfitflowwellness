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
  selectedLanguage: 'pt-br' | 'us' | undefined
}

export function EquipamentsInfo({
  pulley,
  pulleyHandles,
  barLabel,
  benchLabel,
  machineLabel,
  otherLabel,
  weightLabel,
  selectedLanguage,
}: Props) {
  return (
    <Container>
      <BorderWrapper>
        <TitleWrapper>
          <Title>
            {selectedLanguage === 'pt-br' ? `Equipamentos` : `Equipaments`}
          </Title>
        </TitleWrapper>

        <FreeStyleWrapper>
          {weightLabel && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Pesos' : 'Weights'}:
              </EquipamentTitle>
              <EquipamentItens>{weightLabel}</EquipamentItens>
            </InfoWrapper>
          )}
          {barLabel && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Barras' : 'Bars'}:
              </EquipamentTitle>
              <EquipamentItens>{barLabel}</EquipamentItens>
            </InfoWrapper>
          )}

          {benchLabel && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Outros' : 'Others'}:
              </EquipamentTitle>
              <EquipamentItens>{benchLabel}</EquipamentItens>
            </InfoWrapper>
          )}
          {otherLabel && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Pulley' : 'Pulley'}:
              </EquipamentTitle>
              <EquipamentItens>{otherLabel}</EquipamentItens>
            </InfoWrapper>
          )}
        </FreeStyleWrapper>

        <PoliaStyleWrapper>
          {pulley && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br'
                  ? 'Puxadores do pulley'
                  : 'Pulley handles'}
                :
              </EquipamentTitle>
              <EquipamentItens>{pulley}</EquipamentItens>
            </InfoWrapper>
          )}
          {pulleyHandles && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br'
                  ? 'Puxadores do pulley'
                  : 'Pulley handles'}
                :
              </EquipamentTitle>
              <EquipamentItens>{pulleyHandles}</EquipamentItens>
            </InfoWrapper>
          )}
        </PoliaStyleWrapper>
        <MachineStyleWrapper>
          {machineLabel && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Máquinas' : 'Machines'}:{' '}
              </EquipamentTitle>
              <EquipamentItens>{machineLabel}</EquipamentItens>
            </InfoWrapper>
          )}
        </MachineStyleWrapper>
      </BorderWrapper>
    </Container>
  )
}
