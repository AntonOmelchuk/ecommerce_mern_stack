const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
)
.then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))