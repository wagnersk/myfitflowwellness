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
  EquipamentItensWrapper,
  EquipamentTitleWrapper,
  BlurViewWrapper,
} from './styles'
import { ILocalCardExerciseFilters } from '@hooks/authTypes'

interface Props {
  data: ILocalCardExerciseFilters
  selectedLanguage: 'pt-br' | 'us' | undefined
}

export function EquipamentsInfo({ data, selectedLanguage }: Props) {
  return (
    <Container>
      <BorderWrapper>
        <BlurViewWrapper>
          <Title>
            {selectedLanguage === 'pt-br' ? `Equipamentos` : `Equipaments`}
          </Title>
        </BlurViewWrapper>

        <FreeStyleWrapper>
          {data.weight.length > 0 && (
            <InfoWrapper>
              <EquipamentTitleWrapper>
                <EquipamentTitle>
                  {selectedLanguage === 'pt-br' ? 'Pesos' : 'Weights'}:
                </EquipamentTitle>
              </EquipamentTitleWrapper>

              {data.weight
                .map((v) => v[selectedLanguage || 'us'])
                .sort((a, b) => a.localeCompare(b))
                .map((item, index) => (
                  <EquipamentItensWrapper key={index}>
                    <EquipamentItens>• {item}</EquipamentItens>
                  </EquipamentItensWrapper>
                ))}
            </InfoWrapper>
          )}
          {data.bar.length > 0 && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Barras' : 'Bars'}:
              </EquipamentTitle>

              {data.bar
                .map((v) => v[selectedLanguage || 'us'])
                .sort((a, b) => a.localeCompare(b))
                .map((item, index) => (
                  <EquipamentItensWrapper key={index}>
                    <EquipamentItens>• {item}</EquipamentItens>
                  </EquipamentItensWrapper>
                ))}
            </InfoWrapper>
          )}

          {data.bench.length > 0 && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Banco' : 'Bench'}:
              </EquipamentTitle>
              {data.bench
                .map((v) => v[selectedLanguage || 'us'])
                .sort((a, b) => a.localeCompare(b))
                .map((item, index) => (
                  <EquipamentItensWrapper key={index}>
                    <EquipamentItens>• {item}</EquipamentItens>
                  </EquipamentItensWrapper>
                ))}
            </InfoWrapper>
          )}
          {data.other.length > 0 && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Outros' : 'Others'}:
              </EquipamentTitle>
              {data.other
                .map((v) => v[selectedLanguage || 'us'])
                .sort((a, b) => a.localeCompare(b))
                .map((item, index) => (
                  <EquipamentItensWrapper key={index}>
                    <EquipamentItens>• {item}</EquipamentItens>
                  </EquipamentItensWrapper>
                ))}
            </InfoWrapper>
          )}
        </FreeStyleWrapper>

        <PoliaStyleWrapper>
          {data.pulley.length > 0 && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br'
                  ? 'Puxadores do pulley'
                  : 'Pulley handles'}
              </EquipamentTitle>
              {data.pulley
                .map((v) => v[selectedLanguage || 'us'])
                .sort((a, b) => a.localeCompare(b))
                .map((item, index) => (
                  <EquipamentItensWrapper key={index}>
                    <EquipamentItens>• {item}</EquipamentItens>
                  </EquipamentItensWrapper>
                ))}
            </InfoWrapper>
          )}
          {data.pulleyHandles.length > 0 && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br'
                  ? 'Puxadores do pulley'
                  : 'Pulley handles'}
                :
              </EquipamentTitle>
              {data.pulleyHandles
                .map((v) => v[selectedLanguage || 'us'])
                .sort((a, b) => a.localeCompare(b))
                .map((item, index) => (
                  <EquipamentItensWrapper key={index}>
                    <EquipamentItens>• {item}</EquipamentItens>
                  </EquipamentItensWrapper>
                ))}
            </InfoWrapper>
          )}
        </PoliaStyleWrapper>
        <MachineStyleWrapper>
          {data.machine.length > 0 && (
            <InfoWrapper>
              <EquipamentTitle>
                {selectedLanguage === 'pt-br' ? 'Máquinas' : 'Machines'}:{' '}
              </EquipamentTitle>
              {data.machine
                .map((v) => v[selectedLanguage || 'us'])
                .sort((a, b) => a.localeCompare(b))
                .map((item, index) => (
                  <EquipamentItensWrapper key={index}>
                    <EquipamentItens>• {item}</EquipamentItens>
                  </EquipamentItensWrapper>
                ))}
            </InfoWrapper>
          )}
        </MachineStyleWrapper>
      </BorderWrapper>
    </Container>
  )
}
