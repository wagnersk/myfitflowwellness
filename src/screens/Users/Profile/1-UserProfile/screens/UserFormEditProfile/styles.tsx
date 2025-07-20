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
export const FormWrapper = styled.View`
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
export const InputWrapper = styled.View``

export const SettingsWrapper = styled.View`
  align-items: flex-start;
  width: 100%;
`

export const ProfileWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`

export const PhotoBorderWrapper = styled.View`
  width: 184px;
  height: 184px;
  border-radius: 92px;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  align-items: center;
  justify-content: center;
`
export const VideoInfo = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.5;
  margin-top: 4px;

  margin-bottom: 8px;
`
export const ImageContainer = styled.View`
  flex: 3;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea;
`

export const StyledImage = styled.Image`
  width: 90%;
  height: 90%;
`

export const Controls = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #fff;
`

export const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`

export const SaveButton = styled.TouchableOpacity`
  background-color: #28a745;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

export const SaveButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`
