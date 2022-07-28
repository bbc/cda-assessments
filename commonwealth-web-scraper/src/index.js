const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch()

  const teams = await getTeams(browser)

  for (const team of teams) {
    team.athletes = await getTeamAthletes(browser, team)
    fs.writeFileSync(`../api-task/src/data/${team.name}.json`, JSON.stringify(team), { flag: 'w+' });
  }

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
