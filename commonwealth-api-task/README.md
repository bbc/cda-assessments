# Commonwealth API Task

This project is a fake API designed to return data about teams in the Commonwealth Games.

The API has 3 endpoints:

POST `/team` - adds a teams data

GET `/medalWinners/:id` - gets a list of medal winners for a given country

GET `/top10` - gets a list of the top 10 countries according to medals won

## Setup

## Requirements

- node 14+ (see https://nodejs.org/en/download/)

### Running the API

```
npm install
npm start
```

### Running the tests

```
npm test
```

## Before your assessment

Ensure you can do the following before your assessment:

- Open the directory in your code editor of choice
- Run `npm start` without any errors, you should see `Commonwealth games server listening at ...` printed in your console
- Run `npm test` and all tests pass
