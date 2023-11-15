const Post = require('../schemas/schema');
const User = require('../schemas/UserSchema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//------------------controllers-------------------//

const createController = async (req, res) => {
    const {name, description, date, author} = req.body;
    const newPost = new Post({
        name: name,
        description: description,
        date: date,
        author: author,
    })
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Error', description: err})
        res.end()
    }
}


const readController = async (req, res) => {
    try {
        const readResult = await Post.find();
        res.status(200).json(readResult);
        console.log(readResult);
        res.end()
    } catch (err) {
        console.log(err)
        res.status(404).json({error: 'Error', description: err})
        res.end()
    }
}


const updateController = async (req, res) => {

    try {
        const {name, description, date, author} = req.body;
        const updatedPost = await Post.updateOne({name: name}, {
            $set: {
                description: description,
                date: date,
                author: author,
                edited: true,
            }
        })
        res.status(200).json(updatedPost);
        res.end()
    } catch (err) {
        console.log(err);
        res.status(500).json({error: Error, description: err});
        res.end()
    }
}


const deleteController = async (req, res) => {
    const name = req.body.name;
    try {
        const deletedPost = await Post.deleteOne({name: name})
        res.status(200).json(deletedPost);
        res.end()
    } catch (err) {
        console.log(err);
        res.status(404).json({error: 'Error', description: err});
        res.end()
    }
}

const registerController = async (req, res) => {
    try {
        const {username, password, email} = req.body;

        const existingUser = await User.findOne({username: username});

        if (existingUser) {
            console.log()
            return res.json(
                'user ' + existingUser.username + ' already created ' + 'please login'
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newRegisteredUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
        });

        const registeredUser = await newRegisteredUser.save();
        res.status(201).json(registeredUser);
        res.end();

    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error", description: err.message});
        res.end();
    }
}


const loginController = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if (!user) {
        res.status(401).json({error: 401, description: "User not found"});
    } else if (!(await bcrypt.compare(password, user.password))) {
        res.status(401).json({error: 401, description: "Password incorrect"});
    }
    else{
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);

        res.json({
            token,
            username: user.username,
            email: user.email,
        });
    }
}

module.exports = {
    createController,
    readController,
    updateController,
    deleteController,
    registerController,
    loginController,
}
