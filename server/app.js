const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const cors = require('cors')
const fs = require('fs')
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
    useFindAndModify: true,
  },
)
.then(() => console.log("DB Connected"))
.catch(error => console.log(`DB connection error: ${error}`))

// middlewares
app.use(morgan('dev'))
app.use(bodyParse.json())
app.use(cors())

// routes
fs.readdirSync('./routes').forEach(route => app.use('/api', require(`./routes/${route}`)))

// port
const port = process.env.PORT || 9000

app.listen(port, () => console.log(`Server is running on port ${port}`))
