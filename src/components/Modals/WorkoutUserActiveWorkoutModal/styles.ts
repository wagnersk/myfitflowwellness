import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'

export const OverLayTop = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`
export const OverLayBottom = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
`

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 32px 16px;
  gap: 12px;
`
export const TipsNoteBodyWrapper = styled.View`
  gap: 12px;
`

export const TipsNoteWrapper = styled.View`
  gap: 24px;
  align-items: center;
  justify-content: center;
`
export const InputsWrapper = styled.View`
  gap: 24px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const TipsTitleNoteWrapper = styled.View`
  width: 100%;
  padding: 8px;
  align-items: center;
`

export const TitteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 4px;
  justify-content: flex-start;
`
export const SubTitteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 4px;
  justify-content: flex-start;
`

export const DeleteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
  justify-content: flex-start;
`

export const ToggleSwitchText = styled.Text<{ selected: boolean }>`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  justify-content: flex-start;
`
export const ShareText = styled.Text<{ selected: boolean }>`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  justify-content: flex-start;
`

const TouchableOpacityComponent = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
  border-radius: 12px;
  width: 100px;
`

export const DeleteButton = styled(TouchableOpacityComponent)`
  border: 2px solid ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
`
export const ShareButton = styled(TouchableOpacityComponent)`
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};

  border: 2px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding: 4px;
`

export const ToggleSwitch = styled(TouchableOpacityComponent)<{
  selected?: boolean
}>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.COLORS.AUX_GOOGLE_GREEN : theme.COLORS.AUX_GOOGLE_RED};
  border: 2px solid
    ${({ theme, selected }) =>
      selected ? theme.COLORS.AUX_GOOGLE_GREEN : theme.COLORS.AUX_GOOGLE_RED};
`

export const YellowToogleSwitch = styled(TouchableOpacityComponent)<{
  selected?: boolean
}>`
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_YELLOW};
  border: 2px solid ${({ theme, selected }) => theme.COLORS.AUX_GOOGLE_YELLOW};
`
