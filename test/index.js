const moment = require('moment-timezone')

const { expect } = require('chai')
const prettyDates = require('../src/')

describe('Pretty dates', function () {
  it('should handle AM same day', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
      endDate: moment.tz('2015-02-08 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8 Feb 09:30 AM - 10:30 AM')
  })

  it('should handle AM on two days', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
      endDate: moment.tz('2015-02-09 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8 - 9 Feb')
  })

  it('should handle dates that start on same week day but different weeks', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-07-03 10:30:00', 'Europe/Berlin').toDate(),
      endDate: moment.tz('2015-07-10 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('3 - 10 Jul')
  })

  it('should handle 24 hours same day', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
      endDate: moment.tz('2015-02-08 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 09:30 - 10:30')
  })

  it('should handle events that end late', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      endDate: moment.tz('2015-02-09 03:00:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 21:00 - 03:00')
  })

  it('should handle single day events with 24h clock', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      endDate: null,
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 21:00')
  })

  it('should handle single day events with 12h clock', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      endDate: null,
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8 Feb 09:00 PM')
  })

  it('should handle locales', function () {
    const dateEN = prettyDates({
      startDate: moment.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      locale: 'en',
    })
    expect(dateEN).to.equal('8 Feb 21:00')

    const dateSV = prettyDates({
      startDate: moment.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      locale: 'sv',
    })
    expect(dateSV).to.equal('8 feb 21:00')
  })

  it('should handle custom month format', function () {
    const dates = prettyDates(
      {
        startDate: moment.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
        endDate: moment.tz('2015-02-09 10:30:00', 'Europe/Berlin').toDate(),
        timeZone: 'Europe/Berlin',
        timeFormat: '12',
      },
      { month: 'MMMM' }
    )
    expect(dates).to.equal('8 - 9 February')
  })

  it('should show time zone', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-02-09 09:30:00', 'America/New_York').toDate(),
      endDate: moment.tz('2015-02-09 10:30:00', 'America/New_York').toDate(),
      timeZone: 'America/New_York',
      timeFormat: '24',
      showTimeZone: true,
    })
    expect(dates).to.equal('9 Feb 09:30 - 10:30 EST')
  })

  it('should show summer time', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-06-06 09:30:00', 'Europe/Berlin').toDate(),
      endDate: moment.tz('2015-06-06 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
      showTimeZone: true,
    })
    expect(dates).to.equal('6 Jun 09:30 - 10:30 CEST')
  })

  it('should show winter time', function () {
    const dates = prettyDates({
      startDate: moment.tz('2015-12-06 09:30:00', 'Europe/Berlin').toDate(),
      endDate: moment.tz('2015-12-06 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
      showTimeZone: true,
    })
    expect(dates).to.equal('6 Dec 09:30 - 10:30 CET')
  })
})
