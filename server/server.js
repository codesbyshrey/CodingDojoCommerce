const express = require("express")
const app = express()

require('dotenv').config()
require('./configs/mongoose.config')

const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

require('./routes/project.routes')(app)

app.listen(8000, () => console.log(`LISTENING AT PORT: 8000`))