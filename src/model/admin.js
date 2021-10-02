const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    name: String,
    password: String,
    },
    { 
        collection : 'admin',
        timestamps : true,
    }
);

module.exports = mongoose.model('admin', Admin);