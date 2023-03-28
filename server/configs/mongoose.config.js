const mongoose = require('mongoose');

const dbName = process.env.DB
const username = process.env.ATLAS_USERNAME // read variable in .env
const password = process.env.ATLAS_PASSWORD

//SHREY is Shreyas Info
//ATLAS is Kimly Info

//Kimly Link
const uri = `mongodb+srv://${username}:${password}@kimly.7bgz07g.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Shreyas Link
//const uri = `mongodb+srv://${username}:${password}@clusterdojo.debjcja.mongodb.net/${dbName}?retryWrites=true&w=majority`


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));