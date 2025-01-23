import {
  ButtonWrapper,
  ContentWrapper,
  IconWrapper,
  ListTitle,
  ListTitleWrapper,
} from './styles'
import Question from '@assets/Question.svg'
import Forward from '@assets/Forward.svg'
import Email from '@assets/Email.svg'
import Trash from '@assets/Trash.svg'

interface Props {
  bordertype?: 'up' | 'down' | 'up-down'
  tittle: string
  onPress: () => void
  iconStyle?: 'email' | 'question' | 'trash' | 'none'
}

export function WhiteButton({ onPress, tittle, bordertype, iconStyle }: Props) {
  return (
    <ButtonWrapper
      iconStyle={iconStyle}
      bordertype={bordertype}
      onPress={onPress}
    >
      <ContentWrapper>
        <ListTitleWrapper>
          <IconWrapper>
            {iconStyle === 'question' && (
              <Question width={36} height={36} fill={'#0c17bb'} />
            )}
            {iconStyle === 'trash' && (
              <Trash width={32} height={32} stroke={'red'} strokeWidth={1.5} />
            )}
            {iconStyle === 'email' && (
              <Email
                width={42}
                height={42}
                stroke={'#0c17bb'}
                strokeWidth={1.5}
              />
            )}
          </IconWrapper>
          <ListTitle iconStyle={iconStyle}>{tittle}</ListTitle>
        </ListTitleWrapper>
        <IconWrapper>
          {iconStyle !== 'trash' && iconStyle !== 'none' && (
            <Forward width={36} height={36} stroke={'#1B077F'} />
          )}
        </IconWrapper>
      </ContentWrapper>
    </ButtonWrapper>
  )
}
