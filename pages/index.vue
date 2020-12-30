<template>
  <div class="">
    <h1>Alex Chiu</h1>
    <h2>Web Developer / Learning In Public / Building For Fun</h2>

    <h2>Blogs</h2>
    <p>Musings About Life and Fitness</p>

    <h2>Recent Dev.to Articles</h2>
    <p>Web Dev and Programming related articles</p>
    <div v-for="(post, index) in posts" :key="index" class="article">
      <a :href="post.url">{{ post.title }} </a>
      <p>Posted on: {{ new Date(post.published_at).toDateString() }}</p>
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

<style>
.article {
  padding-top: 10px;
}
</style>
