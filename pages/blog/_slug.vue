<template>
  <article>
    <nuxt-content :document="blog" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params }) {
    const blog = await $content('blog', params.slug).fetch()

    return { blog }
  },
})
</script>

<style scoped></style>
