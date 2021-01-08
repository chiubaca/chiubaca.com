// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Alex Chiu',
  plugins: [

    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'archive/*.md',
        typeName: 'ArchivedBlogs'
      }
    },
    {
      use:'@chiubaca/gridsome-source-devto',
      options : {
        typeName: 'DevToArticles',
        devtoAPIKey: process.env.DEVTO_KEY
      }
    }

  ],
  templates: {
    ArchivedBlogs: '/archive/:title',
    DevToArticles: '/:title'
  },
  transformers: {
    remark: {
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  }
}
