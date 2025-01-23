import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  flex: 1;
`

export const BodyImageWrapper = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
`

export const ImageBackgroundContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  padding: 48px 32px 32px 32px;
  flex: 1;
`

export const BodyWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
`

export const Body = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8px;
  width: 100%;
  flex-direction: column;
`

export const BodyText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.5;
  margin-top: 4px;

  margin-bottom: 8px;
`
export const Button = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: solid 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
`
export const EditProfileButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: solid 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding: 4px;
  margin-top: 16px;
`

export const SettingsWrapper = styled.View`
  align-items: flex-end;
  width: 100%;
`

export const ProfileWrapper = styled.View`
  align-items: center;
  margin-bottom: 20px;
`

export const UserNameWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 16px;
`
export const UserNameAndEmailWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`
export const EditProfileNameText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`

export const UserEmail = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(12)}px;
  opacity: 0.5;
`

export const ProfileInfoWrapper = styled.ScrollView`
  width: 100%;
  margin-bottom: 12px;
  flex: 1;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.5;
  margin-top: 4px;

  margin-bottom: 8px;
`

export const ProfileInfoText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  margin-bottom: 4px;
`

export const ProfileInfoDivisor = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  opacity: 0.5;
`

export const PhotoBorderWrapper = styled.View`
  width: 184px;
  height: 184px;
  border-radius: 92px;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  align-items: center;
  justify-content: center;
`
export const LabelWrapper = styled.View`
  display: flex;
  padding: 2px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  margin-bottom: 12px;
`
export const ToggleButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
  margin-top: 10px;
  border: 1px solid #ccc;
`
export const ToggleButtonWrapper = styled.View`
  display: flex;
  width: 100%;
  align-items: flex-end;
`
export const ToggleButtonText = styled.Text`
  color: ${({ theme }) => theme.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
  margin: 0 10px;
`
