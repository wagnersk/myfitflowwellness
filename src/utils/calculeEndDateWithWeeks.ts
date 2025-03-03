import { format, addWeeks, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateToDDMMYYYY(date: Date): string {
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

export function formatTimestampToDDMMYYYY(timestamp: number): string {
  const date = new Date(timestamp)
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}
export function addWeeksToTimestamp(timestamp: number, weeks: number): number {
  const date = new Date(timestamp)
  const futureDate = addWeeks(date, weeks)
  return futureDate.getTime()
}

export function addDaysToTimestamp(timestamp: number, days: number): number {
  const date = new Date(timestamp)
  const futureDate = addDays(date, days)
  return futureDate.getTime()
}
