const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

const padDatePart = (value: string) => value.padStart(2, '0')

const isValidIsoDate = (value: string) => {
  if (!isoDatePattern.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

export const toDateInputValue = (value?: string | null) => {
  if (!value) {
    return ''
  }

  const trimmed = value.trim()

  if (isValidIsoDate(trimmed)) {
    return trimmed
  }

  const slashMatch = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)

  if (!slashMatch) {
    return ''
  }

  const [, first, second, year] = slashMatch
  const firstNumber = Number(first)
  const secondNumber = Number(second)

  if (firstNumber > 12) {
    return `${year}-${padDatePart(second)}-${padDatePart(first)}`
  }

  if (secondNumber > 12) {
    return `${year}-${padDatePart(first)}-${padDatePart(second)}`
  }

  return `${year}-${padDatePart(first)}-${padDatePart(second)}`
}
