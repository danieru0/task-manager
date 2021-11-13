const User = require('../../models/User.model');
const {  AuthenticationError } = require('apollo-server-express');

const queries = {
    isUserInTeam: (root, args) => {
        

        return true;
    }
}

const mutations = {
    createUser: async (_, { id, ...rest }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You are not logged in!'); 

        const user = await User.findById(id).populate('team');

        if (user) return user;

        const newUser = new User({
            ...rest,
            team: null
        })
        newUser._id = id;

        await newUser.save();

        return newUser;
    }
}

module.exports = { queries, mutations };