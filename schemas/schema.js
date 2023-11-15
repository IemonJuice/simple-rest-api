const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    author: String,
    edited: Boolean,

}, {collection: 'posts'})

const Post = mongoose.model('Post', schema)

module.exports = Post