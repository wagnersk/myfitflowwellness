import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

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
  justify-content: flex-start;
  width: 100%;
  gap: 8px;
`
export const FriendCardWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 16px;
`
export const FriendPhotoWrapper = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  overflow: hidden;
  background-color: red;
`
export const FriendPhoto = styled.Image``
export const FriendContentWrapper = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  flex: 1;
  padding-bottom: 8px;
`
export const FriendNameWrapper = styled.View``
export const FriendEmailWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`
export const FriendNameText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.7;
`
export const FriendEmailText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.7;
`
export const PhillsWrapper = styled.TouchableOpacity<{ selected: boolean }>`
  justify-content: center;
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected
      ? theme.COLORS.BLUE_STROKE
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};

  padding: 6px 10px;
  border-radius: 24px;
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.COLORS.BLUE_STROKE : theme.COLORS.BLUE_STROKE};
`
export const AddFriendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 48px;
`
export const ActFriendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  background-color: red;
`

export const PhillItem = styled.Text<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
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

export const TittleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
export const Tittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(32)}px;
`
export const AddFriendButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
`
