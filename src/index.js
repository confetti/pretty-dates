const moment = require('moment-timezone')

const sameMonth = (start, end) => end.month() === start.month()
const sameDayOrNight = (start, end) => end.isSame(start, 'day') || (end.diff(start, 'hours') < 24 && end.hours() < 8)

module.exports = function ({ endDate, startDate, timeZone, timeFormat, locale, showTimeZone }, format) {
  if (!timeZone) {
    timeZone = 'Europe/Stockholm'
  }
  if (!timeFormat) {
    timeFormat = '24'
  }
  if (!locale) {
    locale = 'en'
  }
  if (!format) {
    format = {
      month: 'MMM',
    }
  }

  let formatResult

  const start = moment(startDate).locale(locale).tz(timeZone)
  const isCurrentYear = start.year() === moment().year()

  if (endDate) {
    const end = moment(endDate).locale(locale).tz(timeZone)

    if (sameDayOrNight(start, end)) {
      if (timeFormat && timeFormat === '12') {
        formatResult = `${start.format(`D ${format.month} hh:mmA`)}-${end.format('hh:mmA')}${
          isCurrentYear ? '' : end.format(' YYYY')
        }`
      } else {
        formatResult = `${start.format(`D ${format.month}`)}${
          isCurrentYear ? '' : end.format(' YYYY -')
        } ${start.format('HH:mm')}-${end.format('HH:mm')}`
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
      formatResult = `${start.format(`D ${format.month}`)}${
        isCurrentYear ? '' : start.format(' YYYY -')
      } ${start.format(`hh:mm A`)}`
    } else {
      formatResult = `${start.format(`D ${format.month}`)}${
        isCurrentYear ? '' : start.format(' YYYY -')
      } ${start.format(`HH:mm`)}`
    }
  }

  if (showTimeZone) {
    formatResult += ' ' + moment.tz(startDate, timeZone).format('z')
  }

  return formatResult
}
