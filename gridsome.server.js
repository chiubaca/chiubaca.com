// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const devToArticles = await axios.get(
      'https://dev.to/api/articles/me/published?page=1&per_page=1000',
      {
        headers: { 'api-key': process.env.DEVTO_KEY },
      }
    )
 
    const collection = addCollection({
      typeName: 'DevToPosts'
    })

    for (const post of devToArticles.data) {
      collection.addNode({
        id: post.id,
        title: post.title,
        description: post.description,
        publishedAt: post.published_at,
        slug: post.slug,
        url: post.url,
        bodyMarkdown: post.body_markdown,
        tags: post.tag_list,
        path: `/${post.slug}/`
      })
      console.log("Adding dev.to article", post.title)
    }

  })

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`{
      allDevToPosts {
        edges {
          node {
            slug
            path
          }
        }
      }
    }`)

    data.allDevToPosts.edges.forEach(({node}) =>{
      createPage({
        path: `/${node.slug}`,
        component: './src/templates/DevToBlogs.vue',
        context: {
          path: node.path
        }
      })
      console.log(`Creating path - /${node.slug}`) 
    })



  })
}
