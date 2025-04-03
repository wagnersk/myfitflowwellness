import React from 'react'

import {
  FriendCardWrapper,
  FriendPhotoWrapper,
  FriendContentWrapper,
  FriendNameWrapper,
  FriendNameText,
  FriendEmailWrapper,
  FriendPhoto,
  FriendEmailText,
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
  function handleOpenFriendProfile(friend: IUser) {
    openFriendProfile(friend)
  }

  return (
    <FriendCardWrapper onPress={() => handleOpenFriendProfile(friend)}>
      <FriendPhotoWrapper>
        <FriendPhoto src={friend.photo} />
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
