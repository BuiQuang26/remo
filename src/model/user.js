const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    movieLike: [String],
    },
    { 
        collection : 'User',
        timestamps : true,
    }
);

module.exports = mongoose.model('user', User);