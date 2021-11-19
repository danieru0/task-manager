const  { Schema, model } = require('mongoose');

const TaskModel = new Schema();
TaskModel.add({
    name: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        required: true
    }
})

const ProjectModel = new Schema();
ProjectModel.add({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tasksCounter: {
        type: Number,
        required: true
    },
    kanbans: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        tasks: [TaskModel]
    }]
})

const TeamSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    inviteLink: {
        type: String,
        required: true
    },
    inviteRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    projects: [ProjectModel]
})

const Team = model('team', TeamSchema);

module.exports = Team;