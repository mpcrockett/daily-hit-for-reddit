const express = require('express');
const userRouter = express.Router();
const axios = require('axios');

const baseUrl = 'https://oauth.reddit.com'

userRouter.get('/', async (req, res) => {
  const { access_token } = req.session.token;
  try {
    const response = await axios.get("https://oauth.reddit.com/api/v1/me", {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": "NodeJS:Daily Hit of Dopamine For Reddit:v1.0 by /u/NEAustinite"
      }
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({message: error.message})
  }
});

module.exports = userRouter; 