<template>
  <div class="">
    <h1>Alex Chiu Dev Blog</h1>
    <div v-for="(post, index) in posts" :key="index">
      <nuxt-link :to="post.slug" no-prefetch>{{ post.slug }}</nuxt-link>
      {{ post.title }} || {{ post.id }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios }) {
    const posts: DevTo.Article[] = await $axios.$get(
      'https://dev.to/api/articles/me/published?page=1&per_page=1000',
      {
        headers: { 'api-key': process.env.DEVTO_KEY },
      }
    )

    console.log('Got articels')

    return { posts }
  },

  beforeMount() {
    console.log('Hello!!')
  },
})
</script>

<style></style>
