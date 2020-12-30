<template>
  <div>
    <ThemeToggle/>
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ThemeToggle from "@/components/ThemeToggle.vue"

export default Vue.extend({
  components: {
    ThemeToggle,
  },
})
</script>

<style>
</style>
