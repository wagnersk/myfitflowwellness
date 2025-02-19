import React from 'react'
import { useTheme } from 'styled-components/native'
import Check from '@assets/Check.svg'
import X from '@assets/X.svg'

import {
  FriendCardWrapper,
  FriendPhotoWrapper,
  FriendPhotoImage,
  FriendContentWrapper,
  FriendNameWrapper,
  FriendNameText,
  FriendEmailWrapper,
  ActFriendButton,
  FriendPhoto,
  FriendEmailText,
  ActButtonWrapper,
  FriendCardInfoWrapper,
  FriendCardLineDivisor,
} from './styles'

interface FriendCardProps {
  friendIndex: number
  friendName: string
  friendAge: number | undefined
  openFriendProfile: (friendIndex: number) => void
}

export default function FriendList({
  friendIndex,
  friendName,
  friendAge,
  openFriendProfile,
}: FriendCardProps) {
  function handleOpenFriendProfile(friendIndex: number) {
    console.log('Friend index:', friendIndex)
    openFriendProfile(friendIndex)
  }
  const theme = useTheme()

  return (
    <FriendCardWrapper
      key={friendIndex}
      onPress={() => handleOpenFriendProfile(friendIndex)}
    >
      <FriendPhotoWrapper>
        <FriendPhotoImage />
        {/*         <FriendPhoto src="https://www.google.com/url?sa=i&url=https%3A%2F%2Foglobo.globo.com%2Fsaber-viver%2Ftudo-que-voce-precisa-saber-sobre-dor-de-cabeca-23307264&psig=AOvVaw1Yu1vHnqqZjDFOO-7BD5aT&ust=1739768198265000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDPhd-zx4sDFQAAAAAdAAAAABAE" />
         */}
      </FriendPhotoWrapper>

      <FriendContentWrapper>
        <FriendNameWrapper>
          <FriendNameText>{`${friendName}, ${friendAge}`}</FriendNameText>
        </FriendNameWrapper>
        <FriendEmailWrapper>
          <FriendEmailText>wagnereletroskateet@gmail.com</FriendEmailText>
        </FriendEmailWrapper>
      </FriendContentWrapper>
    </FriendCardWrapper>
  )
}
