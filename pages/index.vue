<template>
  <div class="">
    <div class="devto">
      <h2>👨‍💻 Dev.to Articles</h2>
      <p class="subtext">Web development and ramblings about programming</p>
      <p></p>
      <div
        v-for="(article, index) in devToArticles"
        :key="index"
        class="article"
      >
        <a :href="article.url">{{ article.title }} </a>
        <p class="timestamp">
          Posted on: {{ new Date(article.published_at).toDateString() }}
        </p>
      </div>
    </div>

    <div class="blogs">
      <h2>📝 Blogs</h2>
      <p class="subtext">Musings about life, wellbeing and fitness</p>
      <div v-for="(blog, index) in blogs" :key="index" class="article">
        <NuxtLink :to="`${blog.slug}`"> {{ blog.title }}</NuxtLink>
        <p class="timestamp">
          Posted on: {{ new Date(blog.date).toDateString() }}
        </p>
      </div>
    </div>

    <div class="archive">
      <NuxtLink to="archive" tag="h1">🗄️ Archive</NuxtLink>
      <p>Writings from my old blog. Awkward.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios, $content }) {
    const devToArticles: DevTo.Article[] = await $axios.$get(
      'https://dev.to/api/articles/me/published?page=1&per_page=1000',
      {
        headers: { 'api-key': process.env.DEVTO_KEY },
      }
    )

    const blogs = await $content('/').fetch()

    return { devToArticles, blogs }
  },
})
</script>

<style scoped>
.devto {
  padding-top: 25px;
}
.blogs {
  padding-top: 25px;
}

.article {
  padding-top: 10px;
}

.timestamp {
  font-size: 0.8em;
  color: grey;
}

.subtext {
  font-style: italic;
}

.archive {
  padding-top: 10px;
}

.archive:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
