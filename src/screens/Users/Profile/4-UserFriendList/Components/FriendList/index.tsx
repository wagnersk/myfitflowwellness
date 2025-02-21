import React from 'react'
import { useTheme } from 'styled-components/native'

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
import { SignInProps } from '@hooks/authTypes'
import { diffInAge } from '@utils/diffInAge'

interface FriendCardProps {
  friend: SignInProps
  openFriendProfile: (friend: SignInProps) => void
}

export default function FriendList({
  friend,
  openFriendProfile,
}: FriendCardProps) {
  console.log(`friend`, friend)
  function handleOpenFriendProfile(friend: SignInProps) {
    openFriendProfile(friend)
  }
  const theme = useTheme()

  return (
    <FriendCardWrapper onPress={() => handleOpenFriendProfile(friend)}>
      <FriendPhotoWrapper>
        <FriendPhotoImage />
        {/*         <FriendPhoto src="https://www.google.com/url?sa=i&url=https%3A%2F%2Foglobo.globo.com%2Fsaber-viver%2Ftudo-que-voce-precisa-saber-sobre-dor-de-cabeca-23307264&psig=AOvVaw1Yu1vHnqqZjDFOO-7BD5aT&ust=1739768198265000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDPhd-zx4sDFQAAAAAdAAAAABAE" />
         */}
      </FriendPhotoWrapper>

      <FriendContentWrapper>
        <FriendNameWrapper>
          <FriendNameText>{`${friend.name}, ${diffInAge(friend?.birthdate)}`}</FriendNameText>
        </FriendNameWrapper>
        <FriendEmailWrapper>
          <FriendEmailText>{friend.email}</FriendEmailText>
        </FriendEmailWrapper>
      </FriendContentWrapper>
    </FriendCardWrapper>
  )
}
