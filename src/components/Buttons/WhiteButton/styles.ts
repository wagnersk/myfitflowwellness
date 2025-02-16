import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

interface Props {
  children: ReactNode
  loading?: boolean
  bordertype?: 'up' | 'down' | 'up-down' | 'none'
  iconStyle?:
    | 'email'
    | 'question'
    | 'trash'
    | 'support'
    | 'plan'
    | 'terms'
    | 'privacy'
    | 'anamnese'
    | 'crosshair'
    | 'checkcicle'
    | 'calendar'
    | 'clock'
    | 'person-simple'
    | 'friendlist'
    | 'none'
}

export const ContentWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  padding: 12px;
  height: 48px;
`
export const ListTitleWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
export const ListTitle = styled.Text<Props>`
  color: ${({ theme, iconStyle }) =>
    iconStyle === 'trash'
      ? theme.COLORS.AUX_GOOGLE_RED
      : theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(16)}px;
`

export const ButtonWrapper = styled(TouchableOpacity)<Props>`
  justify-content: center;
  align-items: center;
  border: solid 1px
    ${({ theme, iconStyle }) =>
      iconStyle === 'trash'
        ? theme.COLORS.AUX_GOOGLE_RED
        : theme.COLORS.BLUE_STROKE};

  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
    `}

  ${({ bordertype }) =>
    bordertype === 'up' &&
    css`
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    `}

  ${({ bordertype }) =>
    bordertype === 'down' &&
    css`
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    `}
  ${({ bordertype }) =>
    bordertype === 'up-down' &&
    css`
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    `}
`

export const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
`
