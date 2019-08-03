const mongoose = require('mongoose')

mongo = {
    host: 'localhost',
    db: 'cryptic-api-dev',
    port: 27017,
    toString() {
        return `mongodb://${this.host}:${this.port}/${this.db}`
    },
    connect() {
        mongoose.connect(this.toString(), {useNewUrlParser: true})
    },
    connection() {
        return mongoose.connection
    }
}

module.exports.mongo = mongo