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
import ClockCounterClockwise from '@assets/ClockCounterClockwise.svg'
import { WorkoutsCardItem } from '@components/Cards/WorkoutsCard/WorkoutsCardItem'
import { CTAButton } from '@components/Buttons/CTAButton'

interface PlanCardProps {
  data: IMyfitflowWorkoutInUse | null
  selectedLanguage: 'pt-br' | 'us'
  onPress: (index: number) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
  onReset: (index: number) => void
  index: number
  isOpenSettingsMode: boolean
  isWorkoutAlreadyStarted: boolean
  length: number
}

export function PlanCard({
  data,
  selectedLanguage,
  onPress,
  onMoveUp,
  onMoveDown,
  onReset,
  index,
  isOpenSettingsMode,
  isWorkoutAlreadyStarted,
  length,
}: PlanCardProps) {
  const isFirstElement = index === 0
  const isLastElement = index === length - 1
  const isFirstElementWithWorkoutStartedMode =
    isWorkoutAlreadyStarted && index === 0

  const isSecondElementWithWorkoutStartedMode =
    isWorkoutAlreadyStarted && index === 1

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
              {!isFirstElement && (
                <ButtonWrapper
                  disabled={isSecondElementWithWorkoutStartedMode}
                  onPress={() => onMoveUp(index)}
                >
                  {/* isWorkoutAlreadyStarted */}

                  {!isSecondElementWithWorkoutStartedMode && (
                    <ButtonBorderWrapper>
                      <ArrowUp width={32} height={32} fill={'green'} />
                    </ButtonBorderWrapper>
                  )}
                </ButtonWrapper>
              )}
            </IconWrapper>

            <IconWrapper>
              {!isLastElement && (
                <ButtonWrapper
                  disabled={isLastElement}
                  onPress={() =>
                    isFirstElementWithWorkoutStartedMode
                      ? onReset(index)
                      : onMoveDown(index)
                  }
                >
                  {/*     {index !== length - 1 && ( */}

                  {isFirstElementWithWorkoutStartedMode ? (
                    <ButtonBorderWrapper>
                      <ClockCounterClockwise
                        width={32}
                        height={32}
                        fill={'green'}
                      />
                    </ButtonBorderWrapper>
                  ) : (
                    <ButtonBorderWrapper>
                      <ArrowDown width={32} height={32} fill={'red'} />
                    </ButtonBorderWrapper>
                  )}

                  {/*       )} */}
                </ButtonWrapper>
              )}
            </IconWrapper>
          </IconsWrapper>
        </BottomWrapper>
      )}
    </Container>
  )
}
