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
import Headset from '@assets/Headset.svg'
import Crown from '@assets/Crown.svg'
import ShieldCheck from '@assets/ShieldCheck.svg'
import Scroll from '@assets/Scroll.svg'
import Heartbeat from '@assets/Heartbeat.svg'
import Crosshair from '@assets/Crosshair.svg'
import Clock from '@assets/Clock.svg'
import CheckCircle from '@assets/Check-circle.svg'
import Calendar from '@assets/Calendar.svg'
import PersonSimple from '@assets/Person-simple.svg'
import Users from '@assets/Users.svg'
import Barbell from '@assets/Barbell.svg'
import Camera from '@assets/Camera.svg'
import Settings from '@assets/Settings.svg'
import BoxingGlove from '@assets/BoxingGlove.svg'
import Trophy from '@assets/Trophy.svg'

interface Props {
  bordertype?: 'up' | 'down' | 'up-down' | 'none'
  tittle: string
  onPress: (data?: string) => void
  iconStyle?:
    | 'trophy'
    | 'email'
    | 'question'
    | 'trash'
    | 'support'
    | 'plan'
    | 'terms'
    | 'privacy'
    | 'anamnese'
    | 'crosshair'
    | 'checkcicle'
    | 'calendar'
    | 'clock'
    | 'person-simple'
    | 'friendlist'
    | 'none'
    | 'barbell'
    | 'camera'
    | 'settings'
    | 'boxing-glove'
}

export function WhiteButton({ onPress, tittle, bordertype, iconStyle }: Props) {
  return (
    <ButtonWrapper
      iconStyle={iconStyle}
      bordertype={bordertype}
      onPress={() => {
        onPress()
      }}
    >
      <ContentWrapper>
        <ListTitleWrapper>
          <IconWrapper>
            {iconStyle === 'trophy' && (
              <Trophy width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'boxing-glove' && (
              <BoxingGlove
                width={28}
                height={28}
                fill={'#0c17bb'}
                transform="rotate(90)"
              />
            )}
            {iconStyle === 'settings' && (
              <Settings
                width={36}
                height={36}
                strokeWidth="1.5"
                stroke={'#0c17bb'}
              />
            )}
            {iconStyle === 'barbell' && (
              <Barbell width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'camera' && (
              <Camera width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'friendlist' && (
              <Users width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'person-simple' && (
              <PersonSimple width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'clock' && (
              <Clock width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'calendar' && (
              <Calendar width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'checkcicle' && (
              <CheckCircle width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'crosshair' && (
              <Crosshair width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'anamnese' && (
              <Heartbeat width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'privacy' && (
              <ShieldCheck width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'terms' && (
              <Scroll width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'plan' && (
              <Crown width={28} height={28} fill={'#0c17bb'} />
            )}
            {iconStyle === 'support' && (
              <Headset width={28} height={28} fill={'#0c17bb'} />
            )}
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
                strokeWidth={1.2}
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
