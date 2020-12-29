<template>
  <article v-html="post.body_html"></article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ params, $axios }) {
    const post: DevTo.Article = await $axios.$get(
      'https://dev.to/api/articles/chiubaca/' + params.slug
    )

    return { post }
  },
})
</script>

<style scoped></style>
