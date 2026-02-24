const mongoose = require('mongoose');

// DB connection details are provided via .env
const dbName = process.env.DB
const username = process.env.ATLAS_USERNAME // read variable in .env
const password = process.env.ATLAS_PASSWORD

//SHREY is Shreyas Info
//ATLAS is Kimly Info

//Kimly Link (current active connection string)
const uri = `mongodb+srv://${username}:${password}@kimly.7bgz07g.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Shreyas Link (alternative cluster – kept here for reference)
//const uri = `mongodb+srv://${username}:${password}@clusterdojo.debjcja.mongodb.net/${dbName}?retryWrites=true&w=majority`

// open initial connection to MongoDB Atlas
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));