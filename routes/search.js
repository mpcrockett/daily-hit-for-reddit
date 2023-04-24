const express = require('express');
const searchRouter = express.Router();
const axios = require('axios');

const baseUrl = process.env.BASE_URL;

searchRouter.post('/', async (req, res) => {
  try {
    const { query } = req.body.params;
    const { access_token } = req.session.token;
    const response  = await axios.get(baseUrl + '/api/search_reddit_names', {
      params: {
        query: query,
        exact: false,
        include_over_18: false,
        include_unadvertisable: false,
        typeahead_active: true	
      },
      headers: {
        "Authorization": `bearer ${access_token}`,
        "User-Agent": process.env.USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const result = response.data.names;
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  
})

module.exports = searchRouter;