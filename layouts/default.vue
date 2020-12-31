<template>
  <div>
    <nav class="nav">
      <NuxtLink to="/" tag="h1">Alex Chiu</NuxtLink>
      <ThemeToggle />
    </nav>
    <p>Full Stack Developer / Learning In Public / Building For Fun</p>

    <hr />

    <Nuxt />

    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
})
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav h1:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
