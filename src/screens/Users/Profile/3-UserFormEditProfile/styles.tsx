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
