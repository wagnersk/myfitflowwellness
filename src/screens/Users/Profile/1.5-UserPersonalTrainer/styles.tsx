import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'

export const Container = styled.View`
  flex: 1;
`
export const BodyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Body = styled.View`
  /* justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 32px;
  padding-top: 32px;
`
export const PersonalTrainerCard = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

export const TrainerInfo = styled.View`
  flex: 1;
`

export const SelectContentWrapper = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`
export const SelectWrapper = styled.View`
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  gap: 12px;
`
export const ButtonWrapper = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: center;
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
  gap: 32px;
  flex: 1;
`

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const SettingsWrapper = styled.View`
  align-items: flex-start;
  width: 100%;
  position: absolute;
`
export const FooterWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`
export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const SelectFilterButtonWrapper = styled.View`
  background-color: #ffffff;

  width: 96px;
  height: 96px;

  border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  border-width: 2px;
  border-radius: 12px;
  justify-content: center;
`

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.5;
  margin-top: 4px;

  margin-bottom: 8px;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(24)}px;
`

export const TrainerName = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-size: ${RFValue(18)}px;
`
export const TrainerSpecialty = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-size: ${RFValue(14)}px;
  margin-bottom: 5px;
  opacity: 0.7;
`
export const TrainerRating = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-size: ${RFValue(12)}px;
  opacity: 0.5;
`
export const ManagePlanButtonText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: white;
  font-size: ${RFValue(14)}px;
`
export const ListTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-size: ${RFValue(18)}px;
`
export const SelectButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_BLUE};
  padding: 10px;
  border-radius: 5px;
`
export const ManagePlanButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
  padding: 10px;
  border-radius: 5px;
`
export const TrainerImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  margin-right: 15px;
`
