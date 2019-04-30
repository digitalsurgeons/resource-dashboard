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

    request(
      {
        method: 'GET',
        url: `https://api.teamgantt.com/v1/companies/${
          config.teamgantt.company_id
        }/users`,
        headers: {
          'Content-Type': 'application/json',
          'TG-Authorization': `Bearer ${config.teamgantt.bearer}`,
          'TG-Api-Key': authData.api_key,
          'TG-User-Token': authData.user_token
        }
      },
      (error, response, body) => {
        const users = console.log(
          JSON.parse(body).map(user => {
            return {
              id: user.id,
              name: `${user.first_name} ${user.last_name}`
            }
          })
        )
      }
    )
  }
)
