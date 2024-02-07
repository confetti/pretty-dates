const dayjs = require('dayjs')

const { expect } = require('chai')
const prettyDates = require('../src/')
const year = dayjs().year()

describe('Pretty dates', function () {
  it('should handle AM same day', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
      endDate: dayjs.tz('2015-02-08 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8 Feb 2015 09:30AM-10:30AM')
  })
  it('should handle AM same day, same year', function () {
    const dates = prettyDates({
      startDate: dayjs.tz(`${year}-02-08 09:30:00`, 'Europe/Berlin').toDate(),
      endDate: dayjs.tz(`${year}-02-08 10:30:00`, 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8 Feb 09:30AM-10:30AM')
  })

  it('should handle AM on two days', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
      endDate: dayjs.tz('2015-02-09 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8-9 Feb 2015')
  })
  it('should handle AM on two days, same year', function () {
    const dates = prettyDates({
      startDate: dayjs.tz(`${year}-02-08 09:30:00`, 'Europe/Berlin').toDate(),
      endDate: dayjs.tz(`${year}-02-09 10:30:00`, 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8-9 Feb')
  })

  it('should handle dates that start on same week day but different weeks', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-07-03 10:30:00', 'Europe/Berlin').toDate(),
      endDate: dayjs.tz('2015-07-10 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('3-10 Jul 2015')
  })

  it('should handle 24 hours same day', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
      endDate: dayjs.tz('2015-02-08 10:30:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 2015 09:30-10:30')
  })
  it('should handle 24 hours same day, same year', function () {
    const dates = prettyDates({
      startDate: dayjs.tz(`${year}-02-08 09:30:00`, 'Europe/Berlin').toDate(),
      endDate: dayjs.tz(`${year}-02-08 10:30:00`, 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 09:30-10:30')
  })

  it('should handle events that end late', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      endDate: dayjs.tz('2015-02-09 03:00:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 2015 21:00-03:00')
  })

  it('should handle events that end late with different months', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-03-31 21:00:00', 'Europe/Berlin').toDate(),
      endDate: dayjs.tz('2015-04-01 03:00:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('31 Mar 2015 21:00-03:00')
  })
  it('should handle events that end late with different months, same year', function () {
    const dates = prettyDates({
      startDate: dayjs.tz(`${year}-03-31 21:00:00`, 'Europe/Berlin').toDate(),
      endDate: dayjs.tz(`${year}-04-01 03:00:00`, 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('31 Mar 21:00-03:00')
  })

  it('should handle events that end on different months', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-03-31 21:00:00', 'Europe/Berlin').toDate(),
      endDate: dayjs.tz('2015-04-03 03:00:00', 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('31 Mar - 3 Apr 2015')
  })
  it('should handle events that end on different months, same year', function () {
    const dates = prettyDates({
      startDate: dayjs.tz(`${year}-03-31 21:00:00`, 'Europe/Berlin').toDate(),
      endDate: dayjs.tz(`${year}-04-03 03:00:00`, 'Europe/Berlin').toDate(),
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('31 Mar - 3 Apr')
  })

  it('should handle single day events with 24h clock', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      endDate: null,
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 2015 21:00')
  })
  it('should handle single day events with 24h clock, same year', function () {
    const dates = prettyDates({
      startDate: dayjs.tz(`${year}-02-08 21:00:00`, 'Europe/Berlin').toDate(),
      endDate: null,
      timeZone: 'Europe/Berlin',
      timeFormat: '24',
    })
    expect(dates).to.equal('8 Feb 21:00')
  })

  it('should handle single day events with 12h clock', function () {
    const dates = prettyDates({
      startDate: dayjs.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      endDate: null,
      timeZone: 'Europe/Berlin',
      timeFormat: '12',
    })
    expect(dates).to.equal('8 Feb 2015 09:00PM')
  })

  it('should handle locales', function () {
    const dateEN = prettyDates({
      startDate: dayjs.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      locale: 'en',
    })
    expect(dateEN).to.equal('8 Feb 2015 21:00')

    const dateSV = prettyDates({
      startDate: dayjs.tz('2015-02-08 21:00:00', 'Europe/Berlin').toDate(),
      locale: 'sv',
    })
    expect(dateSV).to.equal('8 feb 2015 21:00')
  })

  it('should handle custom month format', function () {
    const dates = prettyDates(
      {
        startDate: dayjs.tz('2015-02-08 09:30:00', 'Europe/Berlin').toDate(),
        endDate: dayjs.tz('2015-02-09 10:30:00', 'Europe/Berlin').toDate(),
        timeZone: 'Europe/Berlin',
        timeFormat: '12',
      },
      { month: 'MMMM' }
    )
    expect(dates).to.equal('8-9 February 2015')
  })

  describe('Time zones', function () {
    it('should show time zone', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-02-09 09:30:00', 'America/New_York').toDate(),
        endDate: dayjs.tz('2015-02-09 10:30:00', 'America/New_York').toDate(),
        timeZone: 'America/New_York',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('9 Feb 2015 09:30-10:30 EST')
    })
    it('should show time zone, same year', function () {
      const dates = prettyDates({
        startDate: dayjs.tz(`${year}-02-09 09:30:00`, 'America/New_York').toDate(),
        endDate: dayjs.tz(`${year}-02-09 10:30:00`, 'America/New_York').toDate(),
        timeZone: 'America/New_York',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('9 Feb 09:30-10:30 EST')
    })

    it('should show summer time', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-06-06 09:30:00', 'Europe/Berlin').toDate(),
        endDate: dayjs.tz('2015-06-06 10:30:00', 'Europe/Berlin').toDate(),
        timeZone: 'Europe/Berlin',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jun 2015 09:30-10:30 CEST')
    })

    it('should show winter time', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-12-06 09:30:00', 'Europe/Berlin').toDate(),
        endDate: dayjs.tz('2015-12-06 10:30:00', 'Europe/Berlin').toDate(),
        timeZone: 'Europe/Berlin',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Dec 2015 09:30-10:30 CET')
    })

    it('should show GMT offset for unsupported time zone', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-06-06 09:30:00', 'Singapore').toDate(),
        endDate: dayjs.tz('2015-06-06 10:30:00', 'Singapore').toDate(),
        timeZone: 'Singapore',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jun 2015 09:30-10:30 GMT+8')
    })

    it('should show correct for GMT', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-06-06 09:30:00', 'GMT').toDate(),
        endDate: dayjs.tz('2015-06-06 10:30:00', 'GMT').toDate(),
        timeZone: 'GMT',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jun 2015 09:30-10:30 GMT')
    })

    it('should show correct time zone for Helsinki', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-01-06 09:30:00', 'Europe/Helsinki').toDate(),
        endDate: dayjs.tz('2015-01-06 10:30:00', 'Europe/Helsinki').toDate(),
        timeZone: 'Europe/Helsinki',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jan 2015 09:30-10:30 EET')
    })

    it('should show correct time zone for London', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-01-06 09:30:00', 'Europe/London').toDate(),
        endDate: dayjs.tz('2015-01-06 10:30:00', 'Europe/London').toDate(),
        timeZone: 'Europe/London',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jan 2015 09:30-10:30 GMT')
    })

    it('should show correct time zone for London summer time', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-06-06 09:30:00', 'Europe/London').toDate(),
        endDate: dayjs.tz('2015-06-06 10:30:00', 'Europe/London').toDate(),
        timeZone: 'Europe/London',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jun 2015 09:30-10:30 BST')
    })

    it('should show correct time zone for US central time', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-06-06 09:30:00', 'US/Central').toDate(),
        endDate: dayjs.tz('2015-06-06 10:30:00', 'US/Central').toDate(),
        timeZone: 'US/Central',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jun 2015 09:30-10:30 CDT')
    })

    it('should show correct time zone for Eastern Standard Time', function () {
      const dates = prettyDates({
        startDate: dayjs.tz('2015-01-06 09:30:00', 'America/New_York').toDate(),
        endDate: dayjs.tz('2015-01-06 10:30:00', 'America/New_York').toDate(),
        timeZone: 'America/New_York',
        timeFormat: '24',
        showTimeZone: true,
      })
      expect(dates).to.equal('6 Jan 2015 09:30-10:30 EST')
    })
  })
})
