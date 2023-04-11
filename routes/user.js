const express = require('express');
const userRouter = express.Router();
const axios = require('axios');

const baseUrl = process.env.BASE_URL;

userRouter.get('/', async (req, res) => {
  const { access_token } = req.session.token;
  try {
    const response = await axios.get(baseUrl + "/api/v1/me", {
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT
      }
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({message: error.message})
  }
});

module.exports = userRouter; 