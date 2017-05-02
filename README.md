# popkwiz [![npm version](http://img.shields.io/npm/v/popkwiz?style=flat-square)](https://www.npmjs.org/package/popkwiz)

> Scraper for the [Pop Music Quiz][popkwiz].

[popkwiz]: http://www.popkwiz.com/

Usage
-----

Example to get a quiz and format it as Markdown:

```js
const popkwiz = require('popkwiz')

popkwiz.quizz()
  .then(questions => questions.map(({ question, options }) => {
    question = question.replace(/<br>/g, '\n')

    return [
      `*${question}*`,
      '',
      `- **${options[0]}**`,
      ...options.slice(1).map(option => `- ${option}`)
    ].join('\n')
  }).join('\n\n'))
  .then(console.log)
```

Will output something like (showing only the first 3 questions):

> *'Lonely Boy' was a world wide hit for whom in 1977?*
>
> - **Andrew Gold**
> - David Soul
> - Peter Frampton
> - Boz Scaggs
>
> *Which Michael Jackson album was the official follow up to his succesfull Thriller album?*
>
> - **Bad**
> - Off The Wall
> - Dangerous
> - Victory
>
> *Who had a 2004 hit with their version of 'Car Wash'?*
>
> - **Christina Aguilera and Missy Elliot**
> - Busta Rhymes and Mariah Carey
> - Alicia Keys and Tony! Toni! Tone!
> - Gwen Stefani and Eve

It can optionally take a category:

```js
popkwiz.quizz('1980s')
  .then(console.log)
```

You can get the list of categories with:

```js
popkwiz.categories()
  .then(console.log)
```
