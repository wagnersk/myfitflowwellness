import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Container, PhotoBorderWrapper, PhotoNotFound } from './styles'
import { useAuth } from '@hooks/auth'

type Props = {
  defaultText: string
  photo: string | null
  newDefaultPhoto?: string
}

export function Photo({ photo, newDefaultPhoto, defaultText }: Props) {
  const { user } = useAuth()
  const [displayedImage, setDisplayedImage] = useState<string | null>(
    photo || null,
  )
  console.log('photo', photo)
  console.log('newDefaultPhoto', newDefaultPhoto)
  const imageKeyRef = useRef(false)

  useEffect(() => {
    imageKeyRef.current = !imageKeyRef.current
  }, [user?.photo])

  useEffect(() => {
    setDisplayedImage(newDefaultPhoto || photo || null)
  }, [newDefaultPhoto, photo])

  return (
    <Container>
      <PhotoBorderWrapper>
        {!displayedImage && <PhotoNotFound>{defaultText}</PhotoNotFound>}

        {!!displayedImage && (
          <Image
            source={{ uri: displayedImage }}
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
