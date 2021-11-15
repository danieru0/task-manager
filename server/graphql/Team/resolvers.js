const Team = require('../../models/Team.model');
const User = require('../../models/User.model');
const {  AuthenticationError, ValidationError } = require('apollo-server-express');
const { v4: uuidv4 } = require('uuid');

const queries = {
    isAuthorOfTeam: async (_, { userId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');
        
        const user = await User.findOne({id: userId}).populate({
            path: 'team',
            populate: {
                path: 'author'
            }
        })

        if (!user.team) throw new ValidationError("You are not in a team!");

        if (user.team.author.id === userId) return true;

        return false;
    }
}

const mutations = {
    createTeam: async (_, { name, authorId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');
        if (authorId !== userAuth.decoded.sub) throw new ValidationError("Provided authorId doesn't match with your id!");

        const user = await User.findOne({id: authorId}).populate('team');

        if (!user) throw new ValidationError('There is no user with this id!');
        if (user.team) throw new ValidationError('You are already in team!');
        
        const newTeam = new Team({
            name: name,
            author: user,
            inviteLink: `join/${uuidv4()}`,
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