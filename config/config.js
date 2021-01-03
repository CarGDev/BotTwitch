require('dotenv').config()

module.exports = function config () {
  
  const config = {
    USERNAME: process.env.username,
    TOKEN: process.env.token,
    TWITTER: process.env.twitter,
    FB: process.env.facebook,
    IG: process.env.instagram,
    PLATZI: process.env.platzi,
    YOUTUBE: process.env.youtube,
    BOT: process.env.botName
  }

  return config
}
