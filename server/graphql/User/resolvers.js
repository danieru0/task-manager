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

        const user = await User.findOne({id: id}).populate({
            path: 'team',
            populate: {
                path: 'author'
            }
        })
        
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