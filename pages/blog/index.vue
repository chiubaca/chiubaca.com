<template>
  <div>
    <h1>My Blogs</h1>
    <div v-for="(blog, index) in blogs" :key="index">
      <NuxtLink :to="`blog/${blog.slug}`"> {{ blog.title }}</NuxtLink>
      <p>Posted on: {{ blog.date }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const blogs = await $content('blog').fetch()
    return { blogs }
  },
})
</script>

<style></style>
