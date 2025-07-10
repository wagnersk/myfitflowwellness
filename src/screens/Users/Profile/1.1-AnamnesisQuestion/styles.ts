// screens/Anamnesis/styles.ts (ou adicione ao seu Questionnaire/styles.ts se for usar um único)
import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

// Reutilizando muitos estilos do seu PAR-Q, mas adicionando o input
export const Container = styled.View`
  flex: 1;
`

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  margin-bottom: 16px;
`

export const ProgressBarWrapper = styled.View`
  height: 8px;
  width: 100%;
  background-color: #eee;
  border-radius: 4px;
  margin-bottom: 20px;
`

export const ProgressBarFill = styled.View`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
`

export const QuestionList = styled.View`
  flex: 1;
`

export const Navigation = styled.View<{ singleButton?: boolean }>`
  flex-direction: row;
  justify-content: ${({ singleButton }) =>
    singleButton ? 'flex-end' : 'space-between'};
  gap: 10px;
  margin-top: 16px;
`

export const NavButton = styled.TouchableOpacity`
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
`

export const NavButtonText = styled.Text`
  color: white;
  font-weight: 600;
`

export const Body = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 32px;
  padding-top: 16px;
`

export const ListWrapper = styled.View`
  padding-top: 32px;
  gap: 16px;
  flex: 1;
`

export const BodyImageWrapper = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const ImageBackgroundContainer = styled.View`
  align-items: center;
  padding: 32px;
  flex: 1;
`

export const SettingsWrapper = styled.View`
  align-items: flex-start;
  width: 100%;
  position: absolute;
`

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`

// Estilo para o texto da pergunta na Anamnese
export const QuestionText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
`

// Novo estilo para o campo de input da anamnese
export const AnamnesisInput = styled.TextInput`
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 8px;
  padding: 12px;
  min-height: 80px; /* Altura mínima para multi-linhas */
  text-align-vertical: top; /* Garante que o texto comece no topo */
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.BODY};
`
