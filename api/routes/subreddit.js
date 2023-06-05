const express = require('express');
const subredditRouter = express.Router();
const axios = require('axios');
const { compileSubPosts } = require('../utils/postCompiler');

const baseUrl = process.env.BASE_URL

subredditRouter.post('/', async (req, res) => {
  const { access_token } = req.session.token;
  const { name } = req.body;
  try {
    let response = await axios.get(baseUrl + `/r/${name}/about`, {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT
      }
    });

    const subData = response.data;

    response = await axios.get(baseUrl + subData.data.url + 'new', {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT
      }
    });

    const postData = await compileSubPosts(response.data.data.children);

    res.status(200).send({ subData, postData });
  } catch (error) {
    console.log(error.message)
  }
});

module.exports = subredditRouter;