export const addDays = (date: Date, days: number) => {
  const newDate = date
  newDate.setDate(newDate.getDate() + days)
  return newDate
}
