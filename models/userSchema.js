const mongoose = require('mongoose');

const userSchema = new Schema({
  name: String,
  icon: String,
  token: {
    access_token: String,
    refresh_token: String,
    ex
  }
})