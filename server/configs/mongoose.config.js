const mongoose = require('mongoose');

const dbName = process.env.DB
const username = process.env.ATLAS_USERNAME
const password = process.env.ATLAS_PASSWORD

// Shreyas Link Post Bootcamp Swap
const uri = `mongodb+srv://${username}:${password}@clusterdojo.debjcja.mongodb.net/${dbName}?retryWrites=true&w=majority`


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));