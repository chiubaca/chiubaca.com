<template>
  <article v-html="parsedMD"></article>
</template>

<script lang="ts">
import Vue from 'vue'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import format from 'rehype-format'
import html from 'rehype-stringify'
import report from 'vfile-reporter'

export default Vue.extend({
  async asyncData({ params, $axios }) {
    const post: DevTo.Article = await $axios.$get(
      'https://dev.to/api/articles/chiubaca/' + params.slug
    )

    let parsedMD
    unified()
      .use(markdown)
      .use(remark2rehype)
      .use(format)
      .use(html)
      .process(post.body_markdown, function (err, file) {
        console.error(report(err || file))
        console.log(String(file))
        parsedMD = String(file)
      })

    return { parsedMD }
  },
})
</script>

<style scoped></style>
