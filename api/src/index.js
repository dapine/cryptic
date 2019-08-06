const { ApolloServer, gql } = require('apollo-server')
const { GraphQLDateTime } = require('graphql-iso-date')
const { Currency } = require('./models/currency')
const { mongo } = require('./db')

const typeDefs = gql`
scalar Date

type Query {
    info: String!
    currencies: [Currency]
    timeRange(start: String, end: String): [Currency]
}
type Currency {
    id: ID!
    date: Date!
    symbol: String!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volumeCryptoCurrency: Float!
    volumePhysicalCurrency: Float!
}
`

mongo.connect()

const resolvers = {
    Date: GraphQLDateTime,
    Query: {
        info: () => 'Cryptic API',
        currencies: () => Currency.find(),
        timeRange: (parent, args) => Currency.find({'date': { $gte: new Date(args.start),
                                                              $lte: new Date(args.end) }}),
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`)
})