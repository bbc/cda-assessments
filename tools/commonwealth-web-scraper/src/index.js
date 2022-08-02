const puppeteer = require('puppeteer');
const fs = require('fs');
const { default: axios } = require('axios');


(async () => {
  try {
    const browser = await puppeteer.launch({
      // headless: false, slowMo: 100
    })

    const teams = await getTeams(browser)

    let index = 1
    for (const team of teams) {
      team.id = index
      index++
      // if (team.name === 'Australia') {
      team.medals = await getTeamMedals(browser, team)
      team.athletes = await getTeamAthletes(browser, team)
      team.medalWinners = await getTeamMedalWinners(browser, team)

      fs.writeFileSync(`../../commonwealth-api-task/src/data/${team.name}.json`, JSON.stringify(team, null, 4), { flag: 'w+' });
      // }
    }

    await browser.close()
  } catch (e) {
    console.log(e)
  }

})();

const getTeams = async (browser) => {
  const teamsPageURL = 'https://www.birmingham2022.com/teams'
  const page = await browser.newPage()
  await page.goto(teamsPageURL)

  const teams = await page.evaluate(() => {
    const teams = []
    const teamsList = document.querySelector('section.teams-list')
    teamsList.querySelectorAll('a.teams-list__link').forEach((teamElement) => {
      teams.push({ pageUrl: teamElement.href, name: teamElement.getAttribute('title') })
    })
    return teams
  })
  page.close()
  return teams
}

const getTeamMedals = async (browser, team) => {
  const page = await browser.newPage()
  await page.goto(team.pageUrl)

  const medals = await page.evaluate(() => {
    const medalCells = document.querySelectorAll('.medals-list__cell--medal')

    let medals = {
      gold: parseInt(medalCells[0].innerText),
      silver: parseInt(medalCells[1].innerText),
      bronze: parseInt(medalCells[2].innerText)
    }

    return medals
  })
  await page.close()
  return medals
}

const getTeamMedalWinners = async (browser, team) => {
  // const page = await browser.newPage()
  // await page.goto(team.pageUrl)


  // await closeCookieBanner(page)
  // await page.waitForTimeout(500)
  // try {
  //   await page.click('.athletes-list.medalist button.load-more-button')
  // } catch (e) {

  // }

  // const selectorForLoadMoreButton = '.athletes-list.medalist button.load-more-button.is-loading'
  // let loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton)

  // while (loadMoreVisible) {
  //   await scrollIntoView(page, selectorForLoadMoreButton)
  //   loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
  // }

  // const medalists = await page.evaluate(() => {
  //   const medalistsList = document.querySelector('section.athletes-list.medalist')
  //   if (!medalistsList) return []
  //   const medalistsRows = medalistsList.querySelectorAll('.athletes-list__row--body')

  //   let medalists = []
  //   medalistsRows.forEach((medalistRow) => {
  //     const cellData = medalistRow.querySelectorAll('td')

  //     let medal
  //     if (cellData[4].innerText === "B") medal = "Bronze"
  //     if (cellData[4].innerText === "S") medal = "Silver"
  //     if (cellData[4].innerText === "G") medal = "Gold"

  //     medalists.push({
  //       name: cellData[1].innerText.replace('\n', ' '),
  //       sport: cellData[2].innerText,
  //       event: cellData[3].innerText,
  //       medal
  //     })
  //   })
  //   return medalists
  // })
  // await page.close()
  // return medalists

  const teamId = team.pageUrl.substring(team.pageUrl.lastIndexOf('/') + 1)

  const medalists = await fetchAllMedalists(0, [], teamId)
  return medalists.map((medalist) => {
    return {
      name: medalist.athleteName,
      sport: medalist.discipline.description,
      event: medalist.eventDescription,
      medal: medalist.medalType
    }
  })

  return medalists

}

const getTeamAthletes = async (browser, team) => {

  // Bug with load more buttons on the website, making scraping like this difficult
  // const page = await browser.newPage()
  // await page.goto(team.pageUrl)

  // await closeCookieBanner(page)
  // await page.waitForTimeout(500)
  // try {
  //   await page.click('.athletes-list button.load-more-button')
  // } catch (e) {

  // }

  // const selectorForLoadMoreButton = '.athletes-list button.load-more-button.is-loading'
  // let loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton)

  // while (loadMoreVisible) {
  //   await scrollIntoView(page, selectorForLoadMoreButton)
  //   loadMoreVisible = await isElementVisible(page, selectorForLoadMoreButton);
  // }

  // const athletes = await page.evaluate(() => {
  //   const athleteList = document.querySelector('section.athletes-list')
  //   if (!athleteList) return []
  //   const athleteRows = athleteList.querySelectorAll('.athletes-list__row--body')

  //   let athletes = []
  //   athleteRows.forEach((athleteRow) => {
  //     const cellData = athleteRow.querySelectorAll('td')
  //     athletes.push({
  //       name: cellData[0].innerText.replace('\n', ' '),
  //       sport: cellData[1].innerText,
  //       gender: cellData[2].innerText,
  //       age: parseInt(cellData[3].innerText)
  //     })
  //   })
  //   return athletes
  // })
  // await page.close()
  // return athletes

  const teamId = team.pageUrl.substring(team.pageUrl.lastIndexOf('/') + 1)

  const athletes = await fetchAllAthletes(0, [], teamId)
  return athletes.map((athlete) => {
    return {
      name: athlete.givenName + ' ' + athlete.familyName,
      sports: athlete.disciplines.map((discipline) => discipline.description),
      gender: athlete.genderCode,
      age: athlete.age,
      image: athlete.accreditationImage
    }
  })
}

const isElementVisible = async (page, cssSelector) => {
  let visible = true
  await page
    .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
    .catch(() => {
      visible = false
    })

  return visible
}

const scrollIntoView = async (page, cssSelector) => {
  await page.evaluate((cssSelector) => {
    const loadingButton = document.querySelector(cssSelector)
    loadingButton?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, cssSelector)
  await page.waitForTimeout(100)
}

const closeCookieBanner = async (page) => {
  await page.waitForTimeout(500)
  try {
    await page.click('.js-accept-all-close')
  } catch (e) { }
}

const fetchAllMedalists = async (pageNumber = 0, result = [], teamId) => {
  const page = await axios.get(`https://api.birmingham2022.com/cwg-schedule/v1/cwg/teams/${teamId}/medalist/?page=${pageNumber}&size=40`)

  result = result.concat(page.data.medalists)

  if (pageNumber === page.data.pageInfo.numPages) {
    return result
  } else {
    return fetchAllMedalists(pageNumber + 1, result, teamId);
  }
}


const fetchAllAthletes = async (pageNumber = 0, result = [], teamId) => {
  const page = await axios.get(`https://api.birmingham2022.com/cwg-schedule/v1/teams/${teamId}/athletes/?page=${pageNumber}&size=40`)

  result = result.concat(page.data.athletes)

  if (pageNumber === page.data.pageInfo.numPages) {
    return result
  } else {
    return fetchAllAthletes(pageNumber + 1, result, teamId);
  }
}