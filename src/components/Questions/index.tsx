// components/QuestionStep.tsx
import React from 'react'
import {
  Container,
  OptionsContainer,
  OptionButton,
  OptionText,
  QuestionText,
} from './styles'
import { QuestionData } from '@screens/Users/Profile/1.1-ParQ'

interface Props {
  question: QuestionData
  language: 'pt-br' | 'us'
  handleSelectParQ: (index: number, value: boolean) => void
  index: number
}

const translations = {
  'pt-br': {
    yes: 'Sim',
    no: 'Não',
  },
  us: {
    yes: 'Yes',
    no: 'No',
  },
}

const QuestionStep = ({
  question,
  language,
  handleSelectParQ,
  index,
}: Props) => {
  const t = translations[language]
  const options = [
    { label: t.yes, value: true },
    { label: t.no, value: false },
  ]

  return (
    <Container>
      <QuestionText>
        {question.id}. {question.data[language]}
      </QuestionText>
      <OptionsContainer>
        {options.map((option) => {
          const isSelected = question.isChecked === null ? false : option.value
          return (
            <OptionButton
              key={option.label}
              onPress={() => handleSelectParQ(index, option.value)}
              isSelected={!!isSelected === question.isChecked}
            >
              <OptionText isSelected={!!isSelected === question.isChecked}>
                {option.label}
              </OptionText>
            </OptionButton>
          )
        })}
      </OptionsContainer>
    </Container>
  )
}

export default QuestionStep
