import { parse, isValid, differenceInYears, isBefore, format } from 'date-fns'

export function checkBirthdayDate(value: string) {
  if (!value) {
    return false
  }

  // Parse the date string into a Date object
  const parsedDate = parse(value, 'dd/MM/yyyy', new Date())

  // Check if the parsed date is valid and matches the input value
  if (!isValid(parsedDate) || format(parsedDate, 'dd/MM/yyyy') !== value) {
    return false
  }

  // Check if the date is at least 18 years ago
  const age = differenceInYears(new Date(), parsedDate)
  if (age < 18) {
    return false
  }

  // Check if the date is not in the future
  if (isBefore(new Date(), parsedDate)) {
    return false
  }

  // Check if the date is within the last 100 years
  const hundredYearsAgo = new Date()
  hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100)
  if (isBefore(parsedDate, hundredYearsAgo)) {
    return false
  }

  return true
}
