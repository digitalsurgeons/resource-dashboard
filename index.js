const config = require('./config')
const request = require('request')

// authenticate with TeamGantt
request(
  {
    method: 'POST',
    url: 'https://api.teamgantt.com/v1/authenticate',
    headers: {
      'Content-Type': 'application/json',
      'TG-Authorization': `Bearer ${config.teamgantt.bearer}`
    },
    body: `{ "user": "${config.teamgantt.username}",  "pass": "${
      config.teamgantt.password
    }" }`
  },
  (error, response, body) => {
    // parse auth keys
    const authData = JSON.parse(body)

    console.log(authData)
  }
)
