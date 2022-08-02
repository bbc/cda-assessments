const { default: storeService } = require('./services/storeService')
const store = storeService()

const newTeam = (teamData) => store.add(teamData)

const resetResults = () => store.reset()

const medalWinners = (teamId) => {
    const team = store.getBy('id', teamId)
    return team.medalWinners
}

const top10Leaderboard = () => {
    const teams = store.getAll()

    let leaderboard =
        teams
            .map((team) => {
                const totalMedals = team.medals.gold
                return { name: team.name, totalMedals }
            })
            .sort((teamA, teamB) => teamA.totalMedals <= teamB.totalMedals ? 1 : -1)

    return leaderboard
}

module.exports = { medalWinners, newTeam, top10Leaderboard, resetResults }