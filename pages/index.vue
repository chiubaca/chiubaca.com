<template>
  <div class="">
    <h1>Alex Chiu Dev Blog</h1>
    <h2>Blogs</h2>
    <div v-for="(post, index) in posts" :key="index">
      <nuxt-link :to="post.slug">{{ post.slug }}</nuxt-link>
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

    return { posts }
  },
})
</script>

<style></style>
