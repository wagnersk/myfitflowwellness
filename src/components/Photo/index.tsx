import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Container, PhotoBorderWrapper, PhotoNotFound } from './styles'
import { useAuth } from '@hooks/auth'

type Props = {
  defaultText: string
  photo: string | null
  newDefaultPhoto?: string
  size?: number
}

export function Photo({
  photo,
  newDefaultPhoto,
  defaultText,
  size = 180,
}: Props) {
  const { user } = useAuth()
  const [displayedImage, setDisplayedImage] = useState<string | null>(
    photo || null,
  )
  const imageKeyRef = useRef(false)

  useEffect(() => {
    imageKeyRef.current = !imageKeyRef.current
  }, [user?.photo])

  useEffect(() => {
    setDisplayedImage(newDefaultPhoto || photo || null)
  }, [newDefaultPhoto, photo])

  return (
    <Container>
      <PhotoBorderWrapper size={size + 4}>
        {!displayedImage && <PhotoNotFound>{defaultText}</PhotoNotFound>}

        {!!displayedImage && (
          <Image
            source={{ uri: displayedImage }}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
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
