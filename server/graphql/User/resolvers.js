const User = require('../../models/User.model');
const {  AuthenticationError } = require('apollo-server-express');

const queries = {
    getUserTeam: async (_, {}, { user: userAuth, socketUser }) => {
        if (!userAuth) throw new AuthenticationError('You are not logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub}).deepPopulate('team.author team.users team.inviteRequests team.projects.kanbans.tasks team.projects.kanbans.tasks.author team.projects.kanbans.tasks.workingUsers  team.projects.kanbans.tasks.comments.author');

        if (!user) throw new ValidationError('User dont exists');

        if (socketUser) socketUser.databaseId = userAuth.decoded.sub;
        
        if (user.team) {
            socketUser.socket.join(user.team.id);
            return user.team;
        }

        return {};
    },
    getUserWorkingTasks: async (_, {}, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You are not logged in!');

        const user = await User.findOne({ id: userAuth.decoded.sub }).deepPopulate('workingTasks');

        if (!user) throw new ValidationError('User dont exists');

        return user.workingTasks;
    }
}

const mutations = {
    createUser: async (_, { id, ...rest }, { user: userAuth, socketUser }) => {
        if (!userAuth) throw new AuthenticationError('You are not logged in!'); 

        const user = await User.findOne({id: id});
        
        if (socketUser) socketUser.databaseId = id;

        if (user) return true;

        const newUser = new User({
            ...rest,
            id,
            team: null,
            workingTasks: []
        })

        await newUser.save();

        return true;
    }
}

module.exports = { queries, mutations };