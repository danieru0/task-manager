const User = require('../../models/User.model');
const {  AuthenticationError, error } = require('apollo-server-express');

const queries = {
    isUserInTeam: (root, args) => {
        

        return true;
    }
}

const mutations = {
    createUser: async (_, { id, ...rest }, { userAuth }) => {
        if (userAuth) throw new AuthenticationError('You are already logged in!'); 

        const user = await User.findById(id);

        if (user) return user;

        const newUser = new User({
            ...rest,
            team: false
        })
        newUser._id = id;

        await newUser.save();

        return newUser;
    }
}

module.exports = { queries, mutations };