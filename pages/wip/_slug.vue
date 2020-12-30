<template>
  <article v-html="post.body_html"></article>
</template>

<script lang="ts">
/**
 *
 * Hooo boy it's a mess in here...
 * Cant decide if I should be parsing the markdown or just use the body_html
 *
 * using markdown I have more control but need to work out how to process the shortcode
 * using the html everything has been processed but need to figure out how to use highlight.js to style the code blocks
 *
 */

import Vue from 'vue'
// import unified from 'unified'
// import markdown from 'remark-parse'
// import remark2rehype from 'remark-rehype'
// import format from 'rehype-format'
// import html from 'rehype-stringify'
// import report from 'vfile-reporter'
import hljs from 'highlight.js'
// import javascript from 'highlight.js/lib/languages/javascript'
// import 'highlight.js/styles/github.css'
// hljs.registerLanguage('javascript', javascript)

export default Vue.extend({
  async asyncData({ params, $axios }) {
    const post: DevTo.ArticleBySlug = await $axios.$get(
      'https://dev.to/api/articles/chiubaca/' + params.slug
    )

    // let parsedMD
    // unified()
    //   .use(markdown)
    //   .use(remark2rehype)
    //   .use(format)
    //   .use(html)
    //   .process(post.body_markdown, function (err, file) {
    //     console.error(report(err || file))
    //     // console.log(String(file))
    //     parsedMD = String(file)
    //   })

    const highlightedHTML = hljs.highlightAuto(post.body_html)
    console.log('Highlighes', highlightedHTML.value)

    return {
      // parsedMD,
      post,
      highlightedHTML,
    }
  },
})
</script>

<style scoped></style>
