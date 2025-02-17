import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
interface Props {
  children: ReactNode
  loading?: boolean
}

export const Container = styled.View`
  flex: 1;
`

export const Body = styled.View`
  /* justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 32px;
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
`
export const ContainerWrapper = styled.View`
  width: 100%;
  gap: 16px;
`
export const ButtonContainer = styled.View<{ type: 'positive' | 'neutral' }>`
  width: 100%;
  height: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: ${({ theme, type }) =>
    type === 'positive'
      ? theme.COLORS.AUX_GOOGLE_GREEN
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`
export const CardsWrapper = styled.View`
  width: 100%;
  gap: 12px;
`

/*   width: 100%;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE}; */
export const ButtonWrapper = styled(TouchableOpacity)<Props>`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: solid 1px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
    `}

  height:120px;
`

export const ContentWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  height: 48px;
`
export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(26)}px;
`

export const ContainerTittleWrapper = styled.View`
  left: 16px;
`
export const MonthYearACTMessage = styled.View`
  justify-content: center;
  align-items: center;
`
export const ContainerTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(16)}px;
`
export const CardSubTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(12)}px;
`
export const MonthYearACTMessageText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(12)}px;
`
export const ButtonTitleWrapper = styled.View`
  position: absolute;
  top: 4px;
`
export const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
`
export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(18)}px;
`
export const ToggleButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
export const FakeBackgroundWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};

  gap: 16px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  background-color: white;
`

export const ToggleButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.COLORS.BLUE_STROKE : 'white'};
  opacity: ${({ selected }) => (selected ? 1 : 0.7)};
`

export const ToggleButtonText = styled.Text<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected ? 'white' : theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`
