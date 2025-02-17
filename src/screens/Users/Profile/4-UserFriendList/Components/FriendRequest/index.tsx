import React from 'react'
import { useTheme } from 'styled-components/native'
import Check from '@assets/Check.svg'
import X from '@assets/x.svg'

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

export default function FriendRequest({
  friendIndex,
  friendName,
  friendAge,
  onAccept,
  onDecline,
}: FriendCardProps) {
  const theme = useTheme()

  return (
    <FriendCardWrapper key={friendIndex}>
      <FriendPhotoWrapper>
        <FriendPhotoImage />
        {/*  <FriendPhoto src="https://www.google.com/url?sa=i&url=https%3A%2F%2Foglobo.globo.com%2Fsaber-viver%2Ftudo-que-voce-precisa-saber-sobre-dor-de-cabeca-23307264&psig=AOvVaw1Yu1vHnqqZjDFOO-7BD5aT&ust=1739768198265000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDPhd-zx4sDFQAAAAAdAAAAABAE" /> */}
      </FriendPhotoWrapper>
      <FriendContentWrapper>
        <FriendNameWrapper>
          <FriendNameText>{`${friendName}, ${friendAge}`}</FriendNameText>
        </FriendNameWrapper>
        <FriendEmailWrapper>
          <ActFriendButton onPress={onDecline}>
            <X width={42} height={42} fill={theme.COLORS.AUX_GOOGLE_RED} />
          </ActFriendButton>
          <ActFriendButton onPress={onAccept}>
            <Check
              width={42}
              height={42}
              stroke={theme.COLORS.AUX_GOOGLE_GREEN}
            />
          </ActFriendButton>
        </FriendEmailWrapper>
      </FriendContentWrapper>
    </FriendCardWrapper>
  )
}
