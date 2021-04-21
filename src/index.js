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

  if (endDate) {
    const end = moment(endDate).locale(locale).tz(timeZone)
    if (sameMonth(start, end)) {
      if (sameDayOrNight(start, end)) {
        if (timeFormat && timeFormat === '12') {
          formatResult = start.format('D ' + format.month + ' hh:mm A') + ' - ' + end.format('hh:mm A')
        } else {
          formatResult = start.format('D ' + format.month + ' HH:mm') + ' - ' + end.format('HH:mm')
        }
      } else {
        formatResult = start.format('D') + ' - ' + end.format('D ' + format.month + '')
      }
    } else {
      formatResult = start.format('D ' + format.month + '') + ' - ' + end.format('D ' + format.month + '')
    }
  } else {
    if (timeFormat && timeFormat === '12') {
      formatResult = start.format('D ' + format.month + ' hh:mm A')
    } else {
      formatResult = start.format('D ' + format.month + ' HH:mm')
    }
  }

  if (showTimeZone) {
    formatResult += ' ' + moment.tz(startDate, timeZone).format('z')
  }

  return formatResult
}
