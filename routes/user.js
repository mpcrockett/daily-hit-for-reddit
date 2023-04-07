const express = require('express');
const userRouter = express.Router();
const axios = require('axios');

const baseUrl = 'https://oauth.reddit.com'

userRouter.get('/', async (req, res) => {
  console.log(req.signedCookies);
  // const response = await axios.get("https://oauth.reddit.com/api/v1/me", {
  //   headers: {
  //     "Authorization": `bearer ${token}`,
  //     "User-Agent": "NodeJS:Daily Hit of Dopamine For Reddit:v1.0 by /u/NEAustinite"
  //   }
  // });
  res.status(200).send("Here it is");
})

module.exports = userRouter; 