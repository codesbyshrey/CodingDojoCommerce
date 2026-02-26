const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
require('./server/config/mongoose.config');
const port = process.env.PORT;
const myFirstSecret = process.env.FIRST_SECRET_KEY;
app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use( express. json() );
app.use( express.urlencoded({ extended: true }));

require('./server/routes/routes')(app);
app.listen(port, () => console.log(`Listening on port: ${port}`) );
