require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
const mongoose = require('mongoose');

const isTokenValid = require('./utils/validate.js');

const { typeDefs, resolvers } = require('./graphql');

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

    await mongoose.connect(process.env.MONGODB_URL);

    app.listen(8080, () => console.log('Server running on port 8080!'));
}

startServer();