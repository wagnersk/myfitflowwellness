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
import User from '@assets/User.svg'
import { Photo } from '@components/Photo'

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
        {friend.photo && (
          <Photo size={48} defaultText={` `} photo={friend.photo} />
        )}
        {!friend.photo && <User width={44} height={44} fill={'#1B077F'} />}
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
