const path = require('path');
require('dotenv').config({ path: `${path.resolve(__dirname + '/..')}/.env` });
const cookieParser = require('cookie-parser');
const express = require('express');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


mongoose.connect(process.env.Mongo).then(() => console.log("Connected to database")).catch((err) => console.log(err))