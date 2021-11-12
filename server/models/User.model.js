const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        type: Boolean,
        default: false,
        required: true
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;