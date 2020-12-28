const axios = require('axios')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async () => {
  try {
    const url = 'https://api.github.com/repos/chiubaca/dev-blog/dispatches'
    const data = {
      event_type: 'netlify_webhook',
    }
    const options = {
      headers: {
        Accept: 'application/vnd.github.everest-preview+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }

    const resp = await axios.post(url, data, options)
    console.log('success ', resp)
    return {
      statusCode: 200,
      body: 'web hook invoked',
    }
  } catch (error) {
    console.error(error)
    return { statusCode: 500, body: 'problem invoking webhook' }
  }
}

module.exports = { handler }
