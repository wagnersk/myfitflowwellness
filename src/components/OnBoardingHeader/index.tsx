import React from 'react'
import Forward from '@assets/Forward.svg'

import {
  IconContainer,
  Container,
  Header,
  BulletsPagination,
  SkipButton,
  SkipButtonText,
  WorkoutCardBullets,
  WorkoutCardLine,
} from './styles'

interface Props {
  handleSkip: () => void
  skipText: string

  paginationItems: {
    isLine: boolean
  }[]
}

export function OnBoardingHeader({
  handleSkip,
  paginationItems,
  skipText,
}: Props) {
  return (
    <Container>
      <Header>
        <BulletsPagination>
          {paginationItems.map((item, index) =>
            item.isLine ? (
              <WorkoutCardLine key={index} />
            ) : (
              <WorkoutCardBullets key={index} />
            ),
          )}
        </BulletsPagination>

        <SkipButton onPress={handleSkip}>
          <SkipButtonText>{skipText}</SkipButtonText>
          <IconContainer>
            <Forward
              width={40}
              height={40}
              stroke={'white'}
              style={{ top: 2 }}
              strokeWidth={2}
            />
          </IconContainer>
        </SkipButton>
      </Header>
    </Container>
  )
}
