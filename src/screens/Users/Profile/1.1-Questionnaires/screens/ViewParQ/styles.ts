// screens/Questionnaire/styles.ts
import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};

  margin-bottom: 16px;
`

export const ProgressBarWrapper = styled.View`
  height: 8px;
  width: 100%;
  background-color: #eee;
  border-radius: 4px;
  margin-bottom: 20px;
`

export const ProgressBarFill = styled.View`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
`

export const QuestionList = styled.View`
  flex: 1;
`

export const Navigation = styled.View<{ singleButton?: boolean }>`
  flex-direction: row;
  justify-content: ${({ singleButton }) =>
    singleButton ? 'flex-end' : 'space-between'};
  gap: 10px;
  margin-top: 16px;
`

export const NavButton = styled.TouchableOpacity`
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
`

export const NavButtonText = styled.Text`
  color: white;
  font-weight: 600;
`

export const Body = styled.View`
  padding: 24px;
  flex: 1;
`
export const ListWrapper = styled.View`
  padding-top: 32px;
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
  flex: 1;
`

export const SettingsWrapper = styled.View`
  position: absolute;
  left: 24px;
`
export const Header = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const ContainerWrapper = styled.View`
  width: 100%;
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`

export const ContainerTittleWrapper = styled.View`
  left: 16px;
`
export const ContainerTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(16)}px;
`
export const ButtonTitleWrapper = styled.View`
  position: absolute;
  top: 4px;
`
