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
        url: `https://api.teamgantt.com/v1/workload/users?ids=${
          authData.user_id
        }&group_by=week&start_date=2019-04-29&end_date=2019-05-25`,
        headers: {
          'Content-Type': 'application/json',
          'TG-Authorization': `Bearer ${config.teamgantt.bearer}`,
          'TG-Api-Key': authData.api_key,
          'TG-User-Token': authData.user_token
        }
      },
      (error, response, body) => {
        console.log(JSON.parse(body)[0])
      }
    )
  }
)
