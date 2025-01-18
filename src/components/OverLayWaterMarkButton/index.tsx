import React from 'react'
import { TouchableOpacity } from 'react-native'
import SvgCloseComponent from '@assets/Close.svg' // Substitua pelo caminho do seu arquivo SVG

interface FullScreenSvgProps {
  onPress: () => void
}

export function OverLayWaterMarkButton({ onPress }: FullScreenSvgProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: '100%', height: '100%', position: 'absolute' }}
    >
      <SvgCloseComponent width="100%" height="100%" fill={'red'} />
    </TouchableOpacity>
  )
}
