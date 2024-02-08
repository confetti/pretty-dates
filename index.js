'use strict';

var dayjs = require('dayjs');
require('dayjs/locale/da');
require('dayjs/locale/de');
require('dayjs/locale/nb');
require('dayjs/locale/sv');
require('dayjs/locale/fr');
require('dayjs/locale/ja');

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
var advancedFormat = require('dayjs/plugin/advancedFormat');
var customParseFormat = require('dayjs/plugin/customParseFormat');
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

var abbreviations = {
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
  'Australian Eastern Standard Time': 'AEST'
};

var customTimeZoneAbbreviation = function customTimeZoneAbbreviation(_ref) {
  var timeZone = _ref.timeZone,
      date = _ref.date;

  if (timeZone === 'GMT') return timeZone;

  var timeZoneLong = new Intl.DateTimeFormat('en-US', { timeZoneName: 'long', timeZone: timeZone }).formatToParts(date).find(function (part) {
    return part.type === 'timeZoneName';
  }).value;

  return abbreviations[timeZoneLong];
};

var sameMonth = function sameMonth(start, end) {
  return end.month() === start.month();
};
var sameDayOrNight = function sameDayOrNight(start, end) {
  return end.isSame(start, 'day') || end.diff(start, 'hour') < 24 && end.hour() < 8;
};

module.exports = function (_ref2, format) {
  var endDate = _ref2.endDate,
      startDate = _ref2.startDate,
      timeZone = _ref2.timeZone,
      timeFormat = _ref2.timeFormat,
      locale = _ref2.locale,
      showTimeZone = _ref2.showTimeZone;

  timeZone = timeZone || 'Europe/Stockholm';
  timeFormat = timeFormat || '24';
  locale = locale || 'en';
  format = format || { month: 'MMM' };

  var formatResult = void 0;

  var start = dayjs(startDate).locale(locale).tz(timeZone);
  var isCurrentYear = start.year() === dayjs().year();

  if (endDate) {
    var end = dayjs(endDate).locale(locale).tz(timeZone);

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
    var shortAbbreviation = customTimeZoneAbbreviation({ timeZone: timeZone, date: start });
    formatResult += ' ' + (shortAbbreviation || dayjs(startDate).tz(timeZone).format('z'));
  }

  return formatResult;
};