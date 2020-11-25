const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { readdirSync } = require('fs')
require('dotenv').config()

// app
const app = express()

// mongoDB connection
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)
.then(() => console.log("DB Connected"))
.catch(error => console.log(`DB connection error: ${error}`))

// middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}));

// routes
readdirSync('./routes').forEach(route => app.use('/api', require(`./routes/${route}`)))

// port
const port = process.env.PORT || 9000

app.listen(port, () => console.log(`Server is running on port ${port}`))
