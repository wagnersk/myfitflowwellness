import styled from 'styled-components/native'

interface Props {
  active: boolean
}

export const Container = styled.View<Props>`
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  margin-left: 6px;
`
