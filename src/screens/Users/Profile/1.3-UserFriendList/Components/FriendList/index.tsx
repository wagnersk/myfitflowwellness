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
  console.log(`friend`, friend.photo)
  return (
    <FriendCardWrapper onPress={() => handleOpenFriendProfile(friend)}>
      <FriendPhotoWrapper>
        {friend.photo && (
          <FriendPhoto
            src={
              'https://firebasestorage.googleapis.com/v0/b/myfitflow-cfc19.appspot.com/o/users%2FZexne8NhochhK1KL6R75AWbSVjd2%2Fphoto%2FZexne8NhochhK1KL6R75AWbSVjd2?alt=media&token=3a618e81-345f-4b0c-b23b-701806a08a95'
            }
          />
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
