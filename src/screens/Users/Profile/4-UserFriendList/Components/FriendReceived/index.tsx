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
} from './styles'

interface FriendCardProps {
  friendIndex: number
  friendName: string
  friendAge: number | undefined
  onAccept: () => void
  onDecline: () => void
}

export default function FriendReceived({
  friendIndex,
  friendName,
  friendAge,
  onAccept,
  onDecline,
}: FriendCardProps) {
  const theme = useTheme()

  const friendUpperFirstLetter =
    friendName.charAt(0).toUpperCase() + friendName.slice(1)

  return (
    <FriendCardWrapper key={friendIndex}>
      <FriendPhotoWrapper>
        <FriendPhotoImage />
        {/*  <FriendPhoto src="https://www.google.com/url?sa=i&url=https%3A%2F%2Foglobo.globo.com%2Fsaber-viver%2Ftudo-que-voce-precisa-saber-sobre-dor-de-cabeca-23307264&psig=AOvVaw1Yu1vHnqqZjDFOO-7BD5aT&ust=1739768198265000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDPhd-zx4sDFQAAAAAdAAAAABAE" /> */}
      </FriendPhotoWrapper>
      <FriendContentWrapper>
        <FriendNameWrapper>
          <FriendNameText>{`${friendUpperFirstLetter}, ${friendAge}`}</FriendNameText>
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
