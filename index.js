var express = require('express')
var app = express()
var fetch = require('node-fetch')
const cityId = 498817
const port = 3000
const kelvinConst = 273.15

app.get('/:id', (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?id=${req.params.id || cityId}&APPID=2a2062bcc18e7a3c8fec865a4b392092`
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  return fetch(url, options)
    .then(response => response.json())
    .then(response => {
      const data = response.list
      const dataByDays = data.reduce((sum, item) => {
        const { temp_min: min, temp_max: max } = item.main
        sum[new Date(item.dt * 1000)] = `${(min - kelvinConst).toPrecision(3)}°C - ${(max - kelvinConst).toPrecision(3)}°C`
        return sum
      }, {
        id: +(new Date())
      })
      res.send(dataByDays)
    })
    .catch(err => res.json(err))
})

app.listen(port, _ => {
  console.log('Example app listening at port: ', port)
})
