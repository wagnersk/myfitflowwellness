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
export const InputWrapper = styled.View`
  width: 100%;
  gap: 32px;
`
export const CopyWorkoutButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  height: 48px;
  border: 1px ${({ theme }) => theme.COLORS.AUX_GOOGLE_BLUE};
  justify-content: center;
  align-items: center;
`
export const AddButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`
export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`
export const SettingsWrapper = styled.View`
  align-items: flex-start;
  width: 100%;
`
export const NameAndEmailWrapper = styled.View`
  justify-content: center;
  align-items: center;
`
export const UserFriendNameAndEmailWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
export const UserFriendNameAndEmailAndButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  width: 100%;

  padding-left: 48px;
  flex-direction: column;
`
export const UserFriendName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(28)}px;
`
export const UserFriendEmail = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.7;
`
export const UserFriendRequestText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(20)}px;
`
export const ProfileWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  gap: 8px;
`

export const PhotoBorderWrapper = styled.View`
  width: 184px;
  height: 184px;
  border-radius: 92px;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  align-items: center;
  justify-content: center;
`
