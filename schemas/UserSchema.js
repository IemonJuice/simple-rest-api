const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,


}, {collection: 'posts'})

const User = mongoose.model('User', schema)

module.exports = User