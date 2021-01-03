require('dotenv').config()
const tmi = require('tmi.js')

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info"  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: 'CarGDev',
    password: process.env.token
  },
  channels: [ process.env.username ]
})

client.connect().catch(console.error)

const rollDice = () => {
  const sides = 10
  return Math.floor(Math.random() * sides) + 1
}

client.on('message', (channel, tags, message, self) => {
  const streamTwitch = 'Hoy estamos haciendo un bot para twitch'
  if(self) return
  if(message.toLowerCase() === '!hello') {
    client.say(channel, `@${tags.username}, heya!`)
  }

  if(message.toLowerCase() === '!random') {
    const num = rollDice()
    client.say(channel, `Tu numero es ${num}`)
  }

  if(message.toLowerCase() === '!stream') {
    client.say(channel, `${streamTwitch}`)
  }
})

