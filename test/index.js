var moment = require('moment-timezone');

var expect = require('chai').expect;
var prettyDates = require('../src/');

describe('Pretty dates', function() {

  it('should handle AM same day', function() {
    var dates = prettyDates({
      startDate: moment('2015-02-08 09:30:00').toDate(),
      endDate: moment('2015-02-08 10:30:00').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12'
    });
    expect(dates).to.equal('8 Feb 09:30 AM - 10:30 AM');
  });

  it('should handle AM on two days', function() {
    var dates = prettyDates({
      startDate: moment('2015-02-08 09:30:00').toDate(),
      endDate: moment('2015-02-09 10:30:00').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12'
    });
    expect(dates).to.equal('8 - 9 Feb');
  });

  it('should handle 24 hours same day', function() {
    var dates = prettyDates({
      startDate: moment('2015-02-08 09:30:00').toDate(),
      endDate: moment('2015-02-08 10:30:00').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24'
    });
    expect(dates).to.equal('8 Feb 09:30 - 10:30');
  });

  it('should handle events that end late', function() {
    var dates = prettyDates({
      startDate: moment('2015-02-08 21:00:00').toDate(),
      endDate: moment('2015-02-09 03:00:00').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24'
    });
    expect(dates).to.equal('8 Feb 21:00 - 03:00');
  });

  it('should handle single day events with 24h clock', function() {
    var dates = prettyDates({
      startDate: moment('2015-02-08 21:00:00').toDate(),
      endDate: null,
      timeZone: 'Europe/Berlin',
      timeFormat: '24'
    });
    expect(dates).to.equal('8 Feb 21:00');
  });

  it('should handle single day events with 12h clock', function() {
    var dates = prettyDates({
      startDate: moment('2015-02-08 21:00:00').toDate(),
      endDate: null,
      timeZone: 'Europe/Berlin',
      timeFormat: '12'
    });
    expect(dates).to.equal('8 Feb 09:00 PM');
  });
});

