const Team = require('../../models/Team.model');
const User = require('../../models/User.model');
const {  AuthenticationError, ValidationError } = require('apollo-server-express');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

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
        
        const teamId = mongoose.Types.ObjectId();

        const newTeam = new Team({
            id: teamId.toString(),
            name: name,
            author: user,
            inviteLink: `/#/join/${uuidv4()}`,
            inviteRequests: [],
            users: [user],
            projects: []
        })

        newTeam._id = teamId;
        user.team = newTeam;

        await newTeam.save();
        await user.save();

        return newTeam;
    },
    joinTeamRequest: async (_, { inviteId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('There is no user in database!');
        if (user.team) throw new ValidationError('You are already in team!');

        const team = await Team.findOne({ inviteLink: inviteId }).populate('inviteRequests');
        if (!team) throw new ValidationError('Invalid link!');

        const isUserSendInvite = team.inviteRequests.find(request => request.id === userAuth.decoded.sub);
        if (isUserSendInvite) throw new ValidationError('You have already send request to this team!');

        team.inviteRequests.push(user);

        await team.save();

        return true;
    },
    acceptTeamRequest: async (_, { userId, teamId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userId});
        if (!user) throw new ValidationError('User with this id does not exists!');
        if (user.team) throw new ValidationError('This user is already in a team!');

        const team = await Team.findOne({ id: teamId }).populate('inviteRequests').populate('author');
        if (!team) throw new ValidationError('There is no team with this id!');
        if (team.author.id !== userAuth.decoded.sub) throw new ValidationError('You are not author of this team!');

        const isUserInRequests = team.inviteRequests.find(request => request.id === userId);
        if (!isUserInRequests) throw new ValidationError('User with this id is not in request list!');

        const inviteRequestsWithoutUser = team.inviteRequests.filter(request => request.id !== userId);

        team.inviteRequests = inviteRequestsWithoutUser;
        team.users.push(user);
        user.team = team;

        await team.save();
        await user.save();

        return true;
    },
    rejectTeamRequest: async (_, { userId, teamId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');
        
        const user = await User.findOne({id: userId});
        if (!user) throw new ValidationError('User with this id does not exists!');

        const team = await Team.findOne({ id: teamId }).populate('inviteRequests').populate('author');
        if (!team) throw new ValidationError('There is no team with this id!');
        if (team.author.id !== userAuth.decoded.sub) throw new ValidationError('You are not author of this team!'); 
        
        const isUserInRequests = team.inviteRequests.find(request => request.id === userId);
        if (!isUserInRequests) throw new ValidationError('User with this id is not in request list!');

        const inviteRequestsWithoutUser = team.inviteRequests.filter(request => request.id !== userId);

        team.inviteRequests = inviteRequestsWithoutUser;

        await team.save();

        return true;
    }
}

module.exports = { queries, mutations };