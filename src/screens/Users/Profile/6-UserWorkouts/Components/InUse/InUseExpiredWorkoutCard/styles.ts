import styled, { css } from 'styled-components/native'
import { ReactNode } from 'react'
import { RFValue } from '@utils/RFValue'
interface Props {
  children: ReactNode
  loading?: boolean
}

export const ButtonContainer = styled.View`
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;

  justify-content: center;
  align-items: center;
  gap: 12px;
  flex: 1;
`
export const CardsWrapper = styled.View`
  width: 100%;
  gap: 12px;
`
export const HeaderWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;

  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
  width: 100%;
`
export const BodyWraper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;

  flex-direction: row;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
`
export const BottomWrapper = styled.View``
export const TittleWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 48px;
  flex: 1;
`
export const IconWrapper = styled.View`
  height: 48px;
  width: 48px;

  justify-content: center;
  align-items: center;
  border-radius: 12px;
`
export const IconsWrapper = styled.View`
  gap: 8px;
`

/*  
  width: 100%;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
   */

export const Container = styled.View`
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  flex-direction: row;
`
export const ImagePhoto = styled.Image`
  height: 200px;
  width: 100%;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`

export const ButtonWrapper = styled.TouchableOpacity`
  height: 48px;
  width: 48px;

  justify-content: center;
  align-items: center;
  border-radius: 12px;
`
export const ButtonBorderWrapper = styled.View<Props>`
  height: 48px;
  width: 48px;

  justify-content: center;
  align-items: center;
  border-radius: 12px;
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
    `}
`
export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(14)}px;
`
export const CardSubTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(12)}px;
`
export const WorkoutBoxInfoWrapper = styled.View`
  justify-content: space-around;

  flex-direction: row;
`
