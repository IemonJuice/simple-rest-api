require('dotenv').config();

//---------------------------Constants-------------------------------------

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xhh8hpd.mongodb.net/?retryWrites=true&w=majority`;
const routes = require('./routes/routes')


//----------------------------Server settings-----------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

//-----------------------Server Starting--------------------------------

app.listen(process.env.PORT, process.env.DB_HOST,(error) =>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`server is started with port ${process.env.PORT}`);
    }
})

//-------------------Connecting to the database--------------------------------

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open',  () => {
    console.log('Connected to the database');
});




