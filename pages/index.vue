<template>
  <div class="">
    <h1>Alex Chiu</h1>
    <h2>Web Developer / Learning In Public / Building For Fun</h2>

    <h2>Blogs</h2>
    <p>(Musings about life, wellbeing and fitness)</p>
    <div class="article" v-for="(blog, index) in blogs" :key="index">
      <NuxtLink :to="`${blog.slug}`"> {{ blog.title }}</NuxtLink>
      <p>Posted on: {{ new Date(blog.date).toDateString() }}</p>
    </div>

    <h2>Recent Dev.to Articles</h2>
    <p>(Web development and ramblings about programming)</p>
    <div v-for="(article, index) in devToArticles" :key="index" class="article">
      <a :href="article.url">{{ article.title }} </a>
      <p>Posted on: {{ new Date(article.published_at).toDateString() }}</p>
    </div>


  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios, $content }) {
    const devToArticles: DevTo.Article[] = await $axios.$get(
      'https://dev.to/api/articles/me/published?page=1&per_page=8',
      {
        headers: { 'api-key': process.env.DEVTO_KEY },
      }
    )

    const blogs = await $content('/').fetch()

    return { devToArticles, blogs }
  },
})
</script>

<style>
.article {
  padding-top: 10px;
}
</style>
