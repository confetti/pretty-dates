'use strict';

var moment = require('moment-timezone');

var sameMonth = function sameMonth(start, end) {
  return end.month() === start.month();
};
var sameDayOrNight = function sameDayOrNight(start, end) {
  return end.isSame(start, 'day') || end.diff(start, 'hours') < 24 && end.hours() < 8;
};

module.exports = function (_ref, format) {
  var endDate = _ref.endDate,
      startDate = _ref.startDate,
      timeZone = _ref.timeZone,
      timeFormat = _ref.timeFormat,
      locale = _ref.locale,
      showTimeZone = _ref.showTimeZone;

  if (!timeZone) {
    timeZone = 'Europe/Stockholm';
  }
  if (!timeFormat) {
    timeFormat = '24';
  }
  if (!locale) {
    locale = 'en';
  }
  if (!format) {
    format = {
      month: 'MMM'
    };
  }

  var formatResult = void 0;

  var start = moment(startDate).locale(locale).tz(timeZone);
  var isCurrentYear = start.year() === moment().year();

  if (endDate) {
    var end = moment(endDate).locale(locale).tz(timeZone);

    if (sameDayOrNight(start, end)) {
      if (timeFormat && timeFormat === '12') {
        formatResult = '' + start.format('D ' + format.month) + (isCurrentYear ? '' : end.format(' YYYY')) + ' ' + start.format('hh:mmA') + '-' + end.format('hh:mmA');
      } else {
        formatResult = '' + start.format('D ' + format.month) + (isCurrentYear ? '' : end.format(' YYYY')) + ' ' + start.format('HH:mm') + '-' + end.format('HH:mm');
      }
    } else {
      if (sameMonth(start, end)) {
        formatResult = start.format('D') + '-' + end.format('D ' + format.month) + (isCurrentYear ? '' : end.format(' YYYY'));
      } else {
        formatResult = start.format('D ' + format.month) + ' - ' + end.format('D ' + format.month + (isCurrentYear ? '' : end.format(' YYYY')));
      }
    }
  } else {
    if (timeFormat && timeFormat === '12') {
      formatResult = '' + start.format('D ' + format.month) + (isCurrentYear ? '' : start.format(' YYYY')) + ' ' + start.format('hh:mmA');
    } else {
      formatResult = '' + start.format('D ' + format.month) + (isCurrentYear ? '' : start.format(' YYYY')) + ' ' + start.format('HH:mm');
    }
  }

  if (showTimeZone) {
    formatResult += ' ' + moment.tz(startDate, timeZone).format('z');
  }

  return formatResult;
};