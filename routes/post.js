const axios = require('axios');
const express = require('express');
const postRouter = express.Router();
const baseUrl = process.env.BASE_URL;

postRouter.get('/subreddits', async (req, res) => {
  const { access_token } = req.session.token;
  try {
    const response = await axios.get(baseUrl + '/subreddits/mine/subscriber', {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT
      }
    });
    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send({message: error.message})
  }
});

postRouter.post('/', async (req, res) => {
  const { access_token } = req.session.token;
  console.log(access_token)
  const { subreddits } = req.body;
  const url = subreddits[0].url;
  try {
    const response = await axios.get(baseUrl + url + 'new', {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT
      }
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({error})
  }
});

module.exports = postRouter;