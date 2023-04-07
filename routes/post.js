const axios = require('axios');
const express = require('express');
const postRouter = express.Router();

const subreddit = 'HumansBeingBros';

postRouter.get('/', async (req, res) => {
  const token = req.session.token;
  //const response = await axios.get(`https://oath.reddit.com/r/${subreddit}/hot`);
  //console.log(response);
  res.status(200).send(token)
});

module.exports = postRouter;