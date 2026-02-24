const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

require('dotenv').config()
// initialize MongoDB connection (see configs/mongoose.config.js)
require('./configs/mongoose.config')
// JWT helpers / middleware (used for protecting routes)
const jwtConfig = require('./configs/jwt.config')

// read configuration from environment variables
const port = process.env.PORT
const myFirstSecret = process.env.FIRST_SECRET_KEY;

// parse cookies for JWT auth
app.use(cookieParser());
// allow JSON payloads from the React client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enable CORS so the React app on localhost:3000 can talk to this API
app.use(cors({credentials: true, origin: `http://localhost:3000`}));

// simple example of a protected route using the JWT middleware
app.get('/api/users', jwtConfig.authenticate, (req, res) => {
    res.json({message: 'This is a protected route'})
})

// register all user/product/order routes
require('./routes/project.routes')(app)

// start the HTTP server
app.listen(port, () => console.log(`LISTENING AT PORT: ${port}`))