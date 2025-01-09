const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

const tokenRoutes = require('./routes/tokenRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

//Vonnecting the database
mongoose.connect(MONGO_URL)
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.error('Error connecting to MOngoDB', err)
)

app.use('/api', tokenRoutes)

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})