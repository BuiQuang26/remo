const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator')
var mongoose_delete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const movie = new Schema({
    name: String,
    year: Number,
    Country: String,
    imdb: Number,
    Directed: String,
    discription: String,
    slug: { type: String, slug: "name" , unique: true },
    imgY: String,
    imgX: String,
    trailer: String,
    time: String,
    category: String,
    wiki: String,
    related: [{
        id: String,
        name: String,
        page: String
    }]
 },
 { 
     collection : 'Movies',
     timestamps : true,
 },
);

movie.plugin(mongoose_delete ,{ deletedAt : true ,overrideMethods: 'all'});

module.exports = mongoose.model('movie', movie);