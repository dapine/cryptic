const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
type Query {
    info: String!
}
`

const resolvers = {
    Query: {
        info: () => 'Cryptic API',
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`)
})