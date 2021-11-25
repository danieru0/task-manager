const mongoose = require('mongoose');
const { Schema, model } = mongoose;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const TaskSchema = Schema({
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
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    comments: [{
        id: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        }
    }],
    workingUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    teamId: {
        type: String,
        required: true
    }
})

TaskSchema.plugin(deepPopulate)

const Task = model('task', TaskSchema);

module.exports = Task;