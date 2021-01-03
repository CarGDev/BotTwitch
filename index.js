const tmi = require('tmi.js')
const config = require('./config/config')()

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info"  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: config.BOT,
    password: config.TOKEN
  },
  channels: [ config.USERNAME ]
})

client.connect().catch(console.error)

const rollDice = () => {
  const sides = 10
  return Math.floor(Math.random() * sides) + 1
}

const streamTwitch = 'haciendo un bot para twitch'
const twitterSide = `twitter ${config.TWITTER}`
const igSide = `IG ${config.IG}`
const fbSide = `FB ${config.FB}`
const platziSide = `Si quieren un mes gratis en Platzi vayan a esta pagina ${config.PLATZI}`
const youtubeSide = `Siganme en Youtube para crear contenido en esa plataforma y seguir creciendo esta bonita comunidad ${config.YOUTUBE}`

client.on('connected', () => {
  const nameChannel = config.USERNAME
  client.action(
    nameChannel,
    `Hola a todos hoy estamos ${streamTwitch}`
  )
  client.action(
    nameChannel,
    `Siganme en ${twitterSide}`
  )
  client.action(
    nameChannel,
    `Siganme en ${igSide}`
  ) 
  client.action(
    nameChannel,
    `Siganme en ${fbSide}`
  ) 
  client.action(
    nameChannel,
    `${platziSide}`
  ) 
  client.action(
    nameChannel,
    `${youtubeSide}`
  )
})

client.on('message', (channel, tags, message, self) => {
  if(self) return
  
  const commandName = message.trim()

  if(commandName.toLowerCase() === '!hello') {
    client.say(channel, `@${tags.username}, heya!`)
  }

  if(commandName.toLowerCase() === '!random') {
    const num = rollDice()
    client.say(channel, `Tu numero es ${num}`)
  }

  if(commandName.toLowerCase() === '!stream') {
    client.say(channel, `Hoy estamos ${streamTwitch}`)
  }
})

