const fs = require('fs')
const parse = require('csv-parse')
const { mongo } = require('../db')
const { Currency } = require('../models/currency')

function parseDate(str) {
    let d = str.split(' ')

    let h = d[1].split('-')

    newStr = `${d[0]} ${h[0]}:00:00 ${h[1]}`

    return Date.parse(newStr)
}

mongo.connect()

fs.createReadStream(process.argv[2])
    .pipe(parse())
    .on('data', (row) => {
        const entry = new Currency({
            date: parseDate(row[0]),
            symbol: row[1],
            open: parseFloat(row[2]),
            high: parseFloat(row[3]),
            low: parseFloat(row[4]),
            close: parseFloat(row[5]),
            volumeCryptoCurrency: parseFloat(row[6]),
            volumePhysicalCurrency: parseFloat(row[7]),
        })

        entry.save((err) => {
            if (err) console.log(err)
        })
    })
    .on('end', () => {
        console.log('All currency log stored')
        process.exit()
    })