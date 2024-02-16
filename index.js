const express = require('express')
const dotenv = require('dotenv').config();
const router = require('./routes/loginsignupRoute')
const cors=require('cors')
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
connectDb()
const app = express();

const port = process.env.PORT || 4000;

//json parser

app.use(express.json())
app.use(cors())
app.use(errorHandler)

app.use('/user', router)


app.listen(port, () => {
    console.log(`app is listening on port....${port}`)
})