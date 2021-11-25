const mongoose = require('mongoose');
const { Schema, model } = mongoose;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

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
        tasks: [{
            type: Schema.Types.ObjectId,
            ref: 'task'
        }]
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

TeamSchema.plugin(deepPopulate);

const Team = model('team', TeamSchema);

module.exports = Team;