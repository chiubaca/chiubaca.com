<template>
  <div class="">
    <h1>Alex Chiu Dev Blog</h1>
    <h2>Blogs</h2>
    <div v-for="(post, index) in posts" :key="index">
      <nuxt-link :to="post.slug" no-prefetch>{{ post.slug }}</nuxt-link>
      {{ post.title }} || {{ post.id }}
    </div>

    <h2>Drafts</h2>

    <div v-for="(draft, index) in drafts" :key="index">
      <nuxt-link :to="draft.slug" no-prefetch>{{ draft.slug }}</nuxt-link>
      {{ draft.title }} || {{ draft.id }}
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

    const drafts: DevTo.Article[] = await $axios.$get(
      'https://dev.to/api/articles/me/unpublished?page=1&per_page=1000',
      {
        headers: { 'api-key': process.env.DEVTO_KEY },
      }
    )

    return { posts, drafts }
  },

  beforeMount() {
    console.log('Hello!!')
  },
})
</script>

<style></style>
