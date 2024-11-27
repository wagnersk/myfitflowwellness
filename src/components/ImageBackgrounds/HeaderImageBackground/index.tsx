import React, { ReactNode } from 'react'
import { ImageBackground } from 'react-native'
import headerImg from '../../../../assets/header.png'

import { Container } from './styles'

type Props = {
  children: ReactNode
}

export function HeaderImageBackground({ children }: Props) {
  return (
    <Container>
      <ImageBackground
        resizeMode="cover"
        source={headerImg}
        style={{
          height: 140,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </ImageBackground>
    </Container>
  )
}
