var moment = require('moment-timezone');

var sameDayOrNight = function(start, end) {
  return (end.isSame(start, 'day') || ((end.diff(start, 'hours') < 24) && end.hours() < 8));
};

module.exports = function({endDate, startDate, timeZone, timeFormat, locale}, format) {
  if (!timeZone) { timeZone = 'Europe/Stockholm'; }
  if (!timeFormat) { timeFormat = '24'; }
  if (!locale) { locale = 'en'; }
  if (!format) {
    format = {
      month: 'MMM'
    };
  }
  var start = moment(startDate).locale(locale).tz(timeZone);
  if (endDate) {
    var end = moment(endDate).locale(locale).tz(timeZone);
    if (start.isSame(end,'month')) {
      if (sameDayOrNight(start, end)) {
        if (timeFormat && timeFormat === '12') {
          return start.format('D '+format.month+' hh:mm A') + ' - ' + end.format('hh:mm A');
        } else {
          return start.format('D '+format.month+' HH:mm') + ' - ' + end.format('HH:mm');
        }
      } else {
        return start.format('D') + ' - ' + end.format('D '+format.month+'');
      }
    } else {
      return start.format('D '+format.month+'') + ' - ' + end.format('D '+format.month+'');
    }
  } else {
    if (timeFormat && timeFormat === '12') {
      return start.format('D '+format.month+' hh:mm A');
    } else {
      return start.format('D '+format.month+' HH:mm');
    }
  }
};
