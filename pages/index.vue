<template>
  <div class="">
    <h1>Alex Chiu Dev Blog</h1>
    <div v-for="(blog, index) in article" :key="index">
      <nuxt-link :to="blog.slug" no-prefetch>{{ blog.slug }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params }) {
    const article = await $content('/', params.slug).fetch()
    console.log(article)
    return { article }
  },

  beforeMount() {
    console.log('Hello!!')
  },
})
</script>

<style></style>
