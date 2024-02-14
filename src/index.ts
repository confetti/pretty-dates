import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import 'dayjs/locale/da'
import 'dayjs/locale/de'
import 'dayjs/locale/nb'
import 'dayjs/locale/sv'
import 'dayjs/locale/fr'
import 'dayjs/locale/ja'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)

import { Locale, TimeFormat, TimezoneAbbreviations } from './types'

const customTimeZoneAbbreviation = ({ timeZone, date }: { timeZone: string; date: Date }): string | undefined => {
  if (timeZone === 'GMT') return timeZone

  const timeZoneLong =
    new Intl.DateTimeFormat('en-US', { timeZoneName: 'long', timeZone })
      .formatToParts(date)
      .find((part: { type: string }) => part.type === 'timeZoneName')?.value ?? ''

  return (TimezoneAbbreviations as Record<string, string>)[timeZoneLong]
}

const sameMonth = (start: Dayjs, end: Dayjs): boolean => end.month() === start.month()
const sameDayOrNight = (start: Dayjs, end: Dayjs): boolean =>
  end.date() === start.date() || (end.diff(start, 'hour') < 24 && end.hour() < 8)

function prettyDates(
  {
    startDate,
    endDate,
    timeZone = 'Europe/Stockholm',
    timeFormat = TimeFormat.h24,
    locale = Locale.English,
    showTimeZone = false,
  }: {
    startDate: Date
    endDate?: Date | null
    timeZone?: string
    timeFormat?: TimeFormat
    locale?: Locale
    showTimeZone?: boolean
  },
  format: { month: string } = { month: 'MMM' }
): string {
  const start: Dayjs = dayjs(startDate).locale(locale).tz(timeZone)
  const isCurrentYear = start.year() === dayjs().year()

  const formatDate = (): string => {
    if (endDate) {
      const end = dayjs(endDate).locale(locale).tz(timeZone)

      if (sameDayOrNight(start, end)) {
        if (timeFormat === TimeFormat.h12) {
          return `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : end.format(' YYYY')} ${start.format(
            `hh:mmA`
          )}-${end.format('hh:mmA')}`
        } else {
          return `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : end.format(' YYYY')} ${start.format(
            'HH:mm'
          )}-${end.format('HH:mm')}`
        }
      } else {
        if (sameMonth(start, end)) {
          return `${start.format('D')}-${end.format(`D ${format.month}`)}${isCurrentYear ? '' : end.format(' YYYY')}`
        } else {
          return (
            start.format(`D ${format.month}`) +
            ' - ' +
            end.format(`D ${format.month}${isCurrentYear ? '' : end.format(' YYYY')}`)
          )
        }
      }
    } else {
      if (timeFormat === TimeFormat.h12) {
        return `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : start.format(' YYYY')} ${start.format(
          `hh:mmA`
        )}`
      } else {
        return `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : start.format(' YYYY')} ${start.format(
          `HH:mm`
        )}`
      }
    }
  }

  const formattedDate = formatDate()
  if (showTimeZone) {
    const shortAbbreviation = customTimeZoneAbbreviation({ timeZone, date: startDate })
    return formattedDate + ' ' + (shortAbbreviation || dayjs(startDate).tz(timeZone).format('z'))
  } else {
    return formattedDate
  }
}

export = prettyDates
