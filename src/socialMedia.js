const config = require('../config/config')()

module.exports = function socialMedia (client) {

  const twitterSide = `twitter ${config.TWITTER}`
  const igSide = `IG ${config.IG}`
  const fbSide = `FB ${config.FB}`
  const platziSide = `Si quieren un mes gratis en Platzi vayan a esta pagina ${config.PLATZI}`
  const youtubeSide = `Siganme en Youtube para crear contenido en esa plataforma y seguir creciendo esta bonita comunidad ${config.YOUTUBE}`

  const socialMedia = [
    twitterSide,
    igSide,
    fbSide,
    platziSide,
    youtubeSide
  ]

  const socialMediaFn = (channelNm) => {
    for(let i = 0; i < socialMedia.length; i++) {
      client.action(
        channelNm,
        `Siganme en ${socialMedia[i]}`
      )
    }
  }

  return {
    socialMedia,
    socialMediaFn
  }
}
