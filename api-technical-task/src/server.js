const express = require('express')
const { newTeam, medalWinners, top10Leaderboard, resetResults } = require('./resultsController')
const request = require('supertest')

const { loadTeams } = require('./utilities/loadTeams')

const server = express()
server.use(express.json({ limit: '50mb' }))

server.post('/team', (req, res) => {
  res.send(newTeam(req.body))
})

server.get('/top10', (req, res) => {
  res.send(top10Leaderboard())
})

server.get('/medalWinners/:id', (req, res) => {
  res.send(medalWinners(parseInt(req.params.id)))
})

// Seeds store, only when not running tests
!process.env.JEST_WORKER_ID && loadTeams(request(server))

module.exports = { default: server, resetResults }