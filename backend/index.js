const path = require('path');
require('dotenv').config({ path: `${path.resolve(__dirname + '/..')}/.env` });
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
let cors = require('cors');
const specialistRouter = require('./routes/specialists');
const serviceRouter = require('./routes/services');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/specialists', specialistRouter);
app.use('/services', serviceRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


mongoose.connect(process.env.Mongo)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});