const { DateTime, Settings } = require('luxon')

const formattedDateShortMonth = 'd MMM yyyy'

Settings.throwOnInvalid = true

const utils = {
  formatDateFromIsoString: (isoDate) => {
    try {
      return DateTime.fromISO(isoDate, { zone: 'utc' }).toFormat(formattedDateShortMonth)
    } catch (err) {
      return isoDate
    }
  },

  isDefined: (val) => typeof val !== 'undefined',

  formatSingleLineAddress: (address) => {
    const parts = ['line1', 'line2', 'town', 'postcode'].map(key => address[key]).filter(Boolean)
    return utils.listToString(parts, '')
  },

  listToString: (list, conjunction) => {
    if (list.length === 1) {
      return list[0]
    }
    const copy = [...list]
    if (utils.isDefined(conjunction)) {
      const lastItem = copy.pop()
      const conjunctionWithSpace = conjunction === '' ? conjunction : `${conjunction} `
      return `${copy.join(', ')} ${conjunctionWithSpace}${lastItem}`
    }
    return copy.join(', ')
  }
}

module.exports = utils