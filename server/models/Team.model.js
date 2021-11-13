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
    name: {
        type: String,
        required: true
    },
    kanbans: [{
        name: {
            type: String,
            required: true
        },
        tasks: [TaskModel]
    }]
})

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    projects: [ProjectModel]
})

const Team = model('team', TeamSchema);

module.exports = Team;