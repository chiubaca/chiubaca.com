<template>
  <div class="">
    <h1>Archived Posts</h1>

    <div v-for="(post, index) in archivedPosts" :key="index">
      <NuxtLink :to="`archive/${post.slug}`"> {{ post.title }}</NuxtLink>
      {{ post.title }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const archivedPosts = await $content('archive').fetch()
    return { archivedPosts }
  },
})
</script>

<style></style>
