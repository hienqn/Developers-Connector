const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchemas = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String, 
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            users : {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            users: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now(),
            },
        }
    ],
    dates: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Post = mongoose.model('post', PostSchemas);