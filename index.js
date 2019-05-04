const config = require('./config')
const request = require('request')
const fs = require('fs')

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
    const dates = {}

    // loop through departments and fetch workload for each
    Object.keys(config.teamgantt.departments).forEach((department, i) => {
      // create comma separated string of user ids
      const users = config.teamgantt.departments[department]
        .map(user => {
          return user.id
        })
        .join(',')

      // fetch department workload
      request(
        {
          method: 'GET',
          url: `https://api.teamgantt.com/v1/workload/users?ids=${users}&group_by=week&start_date=2019-04-29&end_date=2019-05-25`,
          headers: {
            'Content-Type': 'application/json',
            'TG-Authorization': `Bearer ${config.teamgantt.bearer}`,
            'TG-Api-Key': authData.api_key,
            'TG-User-Token': authData.user_token
          }
        },
        (error, response, body) => {
          // loop through each returned user
          JSON.parse(body).forEach(user => {
            user.data.forEach(workload => {
              // create empty week object
              if (!dates[workload.date]) {
                dates[workload.date] = {}
              }

              // scaffold department object for this week
              if (!dates[workload.date][department]) {
                dates[workload.date][department] = {
                  total: 0,
                  resourced: 0
                }
              }

              // loop through every user in department to find user name from id
              config.teamgantt.departments[department].every(usr => {
                // match user on id
                if (usr.id === user.type_id) {
                  // add users workload for this week
                  dates[workload.date][department][usr.name] =
                    workload.hours_total

                  // increment total workload for department
                  dates[workload.date][department].total += workload.hours_total

                  // update total workload as % of capacity (40hr pp)
                  dates[workload.date][department].resourced =
                    (dates[workload.date][department].total /
                      (config.teamgantt.departments[department].length * 40)) *
                    100
                  return false
                }

                return true
              })
            })
          })

          // write pretty json to file
          if (i >= Object.keys(config.teamgantt.departments).length - 1) {
            fs.writeFile('./data.json', JSON.stringify(dates, null, 2), () => {
              console.log('complete')
            })
          }
        }
      )
    })
  }
)
