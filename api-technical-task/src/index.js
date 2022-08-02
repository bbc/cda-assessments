const express = require('express')
const { newTeam, medalWinners, medalWinnersUnder21, top10Leaderboard, resetResults } = require('./commonwealthController')
const request = require('supertest')
const port = process.env.PORT || 3000

const { loadTeams } = require('./utilities/loadTeams')

const server = express()
server.use(express.json())

server.post('/team', (req, res) => {
  res.send(newTeam(req.body))
})

server.get('/top10', (req, res) => {
  res.send(top10Leaderboard())
})

server.get('/medalWinners/:id', (req, res) => {
  res.send(medalWinners(parseInt(req.params.id)))
})

server.listen(port, () => {
  console.log(`Election app listening at http://localhost:${port}`)
})

// Seeds store, only when not running tests
!process.env.JEST_WORKER_ID && loadTeams(request(server))

module.exports = { default: server, resetResults }
