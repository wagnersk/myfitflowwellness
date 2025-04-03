import React from 'react'
import { useTheme } from 'styled-components/native'
import X from '@assets/X.svg'
import { diffInAge } from '@utils/diffInAge'

import {
  FriendCardWrapper,
  FriendPhotoWrapper,
  FriendContentWrapper,
  FriendNameWrapper,
  FriendNameText,
  FriendEmailWrapper,
  ActFriendButton,
  FriendPhoto,
} from './styles'
import { IUser } from '@hooks/authTypes'

interface FriendCardProps {
  friend: IUser

  onCancelRequest: () => void
}

export default function FriendRequest({
  friend,
  onCancelRequest,
}: FriendCardProps) {
  const theme = useTheme()

  const friendUpperFirstLetter =
    friend.name.charAt(0).toUpperCase() + friend.name.slice(1)

  return (
    <FriendCardWrapper>
      <FriendPhotoWrapper>
        <FriendPhoto src={friend.photo} />
      </FriendPhotoWrapper>
      <FriendContentWrapper>
        <FriendNameWrapper>
          <FriendNameText>{`${friendUpperFirstLetter}, ${diffInAge(friend?.birthdate)}`}</FriendNameText>
        </FriendNameWrapper>
        <FriendEmailWrapper>
          <ActFriendButton onPress={onCancelRequest}>
            <X width={36} height={36} fill={theme.COLORS.AUX_GOOGLE_RED} />
          </ActFriendButton>
        </FriendEmailWrapper>
      </FriendContentWrapper>
    </FriendCardWrapper>
  )
}
