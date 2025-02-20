import { differenceInYears } from 'date-fns'

export function diffInAge(data?: string) {
  if (!data) return
  const [dia, mes, ano] = data.split('/').map(Number)
  const nascimento = new Date(ano, mes - 1, dia) // Meses em JavaScript começam do 0
  const idadeCalculada = differenceInYears(new Date(), nascimento)

  return idadeCalculada
}
