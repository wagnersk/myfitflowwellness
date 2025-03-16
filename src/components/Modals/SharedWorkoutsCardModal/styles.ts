import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'

export const OverLayTop = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`
export const OverLayBottom = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
`

export const Container = styled.View`
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 32px 16px;
  gap: 12px;
`
export const TipsNoteBodyWrapper = styled.View`
  gap: 12px;
`

export const TipsNoteWrapper = styled.View`
  gap: 24px;
  align-items: center;
  justify-content: center;
`
export const InputsWrapper = styled.View`
  gap: 24px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const TipsTitleNoteWrapper = styled.View`
  width: 100%;
  padding: 8px;
  align-items: center;
`

export const TitteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 4px;
  justify-content: flex-start;
`
export const ButtonsWrapper = styled.View`
  flex-direction: row;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
export const BlurIconViewWrapper = styled(BlurView)<{ disabled: boolean }>`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  border-radius: 12px;
  overflow: hidden;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
`

export const ActButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export const SubTitteTextWrapper = styled.View`
  padding: 8px;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
`

export const SubTitteContainer = styled.View`
  flex-direction: row;
  padding: 8px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`
export const SubTitteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding-bottom: 4px;
  justify-content: flex-start;
`

export const DeleteText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
  justify-content: flex-start;
`

export const ToggleSwitchText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  justify-content: flex-start;
`
export const CancelShareText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  justify-content: flex-start;
`

export const ShareText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.COLORS.NEUTRA_BACKGROUND};
  justify-content: flex-start;
`

const TouchableOpacityComponent = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 48px;
  border-radius: 12px;
  width: 100px;
`

export const DeleteButton = styled(TouchableOpacityComponent)`
  border: 2px solid ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
`
export const ShareButton = styled(TouchableOpacityComponent)`
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};

  border: 2px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
  padding: 4px;
`

export const CancelShareButton = styled(TouchableOpacityComponent)`
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
  border: 2px solid ${({ theme }) => theme.COLORS.AUX_GOOGLE_RED};
`

export const QRCodeButton = styled(TouchableOpacityComponent)`
  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
  border: 2px solid ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};
`
