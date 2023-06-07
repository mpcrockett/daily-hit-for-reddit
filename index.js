require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const refreshToken = require('./middleware/refreshToken');
const postRouter = require('./routes/post');
const searchRouter = require('./routes/search');
const subredditRouter = require('./routes/subreddit');
const path = require('path');

const port = process.env.PORT;

const app = express();
app.use(express.static(path.resolve(__dirname, './client/build')));
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
app.use('/api/search', refreshToken, searchRouter);
app.use('/api/subreddit', subredditRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening at ${port}`) 
});
