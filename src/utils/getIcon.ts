import Email from '../assets/Email.svg'
import Password from '../assets/Password.svg'
import Google from '../assets/Google.svg'
import Profile from '../assets/Profile.svg'
import Whatsapp from '../assets/Whatsapp.svg'
import Calendar from '../assets/Calendar.svg'
import ItemSeparatorSvg from '../assets/ItemSeparatorSvg.svg'
import Check from '../assets/Check.svg'
import Clock from '../assets/Clock.svg'
import Calendardots from '../assets/Calendar-dots.svg'
import CheckCircle from '../assets/Check-circle.svg'
import SquaresFour from '../assets/Squares-four.svg'
import Steps from '../assets/Steps.svg'
import Female from '../assets/Gender-female.svg'
import Male from '../assets/Gender-male.svg'
import All from '../assets/Gender-intersex.svg'
import Crosshair from '../assets/Crosshair.svg'
import Lock from '../assets/Lock-simple-fill.svg'

export function getIcon(type: string) {
  switch (type) {
    case 'email':
      return Email
    case 'password':
      return Password
    case 'google':
      return Google
    case 'profile':
      return Profile
    case 'itemseparatorsvg':
      return ItemSeparatorSvg
    case 'whatsapp':
      return Whatsapp
    case 'calendar':
      return Calendar
    case 'check':
      return Check
    case 'clock':
      return Clock
    case 'calendar-dots':
      return Calendardots
    case 'check-circle':
      return CheckCircle
    case 'squares-four':
      return SquaresFour
    case 'steps':
      return Steps
    case 'gender-female':
      return Female
    case 'gender-male':
      return Male
    case 'gender-intersex':
      return All
    case 'crosshair':
      return Crosshair
    case 'premium':
      return Lock
    case 'free':
      return ''

    default:
      throw new Error(`Icon type "${type}" not recognized.`)
  }
}
