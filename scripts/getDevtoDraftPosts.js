const fs = require('fs')
const axios = require('axios')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

async function main() {
  const response = await axios.get(
    'https://dev.to/api/articles/me/unpublished?page=1&per_page=1000',
    {
      headers: { 'api-key': process.env.DEVTO_KEY },
    }
  )

  const articles = response.data
  articles.forEach((article) => {
    const contentWithFrontMatter = `---
title: ${article.title}
test: this is a test
draft: true
---

${article.body_markdown}
`
    fs.writeFile(
      `./content/drafts/${article.slug}.md`, // pathc file will be created to
      contentWithFrontMatter, // content of markdown
      function (err) {
        if (err) return console.log(err)
        console.log('new file created')
      }
    )
    console.log(article.id)
  })
}

main()
