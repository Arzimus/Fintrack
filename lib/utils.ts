import { type ClassValue, clsx } from "clsx"
import exp from "constants"
import { eachDayOfInterval, isSameDay } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000
}
export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000)
}
export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

export function calcultePercentChange(current: number, previous: number) {
  if (current === null) current = 0;
  if (previous === null) previous = 0;
  if (previous === 0) {
    return (previous === current) ? 0 : 100
  }
  return ((current - previous) / previous) * 100
}

export function fillMissingDays(
  activeDays: {
    date: Date,
    income: Number,
    expenses: Number
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length == 0) {
    return []
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  })
  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day))

    if (found) {
      return found;
    }
    else return {
      date: day,
      income: 0,
      expenses: 0
    }
  })

  return transactionsByDay
}