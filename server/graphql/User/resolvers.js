const User = require('../../models/User.model');
const {  AuthenticationError } = require('apollo-server-express');

const queries = {
    getUserTeam: async (_, {}, { user: userAuth, socketUser }) => {
        if (!userAuth) throw new AuthenticationError('You are not logged in!'); 

        const user = await User.findOne({id: userAuth.decoded.sub}).populate({
            path: 'team',
            populate: {
                path: 'author',
            }
        }).populate({
            path: 'team',
            populate: {
                path: 'users'
            }
        }).populate({
            path: 'team',
            populate: {
                'path': 'inviteRequests'
            }
        }).populate({
            path: 'team',
            populate: {
                path: 'projects.kanbans.tasks.author'
            }
        }).populate({
            path: 'team',
            populate: {
                path: 'projects.kanbans.tasks.comments.author'
            }
        })

        if (!user) throw new ValidationError('User dont exists');

        if (socketUser) socketUser.databaseId = userAuth.decoded.sub;
        
        if (user.team) {
            socketUser.socket.join(user.team.id);
            return user.team;
        }

        return {};
    }
}

const mutations = {
    createUser: async (_, { id, ...rest }, { user: userAuth, socketUser }) => {
        if (!userAuth) throw new AuthenticationError('You are not logged in!'); 

        const user = await User.findOne({id: id}).populate({
            path: 'team',
            populate: {
                path: 'author',
            }
        }).populate({
            path: 'team',
            populate: {
                path: 'users'
            }
        }).populate({
            path: 'team',
            populate: {
                'path': 'inviteRequests'
            }
        })
        
        if (socketUser) socketUser.databaseId = id;

        if (user) return user;

        const newUser = new User({
            ...rest,
            id,
            team: null
        })

        await newUser.save();

        return newUser;
    }
}

module.exports = { queries, mutations };