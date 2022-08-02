const request = require('supertest')
const { default: expressServer, resetResults } = require('../')
const { loadTeams } = require('../utilities/loadTeams')

const fetchTop10 = (server) => {
    return server.get('/top10')
}

const getMedalWinners = (server, teamId) => {
    return server.get(`/medalWinners/${teamId}`)
}

describe('Commonwealth Results', () => {
    const server = request(expressServer)

    beforeEach(() => {
        resetResults()
    })

    describe(('/top10'), () => {
        test('top team', async () => {
            await loadTeams(server)
            const top10 = await fetchTop10(server)
            expect(top10._body).not.toBeNull()
            expect(top10._body[0].name).toEqual('South Africa')
            // expect(top10._body[0].totalMedals).toEqual(12)
        })

        test('second team', async () => {
            await loadTeams(server)
            const top10 = await fetchTop10(server)
            expect(top10._body).not.toBeNull()
            expect(top10._body[1].name).toEqual('India')
            // expect(top10._body[1].totalMedals).toEqual(9)
        })

        test('third team', async () => {
            await loadTeams(server)
            const top10 = await fetchTop10(server)
            expect(top10._body).not.toBeNull()
            expect(top10._body[2].name).toEqual('Nigeria')
            // expect(top10._body[2].totalMedals).toEqual(4)
        })

        test('bottom team', async () => {
            await loadTeams(server)
            const top10 = await fetchTop10(server)
            expect(top10._body).not.toBeNull()
            expect(top10._body[9].name).toEqual('Botswana')
            // expect(top10._body[9].totalMedals).toEqual(0)
        })
    })

    describe('/medalWinners:id', () => {
        test('ghana', async () => {
            const teamId = 4
            await loadTeams(server)
            const medalWinners = await getMedalWinners(server, teamId)
            expect(medalWinners._body).toEqual([])
        })

        test('south africa', async () => {
            const teamId = 15
            await loadTeams(server)
            const medalWinners = await getMedalWinners(server, teamId)
            expect(medalWinners._body).toEqual(expect.arrayContaining([
                {
                    "name": "Pieter Coetze",
                    "sport": "Aquatics - Swimming and Para Swimming",
                    "event": "Men's 50m Backstroke",
                    "medal": "Silver"
                },
                {
                    "name": "Charne Griesel",
                    "sport": "Judo",
                    "event": "Women -52 kg",
                    "medal": "Bronze"
                },
            ]))
        })
    })
})
