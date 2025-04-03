import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

export const FriendCardWrapper = styled.TouchableOpacity`
  align-items: center;
  width: 100%;

  gap: 16px;
  flex-direction: row;
`
export const FriendPhotoWrapper = styled.View``

export const FriendPhoto = styled.Image``
export const FriendContentWrapper = styled.View`
  border-bottom-width: 0.4px;

  align-items: flex-start;
  justify-content: center;
  padding-bottom: 8px;
`

export const FriendNameWrapper = styled.View``
export const FriendEmailWrapper = styled.View``

export const FriendNameText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
`
export const FriendEmailText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.7;
`
