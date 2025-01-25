import React from 'react'

import {
  Container,
  Title,
  Description,
  IconWrapper,
  DescriptionWrapper,
} from './styles'
import { SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

interface Props {
  icon: React.FC<SvgProps> | ''
  size: number
  description?: string
}

export function WorkoutBoxInfo({ icon: Icon, description, size }: Props) {
  const theme = useTheme()

  return (
    <Container>
      <IconWrapper>
        {Icon && (
          <Icon
            width={size}
            height={size}
            strokeWidth={1.5}
            fill={theme.COLORS.BLUE_STROKE}
          />
        )}
      </IconWrapper>
      {description && (
        <DescriptionWrapper>
          <Description>{description}</Description>
        </DescriptionWrapper>
      )}
    </Container>
  )
}
