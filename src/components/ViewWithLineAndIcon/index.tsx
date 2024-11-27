import React from 'react'
import Halter from '../../assets/Halter.svg'

import {
  LineWithGymIconWrapper,
  ItemSeparatorWrapper,
  ItemSeparator,
  IconWrapper,
} from './styles'

interface Props {
  changeColor?: boolean
}

export function ViewWithLineAndIcon({ changeColor }: Props) {
  return (
    <LineWithGymIconWrapper>
      <ItemSeparatorWrapper>
        <ItemSeparator changeColor={changeColor} />
      </ItemSeparatorWrapper>

      <IconWrapper>
        {changeColor ? (
          <Halter
            width={72}
            height={72}
            stroke="#1B077F"
            strokeWidth={0.5}
            transform={[{ rotate: '-36deg' }] as any} // Usamos a asserção de tipo 'any' aqui
          />
        ) : (
          <Halter
            width={72}
            height={72}
            stroke="#EFEFFF"
            strokeWidth={0.5}
            transform={[{ rotate: '-36deg' }] as any} // Usamos a asserção de tipo 'any' aqui
          />
        )}
      </IconWrapper>

      <ItemSeparatorWrapper>
        <ItemSeparator changeColor={changeColor} />
      </ItemSeparatorWrapper>
    </LineWithGymIconWrapper>
  )
}
