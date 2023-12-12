require('dotenv').config({ path: __dirname + '/.env' });
const cookieParser = require('cookie-parser');
const express = require('express');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
