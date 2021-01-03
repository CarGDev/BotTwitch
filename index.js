const tmi = require('tmi.js')
const config = require('./config/config')()
const socialMediaCheck = require('./src/socialMedia')

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

client.on('connected', () => {
  const nameChannel = config.USERNAME
  client.action(
    nameChannel,
    `Hola a todos hoy estamos ${streamTwitch}`
  )
  socialMediaCheck(client).socialMediaFn(nameChannel)
})

const entries = {}
const newChannel = {}

client.on('message', (channel, tags, message, self) => {
  if(self) return
  const isAdminMessage = tags.username === config.USERNAME.toLowerCase()
  const commandName = message.trim()
  
  if(message.toLowerCase() === '!enter') {
    entries[tags.username] = tags.username
    client.say(channel, `You have been entered @${tags.username}`)
  } else if (message.toLowerCase() === '!pickwinner' && isAdminMessage) {
    const entriesArr = Object.values(entries)
    const randomNumber = Math.floor(Math.random() * entriesArr.length)
    const winner = entriesArr[randomNumber]
    client.say(channel, `The winner is @${winner}`)
  }

  if(commandName.toLowerCase() === '!redessociales') {
    socialMediaCheck(client).socialMediaFn(channel)
  }
  if(commandName.toLowerCase() === '!hello') {
    client.say(channel, `@${tags.username}, Bienvenidos!`)
  }

  if(commandName.toLowerCase() === '!random') {
    const num = rollDice()
    client.say(channel, `Tu numero es ${num}`)
  }

  if(commandName.toLowerCase() === '!stream') {
    client.say(channel, `Hoy estamos ${streamTwitch}`)
  }
})

client.on('chat', (channel, tags, message, self) => {
  const newChannelArr = Object.values(newChannel)
  if(newChannelArr.includes(tags.username)) {
    console.log(newChannelArr)
    return
  } else {
    console.log(newChannelArr)
    newChannel[tags.username] = tags.username
    client.action(channel, `Hola como estas @${tags.username} es un gusto tenerte en el live`)
  }
})

