import React from 'react'
import { useTheme } from 'styled-components/native'
import Check from '@assets/Check.svg'
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

  onAccept: () => void
  onDecline: () => void
}

export default function FriendReceived({
  friend,
  onAccept,
  onDecline,
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
          <ActFriendButton onPress={onDecline}>
            <X width={36} height={36} fill={theme.COLORS.AUX_GOOGLE_RED} />
          </ActFriendButton>
          <ActFriendButton onPress={onAccept}>
            <Check
              width={36}
              height={36}
              stroke={theme.COLORS.AUX_GOOGLE_GREEN}
            />
          </ActFriendButton>
        </FriendEmailWrapper>
      </FriendContentWrapper>
    </FriendCardWrapper>
  )
}
