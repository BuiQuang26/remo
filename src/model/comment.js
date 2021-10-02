const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    movieSlug: String,
    userName: String,
    text: String,
    },
    { 
        collection : 'Comment',
        timestamps : true,
    }
);

module.exports = mongoose.model('Comment', Comment);