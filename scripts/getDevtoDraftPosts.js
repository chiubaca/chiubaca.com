/**
 * Get all Devto draft posts.
 * In Local Development mode we write the files to disk
 * When in the context of Github it needs to write to the repo via the Github SDK.
 */

const fs = require('fs')
const axios = require('axios')

// In local dev mode we use dotenv to get env variables
if (process.env.NODE_ENV === 'development') require('dotenv').config()

async function main() {
  const response = await axios.get(
    'https://dev.to/api/articles/me/unpublished?page=1&per_page=1000',
    {
      headers: { 'api-key': process.env.DEVTO_KEY },
    }
  )

  // In local dev mode, write the files to disk
  if (process.env.NODE_ENV === 'development') {
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
        `./content/drafts/${article.slug}.md`, // path file will be created to
        contentWithFrontMatter, // content of markdown
        function (err) {
          if (err) return console.log(err)
          console.log('new file created')
        }
      )
    })
  }

  // In "Prod" mode, the context will in a github action, so we need to
  // use the github SDK to write the files to the right place instead
  const { Octokit } = require('@octokit/rest')
  const octokit = new Octokit({
    auth: process.env.GH_KEY,
  })

  const articles = response.data
  articles.forEach((article) => {
    const contentWithFrontMatter = `---
    title: ${article.title}

    test: this is a test
    draft: true
    ---

    ${article.body_markdown}`

    const buffContent = Buffer.from(contentWithFrontMatter, 'utf-8')
    const contentEncoded = buffContent.toString('base64')

    octokit.repos.createOrUpdateFileContents({
      owner: 'chiubaca',
      repo: 'dev-blog',
      path: `content/drafts/${article.slug}.md`,
      message: `provisioned automatically by webhook`,
      content: contentEncoded,
      committer: {
        name: 'Alex Chiu',
        email: 'alexchiu11@gmail.com',
      },
      author: {
        name: 'chiubaca',
        email: 'alexchiu11@gmail.com',
      },
    })
  })
}

main()
