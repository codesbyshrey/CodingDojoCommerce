const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

require('dotenv').config()
require('./configs/mongoose.config')

const port = process.env.PORT
const myFirstSecret = process.env.FIRST_SECRET_KEY;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use cors should be changed to new one
app.use(cors({credentials: true, origin: `http://localhost:3000`}));

require('./routes/project.routes')(app)

app.listen(port, () => console.log(`LISTENING AT PORT: ${port}`))