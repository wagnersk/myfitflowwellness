import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import Animated from 'react-native-reanimated'
import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export const Container = styled.View`
  flex: 1;
`

export const Body = styled.View`
  /* justify-content: space-between;
  align-items: center; */
  width: 100%;
  height: 100%;
  flex: 1;
`

export const ListWrapper = styled.View`
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
  padding: 16px;
  flex: 1;
`

export const SettingsWrapper = styled.View`
  padding-left: 16px;
  align-items: flex-start;
`

export const ContainerTittleWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`

export const TittleWrapper = styled.View`
  left: -16px;
`
export const ContainerTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(24)}px;
  padding-left: 16px;
`

export const ButtonTitleWrapper = styled.View`
  position: absolute;
  top: 4px;
`
export const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
`

export const RowWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`
export const SelectScreenWrapper = styled.View`
  flex-direction: column;
  margin: 16px 0;
`

// cria ref tbm
export const SelectScreenButton = styled.TouchableOpacity`
  padding: 10px 0;
  border-radius: 20px;
  align-items: center;
  width: ${width * 0.3}px; /* 80% da largura da tela */
`

export const SelectScreenButtonText = styled.Text<{ isSelected: boolean }>`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme, isSelected }) =>
    isSelected ? theme.FONTS.BUTTON : theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.9)};
`
export const SelectScreenButtonText2 = styled.Text<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.COLORS.NEUTRA_LETTER_AND_STROKE
      : theme.COLORS.BLUE_STROKE};

  font-family: ${({ theme, isSelected }) =>
    isSelected ? theme.FONTS.BUTTON : theme.FONTS.BODY};

  font-size: ${RFValue(14)}px;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.9)};
  animation-duration: 10.5s;
`
export const Underline = styled(Animated.View)<{ tabWidth: number }>`
  bottom: 0;
  left: 0;
  height: 2px;
  width: ${({ tabWidth }) => tabWidth}px;
  border-radius: 20px;

  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
`

export const SelectScreenWrapper2 = styled.View`
  height: 40px;
  position: relative;
`

export const Underline2 = styled(Animated.View)<{ tabWidth: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: ${({ tabWidth }) => tabWidth}px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
`
export const RowWrapper2 = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`
export const SelectScreenButton2 = styled.TouchableOpacity<{
  tabWidth: number
}>`
  padding: 10px 0;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  width: ${({ tabWidth }) => tabWidth}px;
`
