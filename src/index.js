const dayjs = require('dayjs')
require('dayjs/locale/da')
require('dayjs/locale/de')
require('dayjs/locale/nb')
require('dayjs/locale/sv')
require('dayjs/locale/fr')
require('dayjs/locale/ja')

const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const advancedFormat = require('dayjs/plugin/advancedFormat')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)

const abbreviations = {
  'Central European Standard Time': 'CET',
  'Central European Summer Time': 'CEST',
  'Eastern European Standard Time': 'EET',
  'Eastern European Summer Time': 'EEST',
  'British Summer Time': 'BST',
  'Greenwich Mean Time': 'GMT',
  'Eastern Daylight Time': 'EDT',
  'Eastern Standard Time': 'EST',
  'Central Africa Time': 'CAT',
  'East Africa Time': 'EAT',
  'Pacific Daylight Time': 'PDT',
  'Pacific Standard Time': 'PST',
  'Central Daylight Time': 'CDT',
  'Central Standard Time': 'CST',
  'Australian Eastern Daylight Time': 'AEDT',
  'Australian Eastern Standard Time': 'AEST',
}

const customTimeZoneAbbreviation = ({ timeZone, date }) => {
  if (timeZone === 'GMT') return timeZone

  const timeZoneLong = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long', timeZone })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName').value

  return abbreviations[timeZoneLong]
}

const sameMonth = (start, end) => end.month() === start.month()
const sameDayOrNight = (start, end) => end.isSame(start, 'day') || (end.diff(start, 'hour') < 24 && end.hour() < 8)

module.exports = function ({ endDate, startDate, timeZone, timeFormat, locale, showTimeZone }, format) {
  timeZone = timeZone || 'Europe/Stockholm'
  timeFormat = timeFormat || '24'
  locale = locale || 'en'
  format = format || { month: 'MMM' }

  let formatResult

  const start = dayjs(startDate).locale(locale).tz(timeZone)
  const isCurrentYear = start.year() === dayjs().year()

  if (endDate) {
    const end = dayjs(endDate).locale(locale).tz(timeZone)

    if (sameDayOrNight(start, end)) {
      if (timeFormat && timeFormat === '12') {
        formatResult = `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : end.format(' YYYY')} ${start.format(
          `hh:mmA`
        )}-${end.format('hh:mmA')}`
      } else {
        formatResult = `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : end.format(' YYYY')} ${start.format(
          'HH:mm'
        )}-${end.format('HH:mm')}`
      }
    } else {
      if (sameMonth(start, end)) {
        formatResult = `${start.format('D')}-${end.format(`D ${format.month}`)}${
          isCurrentYear ? '' : end.format(' YYYY')
        }`
      } else {
        formatResult =
          start.format(`D ${format.month}`) +
          ' - ' +
          end.format(`D ${format.month}${isCurrentYear ? '' : end.format(' YYYY')}`)
      }
    }
  } else {
    if (timeFormat && timeFormat === '12') {
      formatResult = `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : start.format(' YYYY')} ${start.format(
        `hh:mmA`
      )}`
    } else {
      formatResult = `${start.format(`D ${format.month}`)}${isCurrentYear ? '' : start.format(' YYYY')} ${start.format(
        `HH:mm`
      )}`
    }
  }

  if (showTimeZone) {
    const shortAbbreviation = customTimeZoneAbbreviation({ timeZone, date: start })
    formatResult += ' ' + (shortAbbreviation || dayjs(startDate).tz(timeZone).format('z'))
  }

  return formatResult
}
