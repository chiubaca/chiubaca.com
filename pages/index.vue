<template>
  <div class="">
    <h1>Alex Chiu</h1>

    <h2>Recent Dev.to Articles</h2>
    <div v-for="(post, index) in posts" :key="index">
      <p>{{ Date(post.published_at) }}</p>
      <a :href="post.url">{{ post.title }} </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios }) {
    const posts: DevTo.Article[] = await $axios.$get(
      'https://dev.to/api/articles/me/published?page=1&per_page=8',
      {
        headers: { 'api-key': process.env.DEVTO_KEY },
      }
    )

    return { posts }
  },
})
</script>

<style></style>
