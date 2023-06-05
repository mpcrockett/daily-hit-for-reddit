const { Buffer } = require('node:buffer');

const secret = process.env.CLIENT_SECRET;
const id = process.env.CLIENT_ID;

module.exports = 
 Buffer.from(`${id}:${secret}`).toString('base64');