const Team = require('../../models/Team.model');
const User = require('../../models/User.model');
const {  AuthenticationError, ValidationError } = require('apollo-server-express');


const queries = {

}

const mutations = {
    createTeam: async (_, { name, authorId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');
        if (authorId !== userAuth.decoded.sub) throw new ValidationError("Provided authorId doesn't match with your id!");

        const user = await User.findById(authorId).populate('team');

        if (!user) throw new ValidationError('There is no user with this id!');
        if (user.team) throw new ValidationError('You are already in team!');
        
        const newTeam = new Team({
            name: name,
            author: user,
            users: [],
            projects: []
        })

        user.team = newTeam;

        await newTeam.save();
        await user.save();

        return newTeam;
    }
}

module.exports = { queries, mutations };