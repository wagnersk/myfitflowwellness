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
import { IUser } from '@hooks/authTypes'
import { diffInAge } from '@utils/diffInAge'

interface FriendCardProps {
  friend: IUser
  openFriendProfile: (friend: IUser) => void
}

export default function FriendList({
  friend,
  openFriendProfile,
}: FriendCardProps) {
  console.log(`friend`, friend)
  function handleOpenFriendProfile(friend: IUser) {
    openFriendProfile(friend)
  }
  const theme = useTheme()

  return (
    <FriendCardWrapper onPress={() => handleOpenFriendProfile(friend)}>
      <FriendPhotoWrapper>
        <FriendPhotoImage />
        <FriendPhoto src={friend.photoBase64} />
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
