import React from 'react'
import {
  ButtonWrapper,
  ButtonContainer,
  IconWrapper,
  Container,
  BottomWrapper,
  BodyWraper,
  ButtonBorderWrapper,
  IconsWrapper,
  CardTitle,
} from './styles'
import { IMyfitflowWorkoutInUse } from '@hooks/authTypes'
import ArrowUp from '@assets/Arrow-fat-up.svg'
import ArrowDown from '@assets/Arrow-fat-down.svg'
import { WorkoutsCardItem } from '@components/Cards/WorkoutsCard/WorkoutsCardItem'
import { CTAButton } from '@components/Buttons/CTAButton'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUse | null
  selectedLanguage: 'pt-br' | 'us'
  onPress: (index: number) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
  index: number
  isOpenSettingsMode: boolean
  length: number
}

export function PlanCard({
  data,
  selectedLanguage,
  onPress,
  onMoveUp,
  onMoveDown,
  index,
  isOpenSettingsMode,
  length,
}: PlanCardProps) {
  return (
    <Container pointerEvents={isOpenSettingsMode ? 'auto' : 'none'}>
      <ButtonContainer>
        <BodyWraper>
          <WorkoutsCardItem
            index={index}
            data={data}
            handleNextStep={() => onPress(index)}
          />
        </BodyWraper>
      </ButtonContainer>
      {isOpenSettingsMode && (
        <BottomWrapper>
          <IconsWrapper>
            <IconWrapper>
              <ButtonWrapper
                disabled={index === 0}
                onPress={() => onMoveUp(index)}
              >
                {index !== 0 && (
                  <ButtonBorderWrapper>
                    <ArrowUp width={32} height={32} fill={'green'} />
                  </ButtonBorderWrapper>
                )}
              </ButtonWrapper>
            </IconWrapper>

            <IconWrapper>
              <ButtonWrapper
                disabled={index === length - 1}
                onPress={() => onMoveDown(index)}
              >
                {index !== length - 1 && (
                  <ButtonBorderWrapper>
                    <ArrowDown width={32} height={32} fill={'red'} />
                  </ButtonBorderWrapper>
                )}
              </ButtonWrapper>
            </IconWrapper>
          </IconsWrapper>
        </BottomWrapper>
      )}
    </Container>
  )
}
