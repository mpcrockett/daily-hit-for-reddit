const express = require('express');
const authRouter = express.Router();
const generateRandomString = require('../utils/util');
const { Buffer } = require('node:buffer');
const axios = require('axios');

const responseType = 'code';
const duration = 'permanent';
const scope = 'identity, vote, mysubreddits, subscribe';
const state = '123456789'; //await generateRandomString(10);

const secret = process.env.CLIENT_SECRET;
const id = process.env.CLIENT_ID;
const uri = process.env.URI;

const encodedHeader = Buffer.from(`${id}:${secret}`).toString('base64');

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

    encodedToken = Buffer.from(JSON.stringify(token)).toString('base64');

    res.cookie('xauth-obj', encodedToken, {
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none"
    });

    res.status(200).send({ mesage: "Token sent."})
    // response = await axios.get("https://oauth.reddit.com/api/v1/me", {
    //   headers: {
    //     "Authorization": `bearer ${token.access_token}`,
    //     "User-Agent": "NodeJS:Daily Hit of Dopamine For Reddit:v1.0 by /u/NEAustinite"
    //   }
    // });

    // const { icon_img, name } = response.data;

  } catch (err) {
    res.status(500).send({message: err.message});
  } 
});

// authRouter.post('/refresh-token', async (req, res) => {
//   try {
//     const { refresh_token } = req.session;
//     const response = await axios.post('https://www.reddit.com/api/v1/access_token', {
//         grant_type: 'refresh_token',
//         refresh_token
//       }, {
//       headers: {
//         authorization: `basic ${encodedHeader}`,
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });
    
//     if(response.error) {
//       console.log(response.error)
//       return res.status(500).send("Something went wrong in refreshing the token.");
//     }
    
//     const { access_token, expires_in } = response.data;
    
//     const responseBody = {
//       accessToken: {
//         token: access_token,
//         expiresAt: Date.now() + (1000 * expires_in),
//       }
//     };

//     res.status(200).json(responseBody);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

module.exports = authRouter;