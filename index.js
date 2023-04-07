require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const port = process.env.PORT || 8001;
const host = process.env.HOST || 'localhost';
const secret = process.env.COOKIE_SECRET;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(secret));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);



app.listen(port, host, () => {
  console.log(`Starting at ${host}:${port}`) 
});
