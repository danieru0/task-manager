const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    _id: {
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
    }
})

const User = model('user', UserSchema);

module.exports = User;