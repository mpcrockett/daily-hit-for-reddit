require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const refreshToken = require('./middleware/refreshToken');
const postRouter = require('./routes/post');

const port = process.env.PORT || 8001;
const host = process.env.HOST || 'localhost';

const app = express();
app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SESSION_SECRET,
  proxy: true,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
  }
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRouter);
app.use('/api/user', refreshToken, userRouter);
app.use('/api/posts', refreshToken, postRouter); 

app.listen(port, host, () => {
  console.log(`Starting at ${host}:${port}`) 
});
