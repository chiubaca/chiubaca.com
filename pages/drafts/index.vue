<template>
  <div class="">
    <h1>Alex Chiu Dev Blog</h1>
    <h2>You've stumbled arcorss my draft blogs!</h2>

    <div v-for="(draft, index) in drafts" :key="index">
      {{ draft.title }}
      <br>
      {{ draft.description }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $axios }) {
    const drafts: DevTo.Article[] = await $axios.$get(
      'https://dev.to/api/articles/me/unpublished?page=1&per_page=1000',
      {
        headers: { 'api-key': process.env.DEVTO_KEY },
      }
    )

    return { drafts }
  },
})
</script>

<style></style>
