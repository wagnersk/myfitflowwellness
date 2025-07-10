// components/QuestionStep.tsx
import React, { useState } from 'react'
import {
  Container,
  OptionsContainer,
  OptionButton,
  OptionText,
  QuestionText,
} from './styles'

interface Question {
  id: number
  'pt-br': string
  us: string
}

interface Props {
  question: Question
  language: 'pt-br' | 'us'
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

const QuestionStep = ({ question, language }: Props) => {
  const [answer, setAnswer] = useState<string | null>(null)
  const t = translations[language]
  const options = [t.yes, t.no]

  return (
    <Container>
      <QuestionText>
        {question.id}. {question[language]}
      </QuestionText>
      <OptionsContainer>
        {options.map((option) => (
          <OptionButton
            key={option}
            onPress={() => setAnswer(option)}
            isSelected={answer === option}
          >
            <OptionText isSelected={answer === option}>{option}</OptionText>
          </OptionButton>
        ))}
      </OptionsContainer>
    </Container>
  )
}

export default QuestionStep
