import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'

export function getFormattedDate(
  timestamp: number | { seconds: number } | undefined | null,
  language: 'pt-br' | 'us',
) {
  if (!timestamp) return ''

  let date: Date

  if (typeof timestamp === 'number') {
    // Handles Unix timestamp in milliseconds
    date = new Date(timestamp)
  } else if (typeof timestamp === 'object' && 'seconds' in timestamp) {
    // Handles Firestore Timestamp object
    date = new Date(timestamp.seconds * 1000)
  } else {
    return ''
  }

  // Check if the created date is valid
  if (isNaN(date.getTime())) {
    return ''
  }

  return language === 'pt-br'
    ? format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    : format(date, "MM/dd/yyyy 'at' hh:mm a", { locale: enUS })
}
