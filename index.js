const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = 'http://www.popkwiz.com/'

const extractCategories = $ =>
  $('#menu a')
    .map((i, el) => $(el).attr('href'))
    .get()
    .filter(href => href.length)
    .map(href => href.replace(/\/$/, ''))

exports.categories = () =>
  fetch(url)
    .then(res => res.text())
    .then(cheerio.load)
    .then(extractCategories)

const extractQuizz = $ =>
  $('body > script').text()
    .split('\n')
    .filter(line => line.match(/^questions\[/))
    .map(line => line.match(/"[\d\w%]+"/g)
      .map(match => match.replace(/"/g, ''))
      .map(unescape))
    .map(matches => ({
      question: matches[0],
      options: matches.slice(1)
    }))

exports.quizz = category =>
  fetch(`${url}${category ? `${category}/` : ''}`)
    .then(res => res.text())
    .then(cheerio.load)
    .then(extractQuizz)
