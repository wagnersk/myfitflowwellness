import React from 'react'
import {
  ButtonWrapper,
  ButtonContainer,
  CardTitle,
  CardSubTittle,
} from './styles'

interface PlanCardProps {
  type: 'positive' | 'neutral'
  title: string
  description1: string
  description2: string
  onPress: () => void
}

export function PlanCard({
  type,
  title,
  description1,
  description2,
  onPress,
}: PlanCardProps) {
  return (
    <ButtonWrapper onPress={onPress}>
      <ButtonContainer type={type}>
        <CardTitle>{title}</CardTitle>
        <CardSubTittle>{description1}</CardSubTittle>
        <CardSubTittle>{description2}</CardSubTittle>
      </ButtonContainer>
    </ButtonWrapper>
  )
}
