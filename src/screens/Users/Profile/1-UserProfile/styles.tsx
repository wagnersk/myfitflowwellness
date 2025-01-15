import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'

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

export const Body = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1;
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
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
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
