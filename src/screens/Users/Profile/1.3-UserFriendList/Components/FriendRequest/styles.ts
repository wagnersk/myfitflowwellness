import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

export const FriendCardWrapper = styled.View`
  align-items: center;
  width: 100%;
  gap: 16px;
  display: flex;
  flex-direction: row;
`
export const FriendPhotoWrapper = styled.View`
  border-width: 1px;
  width: 52px;
  height: 52px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  opacity: 0.5;
`
export const FriendPhoto = styled.Image``
export const FriendContentWrapper = styled.View`
  border-bottom-width: 0.3px;
  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 8px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  font-size: ${RFValue(16)}px;
`
export const FriendEmailText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.7;
`
export const ActFriendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
`
