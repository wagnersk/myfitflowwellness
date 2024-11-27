import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'

interface ISelected {
  selected: boolean
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const BioInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 32px;

  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 16px;
`
export const BioInfo = styled.View`
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-top: 24px;
`

export const BioInfoLetter = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`

export const CategoriesWrapper = styled.View`
  padding-left: 32px;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  padding-top: 16px;
  padding-bottom: 8px;
`

export const Tittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`

export const BodyImageContainer = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  top: -20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const SelectButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 48px;

  gap: 2px;
  padding-left: 32px;
  padding-right: 32px;
`

export const SelectButton = styled(TouchableOpacity)<ISelected>`
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100px;

  border-bottom-width: 2px;

  border-bottom-color: ${({ selected, theme }) =>
    selected ? `${theme.COLORS.BLUE_STROKE}` : `transparent`};
`

export const FrequencyWrapper = styled.View`
  padding: 32px;
`
export const WorkoutsWrapper = styled.View`
  flex-direction: column;
  padding: 32px;
`
export const BodyWrapper = styled.View`
  padding: 32px;
`
