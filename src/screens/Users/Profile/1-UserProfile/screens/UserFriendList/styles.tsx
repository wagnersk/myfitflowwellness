import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'
import { TextInput } from 'react-native'

export const Container = styled.View`
  flex: 1;
`

export const Body = styled.View`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 16px;
  flex: 1;
  margin-top: 16px;
`
export const PhillsRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`
export const LeftContent = styled.View`
  flex-direction: row;
  gap: 8px;
  width: 100%;
  flex: 1;
`
export const RightContent = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  height: 48px;
`

export const InputWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  border: 2px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-radius: 24px;
  height: 48px;
  width: 100%;
`
export const InputSearchFriend = styled(TextInput)`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  border-radius: 24px;
  height: 48px;
  width: 100%;
  padding: 0 16px;
`

export const PhillsWrapper = styled.TouchableOpacity<{ selected: boolean }>`
  justify-content: center;
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected
      ? theme.COLORS.BLUE_STROKE
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};

  padding: 8px 12px;
  border-radius: 24px;
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.COLORS.BLUE_STROKE : theme.COLORS.BLUE_STROKE};
`

export const AddFriendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 48px;
`

export const PhillItem = styled.Text<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
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

export const TittleWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const Tittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(28)}px;
`
export const Header = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`
