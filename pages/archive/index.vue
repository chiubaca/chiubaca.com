<template>
  <div class="archive">
    <h1>Archived Posts</h1>
    <p>Awkward old blogs 🙈</p>
    <div v-for="(post, index) in archivedPosts" :key="index" class="article">
      <NuxtLink :to="`archive/${post.slug}`"> {{ post.title }}</NuxtLink>
      <p class="timestamp">Posted on: {{ post.date }}</p>
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

<style scoped>
.archive {
  padding-top: 25px;
}

.article {
  padding-top: 10px;
}

.timestamp {
  font-size: 0.8em;
  color: grey;
}
</style>
