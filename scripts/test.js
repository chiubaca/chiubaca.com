// console.log("I want this to be invoked via a web hook")

const { Octokit } = require('@octokit/rest')
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

async function main() {
  try {

    // List all files
  
  } catch (err) {
    console.error('Something went wrong', err)
  }
}

main()
