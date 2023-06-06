const encodedHeader = require('../utils/encodedHeader');
const axios = require('axios');

module.exports = async (req, res, next) => {
  let expiresAt = req.session.token.expiresAt || null;
  if(!expiresAt) return res.status(403).send({ message: "Access Denied."});

  if( Date.now() > expiresAt ) {
    const response = await axios.post('https://www.reddit.com/api/v1/access_token', {
        grant_type: 'refresh_token',
        refresh_token: req.session.token.access_token,
      }, {
      headers: {
        authorization: `basic ${encodedHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if(response.error) {
      return res.status(500).send({message: "Something went wrong in refreshing the token."});
    }
    
    const { access_token, expires_in, refresh_token } = response.data;
    
    req.session.token = {
      access_token,
      refresh_token,
      expiresAt: Date.now() + (1000 * expires_in),
    };
  };

  next();
};