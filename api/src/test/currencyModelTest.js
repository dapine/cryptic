const chai = require('chai')
const { mongo } = require('../db')
const { Currency } = require('../models/currency')

const assert = chai.assert

mongo.connect()

describe('Currency model database operations', () => {
    it('Should store currency on MongoDB database', () => {
        const data = new Currency({
            date: Date.now(),
            symbol: 'BTC',
            open: 3.14,
            high: 3.14,
            low: 3.0,
            close: 3.0,
            volumeCryptoCurrenct: 1.0,
            volumePhysicalCurrency: 2.0,
        })

        data.save((err) => {
            assert.equal(err, null)
        })
    })

    it('Should find an entry on MongoDB database', () => {
        const data = new Currency({
            date: Date.now(),
            symbol: 'BTC',
            open: 3.14,
            high: 3.14,
            low: 3.0,
            close: 3.0,
            volumeCryptoCurrenct: 1.0,
            volumePhysicalCurrency: 2.0,
        })

        data.save((err) => {
            assert.equal(err, null)
        })

        Currency.findOne({symbol: 'BTC'}, (err, found) => {
            assert.equal(err, null)
            assert.equal(found.symbol, 'BTC')
        })
    })
})