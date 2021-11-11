const express = require('express');
const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express');
var cors = require('cors')
const isTokenValid = require('./utils/validate.js');

const typeDefs = gql`
    type Query {
        hello: String
    }
`

const resolvers = {
    Query: {
        hello: async (parent, args, { user }, info) => {
            if (!user) throw new AuthenticationError('Not logged in');

            return 'Hello World';
        }
    }
}

async function startServer() {
    const app = express();
    app.use(cors())

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const token = req.headers.authorization;

            const user = await isTokenValid(token);

            return { user: user }
        }
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app: app});

    app.listen(8080, () => console.log('Server running on port 8080!'));
}

startServer();