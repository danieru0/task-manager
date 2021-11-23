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
    },
    getTask: async (_, { teamId, projectId, kanbanId, taskId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('There is no user in database!');

        const team = await Team.findOne({ id: teamId }).populate('users').populate('projects.kanbans.tasks.author').populate('projects.kanbans.tasks.comments.author');
        if (!team) throw new ValidationError('There is no team with this id!');

        const isUserInTeam = team.users.find(user => user.id === userAuth.decoded.sub);
        if (!isUserInTeam) throw new ValidationError('You are not in this team!');

        const project = team.projects.find(project => project.id === projectId);
        if (!project) throw new ValidationError('There is no project with this id!');

        const kanban = project.kanbans.find(kanban => kanban.id === kanbanId);
        if (!kanban) throw new ValidationError('There is no kanban with this id!');

        const task = kanban.tasks.find(task => task.id === taskId);
        if (!task) throw new ValidationError('There is no task with this id!');

        return task;
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
    joinTeamRequest: async (_, { inviteId }, { user: userAuth, allSockets, io }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('There is no user in database!');
        if (user.team) throw new ValidationError('You are already in team!');

        const team = await Team.findOne({ inviteLink: inviteId }).populate('inviteRequests').populate('author');
        if (!team) throw new ValidationError('Invalid link!');

        const isUserSendInvite = team.inviteRequests.find(request => request.id === userAuth.decoded.sub);
        if (isUserSendInvite) throw new ValidationError('You have already send request to this team!');

        team.inviteRequests.push(user);

        const authorSocket = allSockets.find(user => user.databaseId === team.author.id);

        if (authorSocket) io.to(authorSocket.socketId).emit('sendJoinTeamRequestSocket', {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            picture: user.picture
        });

        await team.save();

        return true;
    },
    acceptTeamRequest: async (_, { userId, teamId }, { user: userAuth, allSockets, io }) => {
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

        const userSocket = allSockets.find(user => user.databaseId === userId);

        team.inviteRequests = inviteRequestsWithoutUser;
        team.users.push(user);
        user.team = team;

        await team.save();
        await user.save();

        if (userSocket) io.to(userSocket.socketId).emit('sendAcceptTeamRequestSocket');

        return true;
    },
    rejectTeamRequest: async (_, { userId, teamId }, { user: userAuth, allSockets, io }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userId});
        if (!user) throw new ValidationError('User with this id does not exists!');

        const team = await Team.findOne({ id: teamId }).populate('inviteRequests').populate('author');
        if (!team) throw new ValidationError('There is no team with this id!');
        if (team.author.id !== userAuth.decoded.sub) throw new ValidationError('You are not author of this team!'); 
        
        const isUserInRequests = team.inviteRequests.find(request => request.id === userId);
        if (!isUserInRequests) throw new ValidationError('User with this id is not in request list!');

        const userSocket = allSockets.find(user => user.databaseId === userId);

        if (userSocket) io.to(userSocket.socketId).emit('sendRejectTeamRequestSocket');

        const inviteRequestsWithoutUser = team.inviteRequests.filter(request => request.id !== userId);

        team.inviteRequests = inviteRequestsWithoutUser;

        await team.save();

        return true;
    },
    createProject: async (_, { name, teamId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('User dont exists');
        
        const team = await Team.findOne({ id: teamId }).populate('author');
        if (!team) throw new ValidationError('There is no team with this id!');
        if (team.author.id !== userAuth.decoded.sub) throw new ValidationError('You are not author of this team!'); 

        const isProjectAlreadyExists = team.projects.find(project => project.name === name);
        if (isProjectAlreadyExists) throw new ValidationError('Project with this name already exists!');

        const projectId = mongoose.Types.ObjectId();

        const newProject = {
            _id: projectId,
            id: projectId,
            tasksCounter: 0,
            name,
            kanbans: []
        }

        team.projects.push(newProject);

        await team.save();

        return newProject
    },
    createKanban: async (_, { name, teamId, projectId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('User dont exists');
        
        const team = await Team.findOne({ id: teamId }).populate('author');
        if (!team) throw new ValidationError('There is no team with this id!');
        if (team.author.id !== userAuth.decoded.sub) throw new ValidationError('You are not author of this team!');

        const project = team.projects.find(project => project.id === projectId);
        if (!project) throw new ValidationError('There is no project with this id!');
        
        const isKanbanAlreadyExists = project.kanbans.find(kanban => kanban.name === name);
        if (isKanbanAlreadyExists) throw new ValidationError('Kanban with this name already exists!');

        const kanbanId = mongoose.Types.ObjectId();

        const newKanban = {
            _id: kanbanId,
            id: kanbanId,
            name,
            tasks: []
        }

        project.kanbans.push(newKanban);

        await team.save();

        return newKanban;
    },
    createTask: async (_, { name, description, tag, teamId, projectId, kanbanId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('User dont exists');

        const team = await Team.findOne({ id: teamId }).populate('users');
        if (!team) throw new ValidationError('There is no team with this id!');

        const isUserInTeam = team.users.find(user => user.id === userAuth.decoded.sub);
        if (!isUserInTeam) throw new ValidationError('You are not in this team!');

        const project = team.projects.find(project => project.id === projectId);
        if (!project) throw new ValidationError('There is no project with this id!');
        
        const kanban = project.kanbans.find(kanban => kanban.id === kanbanId);
        if (!kanban) throw new ValidationError('There is no kanban with this id!');

        const taskId = mongoose.Types.ObjectId();

        const newTask = {
            _id: taskId,
            id: taskId,
            name,
            description,
            tag,
            author: user,
            comments: []
        }

        kanban.tasks.push(newTask);

        await team.save();

        return newTask;
    },
    moveTask: async (_, { taskId, teamId, projectId, kanbanIdFrom, kanbanIdTo }, { user: userAuth, io }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('User dont exists');

        const team = await Team.findOne({ id: teamId }).populate('users').populate('projects.kanbans.tasks.author');
        if (!team) throw new ValidationError('There is no team with this id!');

        const isUserInTeam = team.users.find(user => user.id === userAuth.decoded.sub);
        if (!isUserInTeam) throw new ValidationError('You are not in this team!');

        const project = team.projects.find(project => project.id === projectId);
        if (!project) throw new ValidationError('There is no project with this id!');

        const kanbanFrom = project.kanbans.find(kanban => kanban.id === kanbanIdFrom);
        if (!kanbanFrom) throw new ValidationError('There is no kanbanFrom with this id!');

        const task = kanbanFrom.tasks.find(task => task.id === taskId);
        if (!task) throw new ValidationError('There is no task with this id!');

        const kanbanTo = project.kanbans.find(kanban => kanban.id === kanbanIdTo);
        if (!kanbanTo) throw new ValidationError('There is no kanbanTo with this id!');

        kanbanFrom.tasks.pull({ _id: taskId });
        kanbanTo.tasks.push(task.toJSON());

        await team.save();

        io.to(teamId).emit('sendMoveTaskSocket', {task, projectId, kanbanIdFrom, kanbanIdTo,});

        return task;
    },
    createComment: async (_, { taskId, teamId, projectId, kanbanId, text }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub});
        if (!user) throw new ValidationError('User dont exists');

        const team = await Team.findOne({ id: teamId }).populate('users');
        if (!team) throw new ValidationError('There is no team with this id!');

        const isUserInTeam = team.users.find(user => user.id === userAuth.decoded.sub);
        if (!isUserInTeam) throw new ValidationError('You are not in this team!');

        const project = team.projects.find(project => project.id === projectId);
        if (!project) throw new ValidationError('There is no project with this id!');

        const kanban = project.kanbans.find(kanban => kanban.id === kanbanId);
        if (!kanban) throw new ValidationError('There is no kanbanFrom with this id!');

        const task = kanban.tasks.find(task => task.id === taskId);
        if (!task) throw new ValidationError('There is no task with this id!');

        const commentId = mongoose.Types.ObjectId();

        const newComment = {
            _id: commentId,
            id: commentId,
            author: user,
            text
        }

        task.comments.push(newComment);

        await team.save();

        return newComment;
    }
}

module.exports = { queries, mutations };