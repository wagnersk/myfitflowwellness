import React, { useEffect, useRef, useState } from 'react'

import { Image } from 'expo-image'

import { Container, PhotoBorderWrapper, PhotoNotFound } from './styles'
import { useAuth } from '@hooks/auth'

type Props = {
  defaultPhotoBase64?: string
  newDefaultPhotoBase64?: string
}

export function Photo({ defaultPhotoBase64, newDefaultPhotoBase64 }: Props) {
  const { user } = useAuth()
  const [displayedImage, setDisplayedImage] = useState<string | undefined>(
    defaultPhotoBase64,
  )
  const imageKeyRef = useRef(false)

  useEffect(() => {
    imageKeyRef.current = !imageKeyRef.current
  }, [user?.photoBase64])

  useEffect(() => {
    if (newDefaultPhotoBase64) {
      setDisplayedImage(newDefaultPhotoBase64)
    } else {
      setDisplayedImage(defaultPhotoBase64)
    }
  }, [newDefaultPhotoBase64, defaultPhotoBase64])

  const getFormattedImage = (base64Image?: string) => {
    if (base64Image && !base64Image.startsWith('data:image')) {
      return `data:image/jpeg;base64,${base64Image}`
    }
    return base64Image
  }

  return (
    <Container>
      <PhotoBorderWrapper>
        {!displayedImage && <PhotoNotFound>{'Não há foto'}</PhotoNotFound>}

        {!!displayedImage && (
          <Image
            source={{ uri: getFormattedImage(displayedImage) }}
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
            }}
            contentFit="cover"
            cachePolicy={'memory-disk'}
            alt=""
          />
        )}
      </PhotoBorderWrapper>
    </Container>
  )
}
