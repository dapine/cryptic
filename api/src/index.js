const { ApolloServer, gql } = require('apollo-server')
const { GraphQLDateTime } = require('graphql-iso-date')
const { Currency } = require('./models/currency')
const { mongo } = require('./db')

const typeDefs = gql`
scalar Date

type Query {
    info: String!
    currencies: [Currency]
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
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`)
})