const Team = require('../../models/Team.model');
const User = require('../../models/User.model');
const Task = require('../../models/Task.model');
const {  AuthenticationError, ValidationError } = require('apollo-server-express');
const mongoose = require('mongoose');

const queries = {
    getTask: async (_, { teamId, projectId, kanbanId, taskId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({ id: userAuth.decoded.sub });
        if (!user) throw new ValidationError('There is no user in database!');

        const team = await Team.findOne({ id: teamId });
        if (!team) throw new ValidationError('There is no team with this id!');

        const task = await Task.findOne({ id: taskId }).populate('comments.author');
        if (!task) throw new ValidationError('There is no task with this id!');

        return task;
    }
}

const mutations = {
    createTask: async (_, { name, description, tag, teamId, projectId, kanbanId }, { user: userAuth } ) => {
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

        const newTask = new Task({
            _id: taskId,
            id: taskId,
            name,
            description,
            tag,
            author: user,
            comments: [],
            teamId,
            workingUsers: [],
            stage: kanban.name,
            projectName: kanban.name
        })

        kanban.tasks.push(taskId);

        await newTask.save();
        await team.save();

        return newTask;
    },
    setWorkingStatus: async (_, { teamId, projectId, kanbanId, taskId }, { user: userAuth }) => {
        if (!userAuth) throw new AuthenticationError('You have to be logged in!');

        const user = await User.findOne({id: userAuth.decoded.sub}).deepPopulate('workingTasks');
        if (!user) throw new ValidationError('User dont exists');
        
        const team = await Team.findOne({ id: teamId }).populate('users');
        if (!team) throw new ValidationError('There is no team with this id!');

        const isUserInTeam = team.users.find(user => user.id === userAuth.decoded.sub);
        if (!isUserInTeam) throw new ValidationError('You are not in this team!');

        const project = team.projects.find(project => project.id === projectId);
        if (!project) throw new ValidationError('There is no project with this id!');
        
        const kanban = project.kanbans.find(kanban => kanban.id === kanbanId);
        if (!kanban) throw new ValidationError('There is no kanban with this id!');

        const task = await Task.findOne({ id: taskId }).deepPopulate('workingUsers');
        if (!task) throw new ValidationError('There is no task with this id!');
    
        const isUserWorkingOnTask = task.workingUsers.find(user => user.id === userAuth.decoded.sub);

        if (isUserWorkingOnTask) {
            task.workingUsers = task.workingUsers.filter(user => user.id !== userAuth.decoded.sub);
            user.workingTasks = user.workingTasks.filter(task => task.id !== taskId);

            await task.save();
            await user.save();

            return user.workingTasks;
        }

        task.workingUsers.push(user);
        user.workingTasks.push(task);

        await task.save();
        await user.save();

        return user.workingTasks;
    }
}

module.exports = { queries, mutations };