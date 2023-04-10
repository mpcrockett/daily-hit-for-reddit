const express = require('express');
const authRouter = express.Router();
const generateRandomString = require('../utils/util');
const encodedHeader = require('../utils/encodedHeader');
const axios = require('axios');

const responseType = 'code';
const duration = 'permanent';
const scope = 'identity, vote, mysubreddits, subscribe';
const state = '123456789'; //await generateRandomString(10);


const uri = process.env.URI;

authRouter.get('/', async (req, res) => {
  const url = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=${responseType}&state=${state}&redirect_uri=${process.env.URI}&duration=${duration}&scope=${scope}`;
  res.redirect(302, url);
});

authRouter.post('/login', async (req, res) => {
  const urlState = req.body.state;
  const code = req.body.code;

  if(urlState !== state) {
    return res.status(500)
      .send({ message: "State in url does not match state in server."});
  };

  try {
    let response = await axios.post('https://www.reddit.com/api/v1/access_token', {
        grant_type: 'authorization_code',
        code,
        redirect_uri: uri
      }, {
      headers: {
        authorization: `basic ${encodedHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const { access_token, refresh_token, expires_in } = response.data;

    const token = {
      access_token,
      refresh_token,
      expiresAt: Date.now() + (1000 * expires_in),
    };

    req.session.token = token;
    res.status(200).send({ mesage: "Token set."});
  } catch (err) {
    res.status(500).send({message: err.message});
  } 
});

authRouter.delete('/logout', async (req, res) => {
  if(!req.session) return res.status(403).send({ message: "Unauthorized."}) 
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send('Unable to log out')
    } else {
      res.status(200).send('Logout successful')
    }
  });
});

module.exports = authRouter;