const axios = require('axios');
const express = require('express');
const postRouter = express.Router();
const { compileAllPosts, compileSubPosts } = require('../utils/postCompiler');
const baseUrl = process.env.BASE_URL;

postRouter.get('/subreddits', async (req, res) => {
  const { access_token } = req.session.token;
  try {
    let response = await axios.get(baseUrl + '/subreddits/mine/subscriber', {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT
      }
    });
    const subreddits = response.data.data.children;
    
    const promises = subreddits.map((sub) => {
      return axios.get(baseUrl + sub.data.url + 'new', {
        headers: {
          "Authorization": `bearer ${access_token}`,
          "User-Agent": process.env.USER_AGENT
        },
        params: {
          limit: "5"
        }
      });
    });
    response = await Promise.all(promises);
    const postData = await compileAllPosts(response);
    res.status(200).send({subreddits, postData });
  } catch (err) {
    res.status(500).send({message: err.message})
  }
});

postRouter.post('/', async (req, res) => {
  const { access_token } = req.session.token;
  const { subUrl } = req.body;

  try {
    const response = await axios.get(baseUrl + subUrl + 'new', {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT
      }
    });
    const postData = await compileSubPosts(response.data.data.children);
    res.status(200).send(postData);
  } catch (error) {
    res.status(500).send({error})
  }
});

postRouter.post('/vote', async (req, res) => {
  const { access_token } = req.session.token;
  const { fullname, value } = req.body;
  try {
    await axios.post(baseUrl + '/api/vote', { id: fullname, dir: value }, {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    res.status(200).send({message: "voted"});
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = postRouter;