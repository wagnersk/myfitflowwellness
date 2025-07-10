import styled from 'styled-components/native'

export const Container = styled.View``

export const QuestionText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
`

export const OptionsContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 0 32px;
`

interface OptionProps {
  isSelected: boolean
}

export const OptionButton = styled.TouchableOpacity<OptionProps>`
  padding: 10px;
  border-radius: 6px;
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? theme.COLORS.AUX_GOOGLE_GREEN
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`

export const OptionText = styled.Text<OptionProps>`
  color: ${({ isSelected, theme }) =>
    isSelected
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE};
`
