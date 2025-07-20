import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  flex: 1;
`

export const BodyImageWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const ImageBackgroundContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 32px 32px 32px; /* Ajustado para dar espaço ao Header */
`

export const Header = styled.View`
  width: 100%;
  padding-top: 32px; /* Espaço para o BackButton não sobrepor o conteúdo */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`

export const SettingsWrapper = styled.View`
  position: absolute;
  left: 0;
  top: 32px; /* Alinha com o padding do Header */
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(26)}px;
`

export const Body = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between', // Empurra o CTA para o final
  },
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`

// --- Card do Plano Premium ---
export const PremiumCard = styled.View`
  width: 100%;
  background-color: ${({ theme }) =>
    theme.COLORS.NEUTRA_BACKGROUND}; /* Ou outra cor de destaque suave */
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding: 24px;
  margin-top: 16px;
`

export const PlanTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(22)}px;
  text-align: center;
  margin-bottom: 24px;
`

export const FeatureList = styled.View`
  gap: 16px; /* Espaçamento entre os itens da lista */
`

export const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px; /* Espaço entre o ícone e o texto */
`

export const FeatureText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  flex-shrink: 1; /* Permite que o texto quebre a linha se necessário */
`

// --- Seção de Ações (Preço e Botões) ---
export const ActionsWrapper = styled.View`
  width: 100%;
  padding-top: 24px; /* Espaço para não colar no card */
  gap: 16px;
`

export const PricingWrapper = styled.View`
  align-items: center;
  gap: 4px;
`

export const PriceText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(28)}px;
`

export const DiscountText = styled.Text`
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`

export const CTAButton = styled(TouchableOpacity)`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`

export const CTAText = styled.Text`
  color: #ffffff;
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`

export const SecondaryAction = styled(TouchableOpacity)`
  padding: 8px;
  align-items: center;
`

export const SecondaryActionText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
`
