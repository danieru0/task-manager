const mongoose = require('mongoose');
const { Schema, model } = mongoose;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const UserSchema = Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'team'
    },
    workingTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }]
})

UserSchema.plugin(deepPopulate);

const User = model('user', UserSchema);

module.exports = User;