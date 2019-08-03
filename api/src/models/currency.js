const mongoose = require('mongoose')

const schema = {
    date: {
        mongo: {
            type: Date
        }
    },
    symbol: {
        mongo: {
            type: String
        }
    },
    open: {
        mongo: {
            type: Number
        }
    },
    high: {
        mongo: {
            type: Number
        }
    },
    low: {
        mongo: {
            type: Number
        }
    },
    close: {
        mongo: {
            type: Number
        }
    },
    volumeCryptoCurrency: {
        mongo: {
            type: Number
        }
    },
    volumePhysicalCurrency: {
        mongo: {
            type: Number
        }
    },
}

/**
 * toMongooseSchema gets a db agnostic schema and transforms to mongoose schema
 * @param {Object} schema 
 * @returns {mongoose.Schema}
 */
function toMongooseSchema(schema) {
    let newSchema = {}
    
    for (let v in schema) {
        newSchema[v] = schema[v].mongo
    }

    return new mongoose.Schema(newSchema)
}

/**
 * mongooseCurrency applies default schema to mongoose.model
 * @param {String} name Optional Model name
 * @return {mongoose.model}
 */
function mongooseCurrency(name) {
    return mongoose.model(name || 'Currency', toMongooseSchema(schema))
}

module.exports.mongooseCurrency = mongooseCurrency
module.exports.Currency = mongooseCurrency()