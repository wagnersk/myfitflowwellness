import styled, { css } from 'styled-components/native'

interface Props {
  changeColor?: boolean
}
export const LineWithGymIconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-bottom: 32px;
  padding-top: 32px;
`

// Quadrado que envolve onde tem a linha
export const ItemSeparatorWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 2px;
`

// A linha em sí
export const ItemSeparator = styled.View<Props>`
  flex: 1;
  border: 1px solid;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  width: 85%;
  opacity: 0.3;

  ${({ changeColor }) =>
    changeColor &&
    css`
      border-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
    `}
`

export const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 11px;
`
