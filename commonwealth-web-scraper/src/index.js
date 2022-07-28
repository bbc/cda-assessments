const puppeteer = require('puppeteer');

(async () => {


  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 500
  })

  // const page = await browser.newPage()
  // await page.goto(commonwealthGamesSiteUrl)

  const teams = await getTeams(browser)
  // const teamsWithAthletes = teams.forEach((team) => await getTeamAthletes(browser, team))

  for (const team of teams) {
    const athletes = await getTeamAthletes(browser, team)
    console.log(athletes, 'sss<')
  }

  const teamList = []



  await browser.close()
})();

const getTeams = async (browser) => {
  const teamsPageURL = 'https://www.birmingham2022.com/teams'
  const page = await browser.newPage()
  await page.goto(teamsPageURL)

  return await page.evaluate(() => {
    const teams = []
    const teamsList = document.querySelector('section.teams-list')
    teamsList.querySelectorAll('a.teams-list__link').forEach((teamElement) => {
      teams.push({ pageUrl: teamElement.href, name: teamElement.getAttribute('title') })
    })
    return teams
  })
}

const getTeamAthletes = async (browser, team) => {
  const page = await browser.newPage()
  await page.goto(team.pageUrl)

  return await page.evaluate(() => {
    const athleteRows = document.querySelectorAll('.athletes-list__row--body')

    let athletes = []
    athleteRows.forEach((athleteRow) => {
      const cellData = athleteRow.querySelectorAll('td')
      athletes.push({
        name: cellData[0].innerText.replace('\n', ' '),
        sport: cellData[1].innerText,
        gender: cellData[2].innerText,
        age: cellData[3].innerText
      })
    })
    return athletes
  })
}



// logging
  // teamsPage.on('console', async (msg) => {
  //   const msgArgs = msg.args()
  //   for (let i = 0 i < msgArgs.length ++i) {
  //     console.log(await msgArgs[i].jsonValue())
  //   }
  // })