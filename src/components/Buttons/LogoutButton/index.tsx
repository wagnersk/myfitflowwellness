import React from 'react'
import Logout from '../../../assets/Logout.svg'
import { TouchableOpacityProps } from 'react-native'

import { Container } from './styles'

export function LogoutButton({ ...rest }: TouchableOpacityProps) {
  return (
    <Container {...rest}>
      <Logout width={24} height={24} />
    </Container>
  )
}
