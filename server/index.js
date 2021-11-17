require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
const mongoose = require('mongoose');
const socket = require('socket.io');

const isTokenValid = require('./utils/validate.js');
let { users } = require('./data');

const { typeDefs, resolvers } = require('./graphql');

async function startServer() {
    const app = express();
    app.use(cors())

    const server = app.listen(8080, () => console.log('Server running on port 8080!'));

    const io = socket(server);

    io.on('connection', socket => {

        const isUserExists = users.find(user => user.socketId === socket.id);

        if (!isUserExists) { 
            users.push({
                socketId: socket.id,
                databaseId: '',
                socket: socket
            });
        }

        socket.on('disconnecting', () => {
            users = users.filter(user => user.socketId !== socket.id);
        })
    })

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const token = req.headers.authorization;
            const socketId = req.headers.socketid;

            const user = await isTokenValid(token);

            const socketUser = socketId ? users.find(user => user.socketId === socketId) : null;

            return { user: user, io: io, socketUser: socketUser, allSockets: users }
        }
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app: app});

    await mongoose.connect(process.env.MONGODB_URL);
}

startServer();