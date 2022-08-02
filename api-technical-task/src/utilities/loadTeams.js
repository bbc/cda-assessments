const fs = require('fs')
const fsPromises = fs.promises
const path = require("path")

const loadTeams = async (server) => {
  const dataPath = path.resolve(__dirname, "../data")

  const files = await fsPromises.readdir(dataPath)
  for (const file of files) {
    const team = fs.readFileSync(`${dataPath}/${file}`)
    await server.post('/team').send(JSON.parse(team))
  }
}

module.exports = { loadTeams }